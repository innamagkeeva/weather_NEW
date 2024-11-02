// нахожу элемент в HTML с помощью метода querySelector по классам :
const UI = {
  FORM: document.querySelector('.form'),
  FORM_INPUT: document.querySelector('.form__input'),
  FORM_BUTTON: document.querySelector('.form__button'),
  FORM_IMG: document.querySelector('.form__button-img'),
  PART_TEMPERATURE: document.querySelector('.part__temp-degrees'),
  PART_IMG: document.querySelector('.part__img'),
  CITY_NAME: document.querySelector('.cityName__text'),
  PART_LIST: document.querySelector('.section__part-list'),
}
console.log(UI)

export default UI
