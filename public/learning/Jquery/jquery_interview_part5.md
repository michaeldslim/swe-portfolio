# jQuery Interview Guide - Part 5: AJAX with jQuery

---

## AJAX Basics

AJAX (Asynchronous JavaScript and XML) allows you to make HTTP requests to the server without refreshing the page. jQuery simplifies AJAX operations significantly.

### What is AJAX?

AJAX enables:
- Asynchronous communication with server
- Update parts of a web page without reloading
- Send and receive data in various formats (JSON, XML, HTML, text)
- Improve user experience with dynamic content

### Basic AJAX Workflow

```javascript
// 1. Make request to server
$.ajax({
    url: '/api/data',
    method: 'GET',
    success: function(response) {
        // 2. Handle successful response
        console.log('Data received:', response);
    },
    error: function(xhr, status, error) {
        // 3. Handle errors
        console.log('Error:', error);
    }
});
```

---

## jQuery AJAX Methods

jQuery provides several methods for making AJAX requests.

### $.ajax() - The Master Method

```javascript
// Full syntax with all options
$.ajax({
    url: '/api/users',
    type: 'GET',                    // HTTP method
    dataType: 'json',              // Expected response type
    data: {page: 1, limit: 10},    // Data to send
    timeout: 5000,                 // Request timeout
    cache: false,                  // Disable caching
    beforeSend: function(xhr) {
        // Before request is sent
        xhr.setRequestHeader('Authorization', 'Bearer token');
    },
    success: function(data, textStatus, xhr) {
        // Success callback
        console.log('Success:', data);
    },
    error: function(xhr, textStatus, errorThrown) {
        // Error callback
        console.log('Error:', errorThrown);
    },
    complete: function(xhr, textStatus) {
        // Always executed (success or error)
        console.log('Request completed');
    }
});
```

### Shorthand Methods

```javascript
// GET request
$.get('/api/users', function(data) {
    console.log('Users:', data);
});

// POST request
$.post('/api/users', {name: 'John', email: 'john@example.com'}, function(data) {
    console.log('User created:', data);
});

// Load HTML content
$('#content').load('/api/content.html');

// Get JSON data
$.getJSON('/api/users.json', function(data) {
    console.log('JSON data:', data);
});

// Get script and execute
$.getScript('/js/dynamic-script.js', function() {
    console.log('Script loaded and executed');
});
```

### Practical AJAX Examples

```html
<div class="user-management">
    <div class="user-form">
        <h3>Add User</h3>
        <form id="user-form">
            <input type="text" id="user-name" placeholder="Name" required>
            <input type="email" id="user-email" placeholder="Email" required>
            <button type="submit">Add User</button>
        </form>
    </div>
    
    <div class="user-list">
        <h3>Users</h3>
        <button id="load-users">Load Users</button>
        <ul id="users-container"></ul>
    </div>
    
    <div id="loading" style="display: none;">Loading...</div>
    <div id="error-message" style="display: none;"></div>
</div>
```

```javascript
$(document).ready(function() {
    var $loading = $('#loading');
    var $error = $('#error-message');
    var $usersList = $('#users-container');
    
    // Load users
    $('#load-users').click(function() {
        loadUsers();
    });
    
    // Add user form submission
    $('#user-form').submit(function(e) {
        e.preventDefault();
        
        var userData = {
            name: $('#user-name').val(),
            email: $('#user-email').val()
        };
        
        addUser(userData);
    });
    
    function loadUsers() {
        $loading.show();
        $error.hide();
        
        $.ajax({
            url: '/api/users',
            method: 'GET',
            dataType: 'json',
            success: function(users) {
                displayUsers(users);
            },
            error: function(xhr, status, error) {
                showError('Failed to load users: ' + error);
            },
            complete: function() {
                $loading.hide();
            }
        });
    }
    
    function addUser(userData) {
        $loading.show();
        $error.hide();
        
        $.ajax({
            url: '/api/users',
            method: 'POST',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(newUser) {
                $('#user-form')[0].reset();
                loadUsers(); // Refresh the list
                showSuccess('User added successfully!');
            },
            error: function(xhr, status, error) {
                showError('Failed to add user: ' + error);
            },
            complete: function() {
                $loading.hide();
            }
        });
    }
    
    function displayUsers(users) {
        $usersList.empty();
        users.forEach(function(user) {
            var userHtml = `
                <li data-user-id="${user.id}">
                    <strong>${user.name}</strong> - ${user.email}
                    <button class="delete-user" data-id="${user.id}">Delete</button>
                </li>
            `;
            $usersList.append(userHtml);
        });
    }
    
    // Delete user (event delegation)
    $usersList.on('click', '.delete-user', function() {
        var userId = $(this).data('id');
        deleteUser(userId);
    });
    
    function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            $.ajax({
                url: '/api/users/' + userId,
                method: 'DELETE',
                success: function() {
                    loadUsers(); // Refresh the list
                    showSuccess('User deleted successfully!');
                },
                error: function(xhr, status, error) {
                    showError('Failed to delete user: ' + error);
                }
            });
        }
    }
    
    function showError(message) {
        $error.text(message).show();
        setTimeout(function() {
            $error.hide();
        }, 5000);
    }
    
    function showSuccess(message) {
        // You could create a success message element
        alert(message); // Simple implementation
    }
});
```

