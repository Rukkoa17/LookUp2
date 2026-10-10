import os
import math
import gzip
import requests

def lightpollution_score(mpsas):
   #light pollution scale table
   if mpsas >= 21.8:
      return 40

   elif mpsas >= 21.3:
      return 35

   elif mpsas >= 20.8:
      return 30

   elif mpsas >= 20.3:
      return 25

   elif mpsas >= 19.7:
      return 20

   elif mpsas >= 19.0:
      return 15

   elif mpsas >= 18.0:
      return 10

   elif mpsas >= 17.0:
      return 5
   
   else:
      return 0


def find_tile(current_pos):

   current_tilearea = None

   position = current_pos

   #ref : https://djlorenz.github.io/astronomy/lp/
   areas = {
      "north_america" : [7 , 77 , -180 , -51], # N/S coverage for index 0 & 1 , E/W coverage for index 2 & 3
      "europe" : [34 , 75 , -32 , 70],
      "south_america" : [-57  , 14 , -93 , -33],
      "africa" : [-36 , 38 , -26 , 64],
      "asia" : [5 , 75 , 60 , 180],
      "australia" : [-48 , 8 , 94 , 180],
   }

   def find_the_area(position , area):
      if area[0] <= position["lat"] <= area[1]:
         if area[2] <= position["lon"] <= area[3]:
            return True

   for name , area in areas.items():
      if find_the_area(position , area):
         current_tilearea = name
         break

   # Help of IA from here for deadline purpose :

   lat = current_pos["lat"]
   lon = current_pos["lon"]

   #lon between 0 & 360
   lon_from_date_line = (lon + 180) % 360

   #lat from -65° 
   lat_from_start = lat + 65

   #each tile is 5 x 5 °
   tile_x = int(lon_from_date_line // 5) + 1
   tile_y = int(lat_from_start // 5) + 1

   #there are 28 tiles for y
   if not 1 <= tile_y <= 28:
      return None

   # Now with the tile_x and tile_y we can get the needed dat.gz file from assets/lightpol_maps
   CACHE_DIR = os.path.join("/tmp", "lightpol_maps")
   os.makedirs(CACHE_DIR, exist_ok=True)

   filename = f"binary_tile_{tile_x}_{tile_y}.dat"
   filepath = os.path.join(CACHE_DIR, filename)


   if not os.path.exists(filepath):

      url = (
         f"https://djlorenz.github.io/astronomy/"
         f"binary_tiles/2025/"
         f"binary_tile_{filename}.dat.gz"
      )

      try:
         response = requests.get(url, timeout=60)

         if response.status_code != 200:
            return None

         data = gzip.decompress(response.content)

         os.makedirs(os.path.dirname(filepath), exist_ok=True)

         with open(filepath, "wb") as file:
            file.write(data)

      except (requests.RequestException, gzip.BadGzipFile):
         return None

   ix = round(120 * (lon_from_date_line - 5 * (tile_x - 1) + 1/240))
   iy = round(120 * (lat_from_start - 5 * (tile_y - 1) + 1/240))

   #gpt really helped here , I'm sorry but I really didn't want to spend much time here..
   with open(filepath, "rb") as file:
      data = file.read()

   data_array = data

   first_number = 128 * data_array[0] + data_array[1]

   change = 0

   for i in range(1, iy):
      value = data_array[600 * i + 1]

      #Int8Array as documented on the creators page
      if value >= 128:
         value -= 256

      change += value

   for i in range(1, ix):
      value = data_array[
         600 * (iy - 1) + 1 + i
      ]

      if value >= 128:
         value -= 256

      change += value

   compressed = first_number + change

   # Convert compressed brightness , the creator wrote:
   #brightnessRatio = (5 / 195) × (e^(0.0195 × compressed) - 1)
   
   brightness_ratio = ( 5.0 / 195.0 ) * (math.exp(0.0195 * compressed) - 1.0)

   # MPSAS | magnitudes per square arcsecond
   mpsas = (22.0 - 5.0 * math.log(1.0 + brightness_ratio) / math.log(100.0))

   light_score = lightpollution_score(mpsas)

   return [current_tilearea, mpsas, light_score]