# 🌌 LookUp V2

**LookUp V2** is a web app used for astronomical observation !

## IMPORTANT : Test this webapp on a phone !

# PS : Actually backend runs on a free Render server so it take a little min for the server to wake up.

The goal ? YOU can be helped with observing celestial objects. The phone will directly guide you to aim at the looked for object in the sky by the use of **device_orientation** !

To know what you can observe , Look Up takes in consideration the environement of the user and rate it on 100 to apply this to filters in order to estimate what is visibile or not (This is far from perfect , just an **estimation**)

## Ratings :
- The weather 40 / 100
- Light pollution 40 / 100
- Moon phase 20 / 100

## Important features :
- 3d space , moving your phone IRL move the cam to look out for celestial objects !
- Environement conditions are took in consideration to estimated what is visible for the user.
- Navigation bar to write what object the user wants to look out for.
- Settings tab with : Changing the color of the web app | Sending an email suggestion directly to me. 

## Technologies / Datas that were used : 
In order to make this features possible , this are the technologies that I used and for a majority learned :

- HTML / CSS / JS
- Three.JS (for the 3d space)
- Web3forms (send me an suggestion with an email)
- Astronomy API
- SIMBAD astroquery (astronomical database)
- Openweather
- djlorenz Light Pollution map 

## How did I do it :
A vast majority of my progression is documented on my Stardance page regarding this project if you want to check it out :  https://stardance.hackclub.com/projects/43568

Else in a few weeks I will have posted a youtube video that documents the whole journey on my channel ASTRY ! ( https://www.youtube.com/@ASTR-m2h )

In order to summerize my adventure =>

   I started this project around mid/end of July , firstly I spent quite a long time on the mainpage structure because I didn't use any template so this was my first focus.

   Then with the beginning of August I discoverd the event that is "Stardance" , this challenge motivated me to get seriously to work in order to finish it for the deadline.

   1 week is the time I pretty much needed in order to being able to acquire the astronomical datas of deep space object. Before this project I already had done a first Look Up version that only had the planet of our solar system available , with that the planets part was already done. So I looked how could I acquiere the position of all the objects of a predefined catalogue and stumble accross "Astroquery Simbad".

   With all those datas I then lerned what was needed with Three.js in order to display what was needed for a representation of the user surroundings.

   The final phase was focused on the observability part , so I worked on acquiering the weather / moon phase / light pollutions datas and then rating them.

## What to try ?

I advise you to try this things in order to not miss out on some little features ! (; 

- Change the color of the web app in the settings tab.

- Write the name of a planet or star in the "Looking for" bar then double click on it and look up for it.

- Aim at the targetted object for a more precise scope to appear and also an info tab if your aiming close enough.

- Try clicking on a different object than the one targetted and then target this one

- Click on the compass at the bottom of the homepage to enter in the 3d space without any targetted object 

## Will come :
- Improvement of esthetic of the page overall
- More precision in the observability part 
- Zooming feature for the 3d space
- Day / Night feature for the 3d space 
- MORE objects in the catalogue
- Changing the size of the object in the sky according to their angular size !

## AI use :
AI was used in order for me to help myself with finding what to use and brainstorming. 

For instance when I was thinking how to know if the user is aiming toward the targetted object , I began by thinking of a way to know it by drawing the situation on paint. After some time I figured something out , the issue ? I didn't had a clue what mathematical tool could help my achieve that , so I asked gpt to tell me if that was possible and the equivalent in Three.JS to achieve it.

Also I used it for debbuging and helping me deal with couples of things that I haven't ever done in my life and weren't a big deal of the project but still needed. The backend is the part that I am talking about , gpt helpeed my set it up. Also it helped my with the query for simbad because I wasn't able to find what I needed in the documentation even after trying with it being pretty large.

### Credits : 
For displaying images of the celestial objects , I mainly used "Wikicommons"

----------------------------------------------------------------------------------------------------

Anyways thanks for checking out LookUp2!

⭐ ASTRY (this project will result in a youtube video on my channel ASTRY) ⭐ 
