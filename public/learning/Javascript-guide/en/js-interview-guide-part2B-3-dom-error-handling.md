# JavaScript Interview Guide: Part 2B-3 - DOM Manipulation and Error Handling

## DOM Manipulation

DOM (Document Object Model) manipulation is a crucial skill for front-end JavaScript interviews. It involves interacting with HTML elements programmatically.

### Selecting Elements

#### Basic Selection Methods
```javascript
// By ID
const mainHeader = document.getElementById('main-header');

// By class name (returns HTMLCollection)
const navItems = document.getElementsByClassName('nav-item');

// By tag name (returns HTMLCollection)
const paragraphs = document.getElementsByTagName('p');

// By CSS selector (returns first match)
const firstButton = document.querySelector('.btn-primary');

// By CSS selector (returns all matches as NodeList)
const allButtons = document.querySelectorAll('.btn');
```

#### Differences Between Selection Methods

**HTMLCollection vs NodeList:**
```javascript
// HTMLCollection is live (automatically updates)
const paragraphs = document.getElementsByTagName('p');

// NodeList is static (doesn't update automatically)
const paragraphsNodeList = document.querySelectorAll('p');

// Add a new paragraph
const newP = document.createElement('p');
document.body.appendChild(newP);

console.log(paragraphs.length);          // Updated count
console.log(paragraphsNodeList.length);  // Original count
```

**Converting Collections to Arrays:**
```javascript
const buttons = document.getElementsByClassName('btn');
const buttonsArray = Array.from(buttons);
// or
const buttonsArray2 = [...buttons];

// Now you can use array methods
buttonsArray.forEach(button => {
  button.classList.add('highlighted');
});
```

### Traversing the DOM

#### Parent, Children, and Siblings
```javascript
const listItem = document.querySelector('li');

// Parent node
const list = listItem.parentNode;  // or parentElement

// Children
const children = list.children;  // HTMLCollection of child elements
const firstChild = list.firstElementChild;
const lastChild = list.lastElementChild;

// Siblings
const nextSibling = listItem.nextElementSibling;
const prevSibling = listItem.previousElementSibling;
```

#### Traversing Text Nodes
```javascript
const paragraph = document.querySelector('p');

// Including text nodes
const firstChild = paragraph.firstChild;  // Might be a text node
const nextSibling = paragraph.nextSibling;  // Might be a text node

// Element nodes only
const firstElementChild = paragraph.firstElementChild;
const nextElementSibling = paragraph.nextElementSibling;
```

### Creating and Modifying Elements

#### Creating Elements
```javascript
// Create new element
const newDiv = document.createElement('div');

// Create text node
const text = document.createTextNode('Hello, world!');

// Create element with HTML content
const template = document.createElement('template');
template.innerHTML = `
  <article class="post">
    <h2>New Post</h2>
    <p>This is a new post content.</p>
  </article>
`;
const newPost = template.content.firstElementChild;
```

#### Adding Elements to the DOM
```javascript
// Append at the end of parent's children
parentElement.appendChild(newElement);

// Insert before a specific child
parentElement.insertBefore(newElement, referenceElement);

// Modern insertion methods
parentElement.append(element1, element2, 'text');  // Multiple nodes/strings at end
parentElement.prepend(element1, element2);         // Multiple nodes at beginning
referenceElement.before(newElement);               // Before reference element
referenceElement.after(newElement);                // After reference element
```

#### Removing Elements
```javascript
// Remove child from parent
parentElement.removeChild(childElement);

// Self-remove (modern)
element.remove();
```

#### Replacing Elements
```javascript
// Replace child
parentElement.replaceChild(newElement, oldElement);

// Self-replace (modern)
oldElement.replaceWith(newElement);
```

### Manipulating Element Content and Attributes

#### Content Manipulation
```javascript
// Get/set text content
const text = element.textContent;
element.textContent = 'New text content';

// Get/set HTML content
const html = element.innerHTML;
element.innerHTML = '<strong>New</strong> HTML content';

// Get/set HTML including the element itself
const outerHtml = element.outerHTML;
element.outerHTML = '<div class="new">Replaced element</div>';
```

#### Attribute Manipulation
```javascript
// Get, set, check, and remove attributes
const value = element.getAttribute('data-id');
element.setAttribute('data-id', '123');
const hasAttr = element.hasAttribute('disabled');
element.removeAttribute('disabled');

// Direct property access for standard attributes
element.id = 'new-id';
element.className = 'btn btn-primary';
element.disabled = true;
```

#### Data Attributes
```javascript
// Using dataset property
const userId = element.dataset.userId;  // Gets data-user-id attribute
element.dataset.userId = '456';         // Sets data-user-id attribute
```

