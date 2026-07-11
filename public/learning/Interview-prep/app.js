document.addEventListener('DOMContentLoaded', () => {
  // Configure marked.js
  const renderer = new marked.Renderer();

  // Make all links open in a new tab
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

  // Interview prep documents (KO + EN)
  const documents = [
    { id: 'q1', filename: '01_remove_duplicates_from_array_new_array.md', title: '01. 배열에서 중복 제거 (새 배열 허용) / Remove Duplicates from Array' },
    { id: 'q2', filename: '02_implement_stack_using_array.md', title: '02. 배열로 스택 구현 / Implement Stack Using Array' },
    { id: 'q3', filename: '03_reverse_singly_linked_list_in_place.md', title: '03. 단일 연결 리스트 뒤집기 (제자리) / Reverse Singly Linked List In-place' },
    { id: 'q4', filename: '04_check_power_of_three.md', title: '04. 3의 거듭제곱 판별 / Check Power of 3' },
    { id: 'q5', filename: '05_check_palindrome_string_number.md', title: '05. 문자열/숫자 팰린드롬 판별 / Check Palindrome (String/Number)' },
    { id: 'q6', filename: '06_common_values_in_two_hashsets.md', title: '06. 두 HashSet의 공통 원소 찾기 / Common Values in Two HashSets' },
    { id: 'q7', filename: '07_max_depth_of_binary_tree.md', title: '07. 이진 트리의 최대 깊이 / Maximum Depth of Binary Tree' },
    { id: 'q8', filename: '08_inheritance_in_oop.md', title: '08. 객체지향에서 상속 / Inheritance in OOP' },
    { id: 'q9', filename: '09_data_structure_for_person_by_id.md', title: '09. 사람 정보(이름/생일)를 ID로 관리하는 자료구조 / Data Structure for Person by ID' },
    { id: 'q10', filename: '10_difference_array_and_arraylist.md', title: '10. 배열 vs ArrayList 차이 / Difference Between Array and ArrayList' },
    { id: 'q11', filename: '11_recursion_advantages_disadvantages.md', title: '11. 재귀(Recursion)의 정의와 장단점 / What is Recursion' },
    { id: 'q12', filename: '12_difference_double_equals_vs_equals_method.md', title: '12. == vs === (Loose vs Strict Equality in JS)' },
    { id: 'q13', filename: '13_override_equals_also_override_hashcode.md', title: '13. equals/hashCode 계약과 JS 해시 개념' },
    { id: 'q14', filename: '14_browser_flow_chatgpt_enter.md', title: '14. 브라우저 주소창에 chatgpt.com 입력 → 엔터 흐름 / Browser Flow' },
    { id: 'q15', filename: '15_http_vs_https_cookies_sessions_tokens.md', title: '15. HTTP vs HTTPS + 쿠키/세션/토큰 비교' },
    { id: 'q16', filename: '16_react_lifecycle_react18_concurrent_strictmode.md', title: '16. React 라이프사이클, React 18 Concurrent, StrictMode에서 useEffect 두 번' },
    { id: 'q17', filename: '17_react_data_normalization.md', title: '17. React 데이터 정규화 (Data Normalization)' },
    { id: 'q18', filename: '18_event_loop_console_log_order.md', title: '18. 이벤트 루프와 콘솔 로그 순서 / Event Loop Console Order' },
    { id: 'q19', filename: '19_group_by_department_reduce.md', title: '19. dep 기준 그룹화 / Group by Department' },
    { id: 'q20', filename: '20_this_binding_tricky_callbacks.md', title: '20. 콜백에서 this 바인딩 트릭 / this in Callbacks' },
    { id: 'q21', filename: '21_closure_loop_var_vs_let.md', title: '21. for 루프 클로저 var vs let' },
    { id: 'q22', filename: '22_array_sort_trap_numeric_vs_lexicographic.md', title: '22. Array.sort 숫자 정렬 함정' },
    { id: 'q23', filename: '23_method_extraction_this_loss.md', title: '23. 메서드 분리 시 this 손실 / Method Extraction this Loss' },
    { id: 'q24', filename: '24_hoisting_var_let_const_tdz.md', title: '24. 호이스팅과 TDZ (var/let/const)' },
    { id: 'q25', filename: '25_async_await_event_loop_order.md', title: '25. async/await와 이벤트 루프 순서' },
    { id: 'q26', filename: '26_function_argument_vs_loop.md', title: '26. 함수 인자 vs 루프 범위 / Function Argument vs Loop' },
    { id: 'q27', filename: '27_loop_off_by_one_and_argument.md', title: '27. off-by-one + 인자 사용 여부' },
    { id: 'q28', filename: '28_nextjs_ssr_what_and_seo.md', title: '28. Next.js SSR이 하는 일과 SEO 영향' },
    { id: 'q29', filename: '29_nextjs_ssr_ssg_isr_comparison.md', title: '29. Next.js SSR vs SSG vs ISR 비교' },
    { id: 'q30', filename: '30_useeffect_vs_uselayouteffect.md', title: '30. useEffect vs useLayoutEffect 차이' },
    { id: 'q31', filename: '31_react_memo_usememo_usecallback.md', title: '31. React.memo / useMemo / useCallback' },
    { id: 'q32', filename: '32_react_context_vs_props_drilling.md', title: '32. React Context vs Props Drilling' },
    { id: 'q33', filename: '33_react_suspense_and_error_boundaries.md', title: '33. React Suspense + Error Boundary' },
    { id: 'q34', filename: '34_controlled_vs_uncontrolled_components.md', title: '34. Controlled vs Uncontrolled Components' },
    { id: 'q35', filename: '35_react_keys_and_reconciliation.md', title: '35. React key와 Reconciliation' },
    { id: 'q36', filename: '36_react_lifecycle_hooks_overview.md', title: '36. React Lifecycle (Hooks 기준)' },
    { id: 'q37', filename: '37_react_useeffect_dependency_trap.md', title: '37. useEffect dependency trap (stale closure)' },
    { id: 'q38', filename: '38_react_strictmode_double_effects_snippet.md', title: '38. StrictMode에서 useEffect 로그 순서' },
    { id: 'q39', filename: '39_react_keys_state_mismatch_snippet.md', title: '39. key 실수로 인한 상태 꼬임' },
    { id: 'q40', filename: '40_usememo_usecallback_dependency_bug.md', title: '40. useMemo / useCallback dependency bug' },
    { id: 'q41', filename: '41_suspense_error_boundary_ordering_tricky.md', title: '41. Suspense vs Error Boundary ordering' },
    { id: 'q42', filename: '42_controlled_uncontrolled_validation_tricky.md', title: '42. Controlled vs Uncontrolled validation 트릭' },
    { id: 'q43', filename: '43_react_router_stale_params_snippet.md', title: '43. React Router stale params in effects' },
    { id: 'q44', filename: '44_nextjs_client_vs_server_components_tricky.md', title: '44. Next.js Client vs Server Component 트릭' },
    { id: 'q45', filename: '45_react_query_staletime_cache_tricky.md', title: '45. React Query staleTime + cache key 트릭' },
    { id: 'q46', filename: '46_nextjs_notfound_redirect_order_tricky.md', title: '46. Next.js notFound() vs redirect() 순서' },
    { id: 'q47', filename: '47_typescript_any_vs_unknown_tricky.md', title: '47. TypeScript any vs unknown 트릭' },
    { id: 'q48', filename: '48_typescript_generics_keyof_inference_tricky.md', title: '48. TypeScript generics + keyof 추론' },
    { id: 'q49', filename: '49_typescript_discriminated_union_exhaustive_switch.md', title: '49. TS Discriminated Union + exhaustive switch' },
    { id: 'q50', filename: '50_typescript_conditional_types_extends_tricky.md', title: '50. TS conditional types extends 트릭' },
    { id: 'q51', filename: '51_typescript_utility_types_predict_type_tricky.md', title: '51. TS Utility Types (Partial/Pick/Omit/ReturnType)' },
    { id: 'q52', filename: '52_typescript_mapped_types_readonly_record.md', title: '52. TS Mapped Types (Readonly/Record/Custom)' },
    { id: 'q53', filename: '53_typescript_union_narrowing_in_operator_tricky.md', title: '53. TS Union Narrowing with in/type' },
    { id: 'q54', filename: '54_react_data_normalization_deep_dive.md', title: '54. React 데이터 정규화 Deep Dive' },
    { id: 'q55', filename: '55_url_shortener_system_design.md', title: '55. URL Shortener 시스템 설계' },
    { id: 'q56', filename: '56_rest_apis_solid_design_patterns_js.md', title: '56. REST APIs, SOLID, JS Design Patterns' },
    { id: 'q57', filename: '57_quicksort_mergesort_in_javascript.md', title: '57. Quick Sort & Merge Sort in JavaScript' },
    { id: 'q58', filename: '58_reverse_string_and_swap_numbers_js.md', title: '58. Reverse String & Swap Two Numbers in JS' },
    { id: 'q59', filename: '59_react_filtering_and_pagination.md', title: '59. React Filtering & Pagination' },
    { id: 'q60', filename: '60_js_pass_by_value_vs_reference.md', title: '60. JS Pass by Value vs Reference' },
    { id: 'q61', filename: '61_js_var_let_const_hoisting_duplicates_flat.md', title: '61. JS var/let/const, Hoisting, Duplicates, flat' },
    { id: 'q62', filename: '62_javascript_palindrome_string.md', title: '62. JavaScript Palindrome String' },
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

    documents.forEach((doc, index) => {
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
