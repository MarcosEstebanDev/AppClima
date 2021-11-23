const API_KEY = '8b90ffb17808b240ec32c84ddb9fee40';

const fetchData = position => {
    const { latitude, longitude } = position.coords;

    //Obtenemos la Data por la localizacion geografica, llamando a los atributos del objeto JSON 
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}
//Informacion que nos interesa mostrar en el DOM
const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        pais: data.sys.country,
        location: data.name,
        description: data.weather[0].main,
        sky: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        temperatureMax: data.main.temp_max,
        temperatureMin: data.main.temp_min,
        date: getDate(),

    }
    //Recorrer todo el objeto y devolver las keys. Setear la info en el DOM
    
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
        document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png ";
        document.getElementById('temperature').textContent = data.main.temp.toFixed();
        document.getElementById('temperatureMax').textContent = data.main.temp_max.toFixed();
        document.getElementById('temperatureMin').textContent = data.main.temp_min.toFixed();


    });
    //Crea una class segun el horario 
    const dayHour = new Date(data.dt * 1000).getHours();

    if (dayHour > 6 && dayHour < 18) {
        container.classList.remove("night");
        container.classList.add("day")

    } else {
        container.classList.remove("day");
        container.classList.add("night")
    }

}


//Obtener la informacion del dia y devolver fomateada la respuesta de date, seteando el dia el mes y el año.
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

//Obtener la ubicacion del usuario, geolocazion, posicion.
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
