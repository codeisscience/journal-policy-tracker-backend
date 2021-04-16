from codecompliance import db

class Policies(db.Model):

    __tablename__ = 'Policies'

    '''
        id integer [primary key],
        title [text]
        first_year [text]
        last_year [text]
    '''

    id = db.Column(db.Integer, primary_key=True)
    title_text = db.Column(db.Text)
    first_year = db.Column(db.Text)
    last_year = db.Column(db.Text)
