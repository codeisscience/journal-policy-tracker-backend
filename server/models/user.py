"""User model for database."""
from flask_login import UserMixin

from server.app import BaseModel, db, login_manager

login_manager.login_view = "login_method"
login_manager.login_message_category = "info"


@login_manager.user_loader
def load_user(user_id):
    """Loads data from user with given `user_id`."""
    return User.query.get(int(user_id))


class User(BaseModel, UserMixin):
    """User database entry representation."""

    id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.Text(120), unique=True, nullable=False)
    password = db.Column(db.Text(100), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
