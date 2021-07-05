from flask import jsonify, request, make_response, current_app
from server import app, bcrypt, db
from server.models.User import User
from textwrap import dedent


@app.route("/users/login", methods=["POST"])
def login():
    return dedent(
        """
        <h1>USER LOGIN API</h1>
        <a href="/">Back to home</a>
    """
    )


@app.route("/users/register", methods=["POST"])
def signup():
    """
    We would be expecting a request body of this type:
    {
        'username' : "abc",
        'password': "abc",
        'email': "abc@abc"
    }
    """
    try:
        body = request.json
        if body:
            username = body["username"]
            password = body["password"]
            email = body["email"]
            hashed_password = bcrypt.generate_password_hash(password)
            user = User(username=username, password=hashed_password, email=email)
            db.session.add(user)
            db.session.commit()

            current_app.logger.info(
                f"<AUTH> Adding new user: {user.username}, email: {user.email}"
            )
            return make_response(
                "<h2>Welcome to Journal Policy Tracker.</h2><br>Have a great time.".format(
                    user.username
                ),
                201,
            )
    except:
        current_app.logger.error("<REGISTRATION> Unable to parse POST request.")

    return make_response("Wrong parameters. Try again", 400)
