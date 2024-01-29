from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Restaurant
from flask_bcrypt import Bcrypt
# Authentication

fake = Faker()

if __name__ == '__main__':

    # Authentication with bcrypt

    with app.app_context():
        bcrypt = Bcrypt(app)
        print("Clearing db...")
        User.query.delete()
        Restaurant.query.delete()


#seed users
        new_users = []
        # Inside the loop where you seed users
        for _ in range(20):
            new_user = User(user_name=fake.name(), password=fake.name())
            password_hash = bcrypt.generate_password_hash(new_user.password)
            new_user.password_hash = password_hash
            db.session.add(new_user)
            new_users.append(new_user)


#seed restaurant reservations
        


        print("Seeding complete..")
