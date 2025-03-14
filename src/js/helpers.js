const API_URL = 'https://dummyjson.com'
const getTodos = async (limit = 30, skip = 0) => {
  const response = await fetch(`${API_URL}/todos?limit=${limit}&skip=${skip}`);
  return await response.json();
}

const getUsers = async () => {
  const response = await fetch(`${API_URL}/users?limit=10`);
  return await response.json();
}