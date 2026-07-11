# jQuery Interview Guide - Part 1: Fundamentals

---

## What is jQuery?

jQuery is a fast, lightweight, and feature-rich JavaScript library. It was created by John Resig in 2006 with the motto **"Write less, do more"**.

### Key Features:
- **DOM Manipulation**: Easy selection and modification of HTML elements
- **Event Handling**: Simplified event binding and handling
- **AJAX Support**: Streamlined asynchronous requests
- **Animations**: Built-in effects and custom animations
- **Cross-browser Compatibility**: Works consistently across different browsers
- **Method Chaining**: Chain multiple methods together
- **Lightweight**: Small file size (~30KB minified)

### jQuery vs Vanilla JavaScript

```javascript
// Vanilla JavaScript
document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('myDiv').style.display = 'none';
});

// jQuery
$('#myButton').click(function() {
    $('#myDiv').hide();
});
```

---

## jQuery Setup and Syntax

### Including jQuery

#### CDN (Recommended)
```html
<!DOCTYPE html>
<html>
<head>
    <title>jQuery Example</title>
    <!-- jQuery 3.x -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <!-- Your HTML content -->
</body>
</html>
```

#### Local File
```html
<script src="js/jquery-3.7.1.min.js"></script>
```

#### NPM Installation
```bash
npm install jquery
```

### Basic Syntax

```javascript
$(selector).action()
```

- `$`: jQuery alias (can also use `jQuery`)
- `selector`: CSS-style selector to find HTML elements
- `action()`: jQuery method to perform on selected elements

### Examples:
```javascript
// Hide all paragraphs
$('p').hide();

// Show element with ID 'demo'
$('#demo').show();

// Add class to all divs
$('div').addClass('highlight');

// Change text of elements with class 'title'
$('.title').text('New Title');
```

---

## Document Ready

Always wrap jQuery code in document ready to ensure DOM is fully loaded before executing code.

### Method 1 (Full Syntax)
```javascript
$(document).ready(function() {
    // Your jQuery code here
    console.log('DOM is ready!');
});
```

### Method 2 (Shorthand - Most Common)
```javascript
$(function() {
    // Your jQuery code here
    console.log('DOM is ready!');
});
```

### Method 3 (No Conflict Mode)
```javascript
jQuery(document).ready(function($) {
    // Your jQuery code here using $
    console.log('DOM is ready!');
});
```

### Document Ready vs Window Load

```javascript
// Fires when DOM is ready (HTML parsed, before images load)
$(document).ready(function() {
    console.log('DOM ready - fires first');
});

// Fires when everything is loaded (images, stylesheets, etc.)
$(window).on('load', function() {
    console.log('Window loaded - fires second');
});
```

### Practical Example:
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <h1 id="title">Welcome</h1>
    <button id="changeBtn">Change Title</button>
    
    <script>
    $(document).ready(function() {
        $('#changeBtn').click(function() {
            $('#title').text('Title Changed!');
        });
    });
    </script>
</body>
</html>
```

---

## Basic Selectors

jQuery uses CSS-style selectors to find HTML elements.

### Element Selectors
```javascript
// Select all paragraphs
$('p')

// Select all divs
$('div')

// Select all links
$('a')

// Select all input elements
$('input')
```

### ID Selector
```javascript
// Select element with ID 'header'
$('#header')

// Select element with ID 'main-content'
$('#main-content')
```

### Class Selector
```javascript
// Select all elements with class 'highlight'
$('.highlight')

// Select all elements with class 'btn-primary'
$('.btn-primary')
```

### Multiple Selectors
```javascript
// Select all h1, h2, and h3 elements
$('h1, h2, h3')

// Select elements with multiple classes
$('.btn.primary')

// Select by ID and class combination
$('#header .navigation')
```

### Attribute Selectors
```javascript
// Elements with specific attribute
$('[title]')

// Elements with specific attribute value
$('[title="tooltip"]')

// Elements with attribute containing value
$('[class*="btn"]')

// Elements with attribute starting with value
$('[id^="user"]')

// Elements with attribute ending with value
$('[src$=".jpg"]')
```

### Practical Examples:
```html
<div id="container">
    <h1 class="title primary">Main Title</h1>
    <p class="content">First paragraph</p>
    <p class="content highlight">Second paragraph</p>
    <button class="btn btn-primary" data-action="submit">Submit</button>
    <img src="photo.jpg" alt="Photo" title="My Photo">
</div>
```

```javascript
$(document).ready(function() {
    // Select by ID
    $('#container').css('border', '1px solid black');
    
    // Select by class
    $('.title').css('color', 'blue');
    
    // Select by multiple classes
    $('.btn.btn-primary').css('background', 'green');
    
    // Select by attribute
    $('[data-action="submit"]').click(function() {
        alert('Form submitted!');
    });
    
    // Select images with jpg extension
    $('[src$=".jpg"]').css('border', '2px solid red');
});
```

---

## Method Chaining

One of jQuery's most powerful features is method chaining - the ability to call multiple methods on the same selection.

### Basic Chaining
```javascript
// Without chaining
$('#myDiv').addClass('highlight');
$('#myDiv').fadeIn();
$('#myDiv').delay(2000);
$('#myDiv').fadeOut();

