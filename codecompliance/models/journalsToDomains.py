from codecompliance import db

class JournalsToDomains(db.Model):

    __tablename__ = 'JournalsToDomains'

    '''
        journal_id [integer]
        domain_id [integer]
        foreign key (journal_id) references Journals(id)
        foreign key (domain_id) references Domains(id)
    '''

    journal_id = db.Column(db.Integer, db.ForeignKey('Journals.id'), primary_key=True)
    domain_id = db.Column(db.Integer, db.ForeignKey('Domains.id'), primary_key=True)
