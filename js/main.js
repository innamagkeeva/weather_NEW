import UI from './ui.js'
// console.log(UI)

// вешаю обработчика события на форму, и при нажатии на поиск или enter вызывается функция getCityName

UI.FORM.addEventListener('submit', getCityName)
UI.FOOTER_BUTTON.addEventListener('click', addCityName)
console.log(UI.FORM)

// Функция, которая которая берет название города , введенного в input. подставляет его в url адрес и отправляет на сервер. и получает ответ с данными погоды.
function getCityName(e) {
  e.preventDefault() // отмена перезагрузки страницы

  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
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
      UI.CITY_NAME.textContent = data.name
      // а температура округляется до целого числа и вносится сюда:
      UI.PART_TEMPERATURE.textContent = Math.round(data.main.temp - 273)

      // тут потом добавлю еще if -  если дождь.Сейчас не нахожу как это пишется в data..
      if ((data.weather.description = 'clear sky')) {
        UI.PART_IMG.src = './img/sun.svg'
        // UI.PART_IMG.alt = 'картинка солнца'
        //  ВОПРОС !!!!!: нужна ли эта строчка??
      }

      console.log(data)
    })
  console.log(cityName)
}

function addCityName(e) {
  //функция кот создает новый эл.в который добавляется кнопка с названием города и кнопка для удаления элемента. и этот эл добавляется в список.
  e.preventDefault()

  const newLi = document.createElement('li') //создаю новый элемент
  newLi.className = 'list_li' //присваиваю ему класс
  UI.LIST.append(newLi) //в список добавляю этот нов. элемент

  newLi.append(createButtonText(UI.FORM_INPUT.value))
  newLi.append(createButtonDelete())

  clearInput()
}

function clearInput() {
  UI.FORM_INPUT.value = ' '
}

function createButtonText() {
  //функция создает кнопку в кот будет попадать назв города, которое мы искали. те ввели в поиск.
  let newButtonText = document.createElement('button')
  newButtonText.className = 'list__button-city'
  newButtonText.textContent = UI.FORM_INPUT.value
  return newButtonText
}

function createButtonDelete() {
  //функ создает кнопку удаления элемента из списка
  const newButtonDelete = document.createElement('button')
  newButtonDelete.className = 'list__button-delete'
  newButtonDelete.textContent = '+' //НУЖНА ЛИ ЭТА СТРОЧКА
  newButtonDelete.addEventListener('click', deleteCity)
  return newButtonDelete
}

function deleteCity(e) {
  e.target.parentNode.remove()
}
