document.addEventListener('DOMContentLoaded', function() {
  // State
  let currentLanguage = 'ko';
  let currentFile = 'README.md';

  // DOM Elements
  const koBtn = document.getElementById('ko-btn');
  const enBtn = document.getElementById('en-btn');
  const markdownContent = document.getElementById('markdown-content');
  const navMenu = document.getElementById('nav-menu');

  // Menu items configuration
  const menuItems = [
    { file: 'core-concepts.md', labelKo: '핵심 개념', labelEn: 'Core Concepts' },
    { file: 'components-props-state.md', labelKo: '컴포넌트, Props, State', labelEn: 'Components, Props, and State' },
    { file: 'navigation.md', labelKo: '내비게이션', labelEn: 'Navigation' },
    { file: 'styling-layout.md', labelKo: '스타일링과 레이아웃', labelEn: 'Styling and Layout' },
    { file: 'native-modules.md', labelKo: '네이티브 모듈 & API', labelEn: 'Native Modules & APIs' },
    { file: 'state-management.md', labelKo: '상태 관리', labelEn: 'State Management' },
    { file: 'performance.md', labelKo: '성능 최적화', labelEn: 'Performance Optimization' },
    { file: 'debugging-testing.md', labelKo: '디버깅 & 테스팅', labelEn: 'Debugging & Testing' },
    { file: 'networking.md', labelKo: '네트워킹 & 데이터 페칭', labelEn: 'Networking & Data Fetching' },
    { file: 'deployment.md', labelKo: '배포 & 빌드', labelEn: 'Deployment & Build' },
    { file: 'permissions-security.md', labelKo: '권한 & 보안', labelEn: 'Permissions & Security' },
    { file: 'ecosystem.md', labelKo: '생태계 & 라이브러리', labelEn: 'Ecosystem & Libraries' },
    { file: 'platform-differences.md', labelKo: '플랫폼 차이점', labelEn: 'Platform Differences' },
    { file: 'accessibility-i18n.md', labelKo: '접근성 & 국제화', labelEn: 'Accessibility & i18n' },
    { file: 'ci-cd.md', labelKo: 'CI/CD', labelEn: 'CI/CD' }
  ];

  // Load markdown file
  function loadMD(file) {
    currentFile = file;
    const filePath = currentLanguage === 'ko' ? `ko/${file}` : `en/${file}`;
    
    markdownContent.innerHTML = '<div class="loading">Loading...</div>';
    
    fetch(filePath)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        return res.text();
      })
      .then(md => {
        markdownContent.innerHTML = marked.parse(md);
      })
      .catch(error => {
        console.error('Error loading document:', error);
        markdownContent.innerHTML = `<div class="error">Error loading document: ${error.message}</div>`;
      });
  }

  // Update menu labels based on language
  function updateMenuLabels() {
    navMenu.innerHTML = '';
    menuItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${item.file.replace('.md', '')}`;
      a.textContent = currentLanguage === 'ko' ? item.labelKo : item.labelEn;
      a.onclick = (e) => {
        e.preventDefault();
        loadMD(item.file);
      };
      li.appendChild(a);
      navMenu.appendChild(li);
    });
  }

  // Switch language
  function switchLanguage(lang) {
    if (currentLanguage === lang) return;
    
    currentLanguage = lang;
    
    // Update button states
    if (lang === 'ko') {
      koBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      enBtn.classList.add('active');
      koBtn.classList.remove('active');
    }
    
    // Update menu labels
    updateMenuLabels();
    
    // Reload current file in new language
    loadMD(currentFile);
  }

  // Event listeners
  koBtn.addEventListener('click', () => switchLanguage('ko'));
  enBtn.addEventListener('click', () => switchLanguage('en'));

  // Make loadMD available globally for inline onclick handlers
  window.loadMD = loadMD;

  // Initial load
  updateMenuLabels();
  loadMD('README.md');
});
