const topCompleted = document.getElementById('top-completed').querySelector('.todos')
const topPending = document.getElementById('top-pending').querySelector('.todos')

const renderTodoCard = ({ todo, completed }) => {
  const status = completed ? 'done' : 'pending';

  const borderColor = `var(--color-${status})`;
  const shadowColor = `var(--shadow-${status})`;
  const textColor = `var(--color-${status})`;

  return `
    <div 
      class="todo-card border-2 rounded-xl p-4 flex flex-col items-stretch justify-between"
      style="border-color: ${borderColor}; box-shadow: ${shadowColor};">
      <h2
        class="mb-5 dark:text-white before:inline-block before:w-4 before:h-4 before:border-4 before:border-${borderColor} before:rounded-full before:relative before:top-0.5"
        style="border-color: ${borderColor};">
        <span class="ps-1">${todo.split(' ').slice(0, 3).join(' ')}</span>
      </h2>
      <p class="dark:text-white text-sm mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure </p>
      <span class="text-xs" style="color: ${textColor};">
        <i class="fa-solid fa-check"></i> ${status}
      </span>
    </div>
  `;
};

const showTopTodos = async (status) => {
  const { todos } = await getTodos(8, 244);
  completedTodos = todos.filter(todo => todo.completed === status)
  return completedTodos.map(todo => renderTodoCard(todo)).join('');
}

const renderCompletedTodos = async () => {
  const todos = await showTopTodos(true)
  topCompleted.innerHTML = todos
}

const renderPendingTodos = async () => {
  const todos = await showTopTodos(false)
  topPending.innerHTML = todos
}


renderCompletedTodos()

renderPendingTodos()