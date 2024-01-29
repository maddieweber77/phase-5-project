from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
#!! update models
# from models import db, User, Connection, Meme, Response
config = dotenv_values(".env")


#from models import db

app = Flask(__name__)
@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)