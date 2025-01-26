# server/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app(config_class):
    """
    Factory function to create and configure the Flask application.

    :param config_class: Config class to use for the app
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Register blueprints
    from .routes.auth_routes import auth_bp
    from .routes.cause_routes import cause_bp
    from .routes.donation_routes import donation_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(cause_bp)
    app.register_blueprint(donation_bp)

    return app
