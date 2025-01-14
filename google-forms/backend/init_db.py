from database import db
from app import app
from models import User, Form, Response  # Import all models

with app.app_context():
    db.create_all()
    print("Database and tables created successfully!")