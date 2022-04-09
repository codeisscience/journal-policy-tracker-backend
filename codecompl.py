from server import app, db

# Import model definitions and then create the database
db.create_all()
db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)
