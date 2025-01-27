# server/app/utils/validations.py
def validate_email(email):
    import re
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(email_regex, email)
