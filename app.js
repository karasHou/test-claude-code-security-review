(() => {
  /** 当前过滤状态：all | active | completed */
  let currentFilter = 'all';

  /** 内存中的待办列表 */
  /** @type {{ id: string; title: string; completed: boolean }[]} */
  let todos = [];

  /** 生成唯一 id（时间 + 计数） */
  const createId = (() => {
    let seq = 0;
    return () => `${Date.now()}_${seq++}`;
  })();

  /** 获取 DOM 引用 */
  const $input = /** @type {HTMLInputElement} */ (document.getElementById('todo-input'));
  const $addBtn = /** @type {HTMLButtonElement} */ (document.getElementById('add-btn'));
  const $list = /** @type {HTMLUListElement} */ (document.getElementById('todo-list'));
  const $left = /** @type {HTMLSpanElement} */ (document.getElementById('left-count'));
  const $filterBtns = /** @type {NodeListOf<HTMLButtonElement>} */ (document.querySelectorAll('.filter-btn'));
  const $clearCompleted = /** @type {HTMLButtonElement} */ (document.getElementById('clear-completed'));

  /** 添加待办 */
  const addTodo = (title) => {
    const text = String(title || '').trim();
    if (!text) return;
    todos = [{ id: createId(), title: text, completed: false }, ...todos];
    render();
  };

  /** 切换完成状态 */
  const toggleTodo = (id) => {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
  };

  /** 删除待办 */
  const removeTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    render();
  };

  /** 清除已完成 */
  const clearCompleted = () => {
    todos = todos.filter(t => !t.completed);
    render();
  };

  /** 设置过滤 */
  const setFilter = (filter) => {
    currentFilter = filter;
    render();
  };

  /** 根据过滤返回列表 */
  const getVisibleTodos = () => {
    if (currentFilter === 'active') return todos.filter(t => !t.completed);
    if (currentFilter === 'completed') return todos.filter(t => t.completed);
    return todos;
  };

  /** 更新底部统计与过滤按钮激活态 */
  const renderFooter = () => {
    const left = todos.reduce((acc, t) => acc + (t.completed ? 0 : 1), 0);
    $left.textContent = String(left);
    $filterBtns.forEach(btn => {
      const isActive = btn.dataset.filter === currentFilter;
      btn.classList.toggle('bg-gray-100', isActive);
      btn.classList.toggle('text-gray-700', isActive);
    });
  };

  /** 渲染单个条目 */
  const renderItem = (todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item px-4 py-3 flex items-start gap-3';
    li.setAttribute('data-id', todo.id);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'mt-[3px] h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500';
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const title = document.createElement('div');
    title.className = 'todo-title flex-1 select-text';
    title.textContent = todo.title;
    if (todo.completed) title.classList.add('line-through', 'text-gray-400');

    const del = document.createElement('button');
    del.className = 'text-sm text-red-600 hover:text-red-700 px-2 py-1';
    del.textContent = '删除';
    del.addEventListener('click', () => removeTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(del);
    return li;
  };

  /** 渲染列表 */
  const renderList = () => {
    $list.innerHTML = '';
    const visible = getVisibleTodos();
    if (visible.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'px-4 py-8 text-center text-gray-400';
      empty.textContent = '暂无待办';
      $list.appendChild(empty);
      return;
    }
    const frag = document.createDocumentFragment();
    visible.forEach(t => frag.appendChild(renderItem(t)));
    $list.appendChild(frag);
  };

  /** 顶层渲染 */
  const render = () => {
    renderList();
    renderFooter();
  };

  /** 事件绑定 */
  const bindEvents = () => {
    $addBtn.addEventListener('click', () => {
      addTodo($input.value);
      $input.value = '';
      $input.focus();
    });
    $input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTodo($input.value);
        $input.value = '';
      }
    });
    $filterBtns.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
    $clearCompleted.addEventListener('click', clearCompleted);
  };

  // 初始化
  bindEvents();
  render();
})();
