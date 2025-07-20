# Contains the main configurations of our applications
from flask import Flask
from flask_sqlalchemy import SQLAlchemy # Allows us to interact with relational databases (SQLite, PostgresSQL, MySQL)
from flask_cors import CORS # CORS: Cross Origin Requests | Allows our frontend to make requests to the backend server

app = Flask(__name__) # Initializes the Flask app
CORS(app) # Allows us to make cross origin requests between our frontend and backend in our app

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" # Configures what relational database our Flask app is interacting with (SQLite in this case)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # We are disabling SQLAlchemy's event system that tracks object modifications, as we'll handle database updates manually with db.session.commit()

db = SQLAlchemy(app) # Initializes the database instance using our app's SQLite configuration. This gives us access to SQLAlchemy's ORM (Object-Relational Mapping) for performing CRUD operations in Python, which are translated into SQL under the hood.