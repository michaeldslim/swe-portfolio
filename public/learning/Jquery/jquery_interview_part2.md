# jQuery Interview Guide - Part 2: Advanced Selectors & DOM Manipulation

---

## Advanced Selectors

### Hierarchy Selectors

```javascript
// Descendant selector (all descendants)
$('div p')  // All <p> elements inside <div> elements

// Child selector (direct children only)
$('div > p')  // Only direct <p> children of <div>

// Adjacent sibling selector
$('h2 + p')  // <p> element immediately following <h2>

// General sibling selector
$('h2 ~ p')  // All <p> elements that are siblings after <h2>
```

### Practical Example:
```html
<div class="container">
    <p>Direct child paragraph</p>
    <div class="inner">
        <p>Nested paragraph</p>
        <span>Nested span</span>
    </div>
    <p>Another direct child</p>
</div>
```

```javascript
$(document).ready(function() {
    // Selects all 3 paragraphs
    $('.container p').css('color', 'blue');
    
    // Selects only 2 direct child paragraphs
    $('.container > p').css('background', 'yellow');
    
    // Selects nested elements
    $('.container .inner').css('border', '1px solid red');
});
```

### Pseudo-class Selectors

```javascript
// Position-based selectors
$('li:first')        // First li element
$('li:last')         // Last li element
$('li:eq(2)')        // Li element at index 2 (0-based)
$('li:gt(1)')        // Li elements with index greater than 1
$('li:lt(3)')        // Li elements with index less than 3
$('li:even')         // Even-indexed li elements (0, 2, 4...)
$('li:odd')          // Odd-indexed li elements (1, 3, 5...)

// Content-based selectors
$('p:contains("jQuery")')    // Paragraphs containing "jQuery"
$('div:empty')               // Empty div elements
$('div:has(p)')              // Divs that contain paragraph elements

// Form-related selectors
$('input:checked')           // Checked checkboxes/radio buttons
$('input:selected')          // Selected option elements
$('input:disabled')          // Disabled input elements
$('input:enabled')           // Enabled input elements
$('input:focus')             // Focused input elements
```

### Advanced Attribute Selectors

```javascript
// Attribute exists
$('[data-role]')

// Attribute equals
$('[data-role="button"]')

// Attribute not equals
$('[data-role!="button"]')

// Attribute contains word
$('[class~="btn"]')  // class contains "btn" as a whole word

// Attribute contains substring
$('[class*="btn"]')  // class contains "btn" anywhere

// Attribute starts with
$('[class^="btn"]')  // class starts with "btn"

// Attribute ends with
$('[class$="btn"]')  // class ends with "btn"

// Multiple attribute conditions
$('[data-role="button"][data-size="large"]')
```

---

## Filter Methods

Filter methods allow you to narrow down your selection after initial selection.

### Basic Filter Methods

```javascript
// Get specific elements by index
$('li').eq(2)        // Element at index 2
$('li').first()      // First element
$('li').last()       // Last element

// Filter by condition
$('p').filter('.highlight')           // Paragraphs with class 'highlight'
$('p').filter(function(index) {       // Custom filter function
    return $(this).text().length > 10;
});

// Exclude elements
$('p').not('.exclude')               // All paragraphs except those with class 'exclude'
$('li').not(':first')               // All li elements except the first

// Check if selection contains elements matching selector
$('div').has('p')                   // Divs that contain paragraphs
$('li').has('.icon')                // List items that contain elements with class 'icon'
```

### Practical Filter Examples:

```html
<ul id="menu">
    <li class="item active">Home</li>
    <li class="item">About</li>
    <li class="item disabled">Services</li>
    <li class="item">Contact</li>
</ul>
```

```javascript
$(document).ready(function() {
    // Select only enabled menu items
    $('#menu .item').not('.disabled').click(function() {
        // Remove active class from all items
        $('#menu .item').removeClass('active');
        // Add active class to clicked item
        $(this).addClass('active');
    });
    
    // Filter items with specific text length
    $('#menu .item').filter(function() {
        return $(this).text().length > 4;
    }).css('font-weight', 'bold');
});
```

---

## DOM Traversal

DOM traversal methods help you navigate through the DOM tree relative to your current selection.

### Parent/Ancestor Methods

```javascript
// Direct parent
$('#child').parent()

// All ancestors
$('#child').parents()

// Ancestors matching selector
$('#child').parents('.container')

// Ancestors up to (but not including) selector
$('#child').parentsUntil('.container')

// Closest ancestor matching selector
$('#child').closest('.wrapper')
```

### Child/Descendant Methods

```javascript
// Direct children
$('.parent').children()

// Children matching selector
$('.parent').children('.child')

// All descendants matching selector
$('.parent').find('.descendant')

// Text and element nodes
$('.parent').contents()
```

