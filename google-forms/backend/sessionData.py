from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from database import db

session_routes = Blueprint("session_routes", __name__)



# Sign-Up Route
@session_routes.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")
        username = data.get("username")

        # Check if the email already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already registered"}), 409

        # Hash the password and save the user
        hashed_password = generate_password_hash(password, method="pbkdf2:sha256")
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        print("Received data:", data)
        print("New user:", new_user)


        return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# Login Route
from flask import session

@session_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    # Log the user in
    session["user_id"] = user.id  # Set user_id in session
    login_user(user) 
    print("Session after login:", session)  # Debugging: Check session contents
    session.permanent = True


    return jsonify({"message": "Login successful!"}), 200


# Logout Route
@session_routes.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully!"}), 200
