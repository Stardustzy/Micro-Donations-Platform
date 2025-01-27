from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    donations = relationship('Donation', back_populates='user')
    redeemed_rewards = relationship('UserReward', back_populates='user')

    def __repr__(self):
        return f"<User {self.username}>"


class Cause(db.Model):
    __tablename__ = 'causes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal_amount = db.Column(db.Float, nullable=False)
    raised_amount = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    active = db.Column(db.Boolean, default=True)

    # Relationships
    donations = relationship('Donation', back_populates='cause')

    def __repr__(self):
        return f"<Cause {self.title}>"


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    donated_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cause_id = db.Column(db.Integer, db.ForeignKey('causes.id'), nullable=False)

    # Relationships
    user = relationship('User', back_populates='donations')
    cause = relationship('Cause', back_populates='donations')

    def __repr__(self):
        return f"<Donation {self.amount} to Cause {self.cause_id}>"


class Reward(db.Model):
    __tablename__ = 'rewards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    donation_threshold = db.Column(db.Float, nullable=False)

    # Relationships
    redeemed_rewards = relationship('UserReward', back_populates='reward')

    def __repr__(self):
        return f"<Reward {self.name}>"


class UserReward(db.Model):
    __tablename__ = 'user_rewards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey('rewards.id'), nullable=False)
    redeemed_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship('User', back_populates='redeemed_rewards')
    reward = relationship('Reward', back_populates='redeemed_rewards')

    def __repr__(self):
        return f"<UserReward User {self.user_id} Reward {self.reward_id}>"
