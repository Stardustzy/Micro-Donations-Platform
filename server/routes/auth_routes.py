from flask import request, jsonify
from flask_restful import Resource, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import db, User

auth_parser = reqparse.RequestParser()
auth_parser.add_argument('username', type=str, help='Username is required')
auth_parser.add_argument('email', type=str, required=True, help='Email is required')
auth_parser.add_argument('password', type=str, required=True, help='Password is required')

class RegisterResource(Resource):
    def post(self):
        args = auth_parser.parse_args()
        if not args['username'] or not args['email'] or not args['password']:
            return {'error': 'Invalid data'}, 400

        if User.query.filter_by(email=args['email']).first():
            return jsonify({'error': 'Email already in use'}), 400

        hashed_password = generate_password_hash(args['password'])
        new_user = User(username=args['username'], email=args['email'], password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'user': {'username': new_user.username, 'email': new_user.email}}), 201



class LoginResource(Resource):
    def post(self):
        args = auth_parser.parse_args()

        if not args['email'] or not args['password']:
            return jsonify({'error': 'Invalid data'}), 400

        user = User.query.filter_by(email=args['email']).first()
        if user and check_password_hash(user.password_hash, args['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({'message': f'Welcome back, {user.username}!', 'token': access_token}), 200

        return jsonify({'error': 'Invalid credentials'}), 401


class LogoutResource(Resource):
    def post(self):
        return jsonify({'message': 'User logged out successfully'}), 200
