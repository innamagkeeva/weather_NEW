import UI from './ui.js'
import { apiKey } from './const.js'

let favoriteCities = [] // создали переменную, в которую поместили пустой массив для добавления городов

loadCitiesFromLocalStorage() //при перезагрузки сразу выз-ся функ, кот загружает города из хранилища

UI.FORM.addEventListener('submit', getCityName) // вешаю обр соб на форму, и при нажатии на поиск или enter выз-ся функ getCityName
UI.FOOTER_BUTTON.addEventListener('click', addCityName) // вешаю обр соб на кнопку футера, и при нажатии на нее выз-ся функ getCityName

// Функция, которая которая берет название города , введенного в input. подставляет его в url адрес и отправляет на сервер. и получает ответ с данными погоды.
function getCityName(e) {
  e.preventDefault() // отмена перезагрузки страницы

  const cityName = UI.FORM_INPUT.value.trim() //конст, кот присваивается значение инпута без пробелов
  console.log('город', cityName)
  getCityWeather(cityName) //вызов функ кот отправляет запрос для получения данных с сервера

  clearInput() //инпут очищается
}

function addLike() {
  UI.SVG_LIKE.classList.add('like') //добавляется класс лайк, в css которого команда окрасить сердечко в красный
}

function addCityName() {
  //функция кот создает новый эл.в который добавляется кнопка с названием города и кнопка для удаления элемента. и этот эл добавляется в список.

  const cityName = UI.CITY_NAME.textContent.trim()
  console.log('Добавление города:', cityName)
  if (!cityName || favoriteCities.includes(cityName)) {
    console.log('Город пуст или уже есть в избранных. Не добавляем.')
    return // Не добавляем пустые названия или дубли
  }

  addLike()

  addCity(cityName)

  saveToLocalStorage() //вызываю функция,кот сохраняет данные в localStorage
  console.log('Избранные города:', favoriteCities)

  console.log(favoriteCities)
}

function saveToLocalStorage() {
  localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities)) //у элемента переводит данные в вид "строка" и сохраняет в localStorage.
}

//загружает города из localStorage
function loadCitiesFromLocalStorage() {
  console.log('Загрузка городов из локального хранилища')
  const storedCities = JSON.parse(localStorage.getItem('favoriteCities')) || [] // переменная, кот присваиваем элемент из localStorage или пустой массив
  storedCities.forEach((city) => {
    addCity(city) // и для каждого города создается новый li
  })
}

function addCity(cityName) {
  favoriteCities.push(cityName) // беру из localStorage название города и добавляю его в массив
  const newLi = document.createElement('li') // создаю новый элемент li
  newLi.className = 'list_li' // присваиваю ему класс
  newLi.append(createButton(cityName)) // создаю кнопку для всех нов ли с названием города

  const newButton = createButton(cityName) //создаем перем в кот помещаем данные о новой кнопки
  newButton.addEventListener('click', getCityWeather) // веш слуш соб на нов кнопку.При клике на нее отравляется запрос на сервер для получения данных о погоде данного города

  newLi.append(createButtonDelete()) // создаю кнопку удаления для всех новых ли
  UI.LIST.append(newLi) // добавляем элемент в список
}
console.log(1111111, UI.LIST)

function getCityWeather(cityName) {
  console.log('Запрос данных о погоде для города:', cityName)
  const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'

  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`

  if (!cityName) {
    return
  }

  fetch(url)
    .then((response) => {
      return response.json() // Преобразование ответа в JSON
    })
    .then((data) => {
      // после ответа с сервера, из data берется название города и заносится в поле внизу .
      UI.CITY_NAME.textContent = data.name.trim()
      // а температура округляется до целого числа и вносится сюда:
      UI.PART_TEMPERATURE.textContent = Math.round(data.main.temp - 273)

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
    })
    .catch((err) => {
      console.error('ошибка при получении данных:', err)
      alert(
        `не удалось загрузить данные для '${cityName}'. Попробуйте еще раз.`
      )
    })
}

function clearInput() {
  UI.FORM_INPUT.value = '' // у инпута пустая строка.
}

//функция создает кнопку в кот будет попадать назв города, которое мы искали. те ввели в поиск.
function createButton(cityName) {
  const newButton = document.createElement('button') //создается новая кнопка
  newButton.className = 'list__button-city' //новой кнопке присв класс
  newButton.textContent = cityName // текст контент у кнопки

  console.log('это новая кнопка', newButton)

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
  const cityText =
    e.target.parentNode.querySelector('.list__button-city').textContent

  if (UI.LIST.contains(e.target.parentNode)) {
    const index = favoriteCities.indexOf(cityText)
    if (index !== -1) {
      favoriteCities.splice(index, 1)
    }
  }

  saveToLocalStorage() // загружаю новые данные из localStorage
  e.target.parentNode.remove()
  console.log(favoriteCities)
}
