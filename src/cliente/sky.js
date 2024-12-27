
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value.trim();

    // Verificar se o nome da cidade foi digitado
    if (!cityName) {
        showAlert('Você precisa digitar a cidade...');
        document.querySelector("#weather").classList.remove("show"); // Garante que as informações ficam escondidas
        return;
    }

    const apiKey = 'ee7cc33de0f01004ca21edc7a28dc267';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            // Mostrar as informações do clima
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            showAlert('Não foi possível localizar...');
            document.querySelector("#weather").classList.remove("show"); // Esconde o #weather
        }
    } catch (error) {
        showAlert('Erro ao buscar os dados. Tente novamente mais tarde.');
        document.querySelector("#weather").classList.remove("show"); // Esconde o #weather em caso de erro
    }
});

function showInfo(json) {
    showAlert(''); // Remove qualquer alerta ativo

    // Atualiza e exibe as informações
    document.querySelector("#weather").classList.add("show");
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${Math.round(json.temp)} <sup>°C</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp_max').innerHTML = `${Math.round(json.tempMax).toString().replace('.', ',')}°C`;
    document.querySelector('#temp_min').innerHTML = `${Math.round(json.tempMin).toString().replace('.', ',')}°C`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
    if (msg) {
        document.querySelector("#weather").classList.remove("show"); // Esconde o #weather ao exibir alertas
    }
}
