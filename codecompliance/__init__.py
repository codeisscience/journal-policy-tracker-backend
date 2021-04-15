from flask import Flask
from pathlib import Path
import sqlite3

# Declare `app` before importing routes
app = Flask(__name__)

db = sqlite3.connect(Path('journals.db'))

# import api routes
from .routes import *
from .initialize_db import initialize_db

def main():
    initialize_db()

main()