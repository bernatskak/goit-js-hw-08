import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
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

  if (!storageItem) return;
  Object.keys(storageItem).forEach(key => {
    formData[key] = storageItem[key];
    const element = refs.form.querySelector(`[name="${key}"]`);
    element.value = storageItem[key];
  });
}

function consoleFormData(form) {
  const feedbackData = Object.fromEntries(new FormData(form));
  return alert('Please fill in all the fields!');
  console.log('feedbackData', feedbackData);
}