### Styling Elements

#### Inline Styles
```javascript
// Get/set individual styles
const color = element.style.color;
element.style.color = 'blue';
element.style.backgroundColor = '#f0f0f0';
element.style.fontSize = '16px';

// Multiple styles at once
Object.assign(element.style, {
  color: 'white',
  backgroundColor: 'black',
  padding: '10px'
});
```

#### CSS Classes
```javascript
// Add, remove, toggle, and check classes
element.classList.add('active', 'visible');
element.classList.remove('disabled');
element.classList.toggle('highlighted');  // Add if missing, remove if present
const hasClass = element.classList.contains('active');

// Replace all classes
element.className = 'btn btn-primary';
```

#### Getting Computed Styles
```javascript
const styles = window.getComputedStyle(element);
const fontSize = styles.fontSize;
const width = parseFloat(styles.width);  // Convert to number
```

### Event Handling

#### Adding and Removing Event Listeners
```javascript
// Basic event listener
element.addEventListener('click', function(event) {
  console.log('Element clicked!', event);
});

// With named function (easier to remove)
function handleClick(event) {
  console.log('Element clicked!', event);
}

element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// One-time event listener
element.addEventListener('click', function(event) {
  console.log('This will only run once');
  // Clean up
  event.currentTarget.removeEventListener(event.type, arguments.callee);
}, { once: true });  // Modern way to specify one-time
```

#### Event Object Properties
```javascript
element.addEventListener('click', function(event) {
  // Event properties
  console.log(event.type);           // 'click'
  console.log(event.target);         // Element that triggered the event
  console.log(event.currentTarget);  // Element that the listener is attached to
  console.log(event.clientX, event.clientY);  // Mouse coordinates
  
  // Event methods
  event.preventDefault();   // Prevent default behavior
  event.stopPropagation();  // Stop bubbling to parent elements
});
```

#### Event Delegation
```javascript
// Instead of adding listeners to each button
document.querySelector('.button-container').addEventListener('click', function(event) {
  // Check if clicked element is a button
  if (event.target.matches('button')) {
    console.log('Button clicked:', event.target.textContent);
  }
});
```

#### Common Events
```javascript
// Mouse events
element.addEventListener('click', handleClick);
element.addEventListener('dblclick', handleDoubleClick);
element.addEventListener('mousedown', handleMouseDown);
element.addEventListener('mouseup', handleMouseUp);
element.addEventListener('mouseover', handleMouseOver);
element.addEventListener('mouseout', handleMouseOut);
element.addEventListener('mousemove', handleMouseMove);

// Keyboard events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keypress', handleKeyPress);

// Form events
form.addEventListener('submit', handleSubmit);
input.addEventListener('focus', handleFocus);
input.addEventListener('blur', handleBlur);
input.addEventListener('change', handleChange);
input.addEventListener('input', handleInput);

// Document/Window events
window.addEventListener('load', handleLoad);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
window.addEventListener('resize', handleResize);
window.addEventListener('scroll', handleScroll);
```

### Creating/Modifying Elements

#### Document Fragments
```javascript
// Efficient way to build DOM structures
function createItemList(items) {
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    fragment.appendChild(li);
  });
  
  // Only one DOM update
  document.querySelector('ul').appendChild(fragment);
}
```

#### Cloning Elements
```javascript
// Clone without events and children
const shallowClone = element.cloneNode(false);

// Deep clone with all descendants
const deepClone = element.cloneNode(true);
```

**Interview Tips:**
- Direct DOM manipulation can be slow; batch changes when possible
- Use document fragments for multiple insertions
- Event delegation improves performance for many similar elements
- Know the difference between properties and attributes
- Modern browsers have better performance with classList than className
- Understand event bubbling and capturing phases

## Error Handling

Error handling is essential for writing robust JavaScript applications and is frequently tested in interviews.

### try/catch/finally

The basic structure for handling exceptions in JavaScript.

```javascript
try {
  // Code that might throw an error
  const data = JSON.parse(invalidJson);
  console.log(data);
} catch (error) {
  // Handle the error
  console.error('Failed to parse JSON:', error.message);
} finally {
  // Always executes, regardless of error
  console.log('Cleanup operations');
}
```

#### Selective Catching
```javascript
try {
  // Code that might throw different types of errors
  if (Math.random() > 0.5) {
    throw new TypeError('Type error occurred');
  } else {
    throw new ReferenceError('Reference error occurred');
  }
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Type error:', error.message);
  } else if (error instanceof ReferenceError) {
    console.error('Reference error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

#### Nested try/catch
```javascript
try {
  try {
    throw new Error('Inner error');
  } catch (innerError) {
    console.error('Inner catch:', innerError.message);
    throw innerError;  // Re-throw to outer catch
  }
} catch (outerError) {
  console.error('Outer catch:', outerError.message);
}
```

### Error Objects

JavaScript has built-in error types that provide useful information about exceptions.

#### Built-in Error Types
```javascript
// Error: Base type for all errors
const genericError = new Error('Something went wrong');

