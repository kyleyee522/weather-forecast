// API Key: 453394794dcaa724188e30117e94e066
// API For Today: https://api.openweathermap.org/data/2.5/weather?q=London&appid=453394794dcaa724188e30117e94e066
// API 5 day forecast: https://api.openweathermap.org/data/2.5/forecast?q=London&appid=453394794dcaa724188e30117e94e066

const forecastCardsEl = document.querySelector('.forecast-cards-container');
const weatherIconEl = document.querySelector('#weather-icon');
const currentWeatherEl = document.querySelector('.current-weather');
const searchCityEl = document.querySelector('#search-city');
const cityInput = document.querySelector('#city-input');
const apiKey = '453394794dcaa724188e30117e94e066';
const previousSearches = $('#search-history');

localStorage.clear();

function getTodayWeather(city) {
	// event.preventDefault();

	const todayWeather = $('.current-weather');
	todayWeather.empty();

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			postTodayWeather(data);
			searchHistory(data);
		});

	getTodayForecast(city);
}

function getTodayForecast(city) {
	const forecastWeather = $('.forecast-cards-container');
	forecastWeather.empty();
	fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data.list[0]);
			for (let i = 0; i < data.list.length; i++) {
				// These are 24 hours intervals from the first index
				if (i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
					postTodayForecast(data.list[i]);
				}
			}
			showHistory();
		});
}

function postTodayWeather(data) {
	const todayDateLocation = document.createElement('h2');
	todayDateLocation.textContent = `${data.name} (${dayjs
		.unix(data.dt)
		.format('M/D/YYYY')}) `;
	const weatherIcon = document.createElement('img');
	weatherIcon.setAttribute(
		'src',
		`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
	);
	todayDateLocation.appendChild(weatherIcon);
	currentWeatherEl.appendChild(todayDateLocation);

	const todayTempEl = document.createElement('p');
	todayTempEl.innerHTML = `Temp: ${data.main.temp} &degF`;
	currentWeatherEl.appendChild(todayTempEl);

	const todayWindEl = document.createElement('p');
	todayWindEl.textContent = `Wind: ${data.wind.speed} MPH`;
	currentWeatherEl.appendChild(todayWindEl);

	const todayHumidityEl = document.createElement('p');
	todayHumidityEl.textContent = `Humidity: ${data.main.humidity}%`;
	currentWeatherEl.appendChild(todayHumidityEl);
}

function postTodayForecast(data) {
	const forecastCard = document.createElement('div');
	forecastCard.setAttribute('class', 'forecast-card');

	const forecastDate = document.createElement('h3');
	const futureDate = dayjs(data.dt_txt).format('M/D/YYYY');
	forecastDate.textContent = `(${futureDate})`;
	forecastCard.appendChild(forecastDate);

	const forecastIcon = document.createElement('img');
	forecastIcon.setAttribute(
		'src',
		`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
	);
	forecastIcon.setAttribute('alt', data.weather[0].main);
	forecastCard.appendChild(forecastIcon);

	const forecastTemp = document.createElement('p');

	forecastTemp.innerHTML = `Temp: ${data.main.temp} &degF`;
	forecastCard.appendChild(forecastTemp);

	const forecastWind = document.createElement('p');
	forecastWind.textContent = `Wind: ${data.wind.speed} MPH`;
	forecastCard.appendChild(forecastWind);

	const forecastHumidity = document.createElement('p');
	forecastHumidity.textContent = `Humidity: ${data.main.humidity}%`;
	forecastCard.appendChild(forecastHumidity);

	forecastCardsEl.appendChild(forecastCard);
}

function searchHistory(data) {
	// console.log(data);
	let cities = JSON.parse(localStorage.getItem('searches'));
	if (cities === null) {
		cities = [];
	}
	const city = data.name;
	if (cities.includes(city) === false) {
		cities.push(city);
	}

	localStorage.setItem('searches', JSON.stringify(cities));
}

function showHistory() {
	const history = $('#search-history');
	history.empty();

	let cities = JSON.parse(localStorage.getItem('searches'));
	if (cities === null) {
		cities = [];
	}

	for (let i = 0; i < cities.length; i++) {
		createListHistory(cities[i]);
	}
}

function createListHistory(city) {
	const listEl = document.createElement('li');
	const buttonEl = document.createElement('button');

	buttonEl.textContent = city;
	buttonEl.setAttribute('class', 'history-button');
	listEl.appendChild(buttonEl);
	previousSearches.append(listEl);
}

previousSearches.on('click', '.history-button', function () {
	const cityButton = this.innerHTML;
	getTodayWeather(cityButton);
});

searchCityEl.addEventListener('submit', function (event) {
	event.preventDefault();
	let city = cityInput.value;
	getTodayWeather(city);
	city = cityInput.value = '';
});
