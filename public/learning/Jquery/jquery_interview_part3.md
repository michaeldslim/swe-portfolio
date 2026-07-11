# jQuery Interview Guide - Part 3: Event Handling

---

## Event Basics

Events are actions that can be detected by JavaScript, such as clicks, mouse movements, key presses, etc. jQuery provides simplified methods to handle these events.

### Basic Event Syntax

```javascript
// Basic event binding
$(selector).eventMethod(function() {
    // Event handler code
});

// Using .on() method (recommended)
$(selector).on('event', function() {
    // Event handler code
});
```

### Common Event Types

```javascript
// Mouse events
$('#button').click(function() { /* click handler */ });
$('#element').dblclick(function() { /* double click */ });
$('#element').mouseenter(function() { /* mouse enter */ });
$('#element').mouseleave(function() { /* mouse leave */ });
$('#element').hover(
    function() { /* mouse enter */ },
    function() { /* mouse leave */ }
);

// Keyboard events
$('#input').keydown(function() { /* key pressed down */ });
$('#input').keyup(function() { /* key released */ });
$('#input').keypress(function() { /* key pressed */ });

// Form events
$('#form').submit(function() { /* form submitted */ });
$('#input').focus(function() { /* element focused */ });
$('#input').blur(function() { /* element lost focus */ });
$('#input').change(function() { /* value changed */ });

// Window events
$(window).resize(function() { /* window resized */ });
$(window).scroll(function() { /* window scrolled */ });
$(document).ready(function() { /* DOM ready */ });
```

---

## Event Methods

### Basic Event Methods

```javascript
// Click event
$('#button').click(function() {
    alert('Button clicked!');
});

// Multiple event handlers
$('#button').click(function() {
    console.log('First handler');
}).click(function() {
    console.log('Second handler');
});

// One-time event
$('#button').one('click', function() {
    alert('This will only run once');
});

// Trigger events programmatically
$('#button').trigger('click');
$('#button').click(); // Shorthand for trigger
```

### The .on() Method (Recommended)

```javascript
// Basic usage
$('#button').on('click', function() {
    alert('Clicked!');
});

// Multiple events
$('#element').on('mouseenter mouseleave', function(e) {
    console.log('Event type:', e.type);
});

// Multiple events with different handlers
$('#element').on({
    mouseenter: function() {
        $(this).addClass('hover');
    },
    mouseleave: function() {
        $(this).removeClass('hover');
    },
    click: function() {
        $(this).toggleClass('active');
    }
});

// Event with data
$('#button').on('click', {name: 'John', age: 30}, function(e) {
    console.log('Name:', e.data.name);
    console.log('Age:', e.data.age);
});
```

### The .off() Method

```javascript
// Remove all event handlers
$('#button').off();

// Remove specific event type
$('#button').off('click');

// Remove specific handler
function myHandler() {
    alert('Handler');
}
$('#button').on('click', myHandler);
$('#button').off('click', myHandler);

// Remove events with namespace
$('#button').on('click.myNamespace', function() {});
$('#button').off('click.myNamespace');
```

### Practical Example:

```html
<div class="interactive-box">
    <h3>Interactive Element</h3>
    <button id="toggle-btn">Toggle</button>
    <button id="reset-btn">Reset</button>
</div>
```

```javascript
$(document).ready(function() {
    var $box = $('.interactive-box');
    var originalBg = $box.css('background-color');
    
    // Hover effects
    $box.on({
        mouseenter: function() {
            $(this).css('background-color', '#f0f0f0');
        },
        mouseleave: function() {
            if (!$(this).hasClass('active')) {
                $(this).css('background-color', originalBg);
            }
        }
    });
    
    // Toggle functionality
    $('#toggle-btn').on('click', function() {
        $box.toggleClass('active');
        if ($box.hasClass('active')) {
            $box.css('background-color', '#ffeb3b');
            $(this).text('Deactivate');
        } else {
            $box.css('background-color', originalBg);
            $(this).text('Toggle');
        }
    });
    
    // Reset functionality
    $('#reset-btn').one('click', function() {
        $box.removeClass('active')
            .css('background-color', originalBg);
        $('#toggle-btn').text('Toggle');
        $(this).text('Reset Used');
    });
});
```

