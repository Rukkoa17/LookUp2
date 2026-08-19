from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os



load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/api/test")
def test():
    return jsonify({
        "message": "Working"
    })

@app.route("/api/astroapi")
def astro():

    astroapi_key = os.getenv("ASTROAPI_KEY")

    return jsonify({
        "key_exists": bool(astroapi_key)
    })

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/api/weather")
def weather():

    weather_key = os.getenv("WEATHER_API_KEY")

    return jsonify({
        "key_exists": bool(weather_key)
    })