### Sibling Methods

```javascript
// All siblings
$('#current').siblings()

// Siblings matching selector
$('#current').siblings('.sibling')

// Next sibling
$('#current').next()

// Next siblings matching selector
$('#current').next('.target')

// All following siblings
$('#current').nextAll()

// Following siblings until selector
$('#current').nextUntil('.stop')

// Previous sibling
$('#current').prev()

// Previous siblings matching selector
$('#current').prev('.target')

// All previous siblings
$('#current').prevAll()

// Previous siblings until selector
$('#current').prevUntil('.stop')
```

### Traversal Example:

```html
<div class="container">
    <div class="header">
        <h1>Title</h1>
        <nav>
            <ul>
                <li><a href="#" class="current">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
    <div class="content">
        <p>Content paragraph</p>
    </div>
</div>
```

```javascript
$(document).ready(function() {
    // Navigate from current link to container
    $('.current')
        .closest('.container')
        .find('.content p')
        .css('color', 'blue');
    
    // Highlight siblings of current link
    $('.current')
        .parent()           // Go to <li>
        .siblings()         // Get sibling <li> elements
        .find('a')          // Find <a> elements in siblings
        .css('opacity', '0.5');
    
    // Navigate to next section
    $('.header')
        .next('.content')
        .addClass('highlighted');
});
```

---

## DOM Manipulation

### Adding Elements

```javascript
// Append to end of element
$('#container').append('<p>New paragraph</p>');
$('<p>New paragraph</p>').appendTo('#container');

// Prepend to beginning of element
$('#container').prepend('<p>First paragraph</p>');
$('<p>First paragraph</p>').prependTo('#container');

// Insert after element
$('#target').after('<p>After target</p>');
$('<p>After target</p>').insertAfter('#target');

// Insert before element
$('#target').before('<p>Before target</p>');
$('<p>Before target</p>').insertBefore('#target');
```

### Removing Elements

```javascript
// Remove element and its children
$('#target').remove();

// Remove element but keep data and events
$('#target').detach();

// Remove all child elements
$('#container').empty();

// Remove specific children
$('#container').children('.unwanted').remove();
```

### Replacing Elements

```javascript
// Replace element with new content
$('#old').replaceWith('<div id="new">New content</div>');

// Replace multiple elements
$('.old-class').replaceWith(function() {
    return '<span class="new-class">' + $(this).text() + '</span>';
});
```

### Cloning Elements

```javascript
// Clone element (without events)
var cloned = $('#original').clone();

// Clone element with events and data
var clonedWithEvents = $('#original').clone(true);

// Clone and append
$('#original').clone().appendTo('#container');
```

### Practical DOM Manipulation Example:

```html
<div id="todo-app">
    <input type="text" id="new-task" placeholder="Enter new task">
    <button id="add-task">Add Task</button>
    <ul id="task-list">
        <li>Existing task <button class="delete">Delete</button></li>
    </ul>
</div>
```

```javascript
$(document).ready(function() {
    // Add new task
    $('#add-task').click(function() {
        var taskText = $('#new-task').val().trim();
        if (taskText) {
            var newTask = $('<li>')
                .text(taskText + ' ')
                .append('<button class="delete">Delete</button>');
            
            $('#task-list').append(newTask);
            $('#new-task').val('');
        }
    });
    
    // Delete task (event delegation)
    $('#task-list').on('click', '.delete', function() {
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
        });
    });
    
    // Add task on Enter key
    $('#new-task').keypress(function(e) {
        if (e.which === 13) {
            $('#add-task').click();
        }
    });
});
```

---

## Content Manipulation

### Text and HTML Content

```javascript
// Get/Set text content
var text = $('#element').text();
$('#element').text('New text content');

// Get/Set HTML content
var html = $('#element').html();
$('#element').html('<strong>Bold text</strong>');

// Get/Set form values
var value = $('#input').val();
$('#input').val('New value');

// Get/Set attributes
var src = $('#image').attr('src');
$('#image').attr('src', 'new-image.jpg');
$('#image').attr({
    'src': 'new-image.jpg',
    'alt': 'New image'
});

// Remove attributes
$('#image').removeAttr('title');

// Get/Set properties
var checked = $('#checkbox').prop('checked');
$('#checkbox').prop('checked', true);

// Get/Set data attributes
var userId = $('#user').data('user-id');
$('#user').data('user-id', 123);
```

### CSS Manipulation

