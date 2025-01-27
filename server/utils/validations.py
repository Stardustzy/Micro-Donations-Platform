from flask import jsonify
import re

def validate_positive_integer(value, field_name):
    """
    Validates that a value is a positive integer.

    :param value: The value to validate
    :param field_name: The name of the field being validated
    :return: Error message if invalid, None otherwise
    """
    if not isinstance(value, int) or value <= 0:
        return {"error": f"{field_name} must be a positive integer."}

def validate_non_empty_string(value, field_name):
    """
    Validates that a value is a non-empty string.

    :param value: The value to validate
    :param field_name: The name of the field being validated
    :return: Error message if invalid, None otherwise
    """
    if not isinstance(value, str) or not value.strip():
        return {"error": f"{field_name} must be a non-empty string."}

def handle_validation_errors(errors):
    """
    Handles and formats validation errors for JSON response.

    :param errors: A dictionary of field-specific errors
    :return: Flask JSON response with errors
    """
    return jsonify(errors), 400

def validate_email(email):
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(email_regex, email), email
