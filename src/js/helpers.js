const API_URL = 'https://dummyjson.com/todos'
const getTodos = async () => {
  const response = await fetch(API_URL);
  return await response.json();
}