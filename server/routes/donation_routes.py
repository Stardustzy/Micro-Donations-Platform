from flask import request, jsonify
from flask_restful import Resource, reqparse
from ..models import db, Donation, Cause
from flask_jwt_extended import jwt_required, get_jwt_identity


class DonationResource(Resource):
    def get(self, donation_id=None):
        if donation_id:
            donation = Donation.query.get(donation_id)
            if not donation:
                return {'error': 'Donation not found'}, 404
            return donation.to_dict(), 200
        
        donations = Donation.query.all()
        return jsonify([donation.to_dict() for donation in donations])
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        
        if not data or 'amount' not in data or 'cause_id' not in data:
            return {'error': 'Invalid data'}, 400
        
        cause = Cause.query.get(data['cause_id'])
        if not cause:
            return {'error': 'Cause not found'}, 404
        
        new_donation = Donation(
            amount=data['amount'],
            message=data.get('message', ''),
            cause_id=data['cause_id'],
            user_id=user_id
        )
        db.session.add(new_donation)
        new_donation.assign_reward()
        db.session.commit()
        
        return {'message': 'Donation created successfully', 'reward': new_donation.reward_tier, 'donation': new_donation.to_dict()}, 201
    
    def patch(self, donation_id):
        donation = Donation.query.get(donation_id)
        if not donation:
            return {'error': 'Donation not found'}, 404
        
        data = request.get_json()
        donation.amount = data.get('amount', donation.amount)
        donation.message = data.get('message', donation.message)
        
        db.session.commit()
        return {'message': 'Donation updated successfully', 'donation': donation.to_dict()}, 200
    
    def delete(self, donation_id):
        donation = Donation.query.get(donation_id)
        if not donation:
            return {'error': 'Donation not found'}, 404
        
        db.session.delete(donation)
        db.session.commit()
        return {'message': 'Donation deleted successfully'}, 200

class DonationsByCauseResource(Resource):
    def get(self, cause_id):
        donations = Donation.query.filter_by(cause_id=cause_id).all()
        return jsonify([{"id": d.id, "user_id": d.user_id, "amount": d.amount} for d in donations])