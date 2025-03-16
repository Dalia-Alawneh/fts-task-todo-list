const { createCalendar, viewWeek } = window.SXCalendar;
const { createDragAndDropPlugin } = window.SXDragAndDrop;
let events = []

const plugins = [
  createDragAndDropPlugin(),
]

const getCurrentDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getPendingTodos = async () => {
  const today = getCurrentDate();
  const todos = await showTopTodos(false);

  const getRandomDateToday = (baseDate) => {
    const randomMinutes = Math.floor(Math.random() * 1440);
    const randomDate = new Date(baseDate.getTime() + randomMinutes * 60 * 1000);
    return randomDate;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  events = todos.map(todo => {
    const randomStartDate = getRandomDateToday(today);
    const randomEndDate = new Date(randomStartDate.getTime() + Math.floor(Math.random() * (2 * 60 * 60 * 1000) + 60 * 60 * 1000));

    return {
      id: todo.id,
      title: todo.todo,
      start: formatDate(randomStartDate),
      end: formatDate(randomEndDate)
    };
  });

  renderCalendar();
};

const renderCalendar = () => {
  const calendar = createCalendar({
    views: [viewWeek],
    events: events
  }, plugins);

  calendar.render(document.querySelector('.calendar'));
};

getPendingTodos(); 

