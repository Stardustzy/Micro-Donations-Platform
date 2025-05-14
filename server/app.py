from dotenv import load_dotenv
load_dotenv()
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from models import db
from routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)

    # Load config from environment or fallback
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)  
        app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    else:
        # Local fallback to SQLite
        basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        instance_path = os.path.join(basedir, 'instance')
        os.makedirs(instance_path, exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(instance_path, 'micro_donations.db')}"

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY", "fallback-secret-key")

    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)
    jwt = JWTManager(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api')

    @app.route('/')
    def home():
        return {"message": "Welcome to the Micro-Donations API!"}

    return app