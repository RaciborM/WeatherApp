const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=6c5f13ac9ff56d284001e694302ba8f9'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'Wrocław'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			console.log(res.data)
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)
			const wId = status.id

			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + ' ℃'
			humidity.textContent = hum + ' %'
			weather.textContent = status.main

			warning.textContent = ''
			input.value = ''

			if (wId >= 200 && wId < 300) {
				photo.setAttribute('src', './img_weather_app_107/thunderstorm.png')
			} else if (wId >= 300 && wId < 400) {
				photo.setAttribute('src', './img_weather_app_107/drizzle.png')
			} else if (wId >= 500 && wId < 600) {
				photo.setAttribute('src', './img_weather_app_107/rain.png')
			} else if (wId >= 600 && wId < 700) {
				photo.setAttribute('src', './img_weather_app_107/ice.png')
			} else if (wId >= 701 && wId < 800) {
				photo.setAttribute('src', './img_weather_app_107/fog.png')
			} else if (wId == 800) {
				photo.setAttribute('src', './img_weather_app_107/sun.png')
			} else if (wId >= 801 && wId < 900) {
				photo.setAttribute('src', './img_weather_app_107/cloud.png')
			} else {
				photo.setAttribute('src', './img_weather_app_107/unknown.png')
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))
}

const enterCeck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}
input.addEventListener('keyup', enterCeck)

getWeather()
button.addEventListener('click', getWeather)
