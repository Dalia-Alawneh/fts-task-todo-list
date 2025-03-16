const THEME_KEY = 'theme'
const themebtn = document.querySelector('.theme')
const sunIcon = document.querySelector('.sun')
const moonIcon = document.querySelector('.moon')

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


const { date, dayName } = generateDate()
document.getElementById('date').innerHTML = date;
document.getElementById('day').innerHTML = dayName;

const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle("dark");
  const isDarkMode = html.classList.contains('dark');
  localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light')

  sunIcon.classList.toggle('hidden');
  moonIcon.classList.toggle('hidden');
}

themebtn.onclick = toggleTheme;


const theme = localStorage.getItem(THEME_KEY);
if(theme === 'dark'){
  document.documentElement.classList.add('dark')
  moonIcon.classList.add('hidden')
  sunIcon.classList.remove('hidden')
}else{
  moonIcon.classList.remove('hidden')
  sunIcon.classList.add('hidden')
  document.documentElement.classList.remove('dark')
}