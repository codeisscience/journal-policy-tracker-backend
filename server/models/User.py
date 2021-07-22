from datetime import datetime
from server import create_db, login_manager
from flask_login import UserMixin

db = create_db()

login_manager.login_view = "login_method"
login_manager.login_message_category = "info"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.Text(120), unique=True, nullable=False)
    image_url = db.Column(db.Text(20), nullable=False, default="default.png")
    password = db.Column(db.Text(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_url}')"
