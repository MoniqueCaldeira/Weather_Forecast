const search = document.getElementById('search');
const button = document.getElementById('button-confirm');
const image = document.getElementById('image-weather');
const temp = document.getElementById('temperature')
const desc = document.getElementById('description');
const local = document.getElementById('local');


button.addEventListener('click', () => {
   console.log(search.value);

   const ApiKey = "70450de2ac958905e084a5685183cd6e";
   const cidade = search.value;

   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${ApiKey}`).then(response => {
      return response.json();
   }).then(data => {

      if(data.cod === "404"){
         local.innerText = "Local não encontado, digite novamente!";
         image.src = "images/no-results.png";
         temp.innerText = "";
         desc.innerText = "";
         search.value = "";
      }
      else{
         switch (data.weather[0].main) {
            case "Clouds":
               image.src = "images/clouds.png"
               break;
            case "Rain":
               image.src = "images/rain.png"
               break;
            case "Clear":
               image.src = "images/sun.png"
               break;
            case "Snow":
               image.src = "images/snow.png"
               break;
            default:
               break;
         }

         local.innerText = "Local: " + data.name.toUpperCase();
         temp.innerText = "Temperatura: " + data.main.temp + "°C"
         desc.innerText = "Descrição: " + data.weather[0].description
         search.value = ""
      }
   })
})