---

## Event Delegation

Event delegation allows you to handle events for elements that don't exist yet or are dynamically added to the DOM.

### Why Event Delegation?

```javascript
// This won't work for dynamically added buttons
$('.dynamic-btn').click(function() {
    alert('Clicked!');
});

// Add button dynamically
$('body').append('<button class="dynamic-btn">New Button</button>');
// The new button won't have the click handler!
```

### Using Event Delegation

```javascript
// Delegate to document (works but not optimal)
$(document).on('click', '.dynamic-btn', function() {
    alert('Clicked!');
});

// Delegate to closest static parent (better performance)
$('#container').on('click', '.dynamic-btn', function() {
    alert('Clicked!');
});

// Multiple delegated events
$('#container').on('click', '.btn', function() {
    console.log('Button clicked');
}).on('mouseover', '.btn', function() {
    $(this).addClass('hover');
}).on('mouseout', '.btn', function() {
    $(this).removeClass('hover');
});
```

### Practical Delegation Example:

```html
<div id="todo-container">
    <input type="text" id="new-todo" placeholder="Add new todo">
    <button id="add-todo">Add</button>
    <ul id="todo-list">
        <!-- Dynamic todos will be added here -->
    </ul>
</div>
```

```javascript
$(document).ready(function() {
    var todoCounter = 0;
    
    // Add new todo
    $('#add-todo').on('click', function() {
        var todoText = $('#new-todo').val().trim();
        if (todoText) {
            todoCounter++;
            var todoHtml = `
                <li data-id="${todoCounter}">
                    <span class="todo-text">${todoText}</span>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="complete-btn">Complete</button>
                </li>
            `;
            $('#todo-list').append(todoHtml);
            $('#new-todo').val('');
        }
    });
    
    // Event delegation for dynamic elements
    $('#todo-list').on('click', '.delete-btn', function() {
        $(this).closest('li').fadeOut(300, function() {
            $(this).remove();
        });
    });
    
    $('#todo-list').on('click', '.complete-btn', function() {
        var $li = $(this).closest('li');
        $li.toggleClass('completed');
        $(this).text($li.hasClass('completed') ? 'Undo' : 'Complete');
    });
    
    $('#todo-list').on('click', '.edit-btn', function() {
        var $span = $(this).siblings('.todo-text');
        var currentText = $span.text();
        var $input = $('<input type="text" class="edit-input">').val(currentText);
        
        $span.hide().after($input);
        $(this).text('Save').addClass('save-btn').removeClass('edit-btn');
        
        $input.focus();
    });
    
    $('#todo-list').on('click', '.save-btn', function() {
        var $input = $(this).siblings('.edit-input');
        var $span = $(this).siblings('.todo-text');
        var newText = $input.val().trim();
        
        if (newText) {
            $span.text(newText).show();
            $input.remove();
            $(this).text('Edit').addClass('edit-btn').removeClass('save-btn');
        }
    });
    
    // Enter key support for adding todos
    $('#new-todo').on('keypress', function(e) {
        if (e.which === 13) {
            $('#add-todo').click();
        }
    });
});
```

---

## Event Object

The event object contains information about the event that occurred.

### Event Object Properties

```javascript
$('#element').on('click', function(event) {
    console.log('Event type:', event.type);           // 'click'
    console.log('Target element:', event.target);     // The clicked element
    console.log('Current target:', event.currentTarget); // Element with handler
    console.log('Mouse X:', event.pageX);             // Mouse X coordinate
    console.log('Mouse Y:', event.pageY);             // Mouse Y coordinate
    console.log('Key code:', event.which);            // Key code (for keyboard events)
    console.log('Timestamp:', event.timeStamp);       // When event occurred
});
```

### Event Methods

```javascript
$('#link').on('click', function(e) {
    // Prevent default action (e.g., following a link)
    e.preventDefault();
    
    // Stop event from bubbling up
    e.stopPropagation();
    
    // Stop other handlers on same element
    e.stopImmediatePropagation();
    
    console.log('Link clicked but default prevented');
});

// Form submission example
$('#form').on('submit', function(e) {
    e.preventDefault(); // Don't submit the form
    
    // Custom form handling
    var formData = $(this).serialize();
    console.log('Form data:', formData);
    
    // Ajax submission would go here
});
```

