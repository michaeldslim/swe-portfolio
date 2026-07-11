document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const documentContent = document.getElementById('document-content');
    const sectionList = document.getElementById('section-list');
    const documentSelect = document.getElementById('document-select');
    const koBtn = document.getElementById('ko-btn');
    const enBtn = document.getElementById('en-btn');
    const documentTitle = document.getElementById('document-title');
    
    // State
    let currentLanguage = 'ko';
    let currentDocument = 'code-examples';
    
    // Configure marked.js
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true
    });
    
    // Load document based on language and selected document
    function loadDocument() {
        const filePath = currentLanguage === 'ko' 
            ? `${currentDocument}.md` 
            : `en/${currentDocument}.md`;
            
        documentContent.innerHTML = '<div class="loading">Loading...</div>';
        sectionList.innerHTML = '';
        
        console.log(`Attempting to load: ${filePath}`);
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    console.error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`);
                    throw new Error(`Failed to load document: ${response.status} ${response.statusText}`);
                }
                console.log(`Successfully loaded: ${filePath}`);
                return response.text();
            })
            .then(markdown => {
                // Extract sections for sidebar
                const sections = extractSections(markdown);
                
                // Process markdown to add IDs to sections for navigation
                const processedMarkdown = processMarkdown(markdown);
                
                // Render markdown
                documentContent.innerHTML = marked.parse(processedMarkdown);
                
                // Apply syntax highlighting to code blocks
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
                
                // Populate sidebar with sections
                populateSidebar(sections);
                
                // Update document title
                updateDocumentTitle();
            })
            .catch(error => {
                console.error('Error loading document:', error);
                documentContent.innerHTML = `<div class="error">Error loading document: ${error.message}</div>`;
                
                // If English file fails to load, try to fall back to Korean
                if (currentLanguage === 'en') {
                    console.log('Attempting to fall back to Korean version');
                    const fallbackPath = `${currentDocument}.md`;
                    
                    fetch(fallbackPath)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Fallback also failed');
                            }
                            return response.text();
                        })
                        .then(markdown => {
                            console.log('Successfully loaded fallback Korean version');
                            documentContent.innerHTML = `
                                <div class="warning">English version not available. Showing Korean version instead.</div>
                                ${marked.parse(processMarkdown(markdown))}
                            `;
                            
                            // Apply syntax highlighting to code blocks
                            document.querySelectorAll('pre code').forEach((block) => {
                                hljs.highlightBlock(block);
                            });
                            
                            // Populate sidebar with sections
                            populateSidebar(extractSections(markdown));
                        })
                        .catch(fallbackError => {
                            console.error('Fallback also failed:', fallbackError);
                        });
                }
            });
    }
    
    // Extract sections from markdown
    function extractSections(markdown) {
        const sections = [];
        const lines = markdown.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            // Match h2 headers (## Header)
            const match = lines[i].match(/^##\s+(.*?)$/);
            if (match) {
                sections.push({
                    text: match[1],
                    level: 2,
                    lineNumber: i
                });
            }
            
            // Match h3 headers (### Header) - for subsections
            const subMatch = lines[i].match(/^###\s+(.*?)$/);
            if (subMatch) {
                sections.push({
                    text: subMatch[1],
                    level: 3,
                    lineNumber: i
                });
            }
        }
        
        return sections;
    }
    
    // Process markdown to add IDs to sections for navigation
    function processMarkdown(markdown) {
        const lines = markdown.split('\n');
        let processedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            
            // Add ID to h2 headers
            const h2Match = line.match(/^##\s+(.*?)$/);
            if (h2Match) {
                const sectionId = createIdFromText(h2Match[1]);
                processedLines.push(`<a id="${sectionId}"></a>`);
            }
            
            // Add ID to h3 headers
            const h3Match = line.match(/^###\s+(.*?)$/);
            if (h3Match) {
                const sectionId = createIdFromText(h3Match[1]);
                processedLines.push(`<a id="${sectionId}"></a>`);
            }
            
            processedLines.push(line);
        }
        
        return processedLines.join('\n');
    }
    
    // Create ID from section text
    function createIdFromText(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }
    
    // Populate sidebar with sections
    function populateSidebar(sections) {
        sectionList.innerHTML = '';
        
        sections.forEach(section => {
            const li = document.createElement('li');
            li.textContent = section.text;
            li.dataset.level = section.level;
            
            // Add indentation for subsections
            if (section.level === 3) {
                li.style.paddingLeft = '15px';
                li.style.fontSize = '13px';
            }
            
            const sectionId = createIdFromText(section.text);
            
            li.addEventListener('click', () => {
                // Scroll to section
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight active section in sidebar
                    document.querySelectorAll('#section-list li').forEach(item => {
                        item.classList.remove('active');
                    });
                    li.classList.add('active');
                }
            });
            
            sectionList.appendChild(li);
        });
    }
    
    // Update document title
    function updateDocumentTitle() {
        const documentName = getDocumentDisplayName(currentDocument);
        const languageText = currentLanguage === 'ko' ? '한국어' : 'English';
        documentTitle.textContent = `React & React Native - ${documentName} (${languageText})`;
    }
    
    // Get display name for document
    function getDocumentDisplayName(docKey) {
        const displayNames = {
            'code-examples': 'Code Examples',
            'components': 'Components',
            'core-concepts': 'Core Concepts',
            'development-workflow': 'Development Workflow',
            'navigation': 'Navigation',
            'styling': 'Styling',
            'performance': 'Performance',
            'overview': 'Overview'
        };
        
        return displayNames[docKey] || docKey;
    }
    
    // Event Listeners
    koBtn.addEventListener('click', () => {
        if (currentLanguage !== 'ko') {
            currentLanguage = 'ko';
            koBtn.classList.add('active');
            enBtn.classList.remove('active');
            loadDocument();
        }
    });
    
    enBtn.addEventListener('click', () => {
        if (currentLanguage !== 'en') {
            currentLanguage = 'en';
            enBtn.classList.add('active');
            koBtn.classList.remove('active');
            loadDocument();
        }
    });
    
    documentSelect.addEventListener('change', () => {
        currentDocument = documentSelect.value;
        loadDocument();
    });
    
    // Initial load
    loadDocument();
});
