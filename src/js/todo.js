const description = document.getElementById('description');
const status = document.getElementById('status');
const user = document.getElementById('user');
const addForm = document.getElementById('add-task-form')
const saveTask = document.getElementById('saveTask')

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
  saveTask.innerHTML = 'Saving ...'
  e.preventDefault();
  const newTask = {
    todo: description?.value.trim(),
    completed: status?.value,
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
