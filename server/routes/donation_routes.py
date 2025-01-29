# server/routes/donation_routes.py
from flask import Blueprint, request, jsonify
from server.app import db, socketio
from server.models import Donation, Cause, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

donation_blueprint = Blueprint('donation', __name__, url_prefix='/donations')


@donation_blueprint.route('/', methods=['GET'])
def get_all_donations():
    """Retrieve all donations."""
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


@donation_blueprint.route('/<int:id>', methods=['GET'])
def get_donation(id):
    """Retrieve a single donation by ID."""
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    return jsonify(donation.to_dict()), 200

@donation_blueprint.route('/', methods=['POST'])
def make_donation():
    """Create a new donation."""
    data = request.get_json()
    user_id = get_jwt_identity()

    if not data or 'amount' not in data or 'cause_id' not in data or 'user_id' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    try:
        # Validate cause and user existence
        cause = Cause.query.get(data['cause_id'])
        user = User.query.get(data['user_id'])

        if not cause or not user:
            return jsonify({'error': 'Invalid cause_id or user_id'}), 404

        new_donation = Donation(
            amount=data['amount'],
            message=data.get('message', ''),
            cause_id=data['cause_id'],
            user_id=data['user_id']
        )
        db.session.add(new_donation)
        new_donation.assign_reward()
        db.session.commit()

        # Emit event to update frontend in real-time
        socketio.emit("new_donation", {
            "donation_id": new_donation.id,
            "user_id": user_id,
            "cause_id": data["cause_id"],
            "amount": data["amount"],
            "reward": new_donation.reward_tier
        }, broadcast=True)

        return jsonify({'message': 'Donation created successfully', 'reward': new_donation.reward_tier, 'donation': new_donation.to_dict()}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Database integrity error occurred'}), 500

@donation_blueprint.route("/donations/cause/<int:cause_id>", methods=["GET"])
def get_donations_by_cause(cause_id):
    donations = Donation.query.filter_by(cause_id=cause_id).all()
    return jsonify([{"id": d.id, "user_id": d.user_id, "amount": d.amount} for d in donations])

@donation_blueprint.route('/<int:id>', methods=['PUT'])
def update_donation(id):
    """Update an existing donation."""
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    donation.amount = data.get('amount', donation.amount)
    donation.message = data.get('message', donation.message)

    db.session.commit()
    return jsonify({'message': 'Donation updated successfully', 'donation': donation.to_dict()}), 200


@donation_blueprint.route('/<int:id>', methods=['DELETE'])
def delete_donation(id):
    """Delete a donation."""
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    db.session.delete(donation)
    db.session.commit()
    return jsonify({'message': 'Donation deleted successfully'}), 200
