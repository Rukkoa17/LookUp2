//Script in order to ask for device orientation permisison for Iphone users.

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
