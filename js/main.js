import UI from './ui.js'

let favoriteCities = []

loadCitiesFromLocalStorage()
// вешаю обработчика события на форму, и при нажатии на поиск или enter вызывается функция getCityName
UI.FORM.addEventListener('submit', getCityName)
UI.FOOTER_BUTTON.addEventListener('click', addCityName)

// Функция, которая которая берет название города , введенного в input. подставляет его в url адрес и отправляет на сервер. и получает ответ с данными погоды.
function getCityName(e) {
  e.preventDefault() // отмена перезагрузки страницы

  const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const cityName = UI.FORM_INPUT.value.trim()
  const apikey = 'f660a2fb1e4bad108d6160b7f58c555f'
  const url = `${serverUrl}?q=${cityName}&appid=${apikey}`

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
      // вешаю обработчик соб на нижнее поле . при клике на сердеечко вызывается ф addLike
    })
  console.log(cityName)
}

function addLike() {
  UI.SVG_LIKE.classList.add('like') //добавляется класс лайк, в css которого команда окрасить сердечко в красный
}

function addCityName() {
  //функция кот создает новый эл.в который добавляется кнопка с названием города и кнопка для удаления элемента. и этот эл добавляется в список.
  // Создает новый элемент, который добавляется в список
  const cityName = UI.CITY_NAME.textContent.trim()

  if (!cityName || favoriteCities.includes(cityName)) {
    return // Не добавляем пустые названия или дубли
  }

  addLike()

  const newLi = document.createElement('li') //создаю новый элемент
  newLi.className = 'list_li' //присваиваю ему класс

  addCity(cityName)

  saveToLocalStorage() //вызываю функ,кот сохраняет данные в localStorage

  clearInput() //инпут очищается
  console.log(favoriteCities)
}

function saveToLocalStorage() {
  localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities)) //у элемента переводит данные в вид "строка" и сохраняет в localStorage.
}

//загружает города из localStorage
function loadCitiesFromLocalStorage() {
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
  newLi.append(createButtonDelete()) // создаю кнопку удаления для всех новых ли
  UI.LIST.append(newLi) // добавляем элемент в список
}

function clearInput() {
  UI.FORM_INPUT.value = '' // у инпута пустая строка.
}

//функция создает кнопку в кот будет попадать назв города, которое мы искали. те ввели в поиск.
function createButton(cityName) {
  const newButton = document.createElement('button') //создается новая кнопка
  newButton.className = 'list__button-city' //новой кнопке присв класс

  newButton.textContent = cityName // текст контент у кнопки

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
