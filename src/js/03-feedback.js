import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.form.addEventListener('input', throttle(onInput, 500));

const STORAGE_KEY = 'formData';
const formData = {};

getLocalStorageItems();

function onFormSumbit(e) {
  e.preventDefault();

  consoleFormData(e.currentTarget);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem('formData', JSON.stringify(formData));
}

function getLocalStorageItems() {
  const storageItem = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('storageItem', storageItem);

  if (!storageItem) return;

  Object.keys(storageItem).forEach(key => {
    const element = refs.form.querySelector(`[name="${key}"]`);
    element.value = storageItem[key];
  });
}

function consoleFormData(form) {
  const feedbackData = {};

  new FormData(form).forEach((value, key) => (feedbackData[key] = value));
  console.log('feedbackData', feedbackData);
}
