const showTopTodos = async (status) => {
  const { todos } = await getTodos(8, 244);
  topTodos = todos.filter(todo => todo.completed === status)
  return topTodos;
}
