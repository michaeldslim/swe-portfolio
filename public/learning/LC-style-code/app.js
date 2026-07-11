document.addEventListener('DOMContentLoaded', () => {
  // Configure marked.js
  const renderer = new marked.Renderer();

  // Make all links open in a new tab (e.g., Related LeetCode links)
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

  // Problem documents (LC-style) - KO+EN combined in each file
  // Pattern summary first (00), then Easy set (22-30, 32), then main 1-21 + others
  const documents = [
    { id: 'q0', filename: '00_leetcode_patterns_with_1_33_practice.md', title: '00. LeetCode 패턴 요약 (1–33)' },
    { id: 'q22', filename: '22_find_pivot_index_prefix_sum.md', title: '22. 피벗 인덱스 찾기' },
    { id: 'q23', filename: '23_valid_palindrome_two_pointers.md', title: '23. 유효한 팰린드롬' },
    { id: 'q24', filename: '24_two_sum_hashmap.md', title: '24. 두 수의 합' },
    { id: 'q25', filename: '25_maximum_depth_of_binary_tree_dfs_bfs.md', title: '25. 이진 트리의 최대 깊이' },
    { id: 'q26', filename: '26_flood_fill_dfs_bfs.md', title: '26. 플러드 필' },
    { id: 'q27', filename: '27_last_stone_weight_heap.md', title: '27. 마지막 돌의 무게' },
    { id: 'q28', filename: '28_binary_search_on_sorted_array.md', title: '28. 이진 탐색' },
    { id: 'q29', filename: '29_climbing_stairs_dp.md', title: '29. 계단 오르기' },
    { id: 'q30', filename: '30_reverse_linked_list_iterative.md', title: '30. 연결 리스트 뒤집기' },
    { id: 'q32', filename: '32_unique_frequencies_characters.md', title: '32. 고유 빈도수 판별' },
    { id: 'q1', filename: '01_longest_substring_without_repeating_characters.md', title: '1. 중복 없는 가장 긴 부분 문자열' },
    { id: 'q2', filename: '02_3sum_two_pointers.md', title: '2. 세 수의 합 (3Sum)' },
    { id: 'q3', filename: '03_subarray_sum_equals_k_prefix_sum.md', title: '3. 부분 배열의 합이 K' },
    { id: 'q4', filename: '04_group_anagrams_hashmap.md', title: '4. 애너그램 묶기' },
    { id: 'q5', filename: '05_binary_tree_level_order_bfs.md', title: '5. 이진 트리 레벨 순회' },
    { id: 'q6', filename: '06_shortest_path_unweighted_graph_bfs.md', title: '6. 무가중치 그래프 최단 경로' },
    { id: 'q7', filename: '07_k_closest_points_heap.md', title: '7. 원점에서 가장 가까운 K개 점' },
    { id: 'q8', filename: '08_daily_temperatures_monotonic_stack.md', title: '8. 매일의 온도' },
    { id: 'q9', filename: '09_min_eating_speed_binary_search.md', title: '9. 코코의 바나나 먹기' },
    { id: 'q10', filename: '10_longest_increasing_subsequence_dp_binary_search.md', title: '10. 가장 긴 증가하는 부분 수열' },
    { id: 'q11', filename: '11_unique_paths_grid_dp.md', title: '11. 격자에서의 유일한 경로' },
    { id: 'q12', filename: '12_coin_change_dp.md', title: '12. 동전 교환' },
    { id: 'q13', filename: '13_merge_intervals_greedy.md', title: '13. 구간 병합' },
    { id: 'q14', filename: '14_course_schedule_toposort.md', title: '14. 코스 스케줄' },
    { id: 'q15', filename: '15_permutations_backtracking.md', title: '15. 순열 생성' },
    { id: 'q16', filename: '16_binary_tree_design_basic_operations.md', title: '16. 이진 트리 설계 (기본 연산)' },
    { id: 'q17', filename: '17_reverse_string_with_special_characters_in_place.md', title: '17. 특수 문자를 제외하고 문자열 뒤집기' },
    { id: 'q18', filename: '18_array_traversal_spiral_order.md', title: '18. 2차원 배열 나선형 순회' },
    { id: 'q19', filename: '19_binary_tree_two_children_nodes_count.md', title: '19. 두 자식을 가진 이진 트리 노드 개수 세기' },
    { id: 'q20', filename: '20_merge_sort_implementation.md', title: '20. 병합 정렬 구현' },
    { id: 'q21', filename: '21_linked_list_vs_array_use_cases.md', title: '21. 배열 vs 연결 리스트 사용 사례' },
    { id: 'q31', filename: '31_trapping_rain_water_two_pointers.md', title: '31. 빗물 트래핑' },
    { id: 'q33', filename: '33_generate_balanced_parentheses_backtracking.md', title: '33. 모든 가능한 균형 괄호 생성' },
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

  // Populate select dropdown
  function populateDocumentSelector() {
    documentSelect.innerHTML = '';

    // Top-level pattern summary document (00)
    const patternOption = document.createElement('option');
    patternOption.value = 0;
    patternOption.textContent = documents[0].title;
    documentSelect.appendChild(patternOption);

    // Group label for Easy problems (following 10 entries)
    const easyLabel = document.createElement('option');
    easyLabel.disabled = true;
    easyLabel.textContent = '--- Easy ---';
    documentSelect.appendChild(easyLabel);

    documents.forEach((doc, index) => {
      if (index === 0) return; // skip pattern doc, already added

      // Before the first medium problem (index 11), insert a Medium label
      if (index === 11) {
        const mediumLabel = document.createElement('option');
        mediumLabel.disabled = true;
        mediumLabel.textContent = '--- Medium ---';
        documentSelect.appendChild(mediumLabel);
      }

      const option = document.createElement('option');
      option.value = index;
      option.textContent = doc.title;
      documentSelect.appendChild(option);
    });

    documentSelect.value = currentDocIndex;
  }

  // Populate sidebar list
  function populateProblemList() {
    questionList.innerHTML = '';

    // Top-level pattern summary item
    const patternItem = document.createElement('div');
    patternItem.className = 'question-item';
    if (currentDocIndex === 0) {
      patternItem.classList.add('active');
    }
    const patternNumber = document.createElement('span');
    patternNumber.className = 'question-number';
    patternNumber.textContent = '0';

    const patternTitle = document.createElement('span');
    patternTitle.textContent = documents[0].title;

    patternItem.appendChild(patternNumber);
    patternItem.appendChild(patternTitle);

    patternItem.addEventListener('click', () => {
      loadDocument(0);
    });

    questionList.appendChild(patternItem);

    // Easy group title
    const easyHeader = document.createElement('div');
    easyHeader.className = 'question-group-title';
    easyHeader.textContent = 'Easy';
    questionList.appendChild(easyHeader);

    documents.forEach((doc, index) => {
      if (index === 0) return; // skip pattern doc, already added

      // Insert Medium group title before the first medium problem (index 11)
      if (index === 11) {
        const mediumHeader = document.createElement('div');
        mediumHeader.className = 'question-group-title';
        mediumHeader.textContent = 'Medium';
        questionList.appendChild(mediumHeader);
      }

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

  // Load markdown file and render
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

      // Scroll content to top
      documentContent.parentElement.scrollTop = 0;
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

  // Event listener for select dropdown
  documentSelect.addEventListener('change', () => {
    const index = parseInt(documentSelect.value, 10);
    loadDocument(index);
  });

  // Initialize
  populateDocumentSelector();
  populateProblemList();
  loadDocument(0);
});
