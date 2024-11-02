import UI from './ui.js'
// console.log(UI)

// вешаю обработчика события на форму, и при нажатии на поиск или enter вызывается функция getCityName

UI.FORM.addEventListener('submit', getCityName)
console.log(UI.FORM)

// Функция, которая которая берет название города , введенного в input. подставляет его в url адрес и отправляет на сервер. и получает ответ с данными погоды.
function getCityName(e) {
  e.preventDefault()

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

      // ВОТ ТУТ ПРИМЕРНО КАК Я ПРЕДСТАВЛЯЮ ЗАМЕНУ КАРТИНКИ ПОГОДЫ.НО КАК ПРАВИЛЬНО НЕ ЗНАЮ.

      // if ((data.weather.description = 'clear sky')) {
      //   UI.PART_IMG.textContent = (
      //     <img src="./img/sun.svg" alt="картинка солнца" />
      //   )
      // }

      clearInput()
      console.log(data)
    })
  console.log(cityName)
}

function clearInput() {
  UI.FORM_INPUT.value = ' '
}
