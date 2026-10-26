//Loading
let planetstatus = false;
let objectsstatus = false;

const popup_pc = document.querySelector('#pc-popup')

// This part is there to check if the device of the user is equipped with the needed captors for the webapp.
if (!window.DeviceOrientationEvent) {
   console.log("Error : Device doesn't support 'DeviceOrientation'.");
   popup_pc.classList.add("open");
   popup_pc.children[0].classList.remove("hidden")
}

// After that we ask for permission regarding to deviceorientation use. (Needed if the user is on IOS)
const noacces_popup = document.querySelector("#noacces-popup-cont")

if (typeof DeviceOrientationEvent?.requestPermission === "function") {

    document.body.addEventListener("click", async function askOrientation() {

        const permission =
            await DeviceOrientationEvent.requestPermission(true);

        if (permission === "granted") {
            window.removeEventListener("click", askOrientation);

            if (! noacces_popup.classList.contains("hidden")){
               noacces_popup.classList.add("hidden")
               noacces_popup.classList.remove("open")
            }
        }

        else {

            noacces_popup.classList.add("open")
        }

    }, { once: true });

}

else {
   let orientationReceived = false;

   function checkOrientation(event) {
      // Checking if we there is any datas
      if (
         event.alpha !== null ||
         event.beta !== null ||
         event.gamma !== null
      ) {
         orientationReceived = true;
         window.removeEventListener(
               "deviceorientation",
               checkOrientation
         );
      }
   }

   window.addEventListener("deviceorientation", checkOrientation);

   setTimeout(() => {
      if (!orientationReceived) {
         console.log("No orientation data received");
         popup_pc?.classList.add("open");
         popup_pc.children[0].classList.remove("hidden")
      }
   }, 2000);
}

const loading = document.querySelector("#server-status")
loading.innerHTML = "Loading ..."

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
