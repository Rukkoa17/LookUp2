import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
//-----Position of wanted object

const az = THREE.MathUtils.degToRad(azdata);
const alt = THREE.MathUtils.degToRad(altdata);

const xpos = 5 * Math.cos(alt) * Math.sin(az) * 100;
const ypos = 5 * Math.sin(alt) * 100;
const zpos = -5 * Math.cos(alt) * Math.cos(az) * 100;

//----Scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1 , 1000)
camera.position.set(0 , 10 , 0)
camera.rotation.x = -Math.PI / 2


const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);

//----3DObjects
const geometry = new THREE.SphereGeometry(1000 , 32 , 16 ) // hehe , sphere
const material = new THREE.MeshBasicMaterial({color: 0x0004 , side : THREE.BackSide});
const sphere = new THREE.Mesh(geometry , material)
scene.add(sphere)

const pla_geo = new THREE.BoxGeometry(2000 , 1 , 2000)
const pla_mat = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true , opacity : 0.3})
const plane = new THREE.Mesh(pla_geo , pla_mat)
plane.position.setY(-10)
scene.add(plane)

//Selected Celestial Object
const star_geo = new THREE.SphereGeometry(4 , 32 , 16)  
const star_mat = new THREE.MeshBasicMaterial({color : 0xffffff}) 
const star = new THREE.Mesh(star_geo , star_mat)
star.name = ("object : " + objectid)
star.position.set(xpos,ypos,zpos)
scene.add(star)

//Info Panel for the Object


//DeviceOrientation and Quaternions

const cg = new THREE.BoxGeometry(20 , 20 , 20)
const cm = new THREE.MeshBasicMaterial({color : 0x99ffff})
const c = new THREE.Mesh(cg , cm)
c.position.set(0, 10 , -150)
scene.add(c)  

const euler = new THREE.Euler()
const quater = new THREE.Quaternion()

//Cameracorrection to look 90° up more
const qua_camera = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -Math.PI / 2
);


window.addEventListener("deviceorientationabsolute", (event) => {
   
   const alpha = THREE.MathUtils.degToRad(event.alpha || 0);
   const beta  = THREE.MathUtils.degToRad(event.beta || 0);
   const gamma = THREE.MathUtils.degToRad(event.gamma || 0);

   let rawComp = e.webkitCompassHeading ?? (360 - event.alpha);
   let comp = rawComp % 360
   
   const compassdir = document.getElementById("direction-comp")
   compassdir.style.transform = `rotate(${comp}deg)`;

   euler.set(beta , alpha , -gamma , "YXZ");

   quater.setFromEuler(euler);

   quater.multiply(qua_camera);
   
   camera.quaternion.copy(quater)  
   
   //Opening the object panel if phone aimed at
   const camera_direction = new THREE.Vector3()
   camera.getWorldDirection(camera_direction)
   
   const star_direction = new THREE.Vector3()
   star.getWorldPosition(star_direction)
   
   star_direction.sub(camera.position).normalize();
   
   const angle = camera_direction.angleTo(star_direction)
   const angledeg = THREE.MathUtils.radToDeg(angle)
   
   const max_anglediff = 2 //Zone radius for the scope hitting the object or not.   
   console.log(angledeg)
   
   if (angledeg <= max_anglediff){
      info_panel.classList.add("open")
   }

});
 
//to put in device orientation event 
window.addEventListener("click" , () => {
   

   const stardir  = new THREE.Vector3;
   star.getWorldPosition(stardir)
   
   const camera_direction = new THREE.Vector3()
   camera.getWorldDirection(camera_direction)
   
   stardir.sub(camera.position).normalize()

   const angle = camera_direction.angleTo(stardir)
   const angledeg = THREE.MathUtils.radToDeg(angle)

   console.log(angledeg)

   // console.log(stardir.sub(camera_direction))

   // const vec = new THREE.ve

   // console.log(stardir)

})   

document.querySelector("#bg").addEventListener("click" , () => {
   if(info_panel.classList.contains("open")){
      info_panel.classList.remove("open")
   }
})

//To delete when done
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// const control = new OrbitControls(camera , renderer.domElement)
// control.target.set(0 , 10 , 0)



//Animation
function animate () {
   requestAnimationFrame(animate)
   // controls.update()
   renderer.render(scene , camera)
   
}

animate()

