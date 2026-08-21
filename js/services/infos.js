//Loading
let planetstatus = false;
let objectsstatus = false;

const loading = document.querySelector("#server-status")
loading.textContent = "Loading ..."

function clearloading () {
   if (planetstatus && objectsstatus){
      loading.remove()
      window.dispatchEvent(new Event("loadingclear"))
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
