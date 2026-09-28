const strcelestial_objects = sessionStorage.getItem("celestialdatas");
const newcelestial_objects = JSON.parse(strcelestial_objects);
const parameters = new URLSearchParams(window.location.search);
const info_panel = document.querySelector('#object-infos-tab');
const num_comp = document.querySelector("#number-comp");
const hour_display = document.querySelector("#current-hour")

let objecttype = null;
let objectid = null;
let objectimg = null;
let azdata = null;
let altdata = null;

//This is my way to handle changing the hour every minute according to the clock not a fixed time.
let interval = null

// In order to use this variable for sky color
let user_date = null;
let formatter = null;

function display_hour(){

   user_date = new Date()   

   formatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit"
   });

   hour_display.innerHTML = formatter.format(user_date);

   clearTimeout(interval);

   interval = setTimeout(display_hour, 60000 - user_date.getSeconds() * 1000);
}

display_hour()

const guiding_arrow = document.querySelector("#guiding-arrow")

if (2 > parameters){
   guiding_arrow.style.display = "none"   
}

else {
   objecttype = parameters.get("objecttype")
   objectid = parameters.get("objectid")
   objectimg = newcelestial_objects[objecttype][objectid].img
   azdata = newcelestial_objects[objecttype][objectid].infos.azimuth
   altdata = newcelestial_objects[objecttype][objectid].infos.altitude

   
   if (objectid.includes(" ")){
      objectid = objectid.replaceAll(" " , "_")
   }
   
   //In order to not create many variables I chose to use the "path" of the div to select differnt parts of the panel
   info_panel.firstElementChild.firstElementChild.textContent = objectid[0].toUpperCase() + objectid.slice(1) // title with first letter Uppercase.
   info_panel.firstElementChild.lastElementChild.src = "." + objectimg // image
   info_panel.lastElementChild.firstElementChild.textContent += Math.round(azdata * 100) / 100 + "° / " + Math.round(altdata * 100) / 100 + "°" //Round * 100 / 100 is there to round + 2 decimals after ,
   info_panel.lastElementChild.lastElementChild.textContent += " " + objecttype.slice(0 , -1)// type info
   
   delete newcelestial_objects[objecttype][objectid]
}

//Add the selected main color to all the concerned elements of the page.
const scope = document.querySelector("#target-scope");
const targetpoint = document.querySelector("#target-point");
const targetbtn = document.querySelector("#targetbtn")

const elemlist = [scope , targetpoint , guiding_arrow , targetbtn];
const maincolor = sessionStorage.getItem("maincolor");

color_dict = {
   "mainpink" : '#e558d2',
   "mainblue" : '#0053ed',
   "mainred" : '#d60202',
   "maingreen" : '#1e9e2a', 
   "mainwhite" : '#ffffff'
}

// NO time to think it myself so for next version
// const sunset_hour = sessionStorage.getItem("sunset_hour")
// const last_light = sessionStorage.getItem("last_light")

// console.log(sunset_hour)
 
// console.log(formatter.format(user_date) > sunset_hour)


elemlist.forEach(elem => {
   elem.classList.add(maincolor)
})

window.dispatchEvent(new Event("targetpageok"));

