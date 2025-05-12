import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from config import configurations
from flask_bcrypt import Bcrypt
from flask_restful import Api
from models import db

migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    """
    Application factory function to create and configure the Flask app.
    """
    app = Flask(__name__)
    api = Api(app)

    config_name = os.getenv("FLASK_CONFIG", "production")  
    app.config.from_object(configurations[config_name])

    db.init_app(app)
    migrate.init_app(app, db, render_as_batch=True)
    bcrypt.init_app(app)
    db.app = app

    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
 
    from routes.auth_routes import RegisterResource, LoginResource, LogoutResource
    from routes.cause_routes import CauseResource, FeaturedCausesResource, UploadFileResource
    from routes.donation_routes import DonationResource, DonationsByCauseResource
    from routes.mpesa_routes import MpesaSTKPushResource, MpesaCallbackResource

    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(LogoutResource, '/api/auth/logout')

    api.add_resource(CauseResource, '/api/causes')
    api.add_resource(FeaturedCausesResource, '/api/causes/featured')
    api.add_resource(UploadFileResource, '/api/causes/upload')

    api.add_resource(DonationResource, '/api/donations')
    api.add_resource(DonationsByCauseResource, '/api/causes/<int:cause_id>/donations')

    api.add_resource(MpesaSTKPushResource, '/api/mpesa/stk_push')
    api.add_resource(MpesaCallbackResource, '/api/mpesa/callback')

    @app.route('/')
    def index():
        return {
            "message": "Welcome to the Micro-Donation Platform API",
            "status": "success"
        }

    return app