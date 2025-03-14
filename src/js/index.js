const generateTodos = async () => {
  const { todos } = await getTodos();
  displayTaskaty(todos)
}

const displayTaskaty = (todos) => {
  const taskatyBody = document.getElementById('taskaty');
  if (todos.length > 0) {

    todos.forEach(todo => {
      taskatyBody.innerHTML += `
      <tr class="odd:bg-gray-100 even:bg-gray-50 rounded-2xl last:mb-0">
      <td class="border-s-[6px] ${todo.completed ? 'border-primarygreen' : 'border-secondary'} py-3 text-center rounded-s-2xl">${todo.id}</td>
      <td class="py-3 text-center ${todo.completed ? 'line-through' : ''}">${todo.todo}</td>
      <td class="py-3 text-center">${todo.userId}</td>
      <td class="py-3 text-center">${todo.completed
          ? '<span class="bg-done-light py-1 px-2 rounded-full text-[12px] text-done">Completed</span>'
          : '<span class="bg-pending-light py-1 px-2 rounded-full text-[12px] text-pending">Pending</span>'}</td>
      <td class="py-3 text-center rounded-e-2xl gap-8 items-center justify-center">
      <button class="me-8">
      <i class="fa-regular fa-trash-can text-secondary hover:text-secondary-dark text-xl"></i>
      </button>
      <button class="me-2">
      <i class="fa-solid fa-circle-check text-primarygreen hover:text-main-dark text-xl"></i>
      </button>
      </td>
      </tr>
      
      `
    });
  } else {
    taskatyBody.innerHTML = `<tr class="odd:bg-gray-100 even:bg-gray-50 rounded-2xl">No Tasks to Do</td>`
  }
}

generateTodos()