---

## Handling Responses

Different ways to handle AJAX responses based on data type.

### JSON Response Handling

```javascript
// Expecting JSON response
$.ajax({
    url: '/api/products',
    dataType: 'json',
    success: function(data) {
        // data is automatically parsed as JSON object
        data.products.forEach(function(product) {
            console.log(product.name, product.price);
        });
    }
});

// Manual JSON parsing
$.ajax({
    url: '/api/products',
    dataType: 'text', // Get as text first
    success: function(response) {
        try {
            var data = JSON.parse(response);
            console.log('Parsed data:', data);
        } catch (e) {
            console.error('Invalid JSON:', e);
        }
    }
});
```

### HTML Response Handling

```javascript
// Load HTML content directly into element
$('#content').load('/api/page-content.html');

// Get HTML and process before inserting
$.get('/api/partial.html', function(html) {
    var $content = $(html);
    
    // Process the HTML
    $content.find('img').attr('loading', 'lazy');
    
    // Insert into page
    $('#container').html($content);
});
```

### XML Response Handling

```javascript
$.ajax({
    url: '/api/data.xml',
    dataType: 'xml',
    success: function(xml) {
        $(xml).find('item').each(function() {
            var title = $(this).find('title').text();
            var description = $(this).find('description').text();
            console.log(title, description);
        });
    }
});
```

---

## Error Handling

Proper error handling is crucial for robust AJAX applications.

### Error Callback

```javascript
$.ajax({
    url: '/api/data',
    success: function(data) {
        console.log('Success:', data);
    },
    error: function(xhr, textStatus, errorThrown) {
        console.log('Status:', textStatus);
        console.log('Error:', errorThrown);
        console.log('Response:', xhr.responseText);
        console.log('Status Code:', xhr.status);
        
        // Handle different error types
        switch(xhr.status) {
            case 404:
                console.log('Resource not found');
                break;
            case 500:
                console.log('Server error');
                break;
            case 0:
                console.log('Network error or request cancelled');
                break;
            default:
                console.log('Unknown error occurred');
        }
    }
});
```

### Global Error Handling

```javascript
// Set up global AJAX error handler
$(document).ajaxError(function(event, xhr, settings, thrownError) {
    console.log('Global AJAX error:', thrownError);
    
    // Show user-friendly error message
    $('#error-notification').text('Something went wrong. Please try again.')
                           .fadeIn();
});

// Global AJAX setup
$.ajaxSetup({
    timeout: 10000, // 10 second timeout
    error: function(xhr, status, error) {
        if (status === 'timeout') {
            alert('Request timed out. Please check your connection.');
        }
    }
});
```

### Retry Mechanism

```javascript
function makeRequestWithRetry(url, maxRetries = 3) {
    var retryCount = 0;
    
    function attempt() {
        return $.ajax({
            url: url,
            timeout: 5000
        }).fail(function(xhr, status, error) {
            retryCount++;
            
            if (retryCount < maxRetries && status !== 'abort') {
                console.log(`Retry attempt ${retryCount}/${maxRetries}`);
                setTimeout(attempt, 1000 * retryCount); // Exponential backoff
            } else {
                console.log('Max retries reached or request aborted');
                throw new Error('Request failed after ' + maxRetries + ' attempts');
            }
        });
    }
    
    return attempt();
}

// Usage
makeRequestWithRetry('/api/unstable-endpoint')
    .done(function(data) {
        console.log('Success:', data);
    })
    .fail(function(error) {
        console.log('Final failure:', error);
    });
```

