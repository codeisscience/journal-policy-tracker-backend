from datetime import datetime
from server import db, login_manager
from flask_login import UserMixin

login_manager.login_view = "login_method"
login_manager.login_message_category = "info"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.Text(120), unique=True, nullable=False)
    password = db.Column(db.Text(100), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
