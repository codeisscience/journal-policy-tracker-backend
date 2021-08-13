from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import backref

from server import db


class Journal(db.Model):
    __tablename__ = "journal"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), unique=True, nullable=False)
    url = db.Column(db.Text(2000), unique=True, nullable=False)
    issn = db.Column(db.Integer, unique=True, nullable=False)
    ratings = db.Column(db.Integer, ForeignKey("ratings.rating"))
    # policies = db.relationship("Policies", backref="author", lazy=True)
    # domains = db.relationship("Domain", backref="author", lazy=True)

    def __repr__(self):
        return f"Journal('{self.title}', '{self.url}', '{self.issn}')"


class Rating(db.Model):
    __tablename__ = "ratings"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    ratings = db.relationship("Journal", backref="rating")

    def __repr__(self):
        return f"Rating('{self.rating}', '{self.date}')"


class Policies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    issn = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    first_year = db.Column(db.Integer, nullable=False)
    last_year = db.Column(db.Integer, nullable=True)
    policy_type = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f"Policies('{self.title}', '{self.first_year}', '{self.last_year}')"


class Domain(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    issn = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"Journal('{self.name}')"
