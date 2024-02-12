from extensions import db  # Import db from extensions.py
from sqlalchemy import MetaData, func
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
# from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import generate_password_hash, check_password_hash

#! need to add validation!!!
#!
#!

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)  # New column for password

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        self.password = password  # Store the password as well

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'password': self.password, 
            # You can choose not to include the password hash in the dictionary
            # 'password_hash': self.password_hash
        }

    # Establish one-to-many relationship with RestaurantBooking
    bookings = db.relationship('RestaurantBooking', backref='user', lazy=True)

class RestaurantBooking(db.Model):
    __tablename__ = 'restaurant_bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Define the foreign key constraint
    business_id = db.Column(db.String, nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)
    party_size = db.Column(db.Integer)
    time_stamp = db.Column(db.String)
    bid_amount = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_name': self.restaurant_name
        }


