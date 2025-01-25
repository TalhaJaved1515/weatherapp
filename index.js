
    const btn = document.getElementById('btn');
const input = document.getElementById('input');
const cityname = document.getElementById('city-name');
const citytemp = document.getElementById('city-temp');
const citytime = document.getElementById('city-time');
const cityhumidity = document.getElementById('cityhumidity');
const windimage = document.getElementById('windimage');
const humidityimage = document.getElementById('humidityimage');
const windspeed = document.getElementById('windspeed');
const error = document.getElementById('error');
const windname = document.getElementById('windname');
const humidityname = document.getElementById('humidityname');
const timeimage = document.getElementById('timeimage');

async function getdata(cityname) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9572aed135c84c1aa7a172448251101&q=${cityname}&aqi=yes`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (err) {
        throw new Error(`Fetch failed: ${err.message}`);
    }
}
error.style.color = 'red'
cityname.style.display = 'none';
citytemp.style.display = 'none';
citytime.style.display = 'none';
cityhumidity.style.display = 'none';
windspeed.style.display = 'none';
windimage.style.display = 'none';
humidityimage.style.display = 'none';
humidityname.style.display = 'none';
windname.style.display = 'none';
timeimage.style.display = 'none';
input.style.boxShadow= ' 0px 0px 10px rgba(30, 30, 30, 0.586)';
btn.addEventListener('click', async () => {
    const value = input.value;
 
    try {
        const result = await getdata(value);
        if (result.error) {
            error.innerText = 'Not Found';
            cityname.style.display = 'none';
            citytemp.style.display = 'none';
            citytime.style.display = 'none';
            cityhumidity.style.display = 'none';
            windspeed.style.display = 'none';
            windimage.style.display = 'none';
            humidityimage.style.display = 'none';
            humidityname.style.display = 'none';
           windname.style.display = 'none';
           timeimage.style.display = 'none';

           input.style.boxShadow= ' 0px 0px 10px red';
         

        } else {
            error.innerText = '';
            cityname.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
            citytemp.innerText = `${result.current.temp_c}°C`;
            citytime.innerText = `Local Time : ${result.location.localtime}`;
            cityhumidity.innerText = `${result.current.humidity}%`;
            windspeed.innerText = `${result.current.gust_kph} km/h`;
            cityname.style.display = 'block';
            citytemp.style.display = 'block';
            citytime.style.display = 'block';
            cityhumidity.style.display = 'block';
            windspeed.style.display = 'block';
            windimage.style.display = 'block';
            humidityimage.style.display = 'block';
            humidityname.style.display = 'block';
windname.style.display = 'block';
input.style.boxShadow= ' 0px 0px 10px rgb(0, 197, 0)';
timeimage.style.display = 'block';

        }
    }
    catch (err) {
        error.innerText = 'Not Found';
        cityname.style.display = 'none';
        citytemp.style.display = 'none';
        citytime.style.display = 'none';
        console.log('1')
        cityhumidity.style.display = 'none';
        windspeed.style.display = 'none';
        windimage.style.display = 'none';
        humidityimage.style.display = 'none';
        humidityname.style.display = 'none';
windname.style.display = 'none';
timeimage.style.display = 'none';

input.style.boxShadow= ' 0px 0px 10px red';
    }
});



  

