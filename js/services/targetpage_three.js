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

const camera = new THREE.PerspectiveCamera(35 , window.innerWidth / window.innerHeight, 0.1 , 1000)
camera.position.set(0 , 10 , 0)
camera.rotation.x = -Math.PI / 2

let prevdist = null;

document.querySelector("#bg").addEventListener("touchstart" , (touch) => {

   if (touch.fingers.length !== 2){
      prevdist = null;
      return; 
   } 

   finger1 = touch.fingers[0];
   finger2 = touch.fingers[1];

   difx = finger1.position.x - finger2.position.x
   dify = finger1.position.y - finger2.position.y

   const distance = Math.sqrt(difx * difx + dify * dify); // Pythagore

   if (prevdist !== null){

      const diff = distance - prevdist;

      camera.fov -= diff * 0.05;
      camera.fov = THREE.MathUtils.clamp(camera.fov, 35, 100);

      camera.updateProjectionMatrix();

   }
   
   prevdist = distance

})


const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

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
const texture = createTextTexture(firstobject.name , '#e558d2' , 256 , 128 ,64 , "Mansalva");
const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
const textSprite = new THREE.Sprite(spriteMaterial);

textSprite.scale.set(128 , 32 ); 

textSprite.position.set(
   firstobject.position.x + 17, 
   firstobject.position.y + 20, 
   firstobject.position.z
);

scene.add(textSprite)

//TextSprite creation function for Others Objects
function createTextTexture(text , color , width , height , textsize , font){
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');

   context.font = '64px Arial';
   const textWidth = context.measureText(text).width;

   //Adjust width relative to the lenght of the object name
   canvas.width = textWidth + width;
   canvas.height = height;

   // context.fillStyle = 'red';
   // context.fillRect(0, 0, canvas.width, canvas.height);

   // Text style
   context.font = `${textsize}px ${font}`;
   context.fillStyle = color ;
   context.textAlign = 'center';
   context.textBaseline = 'middle';
   context.fillText(text, canvas.width / 2, canvas.height / 2);

   return new THREE.CanvasTexture(canvas);
}

//Others Objects Add

let other_obj_mesh = []
let other_obj_sprites = []

for (let type in newcelestial_objects){
   for (let obj in newcelestial_objects[type]){
      const objstar = new THREE.Mesh(star_geo , star_mat);
      objstar.name = newcelestial_objects[type][obj].name;
      objstar.thetype = type

      const az = THREE.MathUtils.degToRad(newcelestial_objects[type][obj].infos.azimuth);
      const alt = THREE.MathUtils.degToRad(newcelestial_objects[type][obj].infos.altitude);

      const starpos = azalt_to_pos(az , alt);

      objstar.position.set(starpos[0],starpos[1],starpos[2])
      
      scene.add(objstar)
      
      other_obj_mesh.push(objstar)

      const texture = createTextTexture(objstar.name , 'white' , 256 , 128 , 64 , "Mansalva");
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const textSprite = new THREE.Sprite(spriteMaterial);
      textSprite.name = objstar.name

      textSprite.scale.set(128 , 32 ); 

      textSprite.position.set(
         objstar.position.x + 17, 
         objstar.position.y + 14, 
         objstar.position.z
      );

      scene.add(textSprite)

      other_obj_sprites.push(textSprite)
      
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

//IOS deviceorientation fall-back
const eventName = "ondeviceorientationabsolute" in window
   ? "deviceorientationabsolute"
   : "deviceorientation";

window.addEventListener(eventName, (event) => {
   
   const alpha = THREE.MathUtils.degToRad(event.alpha || 0);
   const beta  = THREE.MathUtils.degToRad(event.beta || 0);
   const gamma = THREE.MathUtils.degToRad(event.gamma || 0);

   let rawComp = event.webkitCompassHeading ?? (360 - event.beta);
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

let others_sprites_list = []; //List to make a way to only have one other infos at the same time.

document.querySelector("#bg").addEventListener("click" , (e) => {
   if(info_panel.classList.contains("open")){
      info_panel.classList.remove("open")
   }

   try {

      if(others_sprites_list.length > 0){
         let todel = others_sprites_list.pop()
         others_sprites_list.pop()
         scene.remove(todel)
      }
      
      //Other Objects info pannels with CLICK
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse,camera)
   
         let intersect = raycaster.intersectObjects(other_obj_mesh);
   
         const hitten_obj_pos = new THREE.Vector3();
         intersect[0].object.getWorldPosition(hitten_obj_pos)      
         camera.lookAt(hitten_obj_pos)
         target_point.style.opacity = 1;
   
         let hitten_obj_type = intersect[0].object.thetype;
         let hitten_obj_id = intersect[0].object.name;
         let hitten_obj_sprite = undefined;
            
         if (hitten_obj_id.includes(" ")){
            hitten_obj_id = hitten_obj_id.replaceAll(" " , "_")
         }
   
         let hitten_obj_az = newcelestial_objects[hitten_obj_type][hitten_obj_id.toLowerCase()].infos.azimuth;
         let hitten_obj_alt = newcelestial_objects[hitten_obj_type][hitten_obj_id.toLowerCase()].infos.altitude;
         let hitten_obj_coords = Math.round(hitten_obj_az * 100) / 100 + "° / " + Math.round(hitten_obj_alt * 100) / 100 + "°";
         
         
         for (const i in other_obj_sprites){
            if (other_obj_sprites[i].name.includes(" ")){
               other_obj_sprites[i].name = other_obj_sprites[i].name.replaceAll(" " , "_");
            }
            if (hitten_obj_id == other_obj_sprites[i].name){
               hitten_obj_sprite = other_obj_sprites[i]
            }
         }
      
         const texture = createTextTexture(`az/alt : ${hitten_obj_coords}` , "white" , 64 , 32 , 18 ,"Arial");
         const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
         const textSprite = new THREE.Sprite(spriteMaterial);
         others_sprites_list.push(textSprite);   
      
         textSprite.scale.set(512 ,32); 
      
         textSprite.position.set(
            hitten_obj_sprite.position.x, 
            hitten_obj_sprite.position.y - 50, 
            hitten_obj_sprite.position.z  );
      
         scene.add(textSprite)
   
   }

   catch(error){
      //Minimize error pop ups non related to the wanted objects.
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

