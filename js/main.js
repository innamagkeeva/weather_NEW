import UI from './ui.js'
// console.log(UI)

// вешаю обработчика события на форму, и при нажатии на поиск или enter вызывается функция getCityName

UI.FORM.addEventListener('submit', getCityName)
UI.FOOTER_BUTTON.addEventListener('click', addCityName)
console.log(UI.FORM)

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
      UI.CITY_NAME.textContent = data.name
      // а температура округляется до целого числа и вносится сюда:
      UI.PART_TEMPERATURE.textContent = Math.round(data.main.temp - 273)

      //
      if ((data.weather.main = 'Clouds')) {
        UI.PART_IMG.src = './img/clouds.svg'
        UI.PART_IMG.alt = 'картинка облаков'
      } else if ((data.weather.main = 'Rain')) {
        UI.PART_IMG.src = './img/rain.svg'
        UI.PART_IMG.alt = 'картинка дождя'
      } else if ((data.weather.main = 'Sun')) {
        UI.PART_IMG.src = './img/sun.svg'
        UI.PART_IMG.alt = 'картинка солнца'
      }
      console.log(data)
    })
  console.log(cityName)
}

function addCityName() {
  //функция кот создает новый эл.в который добавляется кнопка с названием города и кнопка для удаления элемента. и этот эл добавляется в список.
  const newLi = document.createElement('li') //создаю новый элемент
  newLi.className = 'list_li' //присваиваю ему класс
  UI.LIST.append(newLi) //в список добавляю этот нов. элемент

  newLi.append(createButtonText(UI.FORM_INPUT.value)) //для всех новых ли
  newLi.append(createButtonDelete()) //так же для всех новых ли

  clearInput()
}

function clearInput() {
  UI.FORM_INPUT.value = ''
}

function createButtonText() {
  //функция создает кнопку в кот будет попадать назв города, которое мы искали. те ввели в поиск.
  const newButtonText = document.createElement('button') //создается новая кнопка,в кот добавится наз города из инпута
  newButtonText.className = 'list__button-city'
  newButtonText.textContent = UI.FORM_INPUT.value //город из инпута кладется в кнопку
  return newButtonText // возвращается кнопка вместе с текстом-назв города из инпута.
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
