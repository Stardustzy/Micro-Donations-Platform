# server/routes/reward_routes.py
from flask import request, jsonify
from flask_restful import Resource, reqparse
from models import db, Reward, UserReward, User
from sqlalchemy.exc import IntegrityError
from datetime import datetime


class RewardResource(Resource):
    def get(self, reward_id=None):
        """Retrieve all rewards or a specific reward by ID."""
        if reward_id:
            reward = Reward.query.get(reward_id)
            if not reward:
                return {'error': 'Reward not found'}, 404
            return reward.to_dict(), 200
        
        rewards = Reward.query.all()
        return [reward.to_dict() for reward in rewards], 200

    def post(self):
        """Create a new reward."""
        data = request.get_json()
        if not data or 'title' not in data or 'points_required' not in data:
            return {'error': 'Invalid data'}, 400

        try:
            new_reward = Reward(
                title=data['title'],
                description=data.get('description', ''),
                points_required=data['points_required']
            )
            db.session.add(new_reward)
            db.session.commit()
            return {'message': 'Reward created successfully', 'reward': new_reward.to_dict()}, 201
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Database integrity error occurred'}, 500

    def put(self, reward_id):
        """Update an existing reward."""
        reward = Reward.query.get(reward_id)
        if not reward:
            return {'error': 'Reward not found'}, 404

        data = request.get_json()
        if not data:
            return {'error': 'Invalid data'}, 400

        reward.title = data.get('title', reward.title)
        reward.description = data.get('description', reward.description)
        reward.points_required = data.get('points_required', reward.points_required)
        
        db.session.commit()
        return {'message': 'Reward updated successfully', 'reward': reward.to_dict()}, 200

    def delete(self, reward_id):
        """Delete a reward."""
        reward = Reward.query.get(reward_id)
        if not reward:
            return {'error': 'Reward not found'}, 404

        db.session.delete(reward)
        db.session.commit()
        return {'message': 'Reward deleted successfully'}, 200

class RedeemRewardResource(Resource):
    def post(self):
        """Redeem a reward for a user."""
        data = request.get_json()

        if not data or 'user_id' not in data or 'reward_id' not in data:
            return {'error': 'Invalid data'}, 400

        user = User.query.get(data['user_id'])
        reward = Reward.query.get(data['reward_id'])

        if not user or not reward:
            return {'error': 'Invalid user_id or reward_id'}, 404

        if user.points < reward.points_required:
            return {'error': 'Insufficient points to redeem this reward'}, 400

        try:
            user.points -= reward.points_required
            user_reward = UserReward(user_id=user.id, reward_id=reward.id)
            db.session.add(user_reward)
            db.session.commit()

            return {'message': 'Reward redeemed successfully', 'user_reward': user_reward.to_dict()}, 201
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Database integrity error occurred'}, 500
