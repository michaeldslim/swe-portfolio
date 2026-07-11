document.addEventListener('DOMContentLoaded', () => {
    // Configure marked.js
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });

    // Document data
    const documents = {
        ko: [
            { id: 'part1', filename: 'ko/js-interview-guide-part1-fundamentals.md', title: 'JavaScript 인터뷰 가이드 - 핵심 기초', shortTitle: '핵심 기초' },
            { id: 'part2a', filename: 'ko/js-interview-guide-part2A-objects-prototypes.md', title: 'JavaScript 인터뷰 가이드 - 객체와 프로토타입', shortTitle: '객체와 프로토타입' },
            { id: 'part2b1', filename: 'ko/js-interview-guide-part2B-1-es6-features.md', title: 'JavaScript 인터뷰 가이드 - ES6+ 기능', shortTitle: 'ES6+ 기능' },
            { id: 'part2b2', filename: 'ko/js-interview-guide-part2B-2-async-javascript.md', title: 'JavaScript 인터뷰 가이드 - 비동기 JavaScript', shortTitle: '비동기 JavaScript' },
            { id: 'part2b3', filename: 'ko/js-interview-guide-part2B-3-dom-error-handling.md', title: 'JavaScript 인터뷰 가이드 - DOM과 에러 처리', shortTitle: 'DOM과 에러 처리' }
        ],
        en: [
            { id: 'part1', filename: 'en/js-interview-guide-part1-fundamentals.md', title: 'JavaScript Interview Guide - Core Fundamentals', shortTitle: 'Core Fundamentals' },
            { id: 'part2a', filename: 'en/js-interview-guide-part2A-objects-prototypes.md', title: 'JavaScript Interview Guide - Objects and Prototypes', shortTitle: 'Objects and Prototypes' },
            { id: 'part2b1', filename: 'en/js-interview-guide-part2B-1-es6-features.md', title: 'JavaScript Interview Guide - ES6+ Features', shortTitle: 'ES6+ Features' },
            { id: 'part2b2', filename: 'en/js-interview-guide-part2B-2-async-javascript.md', title: 'JavaScript Interview Guide - Asynchronous JavaScript', shortTitle: 'Asynchronous JavaScript' },
            { id: 'part2b3', filename: 'en/js-interview-guide-part2B-3-dom-error-handling.md', title: 'JavaScript Interview Guide - DOM and Error Handling', shortTitle: 'DOM and Error Handling' }
        ]
    };

    let currentLanguage = 'ko';
    let currentDocIndex = 0;
    let questions = [];
    let currentQuestionIndex = -1;

    const documentSelect = document.getElementById('document-select');
    const questionList = document.getElementById('question-list');
    const documentContent = document.getElementById('document-content');
    const currentTitle = document.getElementById('current-title');
    const koBtn = document.getElementById('ko-btn');
    const enBtn = document.getElementById('en-btn');

    // Populate document selector
    function populateDocumentSelector() {
        documentSelect.innerHTML = '';
        documents[currentLanguage].forEach((doc, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = doc.shortTitle;
            documentSelect.appendChild(option);
        });
    }

    // Extract questions from markdown content
    function extractQuestions(markdown) {
        const lines = markdown.split('\n');
        const questionPattern = /^#+\s+(.*?)\s*$/;
        const questions = [];

        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(questionPattern);
            if (match && lines[i].startsWith('##') && !lines[i].startsWith('###')) {
                questions.push({
                    number: questions.length + 1,
                    title: match[1],
                    line: i
                });
            }
        }

        return questions;
    }

    // Populate question list
    function populateQuestionList() {
        questionList.innerHTML = '';
        questions.forEach((question, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'question-item';
            if (index === currentQuestionIndex) {
                listItem.classList.add('active');
            }
            listItem.innerHTML = `<span class="question-number">${question.number}</span> ${question.title}`;
            listItem.addEventListener('click', () => {
                scrollToQuestion(index);
            });
            questionList.appendChild(listItem);
        });
    }

    // Scroll to specific question
    function scrollToQuestion(index) {
        if (index < 0 || index >= questions.length) return;
        
        currentQuestionIndex = index;
        updateActiveQuestion();
        
        const questionElements = documentContent.querySelectorAll('.question-title');
        if (questionElements[index]) {
            questionElements[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update active question in sidebar
    function updateActiveQuestion() {
        const items = questionList.querySelectorAll('.question-item');
        items.forEach((item, index) => {
            if (index === currentQuestionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Process markdown content to add question anchors
    function processMarkdown(markdown) {
        const lines = markdown.split('\n');
        const questionPattern = /^(#+\s+.*?)\s*$/;
        
        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(questionPattern);
            if (match && lines[i].startsWith('##') && !lines[i].startsWith('###')) {
                const questionIndex = questions.findIndex(q => q.line === i);
                if (questionIndex !== -1) {
                    lines[i] = `<div class="question-title" id="question-${questionIndex}">${match[1]}</div>`;
                }
            }
        }
        
        return lines.join('\n');
    }

    // Load document content
    async function loadDocument(index) {
        if (index < 0 || index >= documents[currentLanguage].length) return;
        
        currentDocIndex = index;
        documentSelect.value = index;
        currentTitle.textContent = documents[currentLanguage][index].title;
        
        try {
            const response = await fetch(documents[currentLanguage][index].filename);
            if (!response.ok) {
                throw new Error(`Failed to load document: ${response.status}`);
            }
            
            const markdown = await response.text();
            questions = extractQuestions(markdown);
            populateQuestionList();
            
            const processedMarkdown = processMarkdown(markdown);
            documentContent.innerHTML = marked.parse(processedMarkdown);
            
            // Reset current question
            currentQuestionIndex = -1;
            
            // Scroll to top
            documentContent.parentElement.scrollTop = 0;
        } catch (error) {
            console.error('Error loading document:', error);
            const errorMsg = currentLanguage === 'ko' ? '문서를 불러올 수 없습니다' : 'Unable to load document';
            const errorLabel = currentLanguage === 'ko' ? '오류' : 'Error';
            documentContent.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>${errorMsg}</h3>
                    <p>${errorLabel}: ${error.message}</p>
                </div>
            `;
        }
    }

    // Document selector event listener
    documentSelect.addEventListener('change', () => {
        loadDocument(parseInt(documentSelect.value));
    });

    // Language toggle event listeners
    koBtn.addEventListener('click', () => {
        if (currentLanguage !== 'ko') {
            currentLanguage = 'ko';
            koBtn.classList.add('active');
            enBtn.classList.remove('active');
            populateDocumentSelector();
            loadDocument(currentDocIndex);
        }
    });

    enBtn.addEventListener('click', () => {
        if (currentLanguage !== 'en') {
            currentLanguage = 'en';
            enBtn.classList.add('active');
            koBtn.classList.remove('active');
            populateDocumentSelector();
            loadDocument(currentDocIndex);
        }
    });

    // Initialize
    populateDocumentSelector();
    loadDocument(0);
});
