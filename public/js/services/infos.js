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

const loading = document.querySelector("#server-status") 
loading.innerHTML = "Loading ..."

// After that we ask for permission regarding to deviceorientation use. (Needed if the user is on IOS)
const noacces_popup = document.querySelector("#noacces-popup-cont")

const isIOSPermission = typeof DeviceOrientationEvent?.requestPermission === "function";

if (isIOSPermission) {

    loading.innerHTML = "Touche l'écran pour commencer";

    document.body.addEventListener("click", async function askOrientation() {

        try {
            const permission =
                await DeviceOrientationEvent.requestPermission(); 

            if (permission === "granted") {
                if (! noacces_popup.classList.contains("hidden")){
                   noacces_popup.classList.add("hidden")
                   noacces_popup.classList.remove("open")
                }
            }
            else {
                noacces_popup.classList.add("open")
            }
        } catch (e) {
            console.log(e);
            noacces_popup.classList.add("open")
        }

        loading.innerHTML = "Loading ...";
        glocation();

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

let locationRequested = false;

function glocation(){
   
   if (locationRequested) return;
   locationRequested = true;

   const onSuccess = (position) => {
      userLocation.latitude = position.coords.latitude;
      userLocation.longitude = position.coords.longitude;
      window.dispatchEvent(new Event("glocaready"));
   };

   navigator.geolocation.getCurrentPosition(onSuccess,
   (error)=>{
      console.log(error);

      // Fallback
      navigator.geolocation.getCurrentPosition(onSuccess,
      (error2)=>{
         console.log(error2);
         
         loading.innerHTML = "No Access to position , please accept it and refresh..";
      },
      {
         enableHighAccuracy: false,
         timeout: 15000,
         maximumAge: 60000
      });
   }, 

   {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0

   });
};
   //

if (!isIOSPermission) {
   glocation();
}
