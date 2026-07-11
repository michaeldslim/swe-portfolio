# JavaScript Interview Guide: Part 2A - Objects and Prototypes

## Objects and Prototypes

### Object Creation Patterns

JavaScript offers multiple ways to create objects, each with its own use cases and advantages.

#### 1. Object Literals
```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  greet() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  }
};
```

**Advantages:**
- Simple and concise syntax
- Good for one-off objects
- Most common way to create objects

#### 2. Constructor Functions
```javascript
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.greet = function() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  };
}

const john = new Person('John', 'Doe', 30);
```

**Advantages:**
- Creates multiple similar objects
- `instanceof` operator works with them
- Traditional way before ES6 classes

**Interview Tips:**
- Always call with `new` keyword (or use safeguards)
- Function name should be capitalized (convention)
- Each instance gets its own copy of methods (memory inefficient)

#### 3. Factory Functions
```javascript
function createPerson(firstName, lastName, age) {
  return {
    firstName,
    lastName,
    age,
    greet() {
      return `Hello, I'm ${firstName} ${lastName}`;
    }
  };
}

const john = createPerson('John', 'Doe', 30);
```

**Advantages:**
- No `new` keyword required
- Can create closures for private data
- More flexible than constructors

#### 4. Object.create()
```javascript
const personProto = {
  greet() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  }
};

const john = Object.create(personProto);
john.firstName = 'John';
john.lastName = 'Doe';
john.age = 30;
```

**Advantages:**
- Directly specifies the prototype
- More control over object creation
- Can create objects with no prototype (`Object.create(null)`)

#### 5. ES6 Classes
```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  }
  
  static createAnonymous() {
    return new Person('Anonymous', 'User', 0);
  }
}

const john = new Person('John', 'Doe', 30);
const anonymous = Person.createAnonymous();
```

**Advantages:**
- Familiar syntax for developers from class-based languages
- Built-in support for constructors, static methods, and inheritance
- Methods are automatically added to prototype

**Interview Tips:**
- Classes are syntactic sugar over prototypal inheritance
- Still uses prototypes under the hood
- Hoisting works differently than function declarations

### Prototypal Inheritance

JavaScript uses prototype-based inheritance rather than class-based inheritance.

#### Prototype Chain
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function() {
  return "Some generic sound";
};

function Dog(name, breed) {
  Animal.call(this, name);  // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // Fix constructor property

// Override method
Dog.prototype.makeSound = function() {
  return "Woof!";
};

// Add new method
Dog.prototype.fetch = function() {
  return `${this.name} is fetching.`;
};

const rex = new Dog("Rex", "German Shepherd");
rex.makeSound();  // "Woof!"
rex.fetch();      // "Rex is fetching."
```

**How Prototype Chain Works:**
1. When accessing a property/method, JavaScript first looks on the object itself
2. If not found, it looks on the object's prototype
3. If not found, it continues up the prototype chain
4. Eventually reaches `Object.prototype` (the root prototype)
5. If still not found, returns `undefined`

```javascript
rex.toString();  // Inherited from Object.prototype
```

