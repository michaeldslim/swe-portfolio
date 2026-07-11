document.addEventListener('DOMContentLoaded', () => {
  const renderer = new marked.Renderer();

  const originalLink = renderer.link;
  renderer.link = function (href, title, text) {
    const html = originalLink.call(this, href, title, text);
    return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
  };

  marked.setOptions({
    renderer,
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true,
  });

  const documents = [
    {
      id: 'el1',
      filename: 'EventLoopAndPromiseMechanics.md',
      title: 'Event Loop & Promise Mechanics (50 Quizzes)',
    },
    {
      id: 'git1',
      filename: 'GitSubmodule.md',
      title: 'Git Submodule 완전 정리',
    },
  ];

  let currentDocIndex = 0;

  const documentSelect = document.getElementById('document-select');
  const questionList = document.getElementById('question-list');
  const documentContent = document.getElementById('document-content');
  const currentTitle = document.getElementById('current-title');
  const appContainer = document.querySelector('.app-container');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      appContainer.classList.toggle('sidebar-collapsed');
    });
  }

  function populateDocumentSelector() {
    documentSelect.innerHTML = '';

    documents.forEach((doc, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = doc.title;
      documentSelect.appendChild(option);
    });

    documentSelect.value = currentDocIndex;
  }

  function populateProblemList() {
    questionList.innerHTML = '';

    documents.forEach((doc, index) => {
      const item = document.createElement('div');
      item.className = 'question-item';
      if (index === currentDocIndex) {
        item.classList.add('active');
      }

      const numberSpan = document.createElement('span');
      numberSpan.className = 'question-number';
      numberSpan.textContent = String(index + 1);

      const titleSpan = document.createElement('span');
      titleSpan.textContent = doc.title;

      item.appendChild(numberSpan);
      item.appendChild(titleSpan);

      item.addEventListener('click', () => {
        loadDocument(index);
      });

      questionList.appendChild(item);
    });
  }

  function updateActiveItem() {
    const items = questionList.querySelectorAll('.question-item');
    items.forEach((item, index) => {
      if (index === currentDocIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  async function loadDocument(index) {
    if (index < 0 || index >= documents.length) return;

    currentDocIndex = index;
    documentSelect.value = index;
    currentTitle.textContent = documents[index].title;

    try {
      const response = await fetch(documents[index].filename);
      if (!response.ok) {
        throw new Error(`Failed to load document: ${response.status}`);
      }

      const markdown = await response.text();
      documentContent.innerHTML = marked.parse(markdown);
      updateActiveItem();

      if (documentContent.parentElement) {
        documentContent.parentElement.scrollTop = 0;
      }
    } catch (error) {
      console.error('Error loading document:', error);
      documentContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h3>문서를 불러올 수 없습니다</h3>
          <p>Error: ${error.message}</p>
        </div>
      `;
    }
  }

  documentSelect.addEventListener('change', () => {
    const index = parseInt(documentSelect.value, 10);
    loadDocument(index);
  });

  populateDocumentSelector();
  populateProblemList();
  loadDocument(0);
});
