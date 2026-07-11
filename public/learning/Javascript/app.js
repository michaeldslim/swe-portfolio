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
            { id: 'part1', filename: 'javascript_interview_ko_part1.md', title: 'JavaScript 개발자 인터뷰 질문 (기본 개념)' },
            { id: 'part2', filename: 'javascript_interview_ko_part2.md', title: 'JavaScript 개발자 인터뷰 질문 (함수와 스코프)' },
            { id: 'part3', filename: 'javascript_interview_ko_part3.md', title: 'JavaScript 개발자 인터뷰 질문 (객체와 프로토타입)' },
            { id: 'part4', filename: 'javascript_interview_ko_part4.md', title: 'JavaScript 개발자 인터뷰 질문 (비동기 프로그래밍)' },
            { id: 'part5', filename: 'javascript_interview_ko_part5.md', title: 'JavaScript 개발자 인터뷰 질문 (ES6+ 기능)' },
            { id: 'part6', filename: 'javascript_interview_ko_part6.md', title: 'JavaScript 개발자 인터뷰 질문 (DOM과 브라우저)' },
            { id: 'part7', filename: 'javascript_interview_ko_part7.md', title: 'JavaScript 개발자 인터뷰 질문 (성능과 최적화)' },
            { id: 'part8', filename: 'javascript_interview_ko_part8.md', title: 'JavaScript 개발자 인터뷰 질문 (보안)' },
            { id: 'practical', filename: 'javascript_interview_ko_practical.md', title: 'JavaScript 개발자 인터뷰 질문 (실전 문제)' },
            { id: 'trends', filename: 'javascript_interview_ko_trends.md', title: 'JavaScript 개발자 인터뷰 질문 (최신 트렌드)' }
        ],
        en: [
            { id: 'part1', filename: 'en/javascript_interview_en_part1.md', title: 'JavaScript Developer Interview Questions (Basic Concepts)' },
            { id: 'part2', filename: 'en/javascript_interview_en_part2.md', title: 'JavaScript Developer Interview Questions (Functions and Scope)' },
            { id: 'part3', filename: 'en/javascript_interview_en_part3.md', title: 'JavaScript Developer Interview Questions (Objects and Prototypes)' },
            { id: 'part4', filename: 'en/javascript_interview_en_part4.md', title: 'JavaScript Developer Interview Questions (Asynchronous Programming)' },
            { id: 'part5', filename: 'en/javascript_interview_en_part5.md', title: 'JavaScript Developer Interview Questions (ES6+ Features)' },
            { id: 'part6', filename: 'en/javascript_interview_en_part6.md', title: 'JavaScript Developer Interview Questions (DOM and Browser)' },
            { id: 'part7', filename: 'en/javascript_interview_en_part7.md', title: 'JavaScript Developer Interview Questions (Performance and Optimization)' },
            { id: 'part8', filename: 'en/javascript_interview_en_part8.md', title: 'JavaScript Developer Interview Questions (Security)' },
            { id: 'practical', filename: 'en/javascript_interview_en_practical.md', title: 'JavaScript Developer Interview Questions (Practical Problems)' },
            { id: 'trends', filename: 'en/javascript_interview_en_trends.md', title: 'JavaScript Developer Interview Questions (Latest Trends)' }
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
            option.textContent = doc.title.split('(')[1].replace(')', '').trim();
            documentSelect.appendChild(option);
        });
    }

    // Extract questions from markdown content
    function extractQuestions(markdown) {
        const lines = markdown.split('\n');
        const questionPattern = /^\d+\.\s\*\*(.*?)\*\*/;
        const questions = [];

        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(questionPattern);
            if (match) {
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
        const questionPattern = /^(\d+\.\s\*\*.*?\*\*)/;
        
        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(questionPattern);
            if (match) {
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
            documentContent.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>${currentLanguage === 'ko' ? '문서를 불러올 수 없습니다' : 'Unable to load document'}</h3>
                    <p>${currentLanguage === 'ko' ? '오류' : 'Error'}: ${error.message}</p>
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
