"""Contains instances used for starting the flask application."""
import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from sqlalchemy.ext.declarative import DeclarativeMeta

SECRET_KEY = os.getenv("SECRET_KEY")

app = Flask(__name__)
cors = CORS(app)

app.config["SECRET_KEY"] = SECRET_KEY
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///journals.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

# Swagger UI
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "Journal Policy Tracker Server"}
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

BaseModel: DeclarativeMeta = db.Model


__all__ = [
    "app",
    "db",
    "bcrypt",
    "login_manager",
    "BaseModel",
]
