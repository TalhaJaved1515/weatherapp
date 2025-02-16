
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
const loader = document.getElementById('loader');

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
loader.style.color='rgb(0, 197, 0)'
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
btn.style.filter = 'drop-shadow(0px 0px 4px rgba(30, 30, 30, 0.416))';
input.addEventListener('input',()=>{
    console.log('input');
    localStorage.setItem('input' , input.value);
});
window.addEventListener('load', ()=>{
    const savedinput = localStorage.getItem('input');
    if (savedinput) {
        input.value = savedinput;
    }
});


btn.addEventListener('click', async () => {
    const value = input.value;
    loader.innerText = 'Searching.....'
    try {
        const result = await getdata(value);
        loader.innerText = '';
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
           btn.style.filter = 'drop-shadow(0px 0px 4px rgb(255, 44, 44))'

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
btn.style.filter = 'drop-shadow(0px 0px 2px rgb(138, 255, 75))'

input.style.boxShadow= ' 0px 0px 10px rgb(0, 197, 0)';
timeimage.style.display = 'block';

        }
    }
    catch (err) {
        loader.innerText = '';
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
btn.style.filter = 'drop-shadow(0px 0px 2px rgb(255, 44, 44))'

input.style.boxShadow= ' 0px 0px 10px red';
    }
});



  

