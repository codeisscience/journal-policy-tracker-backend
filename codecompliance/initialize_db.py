from . import db
from .models.domains import Domains
from .models.journals import Journals
from .models.journalsToDomains import JournalsToDomains
from .models.policies import Policies
from .models.policyTypes import PolicyTypes
from .models.journalRatings import JournalRatings

def initialize_db():

    db.create_all()