```javascript
// Get/Set CSS properties
var color = $('#element').css('color');
$('#element').css('color', 'red');
$('#element').css({
    'color': 'red',
    'background-color': 'yellow',
    'font-size': '16px'
});

// Add/Remove/Toggle classes
$('#element').addClass('highlight');
$('#element').removeClass('old-class');
$('#element').toggleClass('active');

// Check if element has class
if ($('#element').hasClass('active')) {
    console.log('Element is active');
}
```

### Dimensions and Positioning

```javascript
// Width and height
var width = $('#element').width();
var height = $('#element').height();
$('#element').width(300).height(200);

// Inner dimensions (including padding)
var innerWidth = $('#element').innerWidth();
var innerHeight = $('#element').innerHeight();

// Outer dimensions (including padding and border)
var outerWidth = $('#element').outerWidth();
var outerHeight = $('#element').outerHeight(true); // true includes margin

// Position
var position = $('#element').position(); // Relative to parent
var offset = $('#element').offset();     // Relative to document

// Scroll position
var scrollTop = $(window).scrollTop();
var scrollLeft = $(window).scrollLeft();
```

---

## Common Interview Questions

### Q1: What's the difference between .text() and .html()?

**Answer:**
- `.text()`: Gets/sets only the text content, HTML tags are treated as plain text
- `.html()`: Gets/sets HTML content, HTML tags are parsed

```javascript
$('#demo').html('<strong>Bold text</strong>');
console.log($('#demo').text());  // "Bold text"
console.log($('#demo').html());  // "<strong>Bold text</strong>"
```

### Q2: What's the difference between .attr() and .prop()?

**Answer:**
- `.attr()`: Gets/sets HTML attributes as they appear in the markup
- `.prop()`: Gets/sets DOM properties (current state)

```javascript
// HTML: <input type="checkbox" checked="checked">
console.log($('#checkbox').attr('checked')); // "checked"
console.log($('#checkbox').prop('checked')); // true

// After user unchecks the box:
console.log($('#checkbox').attr('checked')); // "checked" (unchanged)
console.log($('#checkbox').prop('checked')); // false (current state)
```

### Q3: How do you create elements dynamically in jQuery?

**Answer:**
```javascript
// Method 1: Create and append
var newDiv = $('<div class="dynamic">New content</div>');
$('#container').append(newDiv);

// Method 2: Create with properties
var newInput = $('<input>', {
    type: 'text',
    class: 'form-control',
    placeholder: 'Enter text',
    value: 'Default value'
});
$('#form').append(newInput);

// Method 3: Create and chain methods
$('<button>')
    .text('Click me')
    .addClass('btn btn-primary')
    .click(function() {
        alert('Button clicked!');
    })
    .appendTo('#container');
```

### Q4: What's the difference between .remove() and .detach()?

**Answer:**
- `.remove()`: Removes elements and all associated data and events
- `.detach()`: Removes elements but preserves data and events for later reattachment

```javascript
// Using remove() - data and events are lost
var removed = $('#element').remove();
$('#container').append(removed); // Events won't work

// Using detach() - data and events are preserved
var detached = $('#element').detach();
$('#container').append(detached); // Events still work
```

### Q5: How do you handle dynamically added elements?

**Answer:** Use event delegation with `.on()`:

```javascript
// Wrong - won't work for dynamically added elements
$('.dynamic-button').click(function() {
    alert('Clicked!');
});

// Correct - works for current and future elements
$(document).on('click', '.dynamic-button', function() {
    alert('Clicked!');
});

// Better - delegate to closer parent
$('#container').on('click', '.dynamic-button', function() {
    alert('Clicked!');
});
```

### Q6: How do you check if an element exists?

**Answer:**
```javascript
// Method 1: Check length
if ($('#element').length > 0) {
    console.log('Element exists');
}

// Method 2: Check length (shorter)
if ($('#element').length) {
    console.log('Element exists');
}

// Method 3: Using size() (deprecated in jQuery 3.0)
if ($('#element').size() > 0) {
    console.log('Element exists');
}

// Method 4: Function to check existence
function elementExists(selector) {
    return $(selector).length > 0;
}

if (elementExists('#myElement')) {
    console.log('Element exists');
}
```

---

## Practice Exercises

### Exercise 1: Dynamic List Management
Create a list where you can:
1. Add new items
2. Delete items
3. Edit items in place
4. Reorder items (bonus)

### Exercise 2: Form Validation
Create a form with jQuery validation that:
1. Checks required fields
2. Validates email format
3. Shows/hides error messages
4. Enables submit only when valid

### Exercise 3: Content Tabs
Create a tabbed interface that:
1. Shows/hides content based on tab selection
2. Highlights active tab
3. Supports keyboard navigation
4. Loads content dynamically (bonus)

---

**Next:** [Event Handling - Part 3](jquery_interview_part3.md)
