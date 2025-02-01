import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO
from config import configurations
from flask_bcrypt import Bcrypt
from models import db

import eventlet
eventlet.monkey_patch()

migrate = Migrate()
bcrypt = Bcrypt()
socketio = SocketIO(async_mode="eventlet", cors_allowed_origins="*")


def create_app():
    """
    Application factory function to create and configure the Flask app.
    """
    app = Flask(__name__)

    # Load configuration from the config file
    config_name = os.getenv("FLASK_CONFIG", "production")  
    app.config.from_object(configurations[config_name])

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    socketio.init_app(app)  # Initialize SocketIO with app

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Import and register Blueprints here 
    from routes.auth_routes import auth_blueprint
    from routes.cause_routes import cause_blueprint
    from routes.donation_routes import donation_blueprint
    from routes.reward_routes import reward_blueprint

    # Register Blueprints for modularized routing
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
    app.register_blueprint(cause_blueprint, url_prefix='/api/causes')
    app.register_blueprint(donation_blueprint, url_prefix='/api/donations')
    app.register_blueprint(reward_blueprint, url_prefix='/api/rewards')

    # Root route for testing
    @app.route('/')
    def index():
        return {
            "message": "Welcome to the Micro-Donation Platform API",
            "status": "success"
        }

    return app


if __name__ == "__main__":
    app = create_app() 
    socketio.run(app, host="0.0.0.0", port=5000)