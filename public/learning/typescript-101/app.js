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
      { id: 'part1', filename: 'ko/ts-101-part1-beginner.md', title: 'TypeScript 101 - 초급 핵심', shortTitle: '초급 핵심' },
      { id: 'part2', filename: 'ko/ts-101-part2-intermediate.md', title: 'TypeScript 101 - 중급 심화', shortTitle: '중급 심화' },
      { id: 'part3', filename: 'ko/ts-101-part3-advanced.md', title: 'TypeScript 101 - 고급 주제', shortTitle: '고급 주제' }
    ],
    en: [
      { id: 'part1', filename: 'en/ts-101-part1-beginner.md', title: 'TypeScript 101 - Beginner Core', shortTitle: 'Beginner Core' },
      { id: 'part2', filename: 'en/ts-101-part2-intermediate.md', title: 'TypeScript 101 - Intermediate Deep Dive', shortTitle: 'Intermediate' },
      { id: 'part3', filename: 'en/ts-101-part3-advanced.md', title: 'TypeScript 101 - Advanced Topics', shortTitle: 'Advanced' }
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

  function populateDocumentSelector() {
    documentSelect.innerHTML = '';
    documents[currentLanguage].forEach((doc, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = doc.shortTitle;
      documentSelect.appendChild(option);
    });
  }

  function extractQuestions(markdown) {
    const lines = markdown.split('\n');
    const questionPattern = /^#+\s+(.*?)\s*$/;
    const qs = [];
    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(questionPattern);
      if (match && lines[i].startsWith('##') && !lines[i].startsWith('###')) {
        qs.push({ number: qs.length + 1, title: match[1], line: i });
      }
    }
    return qs;
  }

  function populateQuestionList() {
    questionList.innerHTML = '';
    questions.forEach((q, index) => {
      const item = document.createElement('div');
      item.className = 'question-item';
      if (index === currentQuestionIndex) item.classList.add('active');
      item.innerHTML = `<span class="question-number">${q.number}</span> ${q.title}`;
      item.addEventListener('click', () => scrollToQuestion(index));
      questionList.appendChild(item);
    });
  }

  function scrollToQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    currentQuestionIndex = index;
    updateActiveQuestion();
    const els = documentContent.querySelectorAll('.question-title');
    if (els[index]) {
      els[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  function updateActiveQuestion() {
    const items = questionList.querySelectorAll('.question-item');
    items.forEach((item, idx) => {
      if (idx === currentQuestionIndex) item.classList.add('active');
      else item.classList.remove('active');
    });
  }

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

  async function loadDocument(index) {
    if (index < 0 || index >= documents[currentLanguage].length) return;
    currentDocIndex = index;
    documentSelect.value = index;
    currentTitle.textContent = documents[currentLanguage][index].title;
    try {
      const response = await fetch(documents[currentLanguage][index].filename);
      if (!response.ok) throw new Error(`Failed to load document: ${response.status}`);
      const markdown = await response.text();
      questions = extractQuestions(markdown);
      populateQuestionList();
      const processed = processMarkdown(markdown);
      documentContent.innerHTML = marked.parse(processed);
      currentQuestionIndex = -1;
      documentContent.parentElement.scrollTop = 0;
      // highlight after render
      document.querySelectorAll('pre code').forEach(block => {
        try { hljs.highlightElement(block); } catch (e) {}
      });
    } catch (err) {
      console.error('Error loading document:', err);
      const errorMsg = currentLanguage === 'ko' ? '문서를 불러올 수 없습니다' : 'Unable to load document';
      const errorLabel = currentLanguage === 'ko' ? '오류' : 'Error';
      documentContent.innerHTML = `
        <div style="text-align:center; padding:2rem;">
          <h3>${errorMsg}</h3>
          <p>${errorLabel}: ${err.message}</p>
        </div>
      `;
    }
  }

  documentSelect.addEventListener('change', () => {
    loadDocument(parseInt(documentSelect.value));
  });

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

  // init
  populateDocumentSelector();
  loadDocument(0);
});
