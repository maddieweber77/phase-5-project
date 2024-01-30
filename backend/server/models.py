from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # Define other columns for the User table
    
    # Establish one-to-many relationship with RestaurantBooking
    bookings = db.relationship('RestaurantBooking', backref='user', lazy=True)

class RestaurantBooking(db.Model):
    __tablename__ = 'restaurant_bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Define the foreign key constraint
    business_id = db.Column(db.String, nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)
    # add party size

    # Define other columns for the RestaurantBooking table
