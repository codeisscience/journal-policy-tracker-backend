from server import app
from textwrap import dedent
from flask_cors import cross_origin


STUB_PAGE_MESSAGE = dedent(
    """
    Nothing here yet.<br>

    Wanna implement this API function? Submit a PR to <a
    href="https://github.com/codeisscience/codecompliance-backend">the Github
    repo</a>!
    """
)


@app.route("/", methods=["GET"])
@cross_origin()
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
@cross_origin()
def list_journals():
    """Lists journals. May receive filters in query parameters."""
    # TODO: Use `flask.requests.args` to fetch parameters for:
    #       - ?keywords=a,b      (comma-separated keyword list)
    #       - ?keywordcat=code   (specific keyword category)
    return STUB_PAGE_MESSAGE


@app.route("/api/journals/<identifier>", methods=["GET"])
@cross_origin()
def list_journal(identifier):
    """Lists general information from a journal, including its domains"""
    return STUB_PAGE_MESSAGE


@app.route("/api/journals/<identifier>/policies", methods=["GET"])
@cross_origin()
def list_journal_policies():
    """Lists the policies from a journal."""
    return STUB_PAGE_MESSAGE
