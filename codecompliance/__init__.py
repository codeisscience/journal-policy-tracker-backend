from flask import Flask
from pathlib import Path

# Declare `app` before importing routes
app = Flask(__name__)

from codecompliance.codecompl import *

def main():
    initialize_db(Path('journals.db'))

main()