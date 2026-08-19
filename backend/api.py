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

@app.route("/api/config-test")
def config_test():
    return jsonify({
        "key_loaded": bool(os.getenv("ASTRONOMY_API_KEY"))
    })

if __name__ == "__main__":
    app.run(debug=True)