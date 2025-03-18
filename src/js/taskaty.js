let searchResults = null;
let currentTodos = [];
const tfoot = document.querySelector('tfoot')

const paginate = (page, limit = 10) => ({
  limit,
  skip: (page - 1) * limit
})

const getAllTodos = async () => {
  try {
    const { todos } = await getTodos(MAX_LIMIT);
    return todos;
  } catch (e) {
    console.error(e.message);
  }
}

const renderTodoRow = (todo) => `
  <tr class="odd:bg-gray-100 even:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800 rounded-2xl last:mb-0">
    <td class="border-s-[6px] dark:text-white ${todo.completed ? 'border-primarygreen' : 'border-secondary'} py-3 text-center rounded-s-2xl text-gray-900">${todo.id}</td>
    <td class="editable-td py-3 text-center max-h-[50px] truncate w-[900px] text-gray-900 dark:text-white ${todo.completed ? 'line-through' : ''}"><span class="editable-text border-2 border-transparent text-gray-900 dark:text-white">${todo.todo}</span>
      <input data-id="${todo.id}" class="editable-input text-gray-900 hidden w-fit h-full text-center p-2 border-2 rounded border-transparent focus:outline-none focus:border-2 focus:border-main focus:ring-main" value="${todo.todo}" size="${todo.todo.length}" />
    </td>
    <td class="py-3 text-center min-w-[100px] dark:text-white text-gray-900">${todo.userId}</td>
    <td class="py-3 text-center">
      ${todo.completed
    ? '<span class="bg-done-light py-1 px-2 rounded-full text-[12px] text-done">Completed</span>'
    : '<span class="bg-pending-light py-1 px-2 rounded-full text-[12px] text-pending">Pending</span>'}
    </td>
    <td class="py-3 text-center rounded-e-2xl gap-8 items-center justify-center">
      <button class="me-8" onclick="showConfirmationModal(${todo.id})">
        <i class="fa-regular fa-trash-can text-secondary hover:text-secondary-dark text-xl"></i>
      </button>
      ${todo.completed ?
    `<button title="Undone Task" class="me-2" id="undone-taks" onclick="updateTodoStatus(false, ${todo.id})">
        <i class="fa-solid fa-circle-check text-primarygreen hover:text-main-dark text-xl"></i> 
      </button>`
    :
    `<button title="Mark as Done" class="me-2" id="mark-done" onclick="updateTodoStatus(true, ${todo.id})">
      <i class="fa-regular fa-circle text-primarygreen hover:text-main-dark text-xl"></i>
      </button>`
  }
    </td>
  </tr>
`;

const renderTodos = (todos) => {
  if (!todos || todos.length === 0) {
    tfoot.classList.add('hidden')
    return `<tr class="odd:bg-gray-100 even:bg-gray-50 rounded-2xl"><td colspan="5" class="py-3 text-center dark:bg-gray-800 dark:text-white">No Tasks Found!</td></tr>`;
  }
  return todos.map(renderTodoRow).join('');
};


const createTaskaty = (page = 1) => {
  let currentPage = page;
  let maxPage = 3;
  let allTodos = [];
  const updateUI = (isLoading, total) => {
    maxPage = Math.ceil(total / 10);

    const taskatyBody = document.getElementById('taskaty');
    if (!isLoading) {
      taskatyBody.innerHTML = renderTodos(currentTodos);
      addEditableEvents()
      document.getElementById('total').innerHTML = total;
      document.getElementById('current-page').innerHTML = currentPage;
      document.getElementById('last-page').innerHTML = maxPage;
      tfoot.classList.remove('hidden');

      updatePaginationButtons();
    }
  };

  const updatePaginationButtons = () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (currentPage <= 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentPage >= maxPage) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }

  const getTodosForPgination = async () => {
    allTodos = await getAllTodos();
  }

  const generateTodos = async () => {
    updateUI(true)
    const { limit, skip } = paginate(currentPage);
    const todos = searchResults ?? allTodos;
    
    currentTodos = todos.slice(skip, Math.min(skip + limit, allTodos.length))
    setItemsToLocalStorage(TODO_KEY, currentTodos)
    updateUI(false, todos.length);
  };

  const nextPage = () => {
    currentPage++;
    if (currentPage <= maxPage) {
      generateTodos()
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      currentPage--;
      generateTodos();
    }
  }

  return {
    nextPage,
    previousPage,
    generateTodos,
    getTodosForPgination,
    updateUI,
  }
}

const todoApp = createTaskaty();

const initApp = async () => {
  await todoApp.getTodosForPgination()
  todoApp.generateTodos();
}


initApp();

document.getElementById('next-btn').addEventListener('click', () => todoApp.nextPage());
document.getElementById('prev-btn').addEventListener('click', () => todoApp.previousPage());

const modal = document.getElementById('crud-modal');

const toggleClasses = (el, toAdd = [], toRemove = []) => {
  el.classList.remove(...toRemove);
  el.classList.add(...toAdd);
};

const showModal = () => toggleClasses(modal, ['flex'], ['hidden']);
const hideModal = () => toggleClasses(modal, ['hidden'], ['flex']);

document.getElementById('add-task').onclick = () => {
  modal.setAttribute('aria-hidden', 'false');
  showModal()
}

document.getElementById('close-modal').onclick = () => {
  modal.setAttribute('aria-hidden', 'true');
  hideModal()
}

const generateUsers = async () => {
  const { users } = await getUsers();
  document.getElementById('user').innerHTML = renderUsers(users);
}

const renderUsers = (users) => {
  const renderOption = ({ id, firstName, lastName }) => {
    return `<option value="${id}">${firstName} ${lastName}</option>`
  }
  if (!users || users.length === 0) {
    return `<option disabled selected>No users found</option>`
  } else {
    return users.map(user => renderOption(user)).join('')
  }
}

generateUsers()


const search = async (event) => {
  const value = event.target?.value.trim();
  const allTodos = await getAllTodos();
  if (value) {
    searchResults = allTodos.filter((todo) =>
      todo.todo.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    searchResults = null;
  }
  currentPage = 1;
  todoApp.generateTodos();
  todoApp.updateUI(false, searchResults.length);
};

const debounce = (func, delay = 500) => {
  let currentTimeout

  return function (args) {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => {
      func(args)
    }, delay)
  }
}


const inputDebounce = debounce((e) => search(e), 500);

document.querySelector('#search').addEventListener('input', (e) => {
  inputDebounce(e);
});
