# jQuery Interview Guide - Part 4: Effects and Animations

---

## Basic Effects

jQuery provides built-in methods for common visual effects.

### Show and Hide

```javascript
// Basic show/hide
$('#element').show();    // Display element
$('#element').hide();    // Hide element
$('#element').toggle();  // Toggle visibility

// With duration (milliseconds)
$('#element').show(1000);    // Show over 1 second
$('#element').hide(500);     // Hide over 0.5 seconds
$('#element').toggle(750);   // Toggle over 0.75 seconds

// With predefined speeds
$('#element').show('slow');    // 600ms
$('#element').show('fast');    // 200ms
$('#element').show('normal');  // 400ms (default)

// With callback function
$('#element').hide(500, function() {
    console.log('Hide animation completed');
    $(this).remove(); // Remove element after hiding
});
```

### Practical Show/Hide Example:

```html
<div class="content-section">
    <h3>Section Title <button class="toggle-btn">Toggle</button></h3>
    <div class="content">
        <p>This content can be shown or hidden.</p>
        <p>Click the toggle button to see the effect.</p>
    </div>
</div>
```

```javascript
$(document).ready(function() {
    $('.toggle-btn').click(function() {
        var $content = $(this).closest('.content-section').find('.content');
        var $button = $(this);
        
        $content.toggle(400, function() {
            // Update button text based on visibility
            if ($content.is(':visible')) {
                $button.text('Hide');
            } else {
                $button.text('Show');
            }
        });
    });
});
```

---

## Fading Effects

Fading effects change the opacity of elements.

### Basic Fading Methods

```javascript
// Fade in (from transparent to opaque)
$('#element').fadeIn();
$('#element').fadeIn(1000);
$('#element').fadeIn('slow');

// Fade out (from opaque to transparent)
$('#element').fadeOut();
$('#element').fadeOut(500);
$('#element').fadeOut('fast');

// Fade toggle
$('#element').fadeToggle();
$('#element').fadeToggle(800);

// Fade to specific opacity
$('#element').fadeTo(1000, 0.5); // Fade to 50% opacity
$('#element').fadeTo('slow', 0.3); // Fade to 30% opacity
```

### Advanced Fading Example:

```html
<div class="image-gallery">
    <div class="thumbnails">
        <img src="thumb1.jpg" data-full="full1.jpg" class="thumb">
        <img src="thumb2.jpg" data-full="full2.jpg" class="thumb">
        <img src="thumb3.jpg" data-full="full3.jpg" class="thumb">
    </div>
    <div class="main-image">
        <img id="full-image" src="full1.jpg" alt="Main Image">
    </div>
</div>
```

```javascript
$(document).ready(function() {
    $('.thumb').click(function() {
        var newSrc = $(this).data('full');
        var $fullImage = $('#full-image');
        
        // Fade out current image
        $fullImage.fadeOut(300, function() {
            // Change source and fade in new image
            $(this).attr('src', newSrc).fadeIn(300);
        });
        
        // Update thumbnail states
        $('.thumb').removeClass('active');
        $(this).addClass('active');
    });
    
    // Hover effects on thumbnails
    $('.thumb').hover(
        function() {
            $(this).fadeTo(200, 0.7);
        },
        function() {
            if (!$(this).hasClass('active')) {
                $(this).fadeTo(200, 1);
            }
        }
    );
});
```

---

## Sliding Effects

Sliding effects animate the height of elements.

### Basic Sliding Methods

```javascript
// Slide down (show by expanding height)
$('#element').slideDown();
$('#element').slideDown(1000);
$('#element').slideDown('slow');

// Slide up (hide by collapsing height)
$('#element').slideUp();
$('#element').slideUp(500);
$('#element').slideUp('fast');

// Slide toggle
$('#element').slideToggle();
$('#element').slideToggle(800);

// With easing and callback
$('#element').slideDown(600, 'swing', function() {
    console.log('Slide down completed');
});
```

### Accordion Example:

```html
<div class="accordion">
    <div class="accordion-item">
        <h3 class="accordion-header">Section 1</h3>
        <div class="accordion-content">
            <p>Content for section 1...</p>
        </div>
    </div>
    <div class="accordion-item">
        <h3 class="accordion-header">Section 2</h3>
        <div class="accordion-content">
            <p>Content for section 2...</p>
        </div>
    </div>
    <div class="accordion-item">
        <h3 class="accordion-header">Section 3</h3>
        <div class="accordion-content">
            <p>Content for section 3...</p>
        </div>
    </div>
</div>
```

