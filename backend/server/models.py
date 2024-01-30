from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

# Initialize SQLAlchemy instance without passing metadata
db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # user_name = db.Column(db.String, nullable=False)
    # password = db.Column(db.String, nullable=False)
    # password_hash = db.Column(db.String)
    # profile_picture = db.Column(db.String, default='https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg')

    restaurants = db.relationship("Restaurant", back_populates='creator', cascade='all, delete-orphan')

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    # business_id = db.Column(db.Integer, default=0)
    # address = db.Column(db.String, nullable=False)
    # latitude = db.Column(db.Integer, default=0)
    # longitude = db.Column(db.Integer, default=0)
    # place_link = db.Column(db.String, nullable=False)
    # rating = db.Column(db.Integer, default=0)
    # price_level = db.Column(db.String, nullable=False)
    # website = db.Column(db.String, nullable=False)
    # types = db.Column(db.String, nullable=False)
    # img_url = db.Column(db.String, nullable=False)
    # creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # accepting_reservations = db.Column(db.Boolean, default=True)

    creator = db.relationship("User", back_populates='restaurants')

class RestaurantBooking(db.Model):
    __tablename__ = 'restaurant_bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.String, nullable=False)
    party_size = db.Column(db.String, nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)

    # Add any additional columns as needed

    def __init__(self, user_id, business_id, restaurant_name):
        self.user_id = user_id
        self.business_id = business_id
        self.restaurant_name = restaurant_name
