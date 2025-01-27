# server/routes/reward_routes.py
from flask import Blueprint, request, jsonify
from server.app import db
from server.models import Reward, UserReward, User
from sqlalchemy.exc import IntegrityError
from datetime import datetime

# Define the blueprint
reward_blueprint = Blueprint('reward', __name__, url_prefix='/rewards')


# Get all rewards
@reward_blueprint.route('/rewards', methods=['GET'])
def get_all_rewards():
    """Retrieve all rewards."""
    rewards = Reward.query.all()
    rewards_data = [reward.to_dict() for reward in rewards]
    return jsonify(rewards_data), 200


# Get a single reward by ID
@reward_blueprint.route('/rewards/<int:reward_id>', methods=['GET'])
def get_reward(id):
    """Retrieve a specific reward by ID."""
    reward = Reward.query.get(id)
    if not reward:
        return jsonify({'error': 'Reward not found'}), 404

    return jsonify(reward.to_dict()), 200


# Create a new reward (Admin only)
@reward_blueprint.route('/rewards', methods=['POST'])
def create_reward():
    """Create a new reward."""
    data = request.get_json()

    if not data or 'title' not in data or 'points_required' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    try:
        new_reward = Reward(
            title=data['title'],
            description=data.get('description', ''),
            points_required=data['points_required']
        )
        db.session.add(new_reward)
        db.session.commit()

        return jsonify({'message': 'Reward created successfully', 'reward': new_reward.to_dict()}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Database integrity error occurred'}), 500


# Update a reward (Admin only)
@reward_blueprint.route('/rewards/<int:reward_id>', methods=['PUT'])
def update_reward(id):
    """Update an existing reward."""
    reward = Reward.query.get(id)
    if not reward:
        return jsonify({'error': 'Reward not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    reward.title = data.get('title', reward.title)
    reward.description = data.get('description', reward.description)
    reward.points_required = data.get('points_required', reward.points_required)

    db.session.commit()
    return jsonify({'message': 'Reward updated successfully', 'reward': reward.to_dict()}), 200


# Delete a reward (Admin only)
@reward_blueprint.route('/rewards/<int:reward_id>', methods=['DELETE'])
def delete_reward(id):
    """Delete a reward."""
    reward = Reward.query.get(id)
    if not reward:
        return jsonify({'error': 'Reward not found'}), 404

    db.session.delete(reward)
    db.session.commit()
    return jsonify({'message': 'Reward deleted successfully'}), 200


# Redeem a reward for a user
@reward_blueprint.route('/redeem_reward', methods=['POST'])
def redeem_reward():
    """Redeem a reward for a user."""
    data = request.get_json()

    if not data or 'user_id' not in data or 'reward_id' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    user = User.query.get(data['user_id'])
    reward = Reward.query.get(data['reward_id'])

    if not user or not reward:
        return jsonify({'error': 'Invalid user_id or reward_id'}), 404

    if user.points < reward.points_required:
        return jsonify({'error': 'Insufficient points to redeem this reward'}), 400

    try:
        user.points -= reward.points_required
        user_reward = UserReward(user_id=user.id, reward_id=reward.id)
        db.session.add(user_reward)
        db.session.commit()

        return jsonify({'message': 'Reward redeemed successfully', 'user_reward': user_reward.to_dict()}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Database integrity error occurred'}), 500
