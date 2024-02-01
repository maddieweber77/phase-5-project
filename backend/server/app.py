from flask import Flask, request, session, render_template, jsonify
from extensions import db  # Import db from extensions.py
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
from models import User, RestaurantBooking
import requests

config = dotenv_values(".env")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'  # Update with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Initialize db with app context
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)


def get_fancy_restaurants(lat, lng):
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
	"X-RapidAPI-Key": "3a907745f5msh22b6f4061fe0039p156641jsn530f785f876f",
	"X-RapidAPI-Host": "maps-data.p.rapidapi.com"
}
    response = requests.get(url, headers=headers, params=querystring)
    print('api response', response)
    
    if response.ok:
        data = response.json()
        print('data:', data)
        places = data.get('data', [])
        print("printing places")
        print(places)
        
        # Extracting multiple fields for each restaurant
        restaurants_info = []
        for place in places:
            restaurant_info = {
                'name': place.get('name'),
                'business_id': place.get('business_id'),
                'phone_number': place.get('phone_number'),
                'full_address': place.get('full_address'),
                'review_count': place.get('review_count'),
                'rating': place.get('rating'),
                'website': place.get('website'),
                'type': place.get('types')
            }
            restaurants_info.append(restaurant_info)
        
        print(restaurants_info)
        return restaurants_info
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return []

def get_current_user_id():
    # Assuming you're using Flask's session to store user information
    return session.get('user_id')

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
    print("printing latitude and longitude")
    print(lat)
    print(lng)
    
    # Fetch fancy restaurants using user's location
    restaurants = get_fancy_restaurants(lat, lng)
    
    # Return JSON response with restaurant names
    return jsonify(restaurants)

@app.route('/book_restaurant', methods=['POST'])
def book_restaurant():
    data = request.json
    business_id = data.get('businessId')
    restaurant_name = data.get('restaurantName')

    # Assuming you have a User object or some way to get the user ID
    user_id = get_current_user_id()  # Implement this function based on your setup

    # Assuming you have a RestaurantBooking model for the database table
    booking = RestaurantBooking(user_id=user_id, business_id=business_id, restaurant_name=restaurant_name)
    db.session.add(booking)
    db.session.commit()

    return jsonify({'message': 'Booking successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
