document.addEventListener('DOMContentLoaded', function() {

    // Set up marked.js renderer with syntax highlighting if available
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            highlight: function(code, lang) {
                if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return code;
            }
        });
    }

    // Initialize variables
    let currentContent = 'inbound-outbound';
    let currentLanguage = 'en';
    const contentSelect = document.getElementById('content-select');
    const enBtn = document.getElementById('en-btn');
    const koBtn = document.getElementById('ko-btn');
    const documentContent = document.getElementById('document-content');
    const currentTitle = document.getElementById('current-title');
    const tocDiv = document.getElementById('toc');

    // Load initial content
    loadContent();

    // Event listeners
    contentSelect.addEventListener('change', function() {
        currentContent = this.value;
        loadContent();
    });

    enBtn.addEventListener('click', function() {
        if (currentLanguage !== 'en') {
            currentLanguage = 'en';
            updateLanguageButtons();
            loadContent();
        }
    });

    koBtn.addEventListener('click', function() {
        if (currentLanguage !== 'ko') {
            currentLanguage = 'ko';
            updateLanguageButtons();
            loadContent();
        }
    });

    function updateLanguageButtons() {
        if (currentLanguage === 'en') {
            enBtn.classList.add('active');
            koBtn.classList.remove('active');
        } else {
            enBtn.classList.remove('active');
            koBtn.classList.add('active');
        }
    }

    function loadContent() {
        // Update title based on current selection
        let titlePrefix = currentContent === 'inbound-outbound' ? 'Inbound/Outbound' : 'Up/Downstream';
        let languageSuffix = currentLanguage === 'en' ? 'English' : '한국어';
        currentTitle.textContent = `${titlePrefix} (${languageSuffix})`;

        // Determine file to load
        let fileName;
        if (currentContent === 'inbound-outbound') {
            fileName = currentLanguage === 'en' ? 'inbound_outbound_en.md' : 'inbound_outbound_ko.md';
        } else {
            fileName = currentLanguage === 'en' ? 'up_down_stream_en.md' : 'up_down_stream_ko.md';
        }

        // Load markdown content using XMLHttpRequest (better for local file access)
        documentContent.innerHTML = '<p>Loading content...</p>';
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileName, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                    const markdown = xhr.responseText;
                    if (typeof marked !== 'undefined') {
                        documentContent.innerHTML = marked.parse(markdown);

                        // Apply syntax highlighting if available
                        if (typeof hljs !== 'undefined') {
                            document.querySelectorAll('pre code').forEach((block) => {
                                hljs.highlightElement(block);
                            });
                        }

                        // Generate table of contents
                        generateTOC();
                    } else {
                        documentContent.innerHTML = '<pre>' + markdown + '</pre>';
                    }
                } else {
                    console.error('Error loading markdown:', xhr.statusText);
                    documentContent.innerHTML = `<p>Error loading content: ${xhr.status} ${xhr.statusText || 'Could not load file'}</p>`;
                    
                    // Show more helpful error message for local file access
                    if (window.location.protocol === 'file:') {
                        documentContent.innerHTML += `
                        <div style="margin-top: 20px; padding: 15px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24;">
                            <h3>Local File Access Issue</h3>
                            <p>You appear to be accessing this page using the file:// protocol, which restricts JavaScript from loading local files.</p>
                            <p>To fix this issue, try one of these solutions:</p>
                            <ol>
                                <li>Serve this folder using a local web server</li>
                                <li>Use a browser with relaxed security settings for local files (not recommended for general browsing)</li>
                                <li>Open the markdown files directly in your browser or text editor</li>
                            </ol>
                        </div>`;
                    }
                }
            }
        };
        xhr.send();
    }

    function generateTOC() {
        const headings = documentContent.querySelectorAll('h1, h2, h3');
        let tocHTML = '';

        if (headings.length > 0) {
            // Process headings to create a hierarchical TOC
            headings.forEach((heading, index) => {
                // Add ID to heading if it doesn't have one
                if (!heading.id) {
                    heading.id = 'heading-' + index;
                }

                const level = parseInt(heading.tagName.substring(1));
                const text = heading.textContent;

                if (level === 1) {
                    tocHTML += `<h2>${text}</h2>`;
                } else if (level === 2) {
                    tocHTML += `<h3>${text}</h3>`;
                } else {
                    tocHTML += `<ul><li><a href="#${heading.id}">${text}</a></li></ul>`;
                }
            });

            tocDiv.innerHTML = tocHTML;

            // Add click events to TOC links
            tocDiv.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        } else {
            tocDiv.innerHTML = '<p>No headings found in document</p>';
        }
    }
});
