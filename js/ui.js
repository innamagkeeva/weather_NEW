// нахожу элемент в HTML с помощью метода querySelector по классам :
const UI = {
  FORM: document.querySelector('.form'),
  FORM_INPUT: document.querySelector('.form__input'),
  FORM_BUTTON: document.querySelector('.form__button'),
  FORM_IMG: document.querySelector('.form__button-img'),
  PART_TEMPERATURE: document.querySelector('.part__temp-degrees'),
  PART_IMAGES: document.querySelector('.part__images'),
  PART_IMG: document.querySelector('.part__images-img'),
  FOOTER: document.querySelector('.part__footer'),
  CITY_NAME: document.querySelector('.cityName'),
  FOOTER_BUTTON: document.querySelector('.part__footer-button'),
  SVG_LIKE: document.querySelector('.svg-like'),
  LIST: document.querySelector('.list'),
  LOADER: document.querySelector('.loader'),
  POPUP: document.querySelector('.popup'),
  CLOSE_BUTTON: document.querySelector('.popup__button-close'),
}

export default UI
