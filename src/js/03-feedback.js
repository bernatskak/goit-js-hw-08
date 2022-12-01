import throttle from 'lodash.throttle';

const STORAGE_KEY = 'formData';
const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.form.addEventListener('input', throttle(onEmailInput, 500));

function onFormSumbit(e) {
  e.preventDefault();
  const { email, message } = e.currentTarget.elements;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  e.currentTarget.reset();
  clearFormData(formData);
  localStorage.removeItem(STORAGE_KEY);
}
function clearFormData(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}
function onEmailInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function getStorageData() {
  formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (formData) {
    setFormFields(formData);
  } else {
    formData = {};
  }
}
function setFormFields(obj) {
  for (const key in obj) {
    refs.form[key].value = obj[key];
  }
}
window.addEventListener('load', getStorageData);
