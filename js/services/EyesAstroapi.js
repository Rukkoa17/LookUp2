

//Change for "conditionsready" ?? In way to filter what would be invisible because of weather
window.addEventListener("glocaready" , ()=>{

   fetch(
         "https://api.astronomyapi.com/api/v2/bodies/positions" +
         `?bodies=mercury,venus,mars,jupiter,saturn,uranus,neptune,moon` +
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
         for (let i = 1 ; i < 10 ; i++){
            let nameWithApi = data.data.table.rows[i].entry.id;
            let azimWithApi = parseFloat(data.data.table.rows[i].cells[0].position.horizontal.azimuth.degrees)

            if (!celestial_objects.planets[nameWithApi]) continue;

            // console.log(i, nameWithApi);

            let altitudeWithApi = parseFloat(data.data.table.rows[i].cells[0].position.horizontal.altitude.degrees);
            let magnitudeWithApi = (data.data.table.rows[i].cells[0].extraInfo.magnitude); //low magnitude = more shining & visible

            let visible = ""; // "red":not visible | "yellow":possible,depends on condition of user (naked eye) | "green": visible (naked eye) 

            if (nameWithApi !== "venus" && nameWithApi !== "jupiter"){ //Venus & Jupiter shine more , so other coditions for them !

               if (altitudeWithApi >= 15 && magnitudeWithApi < 4){ 
                  visible = "green"; //For a GOOD visibility it needs >15° alt and <4° magnitude

               } else if (altitudeWithApi > 15 && magnitudeWithApi < 6 ){
                  visible = "yellow"; //Depending on many conditions but here the planet can maybe be visible
               } else {
                  visible = "red";
               }
            } else {
               if (altitudeWithApi > 10 && magnitudeWithApi < 0){
                  visible = "green";
               } else if (altitudeWithApi > 5 && magnitudeWithApi < 2){
                  visible = "yellow";
               } else {
                  visible ="red";
               }
            }      

            celestial_objects.planets[nameWithApi].infos.azimuth = azimWithApi;
            celestial_objects.planets[nameWithApi].infos.altitude = altitudeWithApi;
            celestial_objects.planets[nameWithApi].infos.magnitude = magnitudeWithApi;
            celestial_objects.planets[nameWithApi].infos.visibility = visible;
            
         }
         window.dispatchEvent(new Event("planetsready"));
         }
      ) 
});