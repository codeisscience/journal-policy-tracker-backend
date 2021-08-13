import datetime, uuid, jwt
from server import app, bcrypt, db
from server.models.User import User
from flask import jsonify, request, make_response, current_app
from textwrap import dedent
from flask_cors import cross_origin

# Just for development purpose i.e. to display all users in the database
@app.route("/users/display", methods=["GET"])
@cross_origin()
def display():
    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data["id"] = user.id
        user_data["username"] = user.username
        user_data["email"] = user.email
        output.append(user_data)

    return jsonify({"users": output})


# Login Endpoint
@app.route("/users/login", methods=["GET", "POST"])
@cross_origin()
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
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            },
            app.config["SECRET_KEY"],
        )
        return jsonify({"token": token, "message": "Login Successful!"})

    return make_response(
        "Could not verify", 401, {"WWW-Authenticate": 'Basic realm="Login required!"'}
    )


@app.route("/users/register", methods=["POST"])
@cross_origin()
def signup():
    """
    This route expectes a JSON request body on the format:
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

            check_user = User.query.filter_by(email=body["email"]).first()

            if not check_user:
                user = User(
                    id=str(uuid.uuid4()),
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
                    "Registration Successful!".format(user.username),
                    201,
                )
            else:
                return make_response("User already registered! Please sign in.", 409)
    except:
        current_app.logger.error("<REGISTRATION> Unable to parse POST request.")
        raise

    return make_response("Wrong parameters. Try again", 400)
