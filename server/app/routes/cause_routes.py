from flask import Blueprint, request, jsonify
from app import db
from app.models import Cause

cause_bp = Blueprint('cause', __name__, url_prefix='/causes')


@cause_bp.route('/', methods=['GET'])
def get_all_causes():
    """Retrieve all causes."""
    causes = Cause.query.all()
    return jsonify([cause.to_dict() for cause in causes]), 200


@cause_bp.route('/<int:id>', methods=['GET'])
def get_cause(id):
    """Retrieve a single cause by ID."""
    cause = Cause.query.get(id)
    if not cause:
        return jsonify({'error': 'Cause not found'}), 404

    return jsonify(cause.to_dict()), 200


@cause_bp.route('/', methods=['POST'])
def create_cause():
    """Create a new cause."""
    data = request.get_json()

    if not data or 'name' not in data or 'description' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    new_cause = Cause(name=data['name'], description=data['description'])
    db.session.add(new_cause)
    db.session.commit()

    return jsonify({'message': 'Cause created successfully', 'cause': new_cause.to_dict()}), 201


@cause_bp.route('/<int:id>', methods=['PUT'])
def update_cause(id):
    """Update an existing cause."""
    cause = Cause.query.get(id)
    if not cause:
        return jsonify({'error': 'Cause not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    cause.name = data.get('name', cause.name)
    cause.description = data.get('description', cause.description)

    db.session.commit()
    return jsonify({'message': 'Cause updated successfully', 'cause': cause.to_dict()}), 200


@cause_bp.route('/<int:id>', methods=['DELETE'])
def delete_cause(id):
    """Delete a cause by ID."""
    cause = Cause.query.get(id)
    if not cause:
        return jsonify({'error': 'Cause not found'}), 404

    db.session.delete(cause)
    db.session.commit()
    return jsonify({'message': 'Cause deleted successfully'}), 200
