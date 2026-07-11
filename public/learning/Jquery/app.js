document.addEventListener('DOMContentLoaded', () => {
    // Initialize highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.configure({
            languages: ['javascript', 'html', 'css']
        });
    }
    
    // Configure marked.js
    marked.setOptions({
        highlight: function(code, lang) {
            if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, code).value;
                } catch (e) {
                    console.error('highlight.js error:', e);
                    return code;
                }
            }
            return code;
        },
        breaks: true,
        gfm: true
    });

    // Document data
    const documents = [
        { id: 'part1', filename: './jquery_interview_part1.md', title: 'Part 1: Fundamentals' },
        { id: 'part2', filename: './jquery_interview_part2.md', title: 'Part 2: Advanced Selectors & DOM Manipulation' },
        { id: 'part3', filename: './jquery_interview_part3.md', title: 'Part 3: Event Handling' },
        { id: 'part4', filename: './jquery_interview_part4.md', title: 'Part 4: Effects and Animations' },
        { id: 'part5', filename: './jquery_interview_part5.md', title: 'Part 5: AJAX with jQuery' },
        { id: 'part6', filename: './jquery_interview_part6.md', title: 'Part 6: Plugins, Best Practices & Advanced Topics' }
    ];

    let currentDocIndex = 0;
    let questions = [];
    let currentQuestionIndex = -1;

    const documentSelect = document.getElementById('document-select');
    const questionList = document.getElementById('question-list');
    const documentContent = document.getElementById('document-content');
    const currentTitle = document.getElementById('current-title');
    const progressFill = document.getElementById('progress-fill');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Populate document selector
    function populateDocumentSelector() {
        documentSelect.innerHTML = '';
        documents.forEach((doc, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = doc.title;
            documentSelect.appendChild(option);
        });
    }

    // Extract questions from markdown content
    function extractQuestions(markdown) {
        const questions = [];
        const lines = markdown.split('\n');
        let questionCounter = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Match headers that look like questions or important sections
            if (line.match(/^#{1,6}\s+(.+)/)) {
                const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
                if (headerMatch) {
                    const level = headerMatch[1].length;
                    const text = headerMatch[2];
                    
                    // Skip table of contents and main title
                    if (text.toLowerCase().includes('table of contents') || 
                        text.toLowerCase().includes('jquery interview guide') ||
                        level === 1) {
                        continue;
                    }
                    
                    questionCounter++;
                    questions.push({
                        id: `question-${questionCounter}`,
                        text: text,
                        level: level,
                        lineNumber: i
                    });
                }
            }
        }
        
        return questions;
    }

    // Populate question list
    function populateQuestionList() {
        questionList.innerHTML = '';
        
        if (questions.length === 0) {
            questionList.innerHTML = '<p class="no-questions">No sections found in this document.</p>';
            return;
        }
        
        questions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.innerHTML = `
                <span class="question-number">${index + 1}.</span>
                <span class="question-text">${question.text}</span>
            `;
            
            questionItem.addEventListener('click', () => {
                scrollToQuestion(index);
            });
            
            questionList.appendChild(questionItem);
        });
    }

    // Scroll to specific question
    function scrollToQuestion(index) {
        currentQuestionIndex = index;
        updateActiveQuestion();
        
        const questionAnchor = document.getElementById(questions[index].id);
        if (questionAnchor) {
            questionAnchor.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
        
        updateProgress();
    }

    // Update active question in sidebar
    function updateActiveQuestion() {
        const questionItems = document.querySelectorAll('.question-item');
        questionItems.forEach((item, index) => {
            if (index === currentQuestionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Update progress bar
    function updateProgress() {
        if (questions.length > 0) {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    // Process markdown content to add question anchors
    function processMarkdown(markdown) {
        const lines = markdown.split('\n');
        let questionCounter = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.match(/^#{1,6}\s+(.+)/)) {
                const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
                if (headerMatch) {
                    const level = headerMatch[1].length;
                    const text = headerMatch[2];
                    
                    // Skip table of contents and main title
                    if (text.toLowerCase().includes('table of contents') || 
                        text.toLowerCase().includes('jquery interview guide') ||
                        level === 1) {
                        continue;
                    }
                    
                    questionCounter++;
                    const anchorId = `question-${questionCounter}`;
                    lines[i] = `<div class="question-anchor" id="${anchorId}"></div>\n${lines[i]}`;
                }
            }
        }
        
        return lines.join('\n');
    }

    // Show loading indicator
    function showLoading() {
        loadingIndicator.style.display = 'flex';
    }

    // Hide loading indicator
    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    // Load document content
    async function loadDocument(index) {
        if (index < 0 || index >= documents.length) return;
        
        showLoading();
        currentDocIndex = index;
        currentQuestionIndex = -1;
        
        try {
            console.log(`Attempting to load: ${documents[index].filename}`);
            const response = await fetch(documents[index].filename, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const markdown = await response.text();
            const processedMarkdown = processMarkdown(markdown);
            const html = marked.parse(processedMarkdown);
            
            documentContent.innerHTML = html;
            currentTitle.textContent = documents[index].title;
            
            // Extract questions from the loaded content
            questions = extractQuestions(markdown);
            populateQuestionList();
            
            // Highlight code blocks
            document.querySelectorAll('pre code').forEach((block) => {
                if (typeof hljs !== 'undefined') {
                    try {
                        hljs.highlightBlock(block);
                    } catch (e) {
                        console.error('Error highlighting block:', e);
                    }
                }
            });
            
            // Reset progress
            progressFill.style.width = '0%';
            
            // Scroll to top
            document.querySelector('.content-body').scrollTop = 0;
            
        } catch (error) {
            console.error('Error loading document:', error);
            documentContent.innerHTML = `
                <div class="error-message">
                    <h3>Error Loading Document</h3>
                    <p>Failed to load ${documents[index].filename}. Please check if the file exists.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        } finally {
            hideLoading();
        }
    }

    // Document selector event listener
    documentSelect.addEventListener('change', () => {
        loadDocument(parseInt(documentSelect.value));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentQuestionIndex > 0) {
                        scrollToQuestion(currentQuestionIndex - 1);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentQuestionIndex < questions.length - 1) {
                        scrollToQuestion(currentQuestionIndex + 1);
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentDocIndex > 0) {
                        documentSelect.value = currentDocIndex - 1;
                        loadDocument(currentDocIndex - 1);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentDocIndex < documents.length - 1) {
                        documentSelect.value = currentDocIndex + 1;
                        loadDocument(currentDocIndex + 1);
                    }
                    break;
            }
        }
    });

    // Scroll spy functionality
    function handleScroll() {
        const contentBody = document.querySelector('.content-body');
        const scrollTop = contentBody.scrollTop;
        const questionAnchors = document.querySelectorAll('.question-anchor');
        
        let activeIndex = -1;
        
        questionAnchors.forEach((anchor, index) => {
            const rect = anchor.getBoundingClientRect();
            const contentRect = contentBody.getBoundingClientRect();
            
            if (rect.top <= contentRect.top + 100) {
                activeIndex = index;
            }
        });
        
        if (activeIndex !== -1 && activeIndex !== currentQuestionIndex) {
            currentQuestionIndex = activeIndex;
            updateActiveQuestion();
            updateProgress();
        }
    }

    // Add scroll listener
    document.querySelector('.content-body').addEventListener('scroll', 
        debounce(handleScroll, 100)
    );

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize the app
    function init() {
        populateDocumentSelector();
        loadDocument(0); // Load first document by default
        
        // Add some helpful keyboard shortcuts info
        console.log('jQuery Interview Guide Keyboard Shortcuts:');
        console.log('Ctrl/Cmd + ↑/↓: Navigate between sections');
        console.log('Ctrl/Cmd + ←/→: Navigate between documents');
    }

    // Start the application
    init();
});
