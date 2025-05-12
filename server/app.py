from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from models import db
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/micro_donations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Config
app.config["JWT_SECRET_KEY"] = "your-secret-key" 

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api')

@app.route('/')
def home():
    return {"message": "Welcome to the Micro-Donations API!"}
