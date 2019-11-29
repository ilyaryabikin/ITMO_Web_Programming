let weatherButton = document.getElementById('weather-button');

weatherButton.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' +
                position.coords.longitude + '&appid=57194cfc79df3ec9492689405cd2a6c2',
            cache: 'false',
            method: 'GET',
            dataType: 'jsonp',
            success: function (jsonp) {
                let div = document.getElementById('weather-info');
                div.innerHTML = '';

                let city = document.createElement('p');
                city.className = 'lead';
                city.innerHTML = 'Город: ' + jsonp['name'];

                let temperature = document.createElement('p');
                temperature.className = 'lead';
                temperature.innerHTML = 'Температура: ' + Math.round(jsonp['main']['temp'] - 273.15) + ' &#176;C';

                let picture = document.createElement('img');
                picture.setAttribute('src', 'https://openweathermap.org/img/wn/' + jsonp['weather'][0]['icon'] + '.png');
                div.append(picture);
                div.append(city);
                div.append(temperature);
            }
        });
    })
})