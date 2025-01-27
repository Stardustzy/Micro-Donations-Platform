from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config
from app.models import User, Cause, Donation, UserReward, Reward
from app import db
from app.routes import auth_blueprint, cause_blueprint, donation_blueprint, reward_blueprint

# Initialize Flask app
def create_app( ):
    app = Flask(__name__)

    # Load configuration from the config file
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    # Enable Cross-Origin Resource Sharing (CORS)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register Blueprints for modularized routing
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
    app.register_blueprint(cause_blueprint, url_prefix='/api/causes')
    app.register_blueprint(donation_blueprint, url_prefix='/api/donations')

    # Root route for testing
    @app.route('/')
    def index():
        return {
            "message": "Welcome to the Micro-Donation Platform API",
            "status": "success"
        }

    return app


# Entry point for the server
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
