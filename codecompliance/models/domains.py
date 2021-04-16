from codecompliance import db

class Domains(db.Model):

    __tablename__ = 'Domains'

    '''
        id [integer primary key]
        name [varchar unique]
    '''

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
