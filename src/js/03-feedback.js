import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

const dataForm = {};

const serializedState = localStorage.getItem(FEEDBACK_FORM_STATE_KEY) ?? {};

console.log(serializedState);
const handleFormInput = e => {
  const { target } = e;

  const elementTargetName = target.name;
  const elementTargetValue = target.value;

  dataForm[elementTargetName] = elementTargetValue;

  localStorage.setItem(FEEDBACK_FORM_STATE_KEY, JSON.stringify(dataForm));
};

const fillContactForm = () => {
  const formData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE_KEY));

  console.dir(form.elements);

  for (const key in formData) {
    const inputEl = form.elements[key];
    const inputValue = formData[key];
    inputEl.value = inputValue;
  }
};

const handleContactFormSybmit = e => {
  e.preventDefault();

  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);

  e.currentTarget.reset();
  for (const key in dataForm) {
    delete dataForm[key];
  }

  console.log(dataForm);
};

fillContactForm();

form.addEventListener('input', throttle(handleFormInput, 500));
form.addEventListener('submit', handleContactFormSybmit);
