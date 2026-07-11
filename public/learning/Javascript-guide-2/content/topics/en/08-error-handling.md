# Comprehensive Error Handling in JavaScript

## Table of Contents
1. [Error Objects](#error-objects)
2. [Try/Catch/Finally](#trycatchfinally)
3. [Custom Errors](#custom-errors)
4. [Async Error Handling](#async-error-handling)
5. [Global Error Handling](#global-error-handling)
6. [Best Practices](#best-practices)
7. [Common Pitfalls](#common-pitfalls)

## Error Objects

JavaScript provides several built-in error constructors:

```javascript
// Standard Error
const error = new Error('Something went wrong');

// Built-in error types
const typeError = new TypeError('Expected a number');
const rangeError = new RangeError('Value out of range');
const referenceError = new ReferenceError('Variable is not defined');

// Checking error types
if (error instanceof TypeError) {
    // Handle type error
}
```

## Try/Catch/Finally

### Basic Usage
```javascript
try {
    // Code that might throw an error
    const result = riskyOperation();
    console.log('Result:', result);
} catch (error) {
    // Handle the error
    console.error('Error:', error.message);
    
    // Re-throw if needed
    if (error instanceof NetworkError) {
        throw new RetryableError('Network operation failed', { cause: error });
    }
} finally {
    // Always execute cleanup code
    console.log('Cleanup complete');
}
```

## Custom Errors

### Creating Custom Error Classes
```javascript
class AppError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
}

// Usage
class ValidationError extends AppError {
    constructor(field, message) {
        super(`Validation failed for ${field}: ${message}`, 'VALIDATION_ERROR');
        this.field = field;
    }
}

// Throwing custom errors
function validateUser(user) {
    if (!user.name) {
        throw new ValidationError('name', 'Name is required');
    }
}
```

## Async Error Handling

### Promises
```javascript
fetch('https://api.example.com/data')
    .then(handleResponse)
    .catch(error => {
        if (error instanceof NetworkError) {
            console.error('Network error:', error.message);
            return retryOperation();
        }
        throw error; // Re-throw unhandled errors
    });
```

### Async/Await
```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; // Re-throw for the caller to handle
    }
}
```

## Global Error Handling

### Browser
```javascript
// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', { message, source, lineno, error });
    return true; // Prevent default browser error handling
};

// Unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled rejection:', event.reason);
    event.preventDefault();
});
```

### Node.js
```javascript
// Uncaught exceptions
process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

## Best Practices

1. **Be Specific**:
   - Use specific error types
   - Include relevant context in error messages
   - Use error codes for programmatic handling

2. **Handle Gracefully**:
   - Don't swallow errors silently
   - Provide user-friendly messages
   - Log errors with sufficient context

3. **Clean Up**:
   - Use `finally` blocks for cleanup
   - Handle promise rejections
   - Close resources properly

4. **Log Effectively**:
   - Include stack traces
   - Add relevant context
   - Don't log sensitive information

## Common Pitfalls

1. **Swallowing Errors**:
   ```javascript
   // Bad
   try { riskyOp(); } catch (e) { /* noop */ }
   
   // Good
   try { riskyOp(); } 
   catch (error) { console.error('Failed:', error); }
   ```

2. **Overly Broad Catches**:
   ```javascript
   // Bad
   try { /* ... */ } 
   catch (e) { /* Handles all errors the same */ }
   
   // Good
   try { /* ... */ } 
   catch (error) {
       if (error instanceof NetworkError) { /* ... */ }
       else { throw error; }
   }
   ```

3. **Unhandled Promise Rejections**:
   ```javascript
   // Bad
   fetchData().then(processData);
   
   // Good
   fetchData()
       .then(processData)
       .catch(error => console.error('Error:', error));
   ```

## Best Practices
1. Always use specific error types when possible
2. Include meaningful error messages
3. Don't swallow errors silently
4. Clean up resources in `finally` blocks
5. Log errors for debugging
6. Consider user experience when displaying errors
