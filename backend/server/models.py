from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String, nullable = False)
    # password = db.Column(db.String, nullable = False)
    # password_hash = db.Column(db.String)
    # profile_picture = db.Column(db.String, default = 'https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg')

    # restaurants = db.relationship("Restaurant", back_populates = 'creator', cascade = 'all, delete-orphan')
    
    #! update serialize_rules
    #serialize_rules = ['-memes.creator', '-responses.user', '-password', '-ballots.voter']

    
    
    
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key = True)
    #! we can probably make the business id a foreign key
    name = db.Column(db.String, nullable = False)
    # business_id = db.Column(db.Integer, default = 0)
    # address = db.Column(db.String, nullable = False)
    # latitude = db.Column(db.Integer, default = 0)
    # longitude = db.Column(db.Integer, default = 0)
    # place_link = db.Column(db.String, nullable = False)
    # rating = db.Column(db.Integer, default = 0)
    # price_level = db.Column(db.String, nullable = False)
    # website = db.Column(db.String, nullable = False)
    # types = db.Column(db.String, nullable = False)
    # img_url = db.Column(db.String, nullable = False)
    # creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # accepting_reservations = db.Column(db.Boolean, default = True)


    # creator = db.relationship("User", back_populates = 'restaurants')
    #! update serialize_rules
    #serialize_rules = ['-creator.memes', '-responses.meme']
