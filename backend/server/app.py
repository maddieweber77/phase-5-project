from flask import Flask, request, session, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
import requests
#!! update models
# from models import db, User, Connection, Meme, Response
config = dotenv_values(".env")


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
        return restaurant_names
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return []

get_fancy_restaurants(40.724510, -74.005680)
app = Flask(__name__)
@app.route('/')
def display_restaurant_names():
    # Get restaurant names
    restaurant_names = get_fancy_restaurants(40.724510, -74.005680)
    return render_template('index.html', restaurant_names=restaurant_names)

if __name__ == '__main__':
    app.run(debug=True)