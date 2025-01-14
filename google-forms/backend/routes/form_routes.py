from flask import Blueprint, Response, request, jsonify, session
from models import Form, Response
from database import db
import json


form_routes = Blueprint("form_routes", __name__)

# Utility function for user authentication check
def require_login():
    if "user_id" not in session:
        return jsonify({"message": "User not logged in"}), 401
    return None

# Save form in the database
@form_routes.route("", methods=["POST"])
def submit_form():
    # Check if user is logged in
    auth_error = require_login()
    if auth_error:
        return auth_error

    try:
        # Parse and validate the incoming data
        data = request.get_json()
        print("Received Data:", data)  # Debugging

        title = data.get("title", "Untitled Form")
        fields = data.get("fields", [])

        # Create and save the form
        new_form = Form(
            title=title,
            fields=json.dumps(fields),  # Convert fields to JSON string
            user_id=session["user_id"]
        )
        db.session.add(new_form)
        db.session.commit()

        print("Form saved with ID:", new_form.id)  # Debugging
        return jsonify({"message": "Form submitted successfully!", "form_id": new_form.id}), 201
    except Exception as e:
        print("Error while saving form:", str(e))
        db.session.rollback()
        return jsonify({"message": "An error occurred while saving the form"}), 500


# Retrieve all forms for the logged-in user
@form_routes.route("/", methods=["GET"])
def get_user_forms():
    # Check if user is logged in
    auth_error = require_login()
    if auth_error:
        return auth_error

    try:
        # Retrieve forms from the database
        forms = Form.query.filter_by(user_id=session["user_id"]).all()

        # Format forms into a list of dictionaries
        forms_list = [
            {
                "id": form.id,
                "title": form.title,
                "fields": json.loads(form.fields)  # Convert JSON string back to Python object
            }
            for form in forms
        ]
        print("Retrieved Forms:", forms_list)  # Debugging
        return jsonify(forms_list), 200
    except Exception as e:
        print("Error while retrieving forms:", str(e))
        return jsonify({"message": "An error occurred while retrieving forms"}), 500


@form_routes.route("/<int:form_id>/responses", methods=["POST"])
def submit_form_response(form_id):
    try:
        # Parse the incoming JSON request
        data = request.get_json()
        answers = data.get("answers")
        if not answers:
            return jsonify({"error": "No answers provided"}), 400

        # Save the response to the database
        new_response = Response(  # Use the renamed model
            form_id=form_id,
            user_id=session.get("user_id"),  # Use session to get the logged-in user ID (if available)
            answers=answers,
        )
        db.session.add(new_response)
        db.session.commit()

        return jsonify({"message": "Response saved successfully!"}), 201
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": f"Failed to save response: {str(e)}"}), 500


@form_routes.route("/<int:form_id>", methods=["GET"])
def get_form(form_id):
    try:
        # Fetch the form with the given ID
        form = Form.query.get(form_id)
        if not form:
            return jsonify({"error": "Form not found"}), 404

        # Convert fields from JSON string to Python object
        form_data = {
            "id": form.id,
            "title": form.title,
            "fields": json.loads(form.fields)
        }
        return jsonify(form_data), 200
    except Exception as e:
        print(f"Error fetching form with ID {form_id}: {str(e)}")
        return jsonify({"error": "An error occurred while fetching the form"}), 500
