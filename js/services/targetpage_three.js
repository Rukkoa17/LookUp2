import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
//-----Position of wanted object

console.log(objectid)

let azdata = newcelestial_objects[objecttype][objectid].infos.azimuth
let altdata = newcelestial_objects[objecttype][objectid].infos.altitude

const az = THREE.MathUtils.degToRad(azdata);
const alt = THREE.MathUtils.degToRad(altdata);

const xpos = 5 * Math.cos(alt) * Math.sin(az) * 100;
const ypos = 5 * Math.sin(alt) * 100;
const zpos = -5 * Math.cos(alt) * Math.cos(az) * 100;

console.log([xpos , ypos , zpos])

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
const material = new THREE.MeshBasicMaterial({color: 0x00007 , side : THREE.BackSide});
const sphere = new THREE.Mesh(geometry , material)
scene.add(sphere)

const pla_geo = new THREE.BoxGeometry(2000 , 1 , 2000)
const pla_mat = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true , opacity : 0.3})
const plane = new THREE.Mesh(pla_geo , pla_mat)
plane.position.setY(-10)
scene.add(plane)

//Selected Celestial Object
const star_geo = new THREE.SphereGeometry(5 , 32 , 16)  
const star_mat = new THREE.MeshBasicMaterial({color : new THREE.Color("#e01db9")}) 
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

// window.addEventListener("deviceorientationabsolute", (event) => {

//    let alpha = THREE.MathUtils.degToRad(event.alpha)
//    let beta = THREE.MathUtils.degToRad(event.beta)
//    let gamma = THREE.MathUtils.degToRad(event.gamma)

   
//    const euler = new THREE.Euler(beta , alpha , gamma , 'ZYX')
//    const quater = new THREE.Quaternion()
//    quater.setFromEuler(euler)
   
//    c.quaternion.copy(quater)  
    

// })


//RayCasting method to click | look at and pop up
const raycaster = new THREE.Raycaster( ); 
const mouse = new THREE.Vector2( );

document.body.addEventListener("click", (e) => {
   mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
   raycaster.setFromCamera(mouse,camera)

   let intersect = raycaster.intersectObject(star , false) 

   console.log(intersect)

   if(intersect.length > 0){
      console.log("hit")
   }
   else{
      console.log("mh")
   }

})

//Orbit Controls (deviceorientation)
const controls = new OrbitControls(camera , renderer.domElement)
controls.target.set(0, 10, -1)

//To delete when done
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

//Animation
function animate () {
   requestAnimationFrame(animate)
   controls.update()
   renderer.render(scene , camera)
   
}

animate()

