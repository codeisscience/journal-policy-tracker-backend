from codecompliance import db

class Journals(db.Model):

    __tablename__ = 'Journals'

    '''
        id [integer primary key]
        title [varchar]
        url [text]
        issn [text]
    '''

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), index=True, unique=True)
    url = db.Column(db.Text)
    issn = db.Column(db.Text)
    domains = db.relationship('Domains', lazy='select',
        backref=db.backref('Journals', lazy='joined'))
