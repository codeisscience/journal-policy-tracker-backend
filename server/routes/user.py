from server import app
from textwrap import dedent


@app.route("/users/login", methods=["GET", "POST"])
def login():
    return dedent(
        """
        <h1>USER LOGIN API</h1>
        <a href="/">Back to home</a>
    """
    )


@app.route("/users/signup", methods=["GET", "POST"])
def signup():
    return dedent(
        """
        <h1>USER SIGNUP API</h1>
        <a href="/">Back to home</a>
    """
    )
