from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    donations = relationship('Donation', back_populates='user')
    redeemed_rewards = relationship('UserReward', back_populates='user')

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.isoformat()
        }

    def __repr__(self):
        return f"<User {self.username}>"


class Cause(db.Model):
    __tablename__ = 'causes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    funding_goal = db.Column(db.Float, nullable=False)
    raised_amount = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    active = db.Column(db.Boolean, default=True)
    image_url = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(50), nullable=True)

    donations = relationship('Donation', back_populates='cause')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "funding_goal": self.funding_goal,
            "raised_amount": self.raised_amount,
            "image_url": self.image_url,
            "category": self.category
        }

    def __repr__(self):
        return f"<Cause {self.title}>"


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    donated_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cause_id = db.Column(db.Integer, db.ForeignKey('causes.id'), nullable=False)
    message = db.Column(db.Text, nullable=True)
    reward_tier = db.Column(db.String(50), nullable=True)

    user = relationship('User', back_populates='donations')
    cause = relationship('Cause', back_populates='donations')

    def assign_reward(self):
        if self.amount >= 100:
            self.reward_tier = "Gold"
        elif self.amount >= 50:
            self.reward_tier = "Silver"
        elif self.amount >= 20:
            self.reward_tier = "Bronze"
        else:
            self.reward_tier = None
        db.session.commit()

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "donated_at": self.donated_at.isoformat(),
            "user_id": self.user_id,
            "cause_id": self.cause_id,
            "message": self.message,
            "reward_tier": self.reward_tier
        }

    def __repr__(self):
        return f"<Donation {self.amount} to Cause {self.cause_id}>"


class Reward(db.Model):
    __tablename__ = 'rewards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    donation_threshold = db.Column(db.Float, nullable=False)

    redeemed_rewards = relationship('UserReward', back_populates='reward')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "donation_threshold": self.donation_threshold
        }

    def __repr__(self):
        return f"<Reward {self.name}>"


class UserReward(db.Model):
    __tablename__ = 'user_rewards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey('rewards.id'), nullable=False)
    redeemed_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = relationship('User', back_populates='redeemed_rewards')
    reward = relationship('Reward', back_populates='redeemed_rewards')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "reward_id": self.reward_id,
            "redeemed_at": self.redeemed_at.isoformat()
        }

    def __repr__(self):
        return f"<UserReward User {self.user_id} Reward {self.reward_id}>"