// With chaining
$('#myDiv').addClass('highlight').fadeIn().delay(2000).fadeOut();
```

### Complex Chaining Example
```javascript
$(document).ready(function() {
    $('.box')
        .css('background-color', 'lightblue')
        .addClass('animated')
        .fadeOut(1000)
        .delay(500)
        .fadeIn(1000)
        .slideUp(500)
        .slideDown(500);
});
```

### Breaking Chains for Readability
```javascript
$('#navigation')
    .find('li')
    .addClass('nav-item')
    .end()  // Return to #navigation
    .find('a')
    .addClass('nav-link')
    .on('click', function(e) {
        e.preventDefault();
        console.log('Link clicked');
    });
```

### Practical Chaining Example:
```html
<div class="card">
    <h3>Product Title</h3>
    <p>Product description</p>
    <button class="buy-btn">Buy Now</button>
</div>
```

```javascript
$(document).ready(function() {
    $('.buy-btn').click(function() {
        $(this)
            .text('Processing...')
            .prop('disabled', true)
            .closest('.card')
            .addClass('processing')
            .find('h3')
            .css('color', 'orange');
    });
});
```

---

## Common Interview Questions

### Q1: What is jQuery and what are its advantages?

**Answer:** jQuery is a JavaScript library that simplifies DOM manipulation, event handling, and AJAX operations. 

**Advantages:**
- Cross-browser compatibility
- Simplified syntax
- Smaller codebase
- Rich plugin ecosystem
- Method chaining
- Built-in animations and effects

### Q2: What does the $ symbol represent in jQuery?

**Answer:** The `$` symbol is an alias for the `jQuery` object. It's a function that serves as the main entry point for all jQuery functionality.

```javascript
// These are equivalent
$('#myElement').hide();
jQuery('#myElement').hide();
```

### Q3: What is the difference between $(document).ready() and window.onload?

**Answer:**
- `$(document).ready()`: Fires when the DOM is fully constructed but before all images and resources are loaded
- `window.onload`: Fires when all content including images, stylesheets, and scripts are fully loaded

```javascript
// Fires earlier - when DOM structure is ready
$(document).ready(function() {
    console.log('DOM ready');
});

// Fires later - when everything is loaded
$(window).on('load', function() {
    console.log('Everything loaded');
});
```

### Q4: How do you check if jQuery is loaded?

**Answer:**
```javascript
// Method 1
if (typeof jQuery !== 'undefined') {
    console.log('jQuery is loaded');
} else {
    console.log('jQuery is not loaded');
}

// Method 2
if (window.jQuery) {
    console.log('jQuery is loaded');
}

// Method 3
if (typeof $ !== 'undefined' && $.fn.jquery) {
    console.log('jQuery version:', $.fn.jquery);
}
```

### Q5: What is method chaining in jQuery?

**Answer:** Method chaining allows you to call multiple jQuery methods on the same selection in a single statement. This is possible because most jQuery methods return the jQuery object itself.

```javascript
// Method chaining example
$('#myElement')
    .addClass('highlight')
    .fadeIn(500)
    .delay(1000)
    .fadeOut(500);
```

### Q6: How do you prevent conflicts with other libraries that use $?

**Answer:** Use `jQuery.noConflict()` to release control of the `$` variable:

```javascript
// Release $ back to other libraries
jQuery.noConflict();

// Use jQuery instead of $
jQuery(document).ready(function() {
    jQuery('#myElement').hide();
});

// Or assign to a different variable
var $j = jQuery.noConflict();
$j(document).ready(function() {
    $j('#myElement').hide();
});
```

### Q7: What are the different ways to select elements in jQuery?

**Answer:**
```javascript
// By tag name
$('p')

// By ID
$('#myId')

// By class
$('.myClass')

// By attribute
$('[data-role="button"]')

// Descendant selector
$('div p')

// Child selector
$('div > p')

// Multiple selectors
$('h1, h2, h3')

// Pseudo-selectors
$('li:first')
$('tr:even')
$('input:checked')
```

### Q8: How do you create a simple jQuery plugin?

**Answer:**
```javascript
(function($) {
    $.fn.highlight = function(options) {
        var settings = $.extend({
            color: 'yellow',
            duration: 1000
        }, options);
        
        return this.each(function() {
            $(this).css('background-color', settings.color)
                   .delay(settings.duration)
                   .queue(function() {
                       $(this).css('background-color', '').dequeue();
                   });
        });
    };
})(jQuery);

// Usage
$('.text').highlight({color: 'lightblue', duration: 2000});
```

---

## Practice Exercises

### Exercise 1: Basic Selection and Manipulation
Create an HTML page with various elements and use jQuery to:
1. Hide all paragraphs
2. Show only paragraphs with class 'visible'
3. Change the text color of all h1 elements to blue
4. Add a border to all images

### Exercise 2: Method Chaining
Create a button that when clicked:
1. Fades out a div
2. Changes its text content
3. Changes its background color
4. Fades it back in
All using method chaining.

### Exercise 3: Dynamic Content
Create a form where jQuery:
1. Validates input fields
2. Shows error messages
3. Enables/disables submit button based on validation
4. Displays success message on submission

---

**Next:** [jQuery Selectors and Filters - Part 2](jquery_interview_part2.md)
