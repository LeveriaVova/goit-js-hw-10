import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysE = document.querySelector("[data-days]");
const hoursE = document.querySelector("[data-hours]");
const minutesE = document.querySelector("[data-minutes]");
const secondsE = document.querySelector("[data-seconds]");
startBtn.disabled = true;
let userSelectedDate = null;
const options = {
  enableTime: true, //Включает выбор времени.
  time_24hr: true, // При включении этой функции отображает окно выбора времени в 24-часовом формате без выбора AM/PM.
  defaultDate: new Date(), //String	null Устанавливает начальную выбранную(ые) дату(ы). Если вы используете режим "несколько" или календарь диапазона, укажите массив объектов Date или массив строковых дат, соответствующих вашему формату даты. В противном случае вы можете указать один объект Date или строковую дату.
  minuteIncrement: 1, //Integer	5 Регулирует шаг ввода минут (включая прокрутку).
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.show({
      title: 'Hey',
      message: 'Please choose a date in the future'
    });
      startBtn.disabled = true;

      userSelectedDate = null;
      return;

    }
    userSelectedDate = selectedDate; 
    startBtn.disabled = false;


  }
};

flatpickr(input, options);
  function addLeadingZero(value) {
      return String(value).padStart(2, "0");
}
startBtn.addEventListener("click", startTimer)
function startTimer(event) {
  startBtn.disabled = true;
  input.disabled = true;
  const iltreval = setInterval(() => {
    const newDate = new Date();
    const differens = userSelectedDate - newDate;
    if (differens <= 0) { 
      clearInterval(iltreval);
      input.disabled = false;
      startBtn.disabled = true;
      daysE.textContent = "00";
      hoursE.textContent = "00";
      minutesE.textContent = "00";
      secondsE.textContent = "00";
      return;
    }
  
    const { days, hours, minutes, seconds } = convertMs(differens);
    daysE.textContent = addLeadingZero(days);
    hoursE.textContent = addLeadingZero(hours);
    minutesE.textContent = addLeadingZero(minutes);
    secondsE.textContent = addLeadingZero(seconds);
  }, 1000)
  
}





function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

