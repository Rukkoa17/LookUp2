from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import  CORS
import requests
import base64
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/api/test")
def test():
    return jsonify({
        "message": "Working"
    })

@app.route("/api/astro")
def astro():

    astro_key = os.getenv("ASTROAPI_KEY")

    if not astro_key:
        return jsonify({"error : Astronomy API key is missing"}) , 500

    if astro_key:
        astro_key = astro_key.strip()

    #normally would use btoa() in JS but here I have to encode it then.
    auth = base64.b64encode(
        astro_key.encode("utf-8")
    ).decode("utf-8")

    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")
    from_date = request.args.get("from_date")
    to_date = request.args.get("to_date")
    time = request.args.get("time")

    response = requests.get(
        "https://api.astronomyapi.com/api/v2/bodies/positions",
        headers={
            "Authorization": f"Basic {auth}"
        },
        params={
            "bodies": "mercury,venus,mars,jupiter,saturn,uranus,neptune,moon",
            "latitude": latitude,
            "longitude": longitude,
            "elevation": 0,
            "from_date": from_date,
            "to_date": to_date,
            "time": time
        }
    )

    return jsonify(response.json())



@app.route("/api/weather")  
def weather():

    weather_key = os.getenv("WEATHER_API_KEY")

    if not weather_key:
        return jsonify({"error : Weather API key is missing"}) , 500

    if weather_key :
        weather_key = weather_key.strip()

    wlatitude = request.args.get("lat")
    wlongitude = request.args.get("lon")
    
    weather_response = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?lat={wlatitude}&lon={wlongitude}&appid={weather_key}&units=metric"
    )
    
    return jsonify(weather_response.json())

# Place at the end.
if __name__ == "__main__":
    app.run(debug=True)