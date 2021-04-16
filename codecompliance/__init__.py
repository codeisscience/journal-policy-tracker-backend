from flask import Flask
from pathlib import Path
from flask_sqlalchemy import SQLAlchemy
import sqlite3

# Declare `app` before importing routes
app = Flask(__name__)

DB_PATH = str( Path('journals.db').absolute() )
# To be shifted to config file
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+DB_PATH
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# import api routes
from .routes.journals import *
from .initialize_db import initialize_db

def main():
    initialize_db()

main()