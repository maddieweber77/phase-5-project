from flask import Flask, request, session, render_template, jsonify
from extensions import db  # Import db from extensions.py
from flask_cors import CORS 
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
from models import User, RestaurantBooking
import requests

config = dotenv_values(".env")

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'  # Update with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Initialize db with app context
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

# ***************Authentication GET, POST, and DELETE requests**********************

@app.get('/')
def index():
    return "Hello world"


#RestaurantBooking Routes
@app.get('/api/bookings/<int:id>')
def get_bookings_by_id(id):
    user = db.session.get(User, id)
    if not user:
        return {"error", "User not found"}, 404
    bookings = User.query.filter(User.id == id).all()
    return [b.to_dict(0) for b in bookings], 200



@app.get('/api/check_session')
def check_session():
    user = db.session.get(User, session.get(id))
    # print to check the session object
    print(session)

    if user:
        return user.to_dict(['-password_hash']), 200

    return {}

@app.delete('/api/logout')
def logout():

    try: 
        session.pop(id)
        return {"Message": "Logged out"}, 200
    
    except:
        return {'Message': 'No user logged in'}, 404


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

# Route to display the map list page
@app.route('/api/MapList')
def map_list():
    return render_template('MapList.jsx')

# Route to fetch fancy restaurants using user's current location
#! does this need a route?
@app.route('/api/get_restaurants', methods=['POST'])
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

@app.route('/api/book_restaurant', methods=['POST'])
def book_restaurant():
    print('in bookRestaurant')
    data = request.json
    business_id = data.get('businessId')
    restaurant_name = data.get('restaurantName')
    party_size = data.get('party_size')
    time_stamp = data.get('time_stamp')

    DEFAULT_USER_ID = 1

    # Assuming you have a User object or some way to get the user ID
    #! will need to fix below when u create login stuff
    user_id = get_current_user_id()  or DEFAULT_USER_ID # Implement this function based on your setup

    # Assuming you have a RestaurantBooking model for the database table
    booking = RestaurantBooking(user_id=user_id, business_id=business_id, restaurant_name=restaurant_name, party_size=party_size, time_stamp=time_stamp)
    db.session.add(booking)
    db.session.commit()

    return jsonify({'message': 'Booking successful'}), 200

@app.post('/api/login')
def login():
    data = request.json

    user = User.query.filter(User.user_name == data.get('user_name')).first()

    if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
        session["user_id"] = user.id
        print("success")

        return user.to_dict(), 200
    else:
        return {"error": "Invalid username or password"}, 401


if __name__ == '__main__':
    app.run(debug=True)