import os
from flask import request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_restful import Resource, reqparse
from ..models import db, Cause

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

cause_parser = reqparse.RequestParser()
cause_parser.add_argument('title', type=str, required=True, help='Title is required')
cause_parser.add_argument('description', type=str, required=True, help='Description is required')
cause_parser.add_argument('funding_goal', type=float, required=False, default=0)

class CauseResource(Resource):
    def get(self, cause_id=None):
        if cause_id:
            cause = Cause.query.get(cause_id)
            if not cause:
                return {'error': 'Cause not found'}, 404
            return jsonify(cause.to_dict())

        causes = Cause.query.all()
        return jsonify([cause.to_dict() for cause in causes]), 200
    
    def post(self):
        args = cause_parser.parse_args()
        if args['funding_goal'] <= 0:
            return {'error': 'Funding goal must be greater than 0'}, 400
        
        new_cause = Cause(
            title=args['title'],
            description=args['description'],
            funding_goal=args['funding_goal']
        )
        db.session.add(new_cause)
        db.session.commit()
        return new_cause.to_dict(), 201
    
    def patch(self, cause_id):
        cause = Cause.query.get(cause_id)
        if not cause:
            return {'error': 'Cause not found'}, 404
        
        data = request.get_json()
        cause.title = data.get('title', cause.title)
        cause.description = data.get('description', cause.description)
        
        db.session.commit()
        return cause.to_dict(), 200
    
    def delete(self, cause_id):
        cause = Cause.query.get(cause_id)
        if not cause:
            return {'error': 'Cause not found'}, 404
        
        db.session.delete(cause)
        db.session.commit()
        return {'message': 'Cause deleted successfully'}, 200
    
class FeaturedCausesResource(Resource):
    def get(self):
        categories = db.session.query(Cause.category).distinct().all()
        featured_causes = [Cause.query.filter_by(category=category[0]).first() for category in categories if category]
        return jsonify([cause.to_dict() for cause in featured_causes])

class UploadFileResource(Resource):
    def get(self, filename):
        return send_from_directory(UPLOAD_FOLDER, filename)