#### ES6 Class Inheritance
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  makeSound() {
    return "Some generic sound";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  makeSound() {
    return "Woof!";
  }
  
  fetch() {
    return `${this.name} is fetching.`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
```

**Interview Tips:**
- `extends` sets up the prototype chain
- `super()` calls the parent constructor
- Must call `super()` before using `this` in derived class constructors

#### Checking Prototype Relationships
```javascript
// instanceof operator
rex instanceof Dog;      // true
rex instanceof Animal;   // true
rex instanceof Object;   // true

// isPrototypeOf method
Dog.prototype.isPrototypeOf(rex);      // true
Animal.prototype.isPrototypeOf(rex);   // true
Object.prototype.isPrototypeOf(rex);   // true

// getPrototypeOf method
Object.getPrototypeOf(rex) === Dog.prototype;  // true
```

### Constructor Functions

Constructor functions are used to create and initialize objects with the `new` keyword.

```javascript
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  
  this.getSummary = function() {
    return `${this.title} was written by ${this.author} in ${this.year}`;
  };
}

const book1 = new Book("1984", "George Orwell", 1949);
```

#### What Happens When `new` is Used:
1. Creates a new empty object
2. Sets the prototype of the new object to the constructor's prototype property
3. Executes the constructor with `this` bound to the new object
4. Returns the new object (unless the constructor returns a non-primitive)

#### Constructor Property
```javascript
book1.constructor === Book;  // true
```

#### Prototype Methods vs. Instance Methods
```javascript
// Instance method (created for each instance)
function Book(title, author) {
  this.title = title;
  this.author = author;
  this.getSummary = function() {  // Memory inefficient
    return `${this.title} by ${this.author}`;
  };
}

// Prototype method (shared by all instances)
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.getSummary = function() {  // Memory efficient
  return `${this.title} by ${this.author}`;
};
```

**Interview Tips:**
- Prototype methods are more memory-efficient
- Instance methods allow for closures and private data
- Consider the trade-offs based on your needs

#### Constructor Safety
```javascript
function Book(title, author) {
  // Safeguard against missing 'new'
  if (!(this instanceof Book)) {
    return new Book(title, author);
  }
  
  this.title = title;
  this.author = author;
}
```

### The `new` Operator

The `new` operator creates an instance of a constructor function or class.

```javascript
function Person(name) {
  this.name = name;
}

// These are equivalent:
const john1 = new Person("John");

const john2 = Object.create(Person.prototype);
Person.call(john2, "John");
```

#### Common Mistakes with `new`
```javascript
function Person(name) {
  this.name = name;
}

// Forgetting 'new' (in non-strict mode)
const john = Person("John");  // 'this' refers to global object
console.log(john);  // undefined
console.log(window.name);  // "John" (global pollution)

// In strict mode
"use strict";
function StrictPerson(name) {
  this.name = name;
}

const jane = StrictPerson("Jane");  // TypeError: Cannot set property 'name' of undefined
```

#### ES6 Classes and `new`
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

// Must use 'new' with classes
const john = new Person("John");  // Works
const jane = Person("Jane");      // TypeError: Class constructor cannot be invoked without 'new'
```

**Interview Tips:**
- Always use `new` with constructor functions and classes
- Constructor functions can be called without `new` (but shouldn't be)
- ES6 classes throw an error if called without `new`
- Consider using factory functions if you want to avoid `new`

### Prototype Methods

#### Common Object.prototype Methods
```javascript
const person = { name: "John" };

// hasOwnProperty
person.hasOwnProperty("name");  // true
person.hasOwnProperty("toString");  // false (inherited)

// toString
person.toString();  // "[object Object]"

// valueOf
person.valueOf();  // { name: "John" }

// isPrototypeOf
Object.prototype.isPrototypeOf(person);  // true
```

#### Adding Methods to Built-in Prototypes
```javascript
// Extending Array.prototype
Array.prototype.first = function() {
  return this[0];
};

[1, 2, 3].first();  // 1
```

**Interview Tips:**
- Extending built-in prototypes is generally discouraged (can cause conflicts)
- If you do extend them, use feature detection to avoid overwriting
- Consider using utility functions or wrapper classes instead

#### Prototype Pollution
```javascript
// Vulnerable code
function merge(target, source) {
  for (let key in source) {
    if (key in source) {
      target[key] = source[key];
    }
  }
  return target;
}

// Attack
merge({}, { __proto__: { malicious: true } });
// Now all objects have a 'malicious' property!
```

**Prevention:**
```javascript
function safeMerge(target, source) {
  for (let key in source) {
    if (key === '__proto__' || key === 'constructor') continue;
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}
```

### Modern Alternatives to Prototypes

#### Object Composition
```javascript
// Creating behavior objects
const hasName = (name) => ({
  getName: () => name,
  setName: (newName) => name = newName
});

const canSpeak = () => ({
  speak: (phrase) => console.log(phrase)
});

// Composing objects
function createPerson(name) {
  return {
    ...hasName(name),
    ...canSpeak()
  };
}

const john = createPerson("John");
john.getName();  // "John"
john.speak("Hello!");  // "Hello!"
```

**Advantages:**
- More flexible than inheritance
- Avoids deep inheritance chains
- "Favor composition over inheritance"

#### Class Fields and Private Fields
```javascript
class Person {
  // Public field
  species = "Human";
  
  // Private field (ES2022)
  #age = 0;
  
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  
  getAge() {
    return this.#age;
  }
  
  #privateMethod() {
    return "This is private";
  }
}

const john = new Person("John", 30);
console.log(john.species);  // "Human"
console.log(john.getAge());  // 30
console.log(john.#age);  // SyntaxError: Private field
```

**Interview Tips:**
- Private fields provide true encapsulation
- Not available in older browsers
- Transpilers like Babel can help with compatibility
