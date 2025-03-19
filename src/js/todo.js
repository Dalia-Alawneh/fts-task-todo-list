const TODO_KEY = 'todos'
const MAX_LIMIT = 254;
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


const updateTodoItem = async (id, updatedTodo, successMessage) => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex == -1) {
    new Toast({
      message: `TODO not found!`,
      type: 'danger'
    });
    return;
  }
  try {
    const response = await updateTodo(id, updatedTodo);
    todos[todoIndex] = response;
    setItemsToLocalStorage(TODO_KEY, todos);
    updateTodoListUI()

    if (successMessage) {
      new Toast({
        message: successMessage,
        type: 'success'
      });
    }
    return response;
  } catch (e) {
    new Toast({
      message: e.message || 'Something went wrong!',
      type: 'danger'
    });
  }

}

const updateTodoStatus = async (status, id) => {
  const message = status
    ? '✅ TODO Completed! Good Job!🦾😎'
    : '😵‍💫 Task marked as incomplete. You got this!🫡';

  updateTodoItem(id, { completed: status }, message);
}

const updateTodoData = async (feild, value, id) => {
  return await updateTodoItem(id, { [feild]: value }, '✅ TODO Updated!');
};

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
    const feildToUpdate = input.dataset.feild;
    if (!span || !input) return;

    span.addEventListener('dblclick', () => {
      span.classList.add('hidden');
      input.classList.remove('hidden');
      input.focus();
    });

    const saveChanges = async () => {
      const newValue = input.value.trim();
      if (newValue !== '') {
        const updatedData = await updateTodoData(feildToUpdate, newValue, id);
        span.textContent = renderUserName(allUsers, updatedData.userId);
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
