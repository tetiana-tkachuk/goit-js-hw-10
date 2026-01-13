import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.info({
  title: 'Hello',
  titleColor: '#ffffff',
  message: 'Welcome!',
  messageColor: '#ffffff',
  backgroundColor: '#0099FF',
  progressBarColor: '#0071BD',
  color: '#ffffff',
  position: 'topRight',
});

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleCreatePromise);

function handleCreatePromise(e) {
  e.preventDefault();

  const delay = formEl.delay.value;
  const promiseState = formEl.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise.then(value => onResolve(value)).catch(error => onReject(error));

  formEl.reset();
}

function onResolve(value) {
  iziToast.success({
    title: 'Ok',
    titleColor: '#ffffff',
    message: value,
    messageColor: '#ffffff',
    backgroundColor: '#59A10D',
    progressBarColor: '#326101',
    position: 'topRight',
    closeOnClick: true,
  });
}

function onReject(error) {
  iziToast.warning({
    message: error,
    messageColor: '#ffffff',
    backgroundColor: '#EF4040',
    progressBarColor: '#B51B1B',
    position: 'topRight',
    closeOnClick: true,
  });
}
