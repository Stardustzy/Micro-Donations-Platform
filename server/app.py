from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config
from app.models import db
from app.routes.auth_routes import auth_blueprint
from app.routes.cause_routes import cause_blueprint
from app.routes.donation_routes import donation_blueprint

# Initialize Flask extensions
migrate = Migrate()
db = SQLAlchemy()

# Initialize Flask app

def create_app( ):
    """
    Application factory function to create and configure the Flask app.
    """
    app = Flask(__name__)

    # Load configuration from the config file
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

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
