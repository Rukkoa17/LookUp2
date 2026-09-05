// only "./..." 1 . for the display.js file to catch the good folder
//hem : 1 or 2 , 1: North 2: South , none : both
// the "//#" are there for my python Astroquery SIMBAD to gather the reference names.
let celestial_objects = {

   planets:{

      moon :{
         name : "Moon",
         histype: "planets",
         img: "./assets/carrousel-obj/planets//wbpplanets/mooncarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      mercury : {
         name: "Mercury",
         histype: "planets",
         img: "./assets/carrousel-obj/planets/wbpplanets/mercurycarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      venus : {
         name : "Venus",
         histype: "planets",
         img: "./assets/carrousel-obj/planets/wbpplanets/venuscarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      mars : {
         name : "Mars",
         histype: "planets",
         img: "./assets/carrousel-obj/planets/wbpplanets/marscarr.webp",
         creditentials: "NASA/JPL/MSSS",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      jupiter : {
         name : "Jupiter",
         histype: "planets",
         img : "./assets/carrousel-obj/planets/wbpplanets/jupitercarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      saturn : {
         name : "Saturn",
         histype: "planets",
         img: "./assets/carrousel-obj/planets/wbpplanets/saturncarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      uranus : {
         name : "Uranus",
         histype: "planets",
         img: "./assets/carrousel-obj/planets/wbpplanets/uranuscarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      neptune : {
         name : "Neptune",
         histype: "planets",
         img: "./assets/carrousel-obj/planets/wbpplanets/neptunecarr.webp",

         infos : {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      }
   },

   stars : {

      sirius: { //#
         name:"Sirius",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/sirius.png",
         creditentials:"Akira Fujii",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      canopus: { //#
         name:"Canopus",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/canopus.png",
         creditentials:"Roberto Mura",
         
         infos: {
            hemi : 2,
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }


      },

      arcturus: { //#
         name:"Arcturus",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/arcturus.png",
         creditentials:"(MAST), STScI, and NASA.",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      vega: { //#
         name:"Vega",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/vega.png",
         creditentials:"Chuck Ayoub ",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      /*capella: {
         name:
         histype:
         img: NEED IMAGE
         creditentials:
         
         infos: {
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },
      */

      rigel: { //#
         name:"Rigel",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/rigel.png",
         creditentials:" Roberto Mura , CC BY-SA 4.0 , https://creativecommons.org/licenses/by-sa/4.0/ , cropped the image.",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      procyon: { //#
         name:"Procyon",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/procyon.jpg",
         creditentials:"Murgor Multoface",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      betelgeuse: { //#
         name:"Betelgeuse",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/betelgeuse.png",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      altair: { //#
         name:"Altair",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/altair.jpg",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      aldebaran: { //#
         name:"Aldebaran",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/aldebaran.png",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      antares: { //#
         name:"Antares",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/antares.png",
         creditentials:"Star imagery generated with SpaceEngine — Cosmographic Software.",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      spica: { //#
         name:"Spica",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/spica.png",
         creditentials:"Star imagery generated with SpaceEngine — Cosmographic Software.",
         
         infos: {
            difficulty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      pollux: { //#
         name:"Pollux",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/pollux.jpg",
         
         infos: {
            diffiuclty:1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      deneb: { //#
         name:"Deneb",
         histype:"stars",
         img:"./assets/carrousel-obj/stars/deneb.png",
         
         infos: {
            diffiuclty : 1,
            azimuth : undefined, 
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      },

      // a: {
      //    name:
      //    histype:
      //    img:
      //    creditentials:
         
      //    infos: {
      //       azimuth : undefined, 
      //       altitude : undefined,
      //       magnitude : undefined,
      //       visibility : undefined
      //    }
      // },

      // a: {
      //    name:
      //    histype:
      //    img:
      //    creditentials:
         
      //    infos: {
      //       azimuth : undefined, 
      //       altitude : undefined,
      //       magnitude : undefined,
      //       visibility : undefined
      //    }
      // },

      // a: {
      //    name:
      //    histype:
      //    img:
      //    creditentials:
         
      //    infos: {
      //       azimuth : undefined, 
      //       altitude : undefined,
      //       magnitude : undefined,
      //       visibility : undefined
      //    }
      // },
   },


   // constellations : {


   // },

   nebulae: {
      
      orion_nebula: { //#

         name : "Orion Nebula",
         histype: "nebulae",
         img: "./assets/carrousel-obj/nebulas/orion nebula.jpg",
         creditentials :"Nasa",

         infos: {
            azimuth : undefined, //undefined until the API help us define it , else error on compass page.
            altitude : undefined,
            magnitude : undefined,
            visibility : undefined
         }
      }


   },

};