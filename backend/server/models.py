from extensions import db  # Import db from extensions.py
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(255))  # Define the user_name attribute
    password = db.Column(db.String(255))   # Add other necessary attributes/columns

    # Establish one-to-many relationship with RestaurantBooking
    bookings = db.relationship('RestaurantBooking', backref='user', lazy=True)

class RestaurantBooking(db.Model, SerializerMixin):
    __tablename__ = 'restaurant_bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Define the foreign key constraint
    business_id = db.Column(db.String, nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)
    #! add party size. make sure you can do other things than 2
    party_size = db.Column(db.Integer)

    # Define other columns for the RestaurantBooking table