---

## AJAX Events

jQuery provides global AJAX events that you can use to show loading indicators or handle common scenarios.

### Global AJAX Events

```javascript
// Show loading indicator for all AJAX requests
$(document).ajaxStart(function() {
    $('#loading-indicator').show();
});

$(document).ajaxStop(function() {
    $('#loading-indicator').hide();
});

// Handle all AJAX errors globally
$(document).ajaxError(function(event, xhr, settings, thrownError) {
    console.log('AJAX Error on:', settings.url);
    console.log('Error:', thrownError);
});

// Log all successful AJAX requests
$(document).ajaxSuccess(function(event, xhr, settings) {
    console.log('AJAX Success:', settings.url);
});

// Before any AJAX request
$(document).ajaxSend(function(event, xhr, settings) {
    console.log('Sending AJAX request to:', settings.url);
    
    // Add authentication header to all requests
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
});

// After any AJAX request completes
$(document).ajaxComplete(function(event, xhr, settings) {
    console.log('AJAX request completed:', settings.url);
});
```

### Practical Global AJAX Handler

```html
<div id="ajax-loader" class="loader" style="display: none;">
    <div class="spinner"></div>
    <p>Loading...</p>
</div>

<div id="ajax-error" class="error-message" style="display: none;">
    <p>An error occurred. Please try again.</p>
    <button id="dismiss-error">Dismiss</button>
</div>
```

```javascript
$(document).ready(function() {
    var activeRequests = 0;
    
    // Show loader when AJAX starts
    $(document).ajaxSend(function(event, xhr, settings) {
        activeRequests++;
        if (activeRequests === 1) {
            $('#ajax-loader').fadeIn();
        }
    });
    
    // Hide loader when AJAX completes
    $(document).ajaxComplete(function(event, xhr, settings) {
        activeRequests--;
        if (activeRequests === 0) {
            $('#ajax-loader').fadeOut();
        }
    });
    
    // Handle AJAX errors
    $(document).ajaxError(function(event, xhr, settings, thrownError) {
        // Don't show error for aborted requests
        if (xhr.statusText !== 'abort') {
            var errorMsg = 'Request failed';
            
            if (xhr.status === 0) {
                errorMsg = 'Network error. Please check your connection.';
            } else if (xhr.status >= 500) {
                errorMsg = 'Server error. Please try again later.';
            } else if (xhr.status === 404) {
                errorMsg = 'Requested resource not found.';
            }
            
            $('#ajax-error p').text(errorMsg);
            $('#ajax-error').fadeIn();
        }
    });
    
    // Dismiss error message
    $('#dismiss-error').click(function() {
        $('#ajax-error').fadeOut();
    });
});
```

---

## Form Submission with AJAX

AJAX form submission prevents page refresh and provides better user experience.

### Basic Form AJAX

```html
<form id="contact-form">
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
    </div>
    
    <button type="submit">Send Message</button>
</form>

<div id="form-result"></div>
```

```javascript
$(document).ready(function() {
    $('#contact-form').submit(function(e) {
        e.preventDefault(); // Prevent default form submission
        
        var $form = $(this);
        var $result = $('#form-result');
        var $submitBtn = $form.find('button[type="submit"]');
        
        // Disable submit button during request
        $submitBtn.prop('disabled', true).text('Sending...');
        
        // Serialize form data
        var formData = $form.serialize();
        
        $.ajax({
            url: '/api/contact',
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                $result.html('<div class="success">Message sent successfully!</div>');
                $form[0].reset(); // Reset form
            },
            error: function(xhr, status, error) {
                var errorMsg = 'Failed to send message. Please try again.';
                
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMsg = xhr.responseJSON.message;
                }
                
                $result.html('<div class="error">' + errorMsg + '</div>');
            },
            complete: function() {
                // Re-enable submit button
                $submitBtn.prop('disabled', false).text('Send Message');
            }
        });
    });
});
```

### File Upload with AJAX

```html
<form id="upload-form" enctype="multipart/form-data">
    <div class="form-group">
        <label for="file">Choose file:</label>
        <input type="file" id="file" name="file" accept="image/*" required>
    </div>
    
    <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" name="description">
    </div>
    
    <button type="submit">Upload</button>
    
    <div class="upload-progress" style="display: none;">
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <span class="progress-text">0%</span>
    </div>
</form>
```

