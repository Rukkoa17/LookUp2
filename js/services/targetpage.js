const strcelestial_objects = sessionStorage.getItem("celestialdatas")
const newcelestial_objects = JSON.parse(strcelestial_objects)
const parameters = new URLSearchParams(window.location.search);
let objecttype = parameters.get("objecttype")
let objectid = parameters.get("objectid")

if (objectid.includes(" ")){
   objectid = objectid.replaceAll(" " , "_")
}