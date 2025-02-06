import requests
import base64
import json
from datetime import datetime
from config import Config

class MpesaService:
    @staticmethod
    def get_access_token():
        """Get M-Pesa API access token."""
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        auth = (Config.MPESA_CONSUMER_KEY, Config.MPESA_CONSUMER_SECRET)
        response = requests.get(url, auth=auth)
        response_data = response.json()
        return response_data.get("access_token")

    @staticmethod
    def generate_password():
        """Generate the password for STK push request."""
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        data_to_encode = Config.MPESA_SHORTCODE + Config.MPESA_PASSKEY + timestamp
        encoded_string = base64.b64encode(data_to_encode.encode()).decode()
        return encoded_string, timestamp

    @staticmethod
    def initiate_stk_push(phone_number, amount, cause_id):
        """Initiate an M-Pesa STK push transaction."""
        access_token = MpesaService.get_access_token()
        password, timestamp = MpesaService.generate_password()

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        payload = {
            "BusinessShortCode": Config.MPESA_SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone_number,
            "PartyB": Config.MPESA_SHORTCODE,
            "PhoneNumber": phone_number,
            "CallBackURL": Config.CALLBACK_URL,
            "AccountReference": f"Cause-{cause_id}",
            "TransactionDesc": "Donation",
        }

        response = requests.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            json=payload,
            headers=headers,
        )

        return response.json()
