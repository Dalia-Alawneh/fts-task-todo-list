const getItemsFromLocalStorage = (key) =>{ 
  return JSON.parse(localStorage.getItem(key));
}

const setItemsToLocalStorage = (key, items) =>{ 
  localStorage.setItem(key, JSON.stringify(items));
}

