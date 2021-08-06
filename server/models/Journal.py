from datetime import datetime

from server import db


class Journal(db.Model):
    id = db.Column(db.Integer(100), primary_key=True)
    title = db.Column(db.String(60), unique=True, nullable=False)
    url = db.Column(db.Text(2000), unique=True, nullable=False)
    issn = db.Column(db.Integer(8), unique=True, nullable=False)
    about = db.relationship("Rating", backref="author", lazy=True)
    policies = db.relationship("Policies", backref="author", lazy=True)
    domains = db.relationship("Domain", backref="author", lazy=True)

    def __repr__(self):
        return f"Journal('{self.title}', '{self.url}', '{self.issn}')"


class Rating(db.Model):
    rating = db.Column(db.Integer(2), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Rating('{self.rating}', '{self.date}')"


class Policies(db.Model):
    title = db.Column(db.String(50), nullable=False)
    first_year = db.Column(db.Integer(4), nullable=False)
    last_year = db.Column(db.Integer(4), nullable=True)

    def __repr__(self):
        return f"Policies('{self.title}', '{self.first_year}', '{self.last_year}')"


class Domain(db.Model):
    name = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"Journal('{self.name}')"
