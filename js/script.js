axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=569ce9a52042694ca577035649272793')
  .then(response => {
    var data = response.data;
    var weatherDescription = data.weather[0].description;
    var temperature = data.main.temp - 273.15; // convert from Kelvin to Celsius

    // Create a Leaflet map and add a marker for the city

    var marker;
    var map = L.map('map').setView([data.coord.lat, data.coord.lon], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      minZoom: 1.75,
      maxZoom: 19,
    }).addTo(map);



    map.on('click', function (e) {

      if (marker) {
        map.removeLayer(marker); // remove the existing marker
      }
      marker = L.marker(e.latlng).addTo(map); // create a new marker

      var notifOne = document.getElementById('confirm-notif')
      if (notifOne.style.visibility == 'visible') {
        notifOne.classList = "notif-card animate__animated animate__bounceOutRight";
        notifOne.style.visibility = 'hidden';
      }


      const dataCard = document.getElementById('data-card');
      dataCard.classList = "data-cardm animate__animated animate__zoomInDown";
      dataCard.style.visibility = 'visible';


      var latlng = marker.getLatLng();

      const apiKey = '569ce9a52042694ca577035649272793';
      const lat = latlng.lat;
      const lon = latlng.lng;
      const units = 'metric';

      // build API endpoint URL
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

      // make HTTP request to API endpoint
      axios.get(apiUrl)
        .then(response => {
          const dataBody = document.getElementById('weather-data');
          const Wdata = JSON.stringify(response.data).replace(/[,\{\}]/g, '\n').replace(/"[^"]+": /g, '');
          const temp = response.data['main']['temp'];
          const humidity = response.data['main']['humidity'];
          const wind = response.data['wind']['speed'];
          const feelsLike = response.data['main']['feels_like'];
          const loc = response.data['name'];
          const country = response.data['sys']['country'];
          const descp = response.data['weather']['0']["description"];
          const pres = response.data['main']['pressure'];
          const grdlvl = response.data['main']["grnd_level"];
          console.log(response.data);
          document.getElementById('hum-data').innerHTML = "Humidity<br>" + humidity + "%";
          document.getElementById('d-hum-data').innerHTML = "Humidity: " + humidity + "%";
          document.getElementById('wind-data').innerHTML = "Wind Speed<br>" + wind + " m/s";
          document.getElementById('d-wind-data').innerHTML = "Wind Speed: " + wind + " m/s";
          document.getElementById('feels-like').innerHTML = "Feels Like<br>" + feelsLike + " °C";
          document.getElementById('d-feels-like').innerHTML = "Feels Like: " + feelsLike + " °C";
          document.getElementById('temp-data').innerHTML = temp + " °C";
          document.getElementById('d-temp-data').innerHTML = temp + " °C";
          document.getElementById('location-data').innerHTML = loc + ", " + country;
          document.getElementById('d-loc-data').innerHTML = loc + ", " + country;
          document.getElementById('descp-data').innerHTML = descp;
          document.getElementById('d-descp-data').innerHTML = descp;
          document.getElementById('pres-data').innerHTML = pres + "<br>hPa";
          document.getElementById('d-pres-data').innerHTML = "Pressure: " + pres + "hPa";
          document.getElementById('sea-data').innerHTML = "Ground Level:<br>" + grdlvl + " hPa";          
          document.getElementById('d-sea-data').innerHTML = "Ground Level: " + grdlvl + " hPa";          

        })
        .catch(error => {
          // handle error
          console.error(error);
        });

      marker.on('click', function (e) {

        var notif = document.getElementById('confirm-notif');
        notif.classList = 'notif-card animate__animated  animate__lightSpeedInRight';
        notif.style.visibility = 'visible';

      });

      const notif = document.getElementById('confirm-notif')
      const notifBtn = document.getElementById('sub-notif');
      notifBtn.addEventListener('click', function () {
        map.removeLayer(marker);
        notif.classList = "notif-card animate__animated animate__bounceOutRight";
        notif.style.visibility = 'hidden';
        dataCard.classList = "data-cardm animate__animated animate__bounceOutRight";
        dataCard.style.visibility = 'hidden';

      })



    });

  });




