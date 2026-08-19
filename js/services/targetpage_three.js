import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
//-----

console.log(objectid)

let azdata = newcelestial_objects[objecttype][objectid].infos.azimuth
let altdata = newcelestial_objects[objecttype][objectid].infos.altitude

const az = THREE.MathUtils.degToRad(azdata);
const alt = THREE.MathUtils.degToRad(altdata);

const xpos = 5 * Math.cos(alt) * Math.sin(az) * 100;
const ypos = 5 * Math.sin(alt) * 100;
const zpos = -5 * Math.cos(alt) * Math.cos(az) * 100;

console.log([xpos , ypos , zpos])

//----
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight, 0.1 , 1000)
camera.position.set(0 , 10 , 0)
camera.rotation.x = -Math.PI / 2


const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);

const geometry = new THREE.SphereGeometry(1000 , 32 , 16 ) // hehe , sphere
const material = new THREE.MeshBasicMaterial({color: 0x00007 , side : THREE.BackSide});
const sphere = new THREE.Mesh(geometry , material)
scene.add(sphere)

const pla_geo = new THREE.BoxGeometry(2000 , 1 , 2000)
const pla_mat = new THREE.MeshBasicMaterial({color : 0xffffff, transparent : true , opacity : 0.3})
const plane = new THREE.Mesh(pla_geo , pla_mat)
plane.position.setY(-10)
scene.add(plane)

const star_geo = new THREE.SphereGeometry(5 , 32 , 16)  
const star_mat = new THREE.MeshBasicMaterial({color : new THREE.Color("#e01db9")}) 
const star = new THREE.Mesh(star_geo , star_mat)

star.position.set(xpos,ypos,zpos)

scene.add(star)

// const pointlight = new THREE.PointLight(0xffffff , 500)
// pointlight.position.set(15 , 15 , 15)
// scene.add(pointlight)

// const lighthelp = new THREE.PointLightHelper(pointlight)
// scene.add(lighthelp)

// const gridhelp = new THREE.GridHelper(1500 , 10)
// scene.add(gridhelp)

const controls = new OrbitControls(camera , renderer.domElement)
controls.target.set(0, 10, -1)

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

function animate () {
   requestAnimationFrame(animate)

   controls.update()

   renderer.render(scene , camera)
}

animate()

