from pathlib import Path
from textwrap import dedent
import sqlite3

from codecompliance import app
from codecompliance import db

STUB_PAGE_MESSAGE = dedent('''
    Nothing here yet.<br>

    Wanna implement this API function? Submit a PR to <a
    href="https://github.com/codeisscience/codecompliance-backend">the Github
    repo</a>!
    ''')


@app.route('/', methods=['GET'])
def root():
    return dedent('''
        <h1>Code Compliance API</h1>

        Try and check one of these links:
        <ul>
            <li><a href="/journals">Journal listing</a> (WIP)</li>
        </ul>
    ''')


@app.route('/journals', methods=['GET'])
def list_journals():
    '''Lists journals. May receive filters in query parameters.'''
    # TODO: Use `flask.requests.args` to fetch parameters for:
    #       - ?keywords=a,b      (comma-separated keyword list)
    #       - ?keywordcat=code   (specific keyword category)
    return STUB_PAGE_MESSAGE


@app.route('/journals/<identifier>', methods=['GET'])
def list_journal(identifier):
    '''Lists general information from a journal, including its domains'''
    return STUB_PAGE_MESSAGE


@app.route('/journals/<identifier>/policies', methods=['GET'])
def list_journal_policies():
    '''Lists the policies from a journal.'''
    return STUB_PAGE_MESSAGE

