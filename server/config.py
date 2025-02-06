import os

class Config:
    """
    Base configuration class. Subclasses can override attributes to customize settings.
    """
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MPESA_CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY", "your_consumer_key")
    MPESA_CONSUMER_SECRET = os.getenv("MPESA_CONSUMER_SECRET", "your_consumer_secret")
    MPESA_SHORTCODE = os.getenv("MPESA_SHORTCODE", "your_shortcode")
    MPESA_PASSKEY = os.getenv("MPESA_PASSKEY", "your_passkey")
    CALLBACK_URL = os.getenv("CALLBACK_URL", "https://your-server.com/mpesa/callback")
    MPESA_ENV = os.getenv("MPESA_ENV", "sandbox")

class DevelopmentConfig(Config):
    """Configuration for development."""
    DEBUG = True
    DATABASE_USER = os.getenv('DATABASE_USER', 'postgres')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', 'password')
    DATABASE_HOST = os.getenv('DATABASE_HOST', 'localhost')
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'micro_donation_dev')
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"
    )

class TestingConfig(Config):
    """Configuration for testing."""
    TESTING = True
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'test.db')}"

class ProductionConfig(Config):
    """Configuration for production."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',
        f"postgresql://micro_donation_user:password@localhost/micro_donation"
    )

# Dictionary to map environment names to configuration classes.
configurations = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
