//Here will be in this order : Weather API / Moon Phase / Light pollution API. All will result in a % for user OBSERVABILITY.

// const ky that was my api key here was delete , so previous exposed version doesn't work no more.

//Pardon me for the chains of if statements but that is what I found best in my case without looking for specific formulas. Next version this will be re worked
let observability = {
    "weather" : null,
    "moon" : null,
    "light_pollution" : null,
}


window.addEventListener("glocaready", () => {
    async function getconditions(){

    // Arbitrary rating that will probably change , but for now:
    // Overall weather 40/100 | Moonphase : 20/100 | Light Pollution : 40 / 100 | Atmospheric conditions ..? 10/100

        let weatherstate = await rateweather();

        let moon_phase = await ratemoonphase()

        //Day time correlated to sunset and last light to change the color of 3d sky
        sessionStorage.setItem("sunset_hour" , moon_phase["sunset_hour"]);
        sessionStorage.setItem("last_light" , moon_phase["last_light"])

        let lightpollution = await rate_lightpollution()

        observability["weather"] = weatherstate;
        observability["moon"] = moon_phase;
        observability["light_pollution"] = lightpollution

        window.dispatchEvent(new Event("observability_ready"));    

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

        //personal rating for weather in order to add this to the final one , WILL IMPROVE PLZ DON T HATE RN ON THE IF IF IF );

        if (weatherData.clouds <= 10){
            weatherData.rating += 20;
        }
        else if (weatherData.clouds <= 25){
            weatherData.rating += 17;
        }
        else if (weatherData.clouds <= 40){
            weatherData.rating += 14;
        }
        else if (weatherData.clouds <= 55){
            weatherData.rating += 10;
        }
        else if (weatherData.clouds <= 70){
            weatherData.rating += 6;
        }
        else if (weatherData.clouds <= 85){
            weatherData.rating += 3;
        }

        if (weatherData.rain == 0){
            weatherData.rating += 10;
        }
        else if (weatherData.rain < 0.5){
            weatherData.rating += 8;
        }
        else if (weatherData.rain < 1){
            weatherData.rating += 5;
        }
        else if (weatherData.rain < 2){
            weatherData.rating += 2;
        }

        if (weatherData.humidity <= 60){
            weatherData.rating += 5;
        }
        else if (weatherData.humidity <= 70){
            weatherData.rating += 4;
        }
        else if (weatherData.humidity <= 80){
            weatherData.rating += 3;
        }
        else if (weatherData.humidity <= 90){
            weatherData.rating += 1;
        }

        if (weatherData.wind <= 2){
            weatherData.rating += 3;
        }
        else if (weatherData.wind <= 5){
            weatherData.rating += 2;
        }
        else if (weatherData.wind <= 8){
            weatherData.rating += 1;
        }

        if (weatherData.visibility >= 10000){
            weatherData.rating += 2;
        }
        else if (weatherData.visibility >= 7000){
            weatherData.rating += 1;
        }

        return weatherData;
    }

    // Moon Phase
    async function ratemoonphase(){
        
        const response = await fetch(
            `https://api.sunrisesunset.io/json?lat=${userLocation.latitude}&lng=${userLocation.longitude}`,
        )
        
        const data = await response.json();
        
        //To display the day correctly in the 3d space
        const sunset_hour = data.results.sunset //Darker sky / little orange ?
        const last_light = data.results.last_light //Dark sky from there

        const no_moon_night = data.results.moon_always_down; //Good arg for if statement.
        const moon_illumination = data.results.moon_illumination; // Percent of the moon's disk illuminated, 0–100.
        const moon_phase_name = data.results.moon_phase;
        const moon_phase_rating = data.results.moon_phase_value; // Continuous phase value. 0 and 1 are new, 0.5 is full.

        const moon_Data = {
            sunset_hour : sunset_hour,
            last_light : last_light,            
            
            moon_night : no_moon_night,
            moon_illumination : moon_illumination,
            moon_phase_name : moon_phase_name,
            moon_phase_rating : moon_phase_rating,
            
            rating : 0,
        }

        if (moon_Data.moon_night != false){
            moon_Data.rating = 20
        }

        else if (moon_illumination <= 10){
            moon_Data.rating = 20
        }

        else if (moon_illumination <= 25){
            moon_Data.rating = 17
        }

        else if (moon_illumination <= 40){
            moon_Data.rating = 14
        }

        else if (moon_illumination <= 55){
            moon_Data.rating = 10
        }

        else if (moon_illumination <= 70){
            moon_Data.rating = 6
        }

        else if (moon_illumination <= 85){
            moon_Data.rating = 3
        }

        else {
            moon_Data.rating = 0
        }

        return moon_Data
    };
    
    //Light Pollution 
    async function rate_lightpollution(){

        const response = await 
        fetch(`https://lookup2-gpj8.onrender.com/api/lightpollution?lat=${userLocation.latitude}&lon=${userLocation.longitude}`)

        const data = await response.json()

        return data

    }

getconditions()

});