```javascript
$(document).ready(function() {
    $('#upload-form').submit(function(e) {
        e.preventDefault();
        
        var formData = new FormData(this);
        var $progress = $('.upload-progress');
        var $progressFill = $('.progress-fill');
        var $progressText = $('.progress-text');
        
        $progress.show();
        
        $.ajax({
            url: '/api/upload',
            method: 'POST',
            data: formData,
            processData: false,  // Don't process the data
            contentType: false,  // Don't set content type
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                
                // Upload progress
                xhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        $progressFill.css('width', percentComplete + '%');
                        $progressText.text(Math.round(percentComplete) + '%');
                    }
                }, false);
                
                return xhr;
            },
            success: function(response) {
                alert('File uploaded successfully!');
                $('#upload-form')[0].reset();
            },
            error: function(xhr, status, error) {
                alert('Upload failed: ' + error);
            },
            complete: function() {
                $progress.hide();
                $progressFill.css('width', '0%');
                $progressText.text('0%');
            }
        });
    });
});
```

---

## Common Interview Questions

### Q1: What is AJAX and why is it useful?

**Answer:** AJAX (Asynchronous JavaScript and XML) allows web pages to send and receive data from a server asynchronously without refreshing the entire page.

**Benefits:**
- Better user experience (no page refresh)
- Faster page loading
- Reduced server load
- Dynamic content updates
- Improved interactivity

### Q2: What's the difference between $.get() and $.post()?

**Answer:**
- `$.get()`: Makes HTTP GET requests, typically for retrieving data
- `$.post()`: Makes HTTP POST requests, typically for sending data

```javascript
// GET request
$.get('/api/users', function(data) {
    console.log('Retrieved users:', data);
});

// POST request
$.post('/api/users', {name: 'John'}, function(data) {
    console.log('User created:', data);
});
```

### Q3: How do you handle AJAX errors in jQuery?

**Answer:**
```javascript
$.ajax({
    url: '/api/data',
    success: function(data) {
        // Handle success
    },
    error: function(xhr, textStatus, errorThrown) {
        console.log('Status:', xhr.status);
        console.log('Error:', errorThrown);
        
        // Handle specific errors
        if (xhr.status === 404) {
            console.log('Resource not found');
        } else if (xhr.status === 500) {
            console.log('Server error');
        }
    }
});
```

### Q4: What's the difference between synchronous and asynchronous AJAX?

**Answer:**
- **Asynchronous** (default): Non-blocking, allows other code to execute
- **Synchronous**: Blocking, freezes the browser until response is received

```javascript
// Asynchronous (recommended)
$.ajax({
    url: '/api/data',
    async: true, // Default
    success: function(data) {
        console.log('Data received');
    }
});

// Synchronous (not recommended)
$.ajax({
    url: '/api/data',
    async: false, // Blocks browser
    success: function(data) {
        console.log('Data received');
    }
});
```

### Q5: How do you send JSON data with AJAX?

**Answer:**
```javascript
var userData = {
    name: 'John Doe',
    email: 'john@example.com'
};

$.ajax({
    url: '/api/users',
    method: 'POST',
    data: JSON.stringify(userData),
    contentType: 'application/json',
    dataType: 'json',
    success: function(response) {
        console.log('User created:', response);
    }
});
```

### Q6: What are AJAX global events?

**Answer:** Global events are triggered for all AJAX requests:

```javascript
$(document).ajaxStart(function() {
    // Triggered when first AJAX request starts
    $('#loader').show();
});

$(document).ajaxStop(function() {
    // Triggered when all AJAX requests complete
    $('#loader').hide();
});

$(document).ajaxError(function(event, xhr, settings, error) {
    // Triggered when any AJAX request fails
    console.log('AJAX error:', error);
});
```

---

## Practice Exercises

### Exercise 1: Real-time Search
Create a search feature that:
1. Makes AJAX requests as user types
2. Debounces requests to avoid spam
3. Shows loading indicator
4. Handles errors gracefully

### Exercise 2: Shopping Cart
Build a shopping cart that:
1. Adds/removes items via AJAX
2. Updates quantities dynamically
3. Calculates totals in real-time
4. Persists cart state

### Exercise 3: Comment System
Create a comment system with:
1. AJAX form submission
2. Real-time comment loading
3. Pagination with AJAX
4. Like/dislike functionality

---

**Next:** [jQuery Plugins and Best Practices - Part 6](jquery_interview_part6.md)
