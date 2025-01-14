from flask_login import LoginManager
from backend.models import User

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = "session_routes.login"  # Redirect to login if not authenticated

# Define user_loader to load users from the database
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
