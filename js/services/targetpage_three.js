import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
//-----Position of wanted object

const azselectedobj = THREE.MathUtils.degToRad(azdata);
const altselectedobj = THREE.MathUtils.degToRad(altdata);

function azalt_to_pos(az , alt){
   const xpos = 5 * Math.cos(alt) * Math.sin(az) * 100;
   const ypos = 5 * Math.sin(alt) * 100;
   const zpos = -5 * Math.cos(alt) * Math.cos(az) * 100;

   return [xpos , ypos , zpos]
}

const selectedobj_pos = azalt_to_pos(azselectedobj , altselectedobj) 

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
const pla_mat = new THREE.MeshBasicMaterial({color : 0x000020, transparent : true , opacity : 0.7})
const plane = new THREE.Mesh(pla_geo , pla_mat)
plane.position.setY(-10)
scene.add(plane)

//Selected Celestial Object
const star_geo = new THREE.SphereGeometry(4 , 32 , 16);
const firstobject_mat = new THREE.MeshBasicMaterial({color : 0xeb49da});
const star_mat = new THREE.MeshBasicMaterial({color : 0xffffff}); 
const firstobject = new THREE.Mesh(star_geo , firstobject_mat);
firstobject.name = objectid[0].toUpperCase() + objectid.slice(1);

//Made this into a function solution for the objects add section
firstobject.position.set(selectedobj_pos[0] , selectedobj_pos[1] , selectedobj_pos[2]);

scene.add(firstobject);

//Text Sprite for firstobject , also I will later on prevent this code being stated twice.
const texture = createTextTexture(firstobject.name , '#e558d2');
const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
const textSprite = new THREE.Sprite(spriteMaterial);

textSprite.scale.set(128 , 32 ); 

textSprite.position.set(
   firstobject.position.x + 17, 
   firstobject.position.y + 14, 
   firstobject.position.z
);

scene.add(textSprite)

//TextSprite creation function for Others Objects
function createTextTexture(text , color){
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');

   context.font = '64px Arial';
   const textWidth = context.measureText(text).width;

   //Adjust width relative to the lenght of the object name
   canvas.width = textWidth + 256;
   canvas.height = 128;

   // context.fillStyle = 'red';
   // context.fillRect(0, 0, canvas.width, canvas.height);

   // Text style
   context.font = '64px Mansalva';
   context.fillStyle = color ;
   context.textAlign = 'center';
   context.textBaseline = 'middle';
   context.fillText(text, canvas.width / 2, canvas.height / 2);

   return new THREE.CanvasTexture(canvas);
}


//Others Objects Add

let other_obj_mesh = []

for (let type in newcelestial_objects){
   for (let obj in newcelestial_objects[type]){
      const objstar = new THREE.Mesh(star_geo , star_mat);
      objstar.name = newcelestial_objects[type][obj].name;

      const az = THREE.MathUtils.degToRad(newcelestial_objects[type][obj].infos.azimuth);
      const alt = THREE.MathUtils.degToRad(newcelestial_objects[type][obj].infos.altitude);

      const starpos = azalt_to_pos(az , alt);

      objstar.position.set(starpos[0],starpos[1],starpos[2])
      
      scene.add(objstar)
      
      other_obj_mesh.push(objstar)

      const texture = createTextTexture(objstar.name , 'white');
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const textSprite = new THREE.Sprite(spriteMaterial);

      textSprite.scale.set(128 , 32 ); 

      textSprite.position.set(
         objstar.position.x + 17, 
         objstar.position.y + 14, 
         objstar.position.z
      );

      scene.add(textSprite)

   }
}


//DeviceOrientation and Quaternions

const euler = new THREE.Euler()
const quater = new THREE.Quaternion()

//Cameracorrection to look 90° up more
const qua_camera = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -Math.PI / 2
);

//Scope
const target_point = document.querySelector("#target-point")

window.addEventListener("deviceorientationabsolute", (event) => {
   
   const alpha = THREE.MathUtils.degToRad(event.alpha || 0);
   const beta  = THREE.MathUtils.degToRad(event.beta || 0);
   const gamma = THREE.MathUtils.degToRad(event.gamma || 0);

   let rawComp = event.webkitCompassHeading ?? (360 - event.alpha);
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
   firstobject.getWorldPosition(star_direction)
   
   star_direction.sub(camera.position).normalize();
   
   const angle = camera_direction.angleTo(star_direction)
   const angledeg = THREE.MathUtils.radToDeg(angle)
   
   const targetpoint_angle = 6.5
   const max_anglediff = 2 //Zone radius for the scope hitting the object or not.   

   if (angledeg <= targetpoint_angle){
      target_point.style.opacity = 1;
      if (angledeg <= max_anglediff){
         info_panel.classList.add("open")
      }
   }
   else {
      target_point.style.opacity = 0;
   }

});

const raycaster = new THREE.Raycaster( ); 
const mouse = new THREE.Vector2( );

document.querySelector("#bg").addEventListener("click" , (e) => {
   if(info_panel.classList.contains("open")){
      info_panel.classList.remove("open")
   }
   
   //Other Objects info pannels with CLICK
   const ray = new THREE.Raycaster( new THREE.Vector3(0 , 0 , 0) , camera)
   mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
   raycaster.setFromCamera(mouse,camera)
   
   let intersect = raycaster.intersectObjects(other_obj_mesh) 
   
   try {
      console.log(intersect[0].object.name)
   }

   catch(error){
      
   }


})

//To delete when done
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

//Here for testing purposes
const control = new OrbitControls(camera , renderer.domElement)
control.target.set(0 , 10 , 0)



//Animation
function animate () {
   requestAnimationFrame(animate)
   // controls.update()
   renderer.render(scene , camera)
   
}

animate()

