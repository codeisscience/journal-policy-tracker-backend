from flask import jsonify, request
from server import app, db
from server.models.Journal import Journal
from textwrap import dedent


STUB_PAGE_MESSAGE = dedent(
    """
    Nothing here yet.<br>

    Wanna implement this API function? Submit a PR to <a
    href="https://github.com/codeisscience/codecompliance-backend">the Github
    repo</a>!
    """
)


@app.route("/", methods=["GET"])
def root():
    return dedent(
        """
        <h1> Welcome to Code Compliance Backend Server</h1>

        The APIs are as follows:
        <ul>
            <li><a href="/api/journals">Journal listing </a> at /api/journals (WIP)</li>
            <li><a href="/users/login">User Login </a> at /users/login (WIP)</li>
            <li><a href="/users/register">User Signup </a> at /users/register (WIP)</li>
        </ul>
    """
    )


@app.route("/api/journals", methods=["GET"])
def list_journals():
    """Lists journals. May receive filters in query parameters."""
    # TODO: Use `flask.requests.args` to fetch parameters for:
    #       - ?keywords=a,b      (comma-separated keyword list)
    #       - ?keywordcat=code   (specific keyword category)
    return STUB_PAGE_MESSAGE


@app.route("/api/journals", methods=["POST"])
def add_journals():
    body = request.json
    if body:
        issn = body["issn"]
        title = body["title"]
        url = body["url"]
        journal = Journal(issn=issn, title=title, url=url)

        db.session.add(journal)
        db.session.commit()
    return body


@app.route("/api/journals/<identifier>", methods=["GET"])
def list_journal(identifier):
    """Lists general information from a journal, including its domains"""
    return STUB_PAGE_MESSAGE


@app.route("/api/journals/<identifier>/policies", methods=["GET"])
def list_journal_policies():
    """Lists the policies from a journal."""
    return STUB_PAGE_MESSAGE
