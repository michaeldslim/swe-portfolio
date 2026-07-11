# Prototypes & Inheritance

## Prototypes
Every JavaScript object has a prototype. When a property is accessed, JavaScript looks up the prototype chain until it finds the property or reaches `null`.

```javascript
// Constructor function
function Animal(name) {
    this.name = name;
}

// Add method to prototype
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

// Create instance
const animal = new Animal('Animal');
animal.speak(); // "Animal makes a noise."

};

const alice = new Person('Alice', 30);
alice.greet(); // "Hello, my name is Alice and I'm 30 years old"
console.log(Person.describe()); // "A person has a name and an age"
```

### The `new` Keyword
When you use `new` with a function, four things happen:
1. A new empty object is created (`{}`)
2. The constructor's `this` is bound to the new object
3. The new object's `[[Prototype]]` is linked to the constructor's `prototype`
4. If the function doesn't return an object, `this` is returned

## ES6 Classes

### Basic Class Syntax

```javascript
class Person {
    // Constructor (called with 'new')
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this._id = Math.random().toString(36).substr(2, 9);
    }
    
    // Instance method
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    // Getter
    get id() {
        return this._id;
    }
    
    // Setter
    set id(value) {
        console.log('ID cannot be changed');
    }
    
    // Static method (available on the class, not instances)
    static describe() {
        return 'A person has a name and an age';
    }
}

const bob = new Person('Bob', 25);
console.log(bob.greet()); // "Hello, I'm Bob"
console.log(Person.describe()); // "A person has a name and an age"
```

### Inheritance with `extends`

```javascript
class Animal {
    constructor(name) {
        this.name = name;
        this.energy = 100;
    }
    
    eat(amount) {
        this.energy += amount;
        console.log(`${this.name} is eating. Energy: ${this.energy}`);
    }
    
    sleep(length) {
        this.energy += length;
        console.log(`${this.name} is sleeping. Energy: ${this.energy}`);
    }
    
    play(length) {
        this.energy -= length;
        console.log(`${this.name} is playing. Energy: ${this.energy}`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        // Call the parent class constructor
        super(name);
        this.breed = breed;
    }
    
    // Override parent method
    play(length) {
        super.play(length * 0.8); // Dogs get less tired when playing
        console.log('Woof! Woof!');
    }
    
    // New method specific to Dog
    bark() {
        console.log('Woof! Woof!');
    }
    
    // Static method
    static info() {
        return 'Dogs are loyal animals';
    }
}

const rex = new Dog('Rex', 'German Shepherd');
rex.eat(20);    // "Rex is eating. Energy: 120"
rex.play(30);   // "Rex is playing. Energy: 96" (reduced energy consumption)
                // "Woof! Woof!"
console.log(Dog.info()); // "Dogs are loyal animals"
```

## Advanced Prototype Patterns

### Mixins

```javascript
// Mixins are a way to add functionality to classes without inheritance
const canSwim = {
    swim() {
        return `${this.name} can swim`;
    }
};

const canFly = {
    fly() {
        return `${this.name} can fly`;
    }
};

class Bird {
    constructor(name) {
        this.name = name;
    }
}

// Assign mixins to Bird prototype
Object.assign(Bird.prototype, canFly, canSwim);

const duck = new Bird('Duck');
console.log(duck.fly());  // "Duck can fly"
console.log(duck.swim()); // "Duck can swim"
```

### Composition Over Inheritance

```javascript
// Instead of deep inheritance chains, compose objects with the functionality you need
const canEat = {
    eat() {
        console.log(`${this.name} is eating`);
    }
};

const canSleep = {
    sleep() {
        console.log(`${this.name} is sleeping`);
    }
};

const canCode = {
    code() {
        console.log(`${this.name} is coding`);
    }
};

function createDeveloper(name) {
    const developer = { name };
    
    // Assign all the behaviors
    return Object.assign(
        developer,
        canEat,
        canSleep,
        canCode
    );
}

const dev = createDeveloper('Alice');
dev.eat();  // "Alice is eating"
dev.code(); // "Alice is coding"
```

## Understanding `instanceof` and `Object.create()`

### `instanceof` Operator

```javascript
class Animal {}
class Dog extends Animal {}

const myDog = new Dog();
console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true
console.log(myDog instanceof Object); // true
```

### `Object.create()`

```javascript
const animal = {
    init(name) {
        this.name = name;
        return this;
    },
    speak() {
        return `${this.name} makes a noise`;
    }
};

// Create a new object with animal as prototype
const dog = Object.create(animal).init('Rex');
console.log(dog.speak()); // "Rex makes a noise"
console.log(animal.isPrototypeOf(dog)); // true
```

## Performance Considerations

1. **Method Definition**: Define methods on the prototype instead of in the constructor to save memory.
2. **Property Lookup**: Long prototype chains can slow down property lookups.
3. **Object.create() vs new**: `Object.create()` can be slower than constructor functions for creating many objects.
4. **ES6 Classes**: Modern JavaScript engines optimize ES6 class syntax well.

## Common Interview Questions

1. **What's the difference between `__proto__` and `prototype`?**
   - `prototype` is a property of constructor functions that becomes the `[[Prototype]]` of instances created with `new`.
   - `__proto__` is a getter/setter for an object's `[[Prototype]]`.

2. **How does prototypal inheritance differ from classical inheritance?**
   - Classical inheritance is class-based and creates a parent-child relationship between classes.
   - Prototypal inheritance is object-based, where objects inherit directly from other objects.

3. **What is the `super` keyword?**
   - `super` is used in classes to call the constructor or methods of the parent class.

4. **How would you implement inheritance without using `class` syntax?**
   ```javascript
   function Animal(name) {
       this.name = name;
   }
   
   Animal.prototype.speak = function() {
       return `${this.name} makes a noise`;
   };
   
   function Dog(name, breed) {
       Animal.call(this, name);
       this.breed = breed;
   }
   
   // Set up the prototype chain
   Dog.prototype = Object.create(Animal.prototype);
   Dog.prototype.constructor = Dog;
   
   Dog.prototype.bark = function() {
       return 'Woof!';
   };
   ```

## Best Practices

1. **Use ES6 Classes**: They provide a cleaner syntax and better optimization in modern engines.
2. **Favor Composition Over Inheritance**: Use object composition to build complex objects from simple ones.
3. **Don't Modify Built-in Prototypes**: Extending native prototypes can cause conflicts and hard-to-debug issues.
4. **Use `Object.create()` for Prototypal Inheritance**: It's more explicit than the `__proto__` property.
5. **Understand the Prototype Chain**: Knowing how JavaScript looks up properties is crucial for debugging and performance.
6. **Use `hasOwnProperty`**: To check if a property exists on the object itself (not in the prototype chain).
7. **Consider Using Modules**: For better code organization and to avoid global scope pollution.
