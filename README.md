# 🌌 LookUp2

**LookUp2** is a web application dedicated to astronomy observation.

# IMPORTANT : Actually backend runs on a free Render server so it take a little min for the server to wake up.

The goal ? YOU can be helped with observing celestial objects. The phone will directly guide you to aim at the
looked for object in the sky by the use of **device_orientation** !

The project combines astronomical calculations, weather datas, light pollution datas and a 3D space to chase the space !

## Features

* Geolocation
* Weather-based conditions
* Moon phase and illumination information
* Light pollution in the sky estimation
* Celestial object visibility
* Observation mode for naked eye
* Observation mode for binoculars
* Observation mode for telescopes
* Interactive sky navigation
* Phone orientation 
* 3D representation of the sky with Three.js

## How it works

LookUp2 combine several sources of informations to estimate if an object is theoretically observable.

The current overall observation score is based on three main factors:

* **Weather:** 40 points
* **Moon:** 20 points
* **Light pollution:** 40 points

The application also checks the characteristics of each celestial object.

For example, stars are filtered according to their apparent **magnitude** depending on the selected equipment.

The application display the objects that match the current conditions in your environement !

## Technologies

### Frontend

* HTML
* CSS
* JavaScript
* Three.js

### Backend

* Python
* Flask
* REST APIs

### Other technologies

* Git / GitHub
* Render
* npm

## APIs and data sources

LookUp2 uses data sources, including:

* **SIMBAD** — astronomical object information
* **OpenWeather** — weather data
* **SunriseSunset.io** — Sun and Moon information
* **DJ Lorenz Light Pollution Atlas** — light pollution data

API keys used by the backend with Render.

## Running the project

### Backend

```bash
python app.py
```

(Need of private variables)

## Online version

The project is available on GitHub:

https://github.com/Rukkoa17/LookUp2

## Current limitations

LookUp2 is still at his "beta".

Some astronomical calculations and visibility estimations are REALLY simplified, especially when determining if objects such as nebulae are realistically observable.

Phone orientation and 3D sky positioning can also depend on the device and browser being used.

The project should therefore be considered an **observation helper** rather than a replacement for professional  software.

## Future improvements

Possible future developments include:

* More accurate visibility calculations
* Better angular-size representation of celestial objects
* More detailed Moon and sky calculations
* Improved phone orientation tracking
* More celestial objects
* Better observation forecasts
* Telescope control
* More realistic 3D sky rendering
* Improved mobile interface

## Author

Created by **Rukkoa17** as a personal astronomy and web development project.

The project is also a way to explore web development, APIs, astronomy, 3D graphics and programming through a real world application.

---

Thanks for checking out LookUp2!

⭐ ASTRY (this project will result in a youtube video on my channel ASTRY) ⭐ 
