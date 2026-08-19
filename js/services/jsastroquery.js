
window.addEventListener("glocaready" , ()=>{

   fetch('./js/services/jsonastroquerysimbad.txt')
   .then(response => response.json())
   .then(text => {
      for (object in text){
         let current_name = text[object]["name"].toLowerCase();
         if (current_name.includes(" ")){
            current_name = current_name.replace(" ", "_")
         }
         let current_ra = text[object]["ra"];
         let current_dec = text[object]["dec"];
         let current_type = text[object]["type"];
         let current_magV = text[object]["magnitude V"];
         let current_magB = text[object]["magnitude B"]
         
         let fromcatalogueobj = celestial_objects[current_type][current_name];

         // Ok so for now I will run this function only one time (maybe later i'll put something to update it every 2/3min)
         // But I will later on in the target mode of an object , make a way to refresh the position each second  
         
         const jd = new Date().getTime() / 86400000 + 2440587.5
         function ra_deg_to_az_lat(ra , dec , lat , lon , jul_date){
            
            let jul_cent = (jul_date - 2451545.0) / 36525
            let theta = 280.46061837 + 360.98564736629 * (jul_date - 2451545.0) + (0.000387933 * jul_cent * jul_cent) - (jul_cent* jul_cent * jul_cent / 38710000.0)

            let GMST = theta % 360 ; //that is in degree form
            if (GMST < 0) {
               GMST += 360;
            }
            if (!(GMST >= 0 && GMST <= 360)){
               console.error("Something went wrong with the GMST " + GMST + " is not between 0-360 degrees");
            } 

            let LST = GMST + lon;
            if (!(LST >= 0 && LST <= 360)){
               console.error("Something went wrong with the LST " + LST + " is not between 0-360 degrees");
            }

            let hour_angle = LST - ra;

            if (hour_angle < 0){
               hour_angle += 360
            }
            else if (hour_angle >360){
               hour_angle -= 360
            }
            
            const torad = deg => deg * Math.PI / 180;
            let latrad = torad(lat);
            let decrad = torad(dec);
            let hour_anglerad = torad(hour_angle);
            //the asin & atan2 function expect values in rad not degrees , so little conversion.
            let alt = Math.asin(Math.sin(latrad)*Math.sin(decrad) + Math.cos(latrad)*Math.cos(decrad)*Math.cos(hour_anglerad));
            let az = Math.atan2(Math.sin(hour_anglerad), Math.cos(hour_anglerad)*Math.sin(latrad) - Math.tan(decrad)*Math.cos(latrad))
            
            //And now back to deg
            let altdeg = alt * 180 / Math.PI
            let azdeg = az * 180 / Math.PI
            azdeg += 180 // Don't ask me why , just this was the solution that I found while comparing datas with Stellarium.

            return [azdeg , altdeg]
         }
         
         let finalpos = ra_deg_to_az_lat(current_ra , current_dec , userLocation.latitude , userLocation.longitude , jd)

         celestial_objects[current_type][current_name].infos.azimuth = finalpos[0];
         celestial_objects[current_type][current_name].infos.altitude = finalpos[1];
         //For now I'm letting magV and magB (green filter and blue filter) , we'll see if I can make good use of both.
         celestial_objects[current_type][current_name].infos.magnitude = {"magV": current_magV , 
                                                                          "magB": current_magB
         }

      }}
   )
   window.dispatchEvent(new Event("otherready"));  
})