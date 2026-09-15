//Here will be in this order : Weather API / Moon Phase / Light pollution API. All will result in a % for user OBSERVABILITY.

// const ky that was my api key here was delete , so previous exposed version doesn't work no more.

window.addEventListener("glocaready", () => {

    async function getconditions(){

    // Arbitrary rating that will probably change , but for now:
    // Overall weather 40/100 | Moonphase : 20/100 | Light Pollution : 30 / 100 | Atmospheric conditions ..? 10/100

        let weatherstate = await rateweather();
        let weather_rating = weatherstate.rating;
        console.log(weather_rating);

        let moon_phase = await ratemoonphase()
        console.log(moon_phase);

        // let moonphasestate = await ratemoonphase();
        // console.log(moonphasestate)

    }


    async function rateweather(){

        const response = await fetch(
            `https://lookup2-gpj8.onrender.com/api/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}`
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

    // Moon Phase
    async function ratemoonphase(){
        
        const response = await fetch(
            `https://api.sunrisesunset.io/json?lat=${userLocation.latitude}&lng=${userLocation.longitude}`,
            
        )
        
        const data = await response.json();
        
        const no_moon_night = data.results.moon_always_down; //Good arg for if statement.
        const moon_illumination = data.results.moon_illumination; // Percent of the moon's disk illuminated, 0–100.
        const moon_phase_name = data.results.moon_phase;
        const moon_phase_rating = data.results.moon_phase_value; // Continuous phase value. 0 and 1 are new, 0.5 is full.

        const moon_state = [no_moon_night , moon_illumination , moon_phase_name , moon_phase_rating ]

        return moon_state
        
        
    };
    
    
getconditions()

    // getconditions();

});







//Light Pollution 



//Result