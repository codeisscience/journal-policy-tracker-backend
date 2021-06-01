from pathlib import Path
import sqlite3

db = sqlite3.connect(Path("journals.db"))

# import api routes
from .journal import initialize_db


def main():
    initialize_db()


main()
