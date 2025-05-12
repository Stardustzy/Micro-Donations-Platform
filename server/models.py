from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False) 
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    causes = db.relationship("Cause", backref="creator", lazy=True)
    donations = db.relationship("Donation", backref="donor", lazy=True)
    comments = db.relationship("Comment", backref="author", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at.isoformat()
        }

class Cause(db.Model):
    __tablename__ = 'causes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    goal_amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    donations = db.relationship("Donation", backref="cause", lazy=True)
    comments = db.relationship("Comment", backref="cause", lazy=True)

    @property
    def raised_amount(self):
        return sum(d.amount for d in self.donations)

    def to_dict(self, include_user=False):
        data = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "goal_amount": self.goal_amount,
            "raised_amount": self.raised_amount,
            "category": self.category,
            "country": self.country,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
        }
        if include_user:
            data["creator"] = self.creator.to_dict()
        return data

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cause_id = db.Column(db.Integer, db.ForeignKey("causes.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "cause_id": self.cause_id
        }

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cause_id = db.Column(db.Integer, db.ForeignKey("causes.id"), nullable=False)

    def to_dict(self, include_user=False):
        data = {
            "id": self.id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id,
            "cause_id": self.cause_id
        }
        if include_user:
            data["author"] = self.author.to_dict()
        return data




