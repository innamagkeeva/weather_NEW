import UI from './ui.js'
// console.log(UI)

// вешаю обработчика события на форму, и при нажатии на поиск или enter вызывается функция getCityName
UI.FORM.addEventListener('submit', getCityName)
UI.FOOTER_BUTTON.addEventListener('click', addCityName)

//вешаю обработчика события на инпут , кот вызовет функ проверки инпута
UI.FORM_INPUT.addEventListener('input', checkInput)
console.log(UI.FORM)

//
function checkInput() {
  const inputValue = UI.FORM_INPUT.value.trim() //переменная кот присвоили значение инпута
  if (inputValue) {
    //если в инпуте текст есть..........
    UI.FORM_BUTTON.removeAttribute('disabled') // то атрибут, отключающий кнопку убирается и кнопка работает
  } else {
    //иначе (т е если текста нет)
    UI.FORM_BUTTON.setAttribute('disabled', '') //то атрибут вставляется и отключает кнопку отправки
  }
}

// Функция, которая которая берет название города , введенного в input. подставляет его в url адрес и отправляет на сервер. и получает ответ с данными погоды.
function getCityName(e) {
  e.preventDefault() // отмена перезагрузки страницы

  const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const cityName = UI.FORM_INPUT.value
  const apikey = 'f660a2fb1e4bad108d6160b7f58c555f'
  const url = `${serverUrl}?q=${cityName}&appid=${apikey}`

  fetch(url)
    .then((response) => {
      if (!cityName) {
        throw new Error('введите город')
      }
      return response.json()
    })
    .then((data) => {
      // после ответа с сервера, из data берется название города и заносится в поле внизу .
      UI.CITY_NAME.textContent = data.name.trim()
      // а температура округляется до целого числа и вносится сюда:
      UI.PART_TEMPERATURE.textContent = Math.round(data.main.temp - 273)

      // если оставляю один иф - то картинка меняется. если открываю все - не меняется. пробовала написать else if все равно не работает.
      if (data.weather[0].main === 'Clouds') {
        UI.PART_IMG.src = '../img/clouds.svg'
        UI.PART_IMG.alt = 'картинка облаков'
      } else if (data.weather[0].main === 'Rain') {
        UI.PART_IMG.src = '../img/rain.svg'
        UI.PART_IMG.alt = 'картинка дождя'
      } else if (data.weather[0].main === 'Clear') {
        UI.PART_IMG.src = '../img/sun.svg'
        UI.PART_IMG.alt = 'картинка солнца'
      }
      console.log(data)
      // вешаю обработчик соб на нижнее поле . при клике на сердеечко вызывается ф addLike
      UI.FOOTER.addEventListener('click', addLike)
    })
  console.log(cityName)
}

function addLike() {
  UI.SVG_LIKE.classList.add('like') //добавляется класс лайк, в css которого команда окрасить сердечко в красный
}

function addCityName(cityName) {
  //функция кот создает новый эл.в который добавляется кнопка с названием города и кнопка для удаления элемента. и этот эл добавляется в список.
  const newLi = document.createElement('li') //создаю новый элемент
  newLi.className = 'list_li' //присваиваю ему класс

  // cityName.push(normalizeNewText)
  newLi.append(createButton()) // создаю кнопку, которая принимает значение - назв города.
  newLi.append(createButtonDelete()) // для всех новых ли
  UI.LIST.append(newLi) //в список добавляю этот нов. элемент

  // saveCityToLocalStorage(cityName)

  clearInput()
}

// function saveCityToLocalStorage(cityName) {
//   localStorage.setItem(JSON.stringify(cityName))
// }

function clearInput() {
  UI.FORM_INPUT.value = ''
}

//функция создает кнопку в кот будет попадать назв города, которое мы искали. те ввели в поиск.
function createButton() {
  const newButton = document.createElement('button') //создается новая кнопка
  newButton.className = 'list__button-city' //новой кнопке присв класс

  const newText = UI.FORM_INPUT.value.trim()
  const normalizeNewText = newText.charAt(0).toUpperCase() + newText.slice(1)
  newButton.textContent = normalizeNewText

  console.log(newButton)

  return newButton
}

function createButtonDelete() {
  //функ создает кнопку удаления элемента из списка
  const newButtonDelete = document.createElement('button')
  newButtonDelete.className = 'list__button-delete'
  newButtonDelete.textContent = '+'
  newButtonDelete.addEventListener('click', deleteCity)
  return newButtonDelete
}

function deleteCity(e) {
  e.target.parentNode.remove()
}
