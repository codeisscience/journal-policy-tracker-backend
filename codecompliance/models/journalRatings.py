from codecompliance import db

class JournalRatings(db.Model):

    __tablename__ = 'JournalRatings'

    '''
        id [integer primary key]
        rating [text]
        date [datetime]
    '''

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Text)
    date = db.Column(db.DateTime(timezone=True))