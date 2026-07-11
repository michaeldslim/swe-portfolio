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
    const documents = [
        { id: 1, filename: '01_테라폼_소개.md', title: '테라폼 소개' },
        { id: 2, filename: '02_테라폼_설치_및_기본_명령어.md', title: '테라폼 설치 및 기본 명령어' },
        { id: 3, filename: '03_테라폼_구성_파일_및_HCL_문법.md', title: '테라폼 구성 파일 및 HCL 문법' },
        { id: 4, filename: '04_테라폼_상태_관리_및_백엔드.md', title: '테라폼 상태 관리 및 백엔드' },
        { id: 5, filename: '05_테라폼_모듈_및_재사용성.md', title: '테라폼 모듈 및 재사용성' },
        { id: 6, filename: '06_테라폼_변수_출력_및_데이터_관리.md', title: '테라폼 변수 출력 및 데이터 관리' },
        { id: 7, filename: '07_테라폼_프로비저너_및_프로비저닝.md', title: '테라폼 프로비저너 및 프로비저닝' },
        { id: 8, filename: '08_테라폼_워크스페이스_및_환경_관리.md', title: '테라폼 워크스페이스 및 환경 관리' },
        { id: 9, filename: '09_테라폼_고급_기능_및_모범_사례.md', title: '테라폼 고급 기능 및 모범 사례' },
        { id: 10, filename: '10_React_Firebase_Terraform_활용.md', title: 'React Firebase Terraform 활용' }
    ];

    let currentDocIndex = 0;
    const documentList = document.getElementById('document-list');
    const documentContent = document.getElementById('document-content');
    const currentTitle = document.getElementById('current-title');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Populate document list
    documents.forEach((doc, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'doc-item';
        listItem.innerHTML = `<span class="doc-number">${doc.id}</span> ${doc.title}`;
        listItem.addEventListener('click', () => {
            loadDocument(index);
        });
        documentList.appendChild(listItem);
    });

    // Load document content
    async function loadDocument(index) {
        if (index < 0 || index >= documents.length) return;
        
        currentDocIndex = index;
        updateNavButtons();
        updateActiveDocument();
        
        try {
            const response = await fetch(documents[index].filename);
            if (!response.ok) {
                throw new Error(`Failed to load document: ${response.status}`);
            }
            
            const markdown = await response.text();
            documentContent.innerHTML = marked.parse(markdown);
            currentTitle.textContent = documents[index].title;
            
            // Scroll to top
            documentContent.parentElement.scrollTop = 0;
        } catch (error) {
            console.error('Error loading document:', error);
            documentContent.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>문서를 불러올 수 없습니다</h3>
                    <p>오류: ${error.message}</p>
                </div>
            `;
        }
    }

    // Update navigation buttons
    function updateNavButtons() {
        prevBtn.disabled = currentDocIndex === 0;
        nextBtn.disabled = currentDocIndex === documents.length - 1;
    }

    // Update active document in sidebar
    function updateActiveDocument() {
        const items = documentList.querySelectorAll('.doc-item');
        items.forEach((item, index) => {
            if (index === currentDocIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Navigation button event listeners
    prevBtn.addEventListener('click', () => {
        if (currentDocIndex > 0) {
            loadDocument(currentDocIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentDocIndex < documents.length - 1) {
            loadDocument(currentDocIndex + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            loadDocument(currentDocIndex - 1);
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            loadDocument(currentDocIndex + 1);
        }
    });

    // Load the first document
    loadDocument(0);
});
