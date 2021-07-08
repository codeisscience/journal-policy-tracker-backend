from flask import jsonify, request, make_response, current_app
from server import app, bcrypt, db
from server.models.User import User
from textwrap import dedent
import datetime, uuid, jwt

# Just for development purpose i.e. to display all users in the database
@app.route("/users/display", methods=["GET"])
def display():
    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data["id"] = user.id
        user_data["public_id"] = user.public_id
        user_data["username"] = user.username
        user_data["email"] = user.email
        output.append(user_data)

    return jsonify({"users": output})


@app.route("/users/login", methods=["GET", "POST"])
def login():
    body = request.json
    # return jsonify({"user": auth})

    if not body:
        return make_response(
            "Could not verify",
            401,
            {"WWW-Authenticate": 'Basic realm="Login required!"'},
        )

    user = User.query.filter_by(email=body["email"]).first()

    if not user:
        return make_response(
            "Could not verify",
            401,
            {"WWW-Authenticate": 'Basic realm="Login required!"'},
        )

    if bcrypt.check_password_hash(user.password, body["password"]):
        token = jwt.encode(
            {
                "public_id": user.public_id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            },
            app.config["SECRET_KEY"],
        )
        return jsonify({"token": token})

    return make_response(
        "Could not verify", 401, {"WWW-Authenticate": 'Basic realm="Login required!"'}
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
            user = User(
                public_id=str(uuid.uuid4()),
                username=username,
                password=hashed_password,
                email=email,
            )
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
