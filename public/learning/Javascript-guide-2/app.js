// Configuration
const CONFIG = {
    contentDir: 'content/topics/',
    topicsFile: 'content/topics.json',
    defaultTopic: 'execution-context-hoisting'
};

// State
let topics = {};
let currentLanguage = 'ko';
let currentTopicId = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const loadingIndicator = document.getElementById('loading');
const menuToggle = document.querySelector('.menu-toggle');

// Initialize the application
async function init() {
    // Load topics
    await loadTopics();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load the default or current topic
    const topicId = getTopicIdFromHash() || CONFIG.defaultTopic;
    await loadTopic(topicId);
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Load topics from the topics.json file
async function loadTopics() {
    try {
        const response = await fetch(CONFIG.topicsFile);
        if (!response.ok) {
            throw new Error(`Failed to load topics: ${response.statusText}`);
        }
        const data = await response.json();
        topics = data.topics;
        renderSidebar();
    } catch (error) {
        console.error('Error loading topics:', error);
        showError('Failed to load topics. Please check the console for details.');
    }
}

// Render the sidebar navigation
function renderSidebar() {
    const currentTopics = topics[currentLanguage];
    if (!currentTopics || !currentTopics.length) return;
    
    const sidebarTitle = document.createElement('div');
    sidebarTitle.className = 'sidebar-header';
    sidebarTitle.innerHTML = '<center><div><a href="../"><h4>Tech hub</h4></a></div><h1>JavaScript Fundamentals</h1></center>';
    
    // Language toggle
    const languageToggle = document.createElement('div');
    languageToggle.className = 'language-toggle';
    languageToggle.innerHTML = `
        <button id="ko-btn" class="lang-btn ${currentLanguage === 'ko' ? 'active' : ''}">한국어</button>
        <button id="en-btn" class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}">English</button>
    `;
    
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.className = 'toc';
    
    currentTopics.forEach(topic => {
        const li = document.createElement('li');
        li.className = 'toc-item';
        
        const a = document.createElement('a');
        a.href = `#${topic.id}`;
        a.className = 'toc-link';
        a.textContent = topic.title;
        a.dataset.topicId = topic.id;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            loadTopic(topic.id);
            // Close mobile menu if open
            document.body.classList.remove('sidebar-open');
            sidebar.classList.remove('open');
        });
        
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    nav.appendChild(ul);
    
    // Clear existing content and append new content
    sidebar.innerHTML = '';
    sidebar.appendChild(sidebarTitle);
    sidebar.appendChild(languageToggle);
    sidebar.appendChild(nav);
    
    // Add language toggle event listeners
    document.getElementById('ko-btn').addEventListener('click', () => switchLanguage('ko'));
    document.getElementById('en-btn').addEventListener('click', () => switchLanguage('en'));
}

// Switch language
function switchLanguage(lang) {
    if (currentLanguage === lang) return;
    
    currentLanguage = lang;
    renderSidebar();
    
    // Reload current topic in new language
    if (currentTopicId) {
        loadTopic(currentTopicId);
    }
}

// Load a specific topic by ID
async function loadTopic(topicId) {
    // Update active link
    updateActiveLink(topicId);
    
    // Find the topic
    const currentTopics = topics[currentLanguage];
    const topic = currentTopics.find(t => t.id === topicId);
    if (!topic) {
        showError(`Topic not found: ${topicId}`);
        return;
    }
    
    // Update URL
    window.location.hash = topicId;
    currentTopicId = topicId;
    
    // Show loading state
    content.innerHTML = '<div class="loading-content">Loading...</div>';
    
    try {
        // Load markdown content
        const response = await fetch(`${CONFIG.contentDir}${topic.file}`);
        if (!response.ok) {
            throw new Error(`Failed to load topic: ${response.statusText}`);
        }
        
        const markdown = await response.text();
        const html = marked.parse(markdown);
        
        // Render content
        content.innerHTML = `
            <article class="markdown-body">
                ${html}
            </article>
        `;
        
        // Apply syntax highlighting
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error(`Error loading topic ${topicId}:`, error);
        showError(`Failed to load topic: ${topic.title}. Please check the console for details.`);
    }
}

// Update the active link in the sidebar
function updateActiveLink(topicId) {
    document.querySelectorAll('.toc-link').forEach(link => {
        if (link.dataset.topicId === topicId) {
            link.classList.add('active');
            // Scroll the active link into view
            link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            link.classList.remove('active');
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        const topicId = getTopicIdFromHash();
        if (topicId && topicId !== currentTopicId) {
            loadTopic(topicId);
        }
    });
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
            document.body.classList.toggle('sidebar-open');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
        }
    });
    
    // Handle clicks on anchor links within content
    content.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Update URL without triggering navigation
                history.pushState(null, '', `#${id}`);
            }
        }
    });
}

// Get topic ID from URL hash
function getTopicIdFromHash() {
    const hash = window.location.hash.substring(1);
    const currentTopics = topics[currentLanguage];
    return currentTopics && currentTopics.some(topic => topic.id === hash) ? hash : null;
}

// Show error message
function showError(message) {
    content.innerHTML = `
        <div class="error">
            <h2>Error</h2>
            <p>${message}</p>
        </div>
    `;
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
