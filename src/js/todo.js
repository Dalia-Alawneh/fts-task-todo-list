const TODO_KEY = 'todos'
const description = document.getElementById('description');
const status = document.getElementById('status');
const user = document.getElementById('user');
const addForm = document.getElementById('add-task-form')
const saveTask = document.getElementById('saveTask')
const markDone = document.getElementById('mark-done')

const isTodoInputValid = ({ todo }) => {
  const trimmedTodo = todo.trim();
  if (!trimmedTodo) {
    return { valid: false, message: "Todo cannot be empty." }
  }
  if (todo.length > 100) {
    return { valid: false, message: "Todo must be 100 characters or less." }
  }

  return { valid: true }
}

addForm.onsubmit = async (e) => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  saveTask.innerHTML = 'Saving ...'
  e.preventDefault();
  const newTask = {
    todo: description?.value.trim(),
    completed: status?.value === "true",
    userId: user?.value,
  };

  const todoValiadation = isTodoInputValid(newTask);
  if (!todoValiadation.valid) {
    new Toast({
      message: todoValiadation.message,
      type: 'danger'
    });
    return;
  }

  try {
    const response = await addTodo(newTask);
    const newTodos = [response, ...todos];
    setItemsToLocalStorage(TODO_KEY, newTodos);
    updateTodoListUI()
    new Toast({
      message: 'TODO Added Successfully ✅🚀',
      type: 'success'
    });
    hideModal()
    e.target.reset();

  } catch (e) {
    new Toast({
      message: e.message,
      type: 'danger'
    });
  }
  saveTask.innerHTML = 'Save Task'
}

const updateTodoListUI = () => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  document.getElementById('taskaty').innerHTML = renderTodos(todos);
  addEditableEvents();
};

const updateTodoStatus = async (status, id) => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  try {
    const response = await updateTodo(id, { completed: status });
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = response;
    }
    setItemsToLocalStorage(TODO_KEY, todos);
    updateTodoListUI()
    if (status) {
      new Toast({
        message: '✅ TODO Completed Good Job!🦾😎',
        type: 'success'
      });
    } else {
      new Toast({
        message: '😵‍💫Task marked as incomplete.You got this!🫡',
        type: 'success'
      });
    }
  } catch (e) {
    new Toast({
      message: e.message,
      type: 'danger'
    });
  }

}

const updateTodoDescription = async (description, id) => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  try {
    const response = await updateTodo(id, { todo: description });
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].todo = response.todo;
    }
    setItemsToLocalStorage(TODO_KEY, todos);
    updateTodoListUI()
    new Toast({
      message: '✅ TODO Updated!',
      type: 'success'
    });
  } catch (e) {
    new Toast({
      message: e.message,
      type: 'danger'
    });
  }

}

const deleteTodoItem = async (id) => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  try {
    await deleteTodo(id);
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setItemsToLocalStorage(TODO_KEY, updatedTodos);
    updateTodoListUI()
    new Toast({
      message: '✅ TODO Deleted Successfully!',
      type: 'success'
    });
  } catch (e) {
    new Toast({
      message: e.message,
      type: 'danger'
    });
  }
}


const addEditableEvents = () => {
  const editableCells = document.querySelectorAll('.editable-td');

  editableCells.forEach(td => {

    const span = td.querySelector('.editable-text');
    const input = td.querySelector('.editable-input');
    const id = Number(input.dataset.id);

    if (!span || !input) return;

    span.addEventListener('dblclick', () => {
      span.classList.add('hidden');
      input.classList.remove('hidden');
      input.focus();
    });

    const saveChanges = async () => {
      const newValue = input.value.trim();
      if (newValue !== '') {
        updateTodoDescription(newValue, id);
        span.textContent = newValue;
      }
      input.classList.add('hidden');
      span.classList.remove('hidden');
    };

    input.addEventListener('blur', saveChanges);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveChanges();
      }
      if (e.key === 'Escape') {
        input.value = span.textContent;
        input.classList.add('hidden');
        span.classList.remove('hidden');
      }
    });
  });
}
