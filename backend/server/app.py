from flask import Flask, request, session, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
from models import User, Restaurant
import requests

config = dotenv_values(".env")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'  # Update with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy instance with the Flask app
db = SQLAlchemy(app)


def get_fancy_restaurants(lat, lng):
    url = "https://maps-data.p.rapidapi.com/searchmaps.php"

    querystring = {f"query":"fancy restaurants","limit":"10","country":"us","lang":"en","lat":{lat},"lng":{lng},"offset":"0","zoom":"13"}

    headers = {
        "X-RapidAPI-Key": "4578ad90c0msh7185e76eb4a1d1ap1676a0jsn80fa8c573e3d",
        "X-RapidAPI-Host": "maps-data.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.ok:
        data = response.json()
        places = data.get('data', [])
        restaurant_names = [place.get('name') for place in places]
        print(restaurant_names)
        return restaurant_names
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return []

# Route to display the index page
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch fancy restaurants using user's current location
@app.route('/get_restaurants', methods=['POST'])
def get_restaurants():
    # Get latitude and longitude from request
    lat = request.form['latitude']
    lng = request.form['longitude']
    
    # Fetch fancy restaurants using user's location
    restaurant_names = get_fancy_restaurants(lat, lng)
    
    # Return JSON response with restaurant names
    return jsonify(restaurant_names)

if __name__ == '__main__':
    app.run(debug=True)