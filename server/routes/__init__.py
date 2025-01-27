# server/routes/__init__.py

from .auth_routes import auth_blueprint
from .cause_routes import cause_blueprint
from .donation_routes import donation_blueprint
from .reward_routes import reward_blueprint

# Make the blueprints available for import
__all__ = ["auth_blueprint", "cause_blueprint", "donation_blueprint", "reward_blueprint"]
