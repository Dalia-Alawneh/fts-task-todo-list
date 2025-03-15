
const generateDate = () => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date()
  const dayName = dayNames[date.getDay()];
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  
  return {
    date: formattedDate,
    dayName,
  }
}


const {date, dayName} = generateDate()
document.getElementById('date').innerHTML = date;
document.getElementById('day').innerHTML = dayName;
