import throttle from 'lodash.throttle';

const STORAGE_KEY = 'formData';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));

popularTextarea();

function onFormSumbit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onEmailInput(e) {
  const emailValue = e.target.value;
  localStorage.setItem(STORAGE_KEY, emailValue);
}

function popularTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    console.log(savedMessage);
    refs.email.value = savedMessage;
  }
}

refs.form.addEventListener('input', e => {
  console.log(e.target.name);
  console.log(e.target.value);

  formData[e.target.name] = e.target.value;

  console.log(formData);
});
