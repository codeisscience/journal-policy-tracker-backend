import os
import sys

from textwrap import dedent
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_manager

SECRET_KEY = os.getenv("SECRET_KEY")

if SECRET_KEY is None:
    sys.exit(
        dedent(
            """
        SECRET_KEY is not set. Hint: create a .env file containing:
        SECRET_KEY=<randomly generated key>
        To generate a key, see https://flask.palletsprojects.com/en/latest/config/#SECRET_KEY.
    """
        ).strip()
    )

app = Flask(__name__)

app.config["SECRET_KEY"] = SECRET_KEY
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///journals.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

from .routes import journal
