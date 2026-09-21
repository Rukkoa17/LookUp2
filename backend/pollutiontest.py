
def find_tile(current_pos):

   current_tile = None

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
         current_tile = name
         break


   return current_tile