const strcelestial_objects = sessionStorage.getItem("celestialdatas")
const newcelestial_objects = JSON.parse(strcelestial_objects)
const parameters = new URLSearchParams(window.location.search);
const info_panel = document.querySelector('#object-infos-tab')
let objecttype = parameters.get("objecttype")
let objectid = parameters.get("objectid")
let objectimg = celestial_objects[objecttype][objectid].img
let azdata = newcelestial_objects[objecttype][objectid].infos.azimuth
let altdata = newcelestial_objects[objecttype][objectid].infos.altitude

if (objectid.includes(" ")){
   objectid = objectid.replaceAll(" " , "_")
}

//In order to not create many variables I chose to use the "path" of the div to select differnt parts of the panel
info_panel.firstElementChild.firstElementChild.textContent = objectid // title
info_panel.firstElementChild.lastElementChild.src = "." + objectimg // image
info_panel.lastElementChild.firstElementChild.textContent += Math.round(azdata * 100) / 100 + " / " + Math.round(altdata * 100) / 100 //Round * 100 / 100 is there to round + 2 decimals after ,
info_panel.lastElementChild.lastElementChild.textContent += " " + objecttype// type info