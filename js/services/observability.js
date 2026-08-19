//Here will be in this order : Weather API / Moon Phase / Light pollution API. All will result in a % for user OBSERVABILITY.

const ky = "33c197cc674cc1ee4cda646ca977afdb"

window.addEventListener("glocaready", () => {

    async function getconditions(){

         let weatherstate = await rateweather();
         let weather_rating = weatherstate.rating;
         console.log(weather_rating);

        // let moonphasestate = await ratemoonphase();
        // console.log(moonphasestate)

    }


    async function rateweather(param){

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${ky}&units=metric`
        );

        const data = await response.json();

        const weatherData = {
            clouds: data.clouds.all,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            visibility: data.visibility,
            rain: data.rain?.["1h"] ?? 0,
            snow: data.snow?.["1h"] ?? 0,
            rating: 0
        };

        //personal rating for weather in order to add this to the final one , WILL IMPROVE RADICCALY PLZ DON T HATE RN ON THE IF IF IF );
        if (weatherData.clouds <= 7.5){
            weatherData.rating += 20;
        }
        else if (weatherData.clouds <= 20){
            weatherData.rating += 15;
        }
        else if (weatherData.clouds <= 50){
            weatherData.rating += 7.5;
        }
        else if (weatherData.clouds <= 75){ 
            weatherData.rating += 3;
        }
        else {
            weatherData.rating -= 15
        }

        if (weatherData.rain >= 2){
            weatherData.rating -= 10;
        }
        else if (weatherData.rain >= 1){
            weatherData.rating -= 7.5;
        }
        else {
            weatherData.rating += 10
        }

        if (weatherData.humidity <= 40){
            weatherData.rating += 10
        }
        else if (weatherData.humidity <= 60){
            weatherData.rating += 5;
        }
        else if (weatherData.humidity <= 80){
            weatherData.rating -=5;  
        }
        else {
            weatherData.rating -= 10;
}


        return weatherData

    }

    /*Moon Phase
    async function ratemoonphase(){

        fetch(
            "https://api.astronomyapi.com/api/v2/studio/moon-phase" +
            `&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&elevation=0` +
            `&from_date=${date}&to_date=${date}&time=${time}`,
            {
            headers: {
                "Authorization": "Basic " + btoa("11bcc377-f009-454a-9d04-2c6df9e9ecd6:43af20480582a4a90cc67032a86f8d66198bceb4c72e5866aaeaeb9fc12e7e28c308be7396f74ca0f701f2c7850fca8577cd0dbc73101affec1d3f8a2da65e0673691892d675f3bf1307e6bceda85d8f45efa77ca7a75ce02954e2db473397c79e10fd7ea8e2240416c2055b9ae4cef7")
                }
            }
        )

        .then(response => response.json())
        .then(data => {
            return data
        }
        
        )

    };
*/


    // getconditions();

});







//Light Pollution 



//Result