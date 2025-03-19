const API_URL = 'https://dummyjson.com'
const getTodos = async (limit = 30, skip = 0) => {
  try {
    const response = await fetch(`${API_URL}/todos?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

const addTodo = async (body) => {
  try {
    const response = await fetch(`${API_URL}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

const updateTodo = async (id, body) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users?limit=208`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}