// TypeError: When a value is not of the expected type
const typeError = new TypeError('Expected string, got number');

// ReferenceError: When referencing an undeclared variable
const refError = new ReferenceError('x is not defined');

// SyntaxError: When parsing invalid JavaScript
const syntaxError = new SyntaxError('Unexpected token');

// RangeError: When a value is not in the allowed range
const rangeError = new RangeError('Invalid array length');

// URIError: When encodeURI() or decodeURI() are misused
const uriError = new URIError('Invalid URI');

// EvalError: Rare, occurs with eval() function
const evalError = new EvalError('eval error');
```

#### Error Properties
```javascript
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name);     // "Error"
  console.log(error.message);  // "Something went wrong"
  console.log(error.stack);    // Stack trace as string
}
```

### Custom Errors

Creating custom error types for application-specific exceptions.

```javascript
// Basic custom error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Usage
try {
  if (!isValid) {
    throw new ValidationError('Invalid input data');
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

#### Custom Error with Additional Properties
```javascript
class ApiError extends Error {
  constructor(message, statusCode, endpoint) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
    this.timestamp = new Date();
  }
  
  getErrorInfo() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      endpoint: this.endpoint,
      timestamp: this.timestamp
    };
  }
}

// Usage
try {
  throw new ApiError('Failed to fetch data', 404, '/api/users');
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.getErrorInfo());
    // Handle based on status code
    if (error.statusCode === 404) {
      showNotFoundMessage();
    }
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Error Handling Patterns

#### Async Error Handling

**Promises:**
```javascript
fetchData()
  .then(data => {
    // Success case
    processData(data);
  })
  .catch(error => {
    // Error case
    console.error('Error fetching data:', error);
    showErrorMessage();
  })
  .finally(() => {
    // Always runs
    hideLoadingIndicator();
  });
```

**Async/Await:**
```javascript
async function getData() {
  try {
    const data = await fetchData();
    return processData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    showErrorMessage();
    // Return fallback data or re-throw
    return defaultData;
  } finally {
    hideLoadingIndicator();
  }
}
```

#### Error Boundaries (React-like Pattern)
```javascript
class ErrorBoundary {
  constructor(fallback) {
    this.fallback = fallback;
  }
  
  execute(fn) {
    try {
      return fn();
    } catch (error) {
      console.error('Error caught by boundary:', error);
      return this.fallback;
    }
  }
}

// Usage
const boundary = new ErrorBoundary({ name: 'Default User' });
const user = boundary.execute(() => getUserData());
```

#### Global Error Handling
```javascript
// For uncaught exceptions
window.addEventListener('error', function(event) {
  console.error('Global error:', event.error);
  showErrorNotification('An unexpected error occurred');
  // Prevent default browser error handling
  event.preventDefault();
});

// For unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  showErrorNotification('An async operation failed');
  // Prevent default handling
  event.preventDefault();
});
```

### Best Practices

#### Fail Fast
```javascript
function processUserData(user) {
  // Validate early
  if (!user) {
    throw new Error('User data is required');
  }
  
  if (!user.id) {
    throw new TypeError('User ID is required');
  }
  
  // Process valid data
  // ...
}
```

#### Graceful Degradation
```javascript
function fetchUserPreferences() {
  try {
    const preferences = JSON.parse(localStorage.getItem('userPreferences'));
    return preferences || defaultPreferences;
  } catch (error) {
    console.warn('Failed to load preferences, using defaults:', error);
    return defaultPreferences;
  }
}
```

#### Error Logging and Monitoring
```javascript
function logError(error, context = {}) {
  // Add metadata
  const errorInfo = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context
  };
  
  // Log locally
  console.error('Application error:', errorInfo);
  
  // Send to server
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorInfo)
  }).catch(e => {
    console.error('Failed to send error log:', e);
  });
}

// Usage
try {
  riskyOperation();
} catch (error) {
  logError(error, { operation: 'riskyOperation', userId: currentUser.id });
  showUserFriendlyError();
}
```

**Interview Tips:**
- Always handle potential errors in asynchronous code
- Use specific error types to differentiate between error conditions
- Know when to recover vs. when to propagate errors
- Avoid empty catch blocks unless you have a good reason
- Consider the user experience when handling errors
- Log errors with enough context to debug later
