# server/routes/cause_routes.py
import os
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from app import db
from models import Cause

cause_blueprint = Blueprint('cause', __name__, url_prefix='/causes')
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

# Ensure the upload directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@cause_blueprint.route('/', methods=['GET'])
def get_all_causes():
    """Retrieve all causes."""
    causes = Cause.query.all()
    return jsonify([cause.to_dict() for cause in causes]), 200


@cause_blueprint.route('/<int:id>', methods=['GET'])
def get_cause(id):
    """Retrieve a single cause by ID."""
    cause = Cause.query.get(id)
    if not cause:
        return jsonify({'error': 'Cause not found'}), 404

    return jsonify(cause.to_dict()), 200


@cause_blueprint.route('/', methods=['POST'])
def create_cause():
    """Create a new cause."""
    data = request.get_json()

    if not data or 'title' not in data or 'description' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    if data.get('funding_goal', 0) < 0:
        return jsonify({'error': 'Funding goal cannot be negative'}), 400
    
    if data.get('funding_goal', 0) == 0:
        return jsonify({'error': 'Funding goal must be greater than 0'}), 400
    
    image_url = None
    if "file" in request.files:
        file = request.files["file"]
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            image_url = f"/uploads/{filename}"

    new_cause = Cause(title=data['title'], description=data['description'], funding_goal=data.get('funding_goal', 0), image_url=image_url)
    db.session.add(new_cause)
    db.session.commit()

    return jsonify({'message': 'Cause created successfully', 'cause': new_cause.to_dict()}), 201

@cause_blueprint.route("/uploads/<filename>")
def get_file(filename):
    """Serve uploaded files."""
    return send_from_directory(UPLOAD_FOLDER, filename)


@cause_blueprint.route('/<int:id>', methods=['PUT'])
def update_cause(id):
    """Update an existing cause."""
    cause = Cause.query.get(id)
    if not cause:
        return jsonify({'error': 'Cause not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    cause.title = data.get('title', cause.title)
    cause.description = data.get('description', cause.description)

    if "file" in request.files:
        file = request.files["file"]
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            cause.image_url = f"/uploads/{filename}"

    db.session.commit()
    return jsonify({'message': 'Cause updated successfully', 'cause': cause.to_dict()}), 200


@cause_blueprint.route('/<int:id>', methods=['DELETE'])
def delete_cause(id):
    """Delete a cause by ID."""
    cause = Cause.query.get(id)
    if not cause:
        return jsonify({'error': 'Cause not found'}), 404

    db.session.delete(cause)
    db.session.commit()
    return jsonify({'message': 'Cause deleted successfully'}), 200