```javascript
$(document).ready(function() {
    // Initially hide all content
    $('.accordion-content').hide();
    
    $('.accordion-header').click(function() {
        var $content = $(this).next('.accordion-content');
        var $item = $(this).parent();
        
        // Close other accordion items
        $('.accordion-item').not($item).removeClass('active')
            .find('.accordion-content').slideUp(300);
        
        // Toggle current item
        if ($item.hasClass('active')) {
            $item.removeClass('active');
            $content.slideUp(300);
        } else {
            $item.addClass('active');
            $content.slideDown(300);
        }
    });
});
```

---

## Custom Animations

jQuery's `.animate()` method allows you to create custom animations by animating CSS properties.

### Basic Animation Syntax

```javascript
// Basic syntax
$(selector).animate({
    property1: value1,
    property2: value2
}, duration, easing, callback);

// Examples
$('#box').animate({
    left: '250px',
    opacity: 0.5,
    height: '150px',
    width: '150px'
}, 1000);

// Relative values
$('#box').animate({
    left: '+=50px',  // Move 50px to the right
    top: '-=25px'    // Move 25px up
}, 500);

// Multiple animations
$('#box').animate({width: '200px'}, 500)
         .animate({height: '200px'}, 500)
         .animate({opacity: 0.5}, 500);
```

### Advanced Animation Examples:

```html
<div class="animation-demo">
    <div id="animated-box" class="box">Animated Box</div>
    <div class="controls">
        <button id="move-right">Move Right</button>
        <button id="bounce">Bounce</button>
        <button id="pulse">Pulse</button>
        <button id="reset">Reset</button>
    </div>
</div>
```

```javascript
$(document).ready(function() {
    var $box = $('#animated-box');
    var originalCSS = {
        left: $box.css('left'),
        top: $box.css('top'),
        width: $box.css('width'),
        height: $box.css('height'),
        opacity: $box.css('opacity')
    };
    
    // Move right animation
    $('#move-right').click(function() {
        $box.animate({
            left: '+=100px'
        }, 500, 'swing');
    });
    
    // Bounce effect
    $('#bounce').click(function() {
        $box.animate({top: '-=50px'}, 200)
            .animate({top: '+=50px'}, 200)
            .animate({top: '-=25px'}, 150)
            .animate({top: '+=25px'}, 150);
    });
    
    // Pulse effect
    $('#pulse').click(function() {
        $box.animate({
            width: '+=20px',
            height: '+=20px',
            opacity: 0.7
        }, 300).animate({
            width: '-=20px',
            height: '-=20px',
            opacity: 1
        }, 300);
    });
    
    // Reset to original state
    $('#reset').click(function() {
        $box.stop(true, true).animate(originalCSS, 500);
    });
});
```

---

## Animation Queue

jQuery animations are queued by default, meaning they execute one after another.

### Understanding the Queue

```javascript
// These animations will run in sequence
$('#box').slideUp(500)
         .slideDown(500)
         .fadeOut(500)
         .fadeIn(500);

// Check queue length
console.log($('#box').queue().length);

// Clear the queue
$('#box').clearQueue();

// Add custom function to queue
$('#box').slideUp(500)
         .queue(function(next) {
             $(this).addClass('highlighted');
             console.log('Custom function executed');
             next(); // Continue to next item in queue
         })
         .slideDown(500);
```

### Queue Management Example:

```html
<div class="queue-demo">
    <div id="queue-box" class="box">Queue Demo</div>
    <div class="controls">
        <button id="add-slide">Add Slide</button>
        <button id="add-fade">Add Fade</button>
        <button id="add-custom">Add Custom</button>
        <button id="clear-queue">Clear Queue</button>
        <button id="show-queue">Show Queue Length</button>
    </div>
    <div id="queue-info">Queue Length: 0</div>
</div>
```

```javascript
$(document).ready(function() {
    var $box = $('#queue-box');
    var $info = $('#queue-info');
    
    function updateQueueInfo() {
        $info.text('Queue Length: ' + $box.queue().length);
    }
    
    $('#add-slide').click(function() {
        $box.slideUp(500).slideDown(500);
        updateQueueInfo();
    });
    
    $('#add-fade').click(function() {
        $box.fadeOut(500).fadeIn(500);
        updateQueueInfo();
    });
    
    $('#add-custom').click(function() {
        $box.queue(function(next) {
            $(this).css('background-color', 'red');
            setTimeout(function() {
                $box.css('background-color', '');
                next();
            }, 500);
        });
        updateQueueInfo();
    });
    
    $('#clear-queue').click(function() {
        $box.clearQueue();
        updateQueueInfo();
    });
    
    $('#show-queue').click(function() {
        updateQueueInfo();
    });
    
    // Update queue info after animations complete
    $box.promise().done(function() {
        updateQueueInfo();
    });
});
```

