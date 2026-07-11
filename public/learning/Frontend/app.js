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
        ko: { filename: 'frontend_interview_ko.md', title: '프론트엔드 엔지니어 인터뷰 - 웹 기술 질문과 답변' },
        en: { filename: 'frontend_interview_en.md', title: 'Frontend Engineer Interview - Web Technology Questions and Answers' }
    };

    let currentLanguage = 'ko';
    const documentList = document.getElementById('document-list');
    const documentContent = document.getElementById('document-content');
    const currentTitle = document.getElementById('current-title');
    const koBtn = document.getElementById('ko-btn');
    const enBtn = document.getElementById('en-btn');

    // Populate document list
    function updateDocumentList() {
        documentList.innerHTML = '';
        
        const listItem = document.createElement('li');
        listItem.className = 'doc-item active';
        listItem.textContent = documents[currentLanguage].title;
        documentList.appendChild(listItem);
    }

    // Load document content
    async function loadDocument() {
        try {
            const response = await fetch(documents[currentLanguage].filename);
            if (!response.ok) {
                throw new Error(`Failed to load document: ${response.status}`);
            }
            
            const markdown = await response.text();
            documentContent.innerHTML = marked.parse(markdown);
            currentTitle.textContent = documents[currentLanguage].title;
            
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

    // Language toggle event listeners
    koBtn.addEventListener('click', () => {
        if (currentLanguage !== 'ko') {
            currentLanguage = 'ko';
            koBtn.classList.add('active');
            enBtn.classList.remove('active');
            updateDocumentList();
            loadDocument();
        }
    });

    enBtn.addEventListener('click', () => {
        if (currentLanguage !== 'en') {
            currentLanguage = 'en';
            enBtn.classList.add('active');
            koBtn.classList.remove('active');
            updateDocumentList();
            loadDocument();
        }
    });

    // Initialize
    updateDocumentList();
    loadDocument();
});
