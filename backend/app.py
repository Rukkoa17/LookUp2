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
        return jsonify({"error : Astronomy API key is missing"})

    #normally would use btoa() in JS but here I have to encode it then.
    auth = base64.b64encode(
        astro_key.encode()
    ).decode()

    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")
    date = request.args.get("date")
    time = request.args.get("time")

    response = requests.post(
        "https://api.astronomyapi.com/api/v2/bodies/positions",
        headers={
            "Authorization": "Basic " + auth,
            "Content-Type": "application/json"
        },
        json={
            "bodies": "mercury,venus,mars,jupiter,saturn,uranus,neptune,moon",
            "latitude": latitude,
            "longitude": longitude,
            "elevation": 0,
            "from_date": date,
            "to_date": date,
            "time": time
        }
    )

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)

@app.route("/api/weather")
def weather():

    weather_key = os.getenv("WEATHER_API_KEY")

    return jsonify({
        "key_exists": bool(weather_key)
    })