---

## Animation Control

Control animation playback with stop, delay, and finish methods.

### Animation Control Methods

```javascript
// Stop current animation
$('#element').stop();

// Stop and clear queue
$('#element').stop(true);

// Stop, clear queue, and jump to end
$('#element').stop(true, true);

// Delay next animation
$('#element').slideUp(500)
             .delay(1000)
             .slideDown(500);

// Finish current animation immediately
$('#element').finish();

// Check if element is being animated
if ($('#element').is(':animated')) {
    console.log('Element is currently animating');
}
```

---

## Common Interview Questions

### Q1: What's the difference between .hide() and .fadeOut()?

**Answer:**
- `.hide()`: Instantly sets `display: none` or animates width, height, and opacity to 0
- `.fadeOut()`: Only animates opacity to 0, then sets `display: none`

```javascript
// hide() animates multiple properties
$('#element').hide(500); // Animates width, height, opacity

// fadeOut() only animates opacity
$('#element').fadeOut(500); // Only animates opacity
```

### Q2: How do you create a custom animation?

**Answer:** Use the `.animate()` method:

```javascript
$('#element').animate({
    left: '250px',
    opacity: 0.5,
    height: 'toggle'
}, {
    duration: 1000,
    easing: 'swing',
    complete: function() {
        console.log('Animation complete');
    }
});
```

### Q3: What properties can be animated with jQuery?

**Answer:** Only numeric CSS properties can be animated:
- **Can animate**: width, height, left, top, margin, padding, opacity, font-size
- **Cannot animate**: color, background-color, display, position (without plugins)

```javascript
// Valid animations
$('#element').animate({
    width: '200px',
    height: '100px',
    opacity: 0.5,
    marginLeft: '50px'
});

// Invalid (won't work without plugins)
$('#element').animate({
    color: 'red',           // Won't work
    backgroundColor: 'blue' // Won't work
});
```

### Q4: How do you stop all animations on an element?

**Answer:**
```javascript
// Stop current animation only
$('#element').stop();

// Stop current animation and clear queue
$('#element').stop(true);

// Stop, clear queue, and jump to end state
$('#element').stop(true, true);

// Finish all animations immediately
$('#element').finish();
```

### Q5: What's the difference between animation queue and simultaneous animations?

**Answer:**
- **Queued animations**: Run one after another (default behavior)
- **Simultaneous animations**: Run at the same time

```javascript
// Queued (sequential)
$('#element').slideUp(500).slideDown(500).fadeOut(500);

// Simultaneous (same time)
$('#element').animate({
    width: '200px',
    height: '200px',
    opacity: 0.5
}, 1000);
```

### Q6: How do you add a delay between animations?

**Answer:**
```javascript
// Using delay() method
$('#element').slideUp(500)
             .delay(1000)
             .slideDown(500);

// Using setTimeout in queue
$('#element').slideUp(500)
             .queue(function(next) {
                 setTimeout(function() {
                     next();
                 }, 1000);
             })
             .slideDown(500);
```

### Q7: What are easing functions in jQuery?

**Answer:** Easing functions control the speed of animation at different points:
- **linear**: Constant speed throughout
- **swing**: Slow at beginning and end, faster in middle (default)

```javascript
// Using built-in easing
$('#element').animate({left: '100px'}, 1000, 'linear');
$('#element').animate({left: '100px'}, 1000, 'swing');

// Custom easing (requires jQuery UI or easing plugin)
$('#element').animate({left: '100px'}, 1000, 'easeInOutBounce');
```

---

## Practice Exercises

### Exercise 1: Image Carousel
Create an image carousel with:
1. Fade transitions between images
2. Auto-play functionality
3. Navigation controls
4. Pause on hover

### Exercise 2: Loading Animation
Create a loading spinner that:
1. Rotates continuously
2. Fades in when shown
3. Can be stopped and started
4. Shows progress percentage

### Exercise 3: Interactive Menu
Create an animated dropdown menu:
1. Slide down on hover
2. Fade effects for menu items
3. Smooth transitions
4. Mobile-friendly touch events

---

**Next:** [AJAX with jQuery - Part 5](jquery_interview_part5.md)
