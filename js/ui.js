// нахожу элемент в HTML с помощью метода querySelector по классам :
const UI = {
  FORM: document.querySelector('.form'),
  FORM_INPUT: document.querySelector('.form__input'),
  FORM_BUTTON: document.querySelector('.form__button'),
  FORM_IMG: document.querySelector('.form__button-img'),
  PART_TEMPERATURE: document.querySelector('.part__temp-degrees'),
  PART_IMAGES: document.querySelector('.part__images'),
  PART_IMG: document.querySelector('.part__images-img'),
  CITY_NAME: document.querySelector('.cityName__text'),
  FOOTER_BUTTON: document.querySelector('.part__footer-button'),
  LIST: document.querySelector('.list'),
}
console.log(UI)

export default UI
