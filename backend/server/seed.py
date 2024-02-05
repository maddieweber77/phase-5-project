from app import app, db
from models import User
from flask_bcrypt import Bcrypt

if __name__ == '__main__':
    with app.app_context():
        # Create a Bcrypt object within the app context
        bcrypt = Bcrypt()

        print("Clearing db...")
        with app.app_context():
            # Drop all tables
            db.drop_all()

            # Create all tables
            db.create_all()

            # Seed users
            users_data = [
                {"username": "A", "password": "0"},
                {"username": "B", "password": "1"},
                {"username": "C", "password": "2"},
                {"username": "D", "password": "3"},
                {"username": "E", "password": "4"}
                # Add more users as needed
            ]

            for data in users_data:
                new_user = User(user_name=data["username"], password=data["password"])
                password_hash = bcrypt.generate_password_hash(data["password"])
                new_user.password_hash = password_hash
                db.session.add(new_user)

            # Commit changes to the database
            db.session.commit()

        print("Seeding complete..")


#! uncomment below if you want faker data

# from random import randint, choice as rc

# from faker import Faker

# # Import the Flask app object from the main application file
# from app import app

# # Import the SQLAlchemy db object
# from models import db, User, RestaurantBooking
# from flask_bcrypt import Bcrypt

# # Authentication

# fake = Faker()

# if __name__ == '__main__':
#     # Authentication with bcrypt

#     with app.app_context():
#         # Create a Bcrypt object within the app context
#         bcrypt = Bcrypt()

#         print("Clearing db...")
#         with app.app_context():

#             # Drop all tables
#             db.drop_all()

#             # Create all tables
#             db.create_all()

#             # Seed users
#             new_users = []
#             for _ in range(20):
#                 print('creating new user')
#                 new_user = User(user_name=fake.name(), password=fake.password())
#                 print(new_user)
#                 password_hash = bcrypt.generate_password_hash(new_user.password)
#                 new_user.password_hash = password_hash
#                 db.session.add(new_user)
#                 new_users.append(new_user)

#             # Commit changes to the database
#             db.session.commit()

#         print("Seeding complete..")
