from flask import Blueprint, json, request, jsonify
from flask_login import login_required, current_user
from models import Form, Response
from database import db

response_routes = Blueprint("response_routes", __name__)

# Submit a response to a form
@response_routes.route("/<int:form_id>/responses", methods=["POST"])
def submit_response(form_id):
    print("Is user authenticated:", current_user.is_authenticated)  # Debug authentication state
    print("Current user:", current_user)  # Debug the current user object
    
    if not current_user.is_authenticated:
        return jsonify({"error": "User is not logged in"}), 401

    data = request.json
    new_response = Response(
        form_id=form_id,
        answers=data.get("answers"),
        user_id=current_user.id,  # Authenticated user's ID
    )
    db.session.add(new_response)
    db.session.commit()
    return jsonify({"message": "Response submitted!"}), 201



# Get all responses for a specific form
@response_routes.route("/<int:form_id>/responses", methods=["GET"])
@login_required  # Require login to retrieve responses
def get_responses(form_id):
    # Fetch all responses for the given form ID
    responses = Response.query.filter_by(form_id=form_id).all()

    return jsonify(
        {
            "form_id": form_id,
            "responses": [{"id": r.id, "answers": r.answers} for r in responses],
        }
    ), 200

@response_routes.route("/responses", methods=["GET"])
def get_all_responses():
    try:
        all_responses = Response.query.all()
        responses = []

        for response in all_responses:
            form = Form.query.get(response.form_id)  # Fetch the associated form
            fields = json.loads(form.fields)  # Convert fields JSON string to Python object
            questions = {field["id"]: field["label"] for field in fields}  # Map field IDs to labels

            responses.append({
                "form_title": form.title,
                "form_id": response.form_id,
                "answers": {questions[field_id]: answer for field_id, answer in response.answers.items()}
            })

        return jsonify(responses), 200
    except Exception as e:
        print(f"Error fetching responses: {str(e)}")
        return jsonify({"error": "Failed to fetch responses"}), 500
