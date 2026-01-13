import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      iziToast.warning({
        title: 'Error',
        titleColor: '#ffffff',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        position: 'topRight',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        closeOnClick: true,
      });
      return;
    }

    userSelectedDate = selectedDates[0];
    startBtnEl.disabled = false;
    startBtnEl.classList.add('start-btn-abled');
  },
};

flatpickr(inputEl, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const timeMs = userSelectedDate - new Date();

  if (timeMs <= 0) {
    clearInterval(timerId);
    inputEl.disabled = false;
    startBtnEl.disabled = false;
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const time = convertMs(timeMs);
  daysEl.textContent = addLeadingZero(time.days);
  hoursEl.textContent = addLeadingZero(time.hours);
  minutesEl.textContent = addLeadingZero(time.minutes);
  secondsEl.textContent = addLeadingZero(time.seconds);
}

startBtnEl.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtnEl.disabled = true;
  inputEl.disabled = true;
  startBtnEl.classList.remove('start-btn-abled');

  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});
