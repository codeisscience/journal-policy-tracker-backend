from codecompliance import db

class PolicyTypes(db.Model):

    __tablename__ = 'PolicyTypes'

    '''
        PolicyTypes are meant to represent, for example:
            - "Restriction" (for "Must be" policies, such as License restrictions)
            - "Enforcement" (for "Would be good to be" policies, such as having unit tests)
            - Some custom type, if needed.
            
        id [integer primary key]
        name [text]
    '''

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
