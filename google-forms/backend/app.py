from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from routes.form_routes import form_routes
from routes.response_routes import response_routes
from sessionData import session_routes
from models import User
from database import db
from datetime import timedelta
from flask_migrate import Migrate
from models import User, Form, Response  # Adjust paths as needed
from flask_migrate import Migrate


# Initialize Flask app
app = Flask(__name__)
app.secret_key = "123456" 

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Configure SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///google_forms.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Configure session cookie settings
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # Set True in production with HTTPS
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7) 
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
app.config['JSON_SORT_KEYS'] = False

# Initialize extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)

# Register routes
app.register_blueprint(session_routes, url_prefix="/api/session")
app.register_blueprint(form_routes, url_prefix="/api/forms")
app.register_blueprint(response_routes, url_prefix="/api/forms")

# Create database tables before the first request
with app.app_context():
    db.create_all()

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Home route
@app.route("/")
def home():
    return {"message": "Welcome to the Google Forms Backend"}

if __name__ == "__main__":
    app.run(debug=True)
