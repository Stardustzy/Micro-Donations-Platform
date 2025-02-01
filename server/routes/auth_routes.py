#server/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@auth_blueprint.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()

    if not data or not all(key in data for key in ('username', 'email', 'password')):
        return jsonify({'error': 'Invalid data'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already in use'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully', 'user': {'username': new_user.username, 'email': new_user.email}}), 201


@auth_blueprint.route('/login', methods=['POST'])
def login():
    """Log in a user."""
    data = request.get_json()

    if not data or not all(key in data for key in ('email', 'password')):
        return jsonify({'error': 'Invalid data'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': f'Welcome back, {user.username}!'}), 200

    return jsonify({'error': 'Invalid credentials'}), 401


@auth_blueprint.route('/logout', methods=['POST'])
def logout():
    """Log out a user."""
    # Placeholder for logout logic (e.g., token revocation if implementing JWT)
    return jsonify({'message': 'User logged out successfully'}), 200
