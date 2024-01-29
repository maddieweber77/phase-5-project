from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values
import requests
from models import db, Restaurant  # Import your models

# Load environment variables
config = dotenv_values(".env")

# Initialize Flask app
app = Flask(__name__)
print(config)
app.config['SQLALCHEMY_DATABASE_URI'] = config['DATABASE_URL']
db.init_app(app)

# Function to fetch data from the API and store in the database
def fetch_and_store_restaurants(lat, lng):
    url = "https://maps-data.p.rapidapi.com/searchmaps.php"
    querystring = {
        "query": "fancy restaurants",
        "limit": "10",
        "country": "us",
        "lang": "en",
        "lat": lat,
        "lng": lng,
        "offset": "0",
        "zoom": "13"
    }
    headers = {
        "X-RapidAPI-Key": config['RAPIDAPI_KEY'],
        "X-RapidAPI-Host": "maps-data.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers)
    
    if response.ok:
        data = response.json()
        places = data.get('data', [])
        
        for place in places:
            name = place.get('name')
            restaurant = Restaurant(name=name)
            db.session.add(restaurant)
        
        db.session.commit()
        return True
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return False

@app.route('/')
def display_restaurant_names():
    # Check if data is already stored in the database
    restaurants = Restaurant.query.all()
    if not restaurants:
        # Fetch data from the API and store in the database
        fetch_and_store_restaurants(40.724510, -74.005680)
    
    # Retrieve data from the database
    restaurant_names = [restaurant.name for restaurant in restaurants]
    return render_template('index.html', restaurant_names=restaurant_names)

if __name__ == '__main__':
    app.run(debug=True)
