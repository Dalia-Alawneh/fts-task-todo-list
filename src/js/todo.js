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
};

const updateTodoStatus = async (status, id) => {
  const todos = getItemsFromLocalStorage(TODO_KEY);
  const todo = todos.find(todo => todo.id === id);
  const updatedTodo = { ...todo, completed: status, }
  try {
    // const response = await updateTodo(id, updatedTodo);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = updatedTodo;
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

