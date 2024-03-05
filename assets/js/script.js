// API Key: 453394794dcaa724188e30117e94e066
// API For Today: https://api.openweathermap.org/data/2.5/weather?q=London&appid=453394794dcaa724188e30117e94e066
// API 5 day forecast: https://api.openweathermap.org/data/2.5/forecast?q=London&appid=453394794dcaa724188e30117e94e066
// const todayPlaceEl = document.querySelector('#place-date');
// const todayTempEl = document.querySelector('#today-temp');
// const todayWindEl = document.querySelector('#today-wind');
// const todayHumidityEl = document.querySelector('#today-humidity');
const forecastCardsEl = document.querySelector('.forecast-cards-container');
const weatherIconEl = document.querySelector('#weather-icon');
const currentWeatherEl = document.querySelector('.current-weather');
const searchCityEl = document.querySelector('#search-city');
const cityInput = document.querySelector('#city-input');

const apiKey = '453394794dcaa724188e30117e94e066';
// const city = 'san diego';
// const todayWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
// const todayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
// const weatherIcon = `https://openweathermap.org/img/wn/10d.png`;

// fetch(todayWeather)
// 	.then(function (response) {
// 		return response.json();
// 	})
// 	.then(function (data) {
// 		// console.log(data);
// 		const cityName = data.name;
// 		const todayTemp = data.main.temp;
// 		const todayWind = data.wind.speed;
// 		const todayHumidity = data.main.humidity;
// 	});

// fetch(todayForecast)
// 	.then(function (response) {
// 		return response.json();
// 	})
// 	.then(function (data) {
// 		for (let i = 0; i < data.list.length; i++) {
// 			if (i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
// 				console.log(data.list[i]);
// 			}
// 		}
// 	});

function getTodayWeather(city) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			// const cityName = data.name;
			// const todayDate = dayjs.unix(data.dt).format('M/D/YYYY');
			// const todayTemp = data.main.temp;
			// const todayWind = data.wind.speed;
			// const todayHumidity = data.main.humidity;
			// const todayWeatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
			// todayDate = dayjs.unix(1709607600).format('M/D/YYYY');
			postTodayWeather(
				// cityName,
				// todayWeatherIcon,
				// todayDate,
				// todayTemp,
				// todayWind,
				// todayHumidity
				data
			);
		});

	getTodayForecast(city);
}

function getTodayForecast(city) {
	fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data.list[0]);
			// postTodayForecast(data.list[0]);
			// console.log(dayjs.unix(1709618400).format('M/D/YYYY'));
			for (let i = 0; i < data.list.length; i++) {
				// These are 24 hours intervals from the first index
				if (i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
					// console.log(data.list[i]);
					postTodayForecast(data.list[i]);
				}
			}
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
	// console.log(data);
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
	// forecastTemp.textContent = `Temp: ${data.main.temp}`;
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

searchCityEl.addEventListener('submit', function (event) {
	event.preventDefault();
	let city = cityInput.value;
	getTodayWeather(city);
	city = cityInput.value = '';
});