### Keyboard Event Handling

```javascript
$('#input').on('keydown', function(e) {
    console.log('Key pressed:', e.which);
    
    // Check for specific keys
    switch(e.which) {
        case 13: // Enter
            console.log('Enter pressed');
            break;
        case 27: // Escape
            console.log('Escape pressed');
            $(this).blur();
            break;
        case 9: // Tab
            console.log('Tab pressed');
            break;
    }
    
    // Check for modifier keys
    if (e.ctrlKey) console.log('Ctrl key held');
    if (e.shiftKey) console.log('Shift key held');
    if (e.altKey) console.log('Alt key held');
});

// Practical keyboard shortcuts
$(document).on('keydown', function(e) {
    // Ctrl+S to save
    if (e.ctrlKey && e.which === 83) {
        e.preventDefault();
        console.log('Save shortcut triggered');
        // Implement save functionality
    }
    
    // Escape to close modals
    if (e.which === 27) {
        $('.modal').hide();
    }
});
```

---

## Custom Events

You can create and trigger custom events in jQuery.

### Creating Custom Events

```javascript
// Trigger custom event
$('#element').trigger('customEvent');

// Trigger custom event with data
$('#element').trigger('customEvent', ['data1', 'data2']);

// Listen for custom event
$('#element').on('customEvent', function(e, data1, data2) {
    console.log('Custom event triggered with:', data1, data2);
});
```

### Practical Custom Events Example:

```javascript
// Shopping cart component
var ShoppingCart = {
    items: [],
    
    addItem: function(item) {
        this.items.push(item);
        $(document).trigger('cart:itemAdded', [item, this.items.length]);
    },
    
    removeItem: function(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        $(document).trigger('cart:itemRemoved', [itemId, this.items.length]);
    },
    
    clear: function() {
        this.items = [];
        $(document).trigger('cart:cleared');
    }
};

// Listen for cart events
$(document).on('cart:itemAdded', function(e, item, totalItems) {
    $('#cart-count').text(totalItems);
    $('#cart-status').text(`Added ${item.name} to cart`);
});

$(document).on('cart:itemRemoved', function(e, itemId, totalItems) {
    $('#cart-count').text(totalItems);
    $('#cart-status').text('Item removed from cart');
});

$(document).on('cart:cleared', function() {
    $('#cart-count').text('0');
    $('#cart-status').text('Cart cleared');
});

// Usage
$('.add-to-cart').on('click', function() {
    var item = {
        id: $(this).data('product-id'),
        name: $(this).data('product-name'),
        price: $(this).data('product-price')
    };
    ShoppingCart.addItem(item);
});
```

---

## Form Events

Form events are crucial for creating interactive forms.

### Form Event Types

```javascript
// Form submission
$('#myForm').on('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
});

// Input focus and blur
$('#input').on('focus', function() {
    $(this).addClass('focused');
}).on('blur', function() {
    $(this).removeClass('focused');
});

// Input value change
$('#input').on('change', function() {
    console.log('Value changed to:', $(this).val());
});

// Input while typing (input event)
$('#input').on('input', function() {
    console.log('Current value:', $(this).val());
});

// Select dropdown change
$('#select').on('change', function() {
    console.log('Selected:', $(this).val());
});

// Checkbox/radio change
$('input[type="checkbox"]').on('change', function() {
    console.log('Checkbox checked:', $(this).is(':checked'));
});
```

### Advanced Form Handling

```html
<form id="registration-form">
    <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <span class="error-message"></span>
    </div>
    
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message"></span>
    </div>
    
    <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <span class="error-message"></span>
    </div>
    
    <div class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" required>
        <span class="error-message"></span>
    </div>
    
    <button type="submit">Register</button>
</form>
```

