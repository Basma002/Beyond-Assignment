from database import db
from sqlalchemy.dialects.postgresql import JSON
from flask_login import UserMixin

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # For storing hashed passwords
    forms = db.relationship("Form", backref="user", lazy=True)
    responses = db.relationship("Response", back_populates="user", lazy=True)

# Form model
class Form(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    fields = db.Column(db.Text, nullable=False)  # JSON string of form fields
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

# Response model
class Response(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer, db.ForeignKey("form.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)  # Optional for unauthenticated users
    answers = db.Column(JSON, nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="responses")

