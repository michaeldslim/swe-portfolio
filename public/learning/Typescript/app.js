document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const documentContent = document.getElementById('document-content');
    const questionList = document.getElementById('question-list');
    const documentSelect = document.getElementById('document-select');
    const koBtn = document.getElementById('ko-btn');
    const enBtn = document.getElementById('en-btn');
    const documentTitle = document.getElementById('document-title');
    
    // State
    let currentLanguage = 'ko';
    let currentPart = 'part1';
    
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
    
    // Load document based on language and part
    function loadDocument() {
        const filePath = currentLanguage === 'ko' 
            ? `typescript_interview_ko_${currentPart}.md` 
            : `en/typescript_interview_en_${currentPart}.md`;
            
        documentContent.innerHTML = '<div class="loading">Loading...</div>';
        questionList.innerHTML = '';
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                // Extract questions for sidebar
                const questions = extractQuestions(markdown);
                
                // Process markdown to add IDs to questions for navigation
                const processedMarkdown = processMarkdown(markdown);
                
                // Render markdown
                documentContent.innerHTML = marked.parse(processedMarkdown);
                
                // Apply syntax highlighting to code blocks
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
                
                // Populate sidebar with questions
                populateSidebar(questions);
                
                // Update document title
                updateDocumentTitle();
            })
            .catch(error => {
                console.error('Error loading document:', error);
                documentContent.innerHTML = `<div class="error">Error loading document: ${error.message}</div>`;
            });
    }
    
    // Extract questions from markdown
    function extractQuestions(markdown) {
        const questions = [];
        const lines = markdown.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            // Match numbered questions with bold text (e.g., "1. **Question text**")
            // The TypeScript markdown format has the question number at the beginning of the line
            const match = lines[i].match(/^(\d+)\.\s+\*\*(.*?)\*\*/);
            if (match) {
                questions.push({
                    number: match[1],
                    text: match[2],
                    lineNumber: i
                });
            }
        }
        
        return questions;
    }
    
    // Process markdown to add IDs to questions for navigation
    function processMarkdown(markdown) {
        const lines = markdown.split('\n');
        let processedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            
            // Add ID to questions for navigation
            const match = line.match(/^(\d+)\.\s+\*\*(.*?)\*\*/);
            if (match) {
                const questionNumber = match[1];
                processedLines.push(`<a id="question-${questionNumber}"></a>`);
            }
            
            processedLines.push(line);
        }
        
        return processedLines.join('\n');
    }
    
    // Populate sidebar with questions
    function populateSidebar(questions) {
        questionList.innerHTML = '';
        
        questions.forEach(question => {
            const li = document.createElement('li');
            li.textContent = `${question.number}. ${question.text}`;
            li.dataset.questionNumber = question.number;
            
            li.addEventListener('click', () => {
                // Scroll to question
                const questionElement = document.getElementById(`question-${question.number}`);
                if (questionElement) {
                    questionElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight active question in sidebar
                    document.querySelectorAll('#question-list li').forEach(item => {
                        item.classList.remove('active');
                    });
                    li.classList.add('active');
                }
            });
            
            questionList.appendChild(li);
        });
    }
    
    // Update document title
    function updateDocumentTitle() {
        const partText = currentPart.replace('part', 'Part ');
        const languageText = currentLanguage === 'ko' ? 'Korean' : 'English';
        documentTitle.textContent = `TypeScript Interview Questions - ${partText} (${languageText})`;
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
        currentPart = documentSelect.value;
        loadDocument();
    });
    
    // Initial load
    loadDocument();
});
