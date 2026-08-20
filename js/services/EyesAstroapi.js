//Change for "conditionsready" ?? In way to filter what would be invisible because of weather
window.addEventListener("glocaready" , async ()=>{
   try {

   await fetch(
         "https://lookup2-gpj8.onrender.com/api/astro" +
         `?bodies=mercury,venus,mars,jupiter,saturn,uranus,neptune,moon` +
         `&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&elevation=0` +
         `&from_date=${date}&to_date=${date}&time=${time}`,    
      )

   .then(response => response.json())
   .then(data => { 
         console.log(data)
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
         planetstatus = true
         clearloading()
         }
      ) 
   } catch (error) {
      console.error("There is an issue with the backend..." , error)
   }
});