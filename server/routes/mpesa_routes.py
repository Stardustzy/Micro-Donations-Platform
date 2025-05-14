from flask import request, jsonify
from flask_restful import Resource
from services.mpesa_service import MpesaService
from server.models import db, Donation

class MpesaSTKPushResource(Resource):
    def post(self):
        """Handle M-Pesa STK push request."""
        data = request.json
        phone_number = data.get("phoneNumber")
        amount = data.get("amount")
        cause_id = data.get("causeId")

        if not phone_number or not amount or not cause_id:
            return {"error": "Missing required parameters"}, 400

        response = MpesaService.initiate_stk_push(phone_number, amount, cause_id)
        return jsonify(response)

class MpesaCallbackResource(Resource):
    def post(self):
        """Handle M-Pesa callback response."""
        data = request.json
        body = data.get("Body", {}).get("stkCallback", {})

        merchant_request_id = body.get("MerchantRequestID")
        checkout_request_id = body.get("CheckoutRequestID")
        result_code = body.get("ResultCode")
        result_desc = body.get("ResultDesc")
        callback_metadata = body.get("CallbackMetadata", {}).get("Item", [])

        amount = None
        mpesa_receipt_number = None
        phone_number = None

        for item in callback_metadata:
            if item.get("Name") == "Amount":
                amount = item.get("Value")
            elif item.get("Name") == "MpesaReceiptNumber":
                mpesa_receipt_number = item.get("Value")
            elif item.get("Name") == "PhoneNumber":
                phone_number = item.get("Value")

        if result_code == 0:
            new_donation = Donation(
                phone_number=phone_number,
                amount=amount,
                receipt_number=mpesa_receipt_number,
            )
            db.session.add(new_donation)
            db.session.commit()
            return {"message": "Payment successful"}, 200
        else:
            return {"error": result_desc}, 400



