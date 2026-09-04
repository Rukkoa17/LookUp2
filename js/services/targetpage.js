const strcelestial_objects = sessionStorage.getItem("celestialdatas")
const newcelestial_objects = JSON.parse(strcelestial_objects)
const parameters = new URLSearchParams(window.location.search);
const info_panel = document.querySelector('#object-infos-tab')
const num_comp = document.querySelector("#number-comp")

let objecttype = null
let objectid = null
let objectimg = null
let azdata = null
let altdata = null

if (2 > parameters){
   
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



window.dispatchEvent(new Event("targetpageok"));