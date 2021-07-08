from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_manager

app = Flask(__name__)

app.config["SECRET_KEY"] = "68a2c99120b7e9558c126213b6989f1d"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///journals.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)


from .routes import journal