```javascript
$(document).ready(function() {
    var $form = $('#registration-form');
    var validators = {
        username: function(value) {
            return value.length >= 3 ? '' : 'Username must be at least 3 characters';
        },
        email: function(value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Please enter a valid email';
        },
        password: function(value) {
            return value.length >= 6 ? '' : 'Password must be at least 6 characters';
        },
        'confirm-password': function(value) {
            var password = $('#password').val();
            return value === password ? '' : 'Passwords do not match';
        }
    };
    
    // Real-time validation
    $form.find('input').on('blur', function() {
        var $input = $(this);
        var fieldName = $input.attr('name');
        var value = $input.val();
        var $errorSpan = $input.siblings('.error-message');
        
        if (validators[fieldName]) {
            var errorMessage = validators[fieldName](value);
            $errorSpan.text(errorMessage);
            $input.toggleClass('error', !!errorMessage);
        }
    });
    
    // Form submission
    $form.on('submit', function(e) {
        e.preventDefault();
        
        var isValid = true;
        
        // Validate all fields
        $form.find('input').each(function() {
            var $input = $(this);
            var fieldName = $input.attr('name');
            var value = $input.val();
            var $errorSpan = $input.siblings('.error-message');
            
            if (validators[fieldName]) {
                var errorMessage = validators[fieldName](value);
                $errorSpan.text(errorMessage);
                $input.toggleClass('error', !!errorMessage);
                
                if (errorMessage) {
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            console.log('Form is valid, submitting...');
            // Submit form data via AJAX
            var formData = $form.serialize();
            console.log('Form data:', formData);
        } else {
            console.log('Form has errors');
        }
    });
});
```

---

## Common Interview Questions

### Q1: What's the difference between .click() and .on('click')?

**Answer:**
- `.click()`: Shorthand method, only binds to existing elements
- `.on('click')`: More flexible, supports event delegation for dynamic elements

```javascript
// Only works for existing elements
$('.button').click(function() { /* handler */ });

// Works for existing and future elements (with delegation)
$(document).on('click', '.button', function() { /* handler */ });
```

### Q2: How do you prevent event bubbling?

**Answer:** Use `event.stopPropagation()`:

```javascript
$('#child').on('click', function(e) {
    e.stopPropagation(); // Prevents event from bubbling to parent
    console.log('Child clicked');
});

$('#parent').on('click', function() {
    console.log('Parent clicked'); // Won't fire if child stops propagation
});
```

### Q3: What's the difference between preventDefault() and stopPropagation()?

**Answer:**
- `preventDefault()`: Prevents the default action (e.g., form submission, link navigation)
- `stopPropagation()`: Prevents the event from bubbling up to parent elements

```javascript
$('#link').on('click', function(e) {
    e.preventDefault(); // Don't follow the link
    e.stopPropagation(); // Don't bubble to parent
});
```

### Q4: How do you handle events for dynamically added elements?

**Answer:** Use event delegation with `.on()`:

```javascript
// Wrong - won't work for dynamic elements
$('.dynamic').click(function() { /* handler */ });

// Correct - works for dynamic elements
$(document).on('click', '.dynamic', function() { /* handler */ });
```

### Q5: How do you trigger events programmatically?

**Answer:**
```javascript
// Trigger click event
$('#button').trigger('click');
$('#button').click(); // Shorthand

// Trigger with custom data
$('#element').trigger('customEvent', ['data1', 'data2']);

// Trigger native events
$('#input').trigger('focus');
$('#form').trigger('submit');
```

### Q6: What's the difference between .on() and .bind()?

**Answer:**
- `.bind()`: Deprecated in jQuery 3.0, only binds to existing elements
- `.on()`: Current method, supports event delegation and is more flexible

```javascript
// Old way (deprecated)
$('.button').bind('click', handler);

// New way (recommended)
$('.button').on('click', handler);
```

---

## Practice Exercises

### Exercise 1: Interactive Image Gallery
Create an image gallery where:
1. Clicking thumbnails shows full-size image
2. Keyboard navigation (arrow keys)
3. Click outside to close
4. Prevent default behaviors appropriately

### Exercise 2: Dynamic Form Builder
Create a form builder that:
1. Adds/removes form fields dynamically
2. Validates fields in real-time
3. Handles different input types
4. Uses event delegation properly

### Exercise 3: Drag and Drop Interface
Create a drag-and-drop todo list:
1. Mouse events for dragging
2. Visual feedback during drag
3. Drop zones with hover effects
4. Custom events for state changes

---

**Next:** [Effects and Animations - Part 4](jquery_interview_part4.md)
