const API_URL = 'https://dummyjson.com/todos'
const getTodos = async (limit = 30, skip = 0) => {
  const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
  return await response.json();
}