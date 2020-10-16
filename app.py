from pathlib import Path
from textwrap import dedent
import sqlite3

from flask import Flask

app = Flask(__name__)


def initialize_db(path: Path):
    db = sqlite3.connect(path)

    db.execute(dedent('''
        create table if not exists Domains (
            id integer primary key,
            name text
        );
    '''))

    db.execute(dedent('''
        create table if not exists Journals (
            id integer primary key,
            title text,
            url text,
            issn text
        );
    '''))

    db.execute(dedent('''
        create table if not exists JournalsToDomains (
            journal_id integer,
            domain_id integer,
            foreign key (journal_id) references Journals(id),
            foreign key (domain_id) references Domains(id)
        );
    '''))


@app.route('/journals', methods=['GET'])
def list_journals():
    return ('Nothing here yet. Wanna implement this listing?'
            ' Submit a PR to <a href='
            '"https://github.com/codeisscience/codecompliance-backend"'
            '>the Github repo</a>!')


@app.route('/', methods=['GET'])
def root():
    return dedent('''
        <h1>Code Compliance API</h1>

        Try and check one of these links:
        <ul>
            <li><a href="/journals">Journal listing</a> (WIP)</li>
        </ul>
    ''')


def main():
    initialize_db(Path('journals.db'))


print('hooray')
main()
