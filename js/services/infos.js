
//Backend Render api keys request
async function serverresquest(){

   const loading = document.querySelector("#server-status")
   loading.textContent = "Loading ..."

   try {
   const astroresponse = await fetch("https://lookup2-gpj8.onrender.com/api/astro");
   const weatherresponse = await fetch("https://lookup2-gpj8.onrender.com/api/weather");
   
   if (!astroresponse.ok || !weatherresponse.ok){
      throw new Error("Issue with backend.")
   }
   
   const astrokey = await astroresponse.json()
   const weatherkey = await weatherresponse.json()
   console.log(weatherkey)

   loading.innerHTML = ""
   
   }

   catch (error) {
      status.textContent = "● Offline";
      console.error(error);
   }




}

//Ask for gps postion from the start
window.userLocation = {
    latitude: null,
    longitude: null
    
}

const now = new Date();
const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;



function glocation(){

   navigator.geolocation.getCurrentPosition((position) => {
      userLocation.latitude = position.coords.latitude;
      userLocation.longitude = position.coords.longitude;
      window.dispatchEvent(new Event("glocaready"));
   },
   (error)=>{
      console.log(error);
   }, 

   {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0

   });
};
   //
   
glocation();
