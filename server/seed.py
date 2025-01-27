from app import db
from models import User, Cause, Donation, Reward, UserReward
from werkzeug.security import generate_password_hash

def seed():
    # Clear existing data
    db.session.query(UserReward).delete()
    db.session.query(Donation).delete()
    db.session.query(Reward).delete()
    db.session.query(Cause).delete()
    db.session.query(User).delete()

    # Users
    donor = User(
        name="John Doe",
        email="donor@example.com",
        password=generate_password_hash("password123"),
        role="donor"
    )
    recipient = User(
        name="Save the Rainforest Org",
        email="recipient@example.com",
        password=generate_password_hash("securepass"),
        role="recipient"
    )
    admin = User(
        name="Admin User",
        email="admin@example.com",
        password=generate_password_hash("adminpass"),
        role="admin"
    )
    db.session.add_all([donor, recipient, admin])

    # Causes
    cause1 = Cause(
        title="Save the Rainforest",
        description="Help us protect the rainforest and combat deforestation.",
        funding_goal=10000.0,
        total_raised=0.0,
        user_id=2  # Assigned to the recipient
    )
    cause2 = Cause(
        title="Educate Underprivileged Children",
        description="Provide quality education to children in need.",
        funding_goal=5000.0,
        total_raised=0.0,
        user_id=2
    )
    db.session.add_all([cause1, cause2])

    # Donations
    donation1 = Donation(
        amount=50.0,
        message="Keep up the great work!",
        user_id=1,  # Donor
        cause_id=1  # Save the Rainforest
    )
    donation2 = Donation(
        amount=100.0,
        message="Happy to support this cause.",
        user_id=1,
        cause_id=2  # Educate Underprivileged Children
    )
    db.session.add_all([donation1, donation2])

    # Rewards
    reward1 = Reward(
        name="Thank You Certificate",
        description="A personalized certificate to thank you for your support.",
        points_required=50
    )
    reward2 = Reward(
        name="Eco-Friendly Tote Bag",
        description="A reusable tote bag as a token of appreciation.",
        points_required=100
    )
    db.session.add_all([reward1, reward2])

    # User Rewards
    user_reward = UserReward(
        user_id=1,  # Donor
        reward_id=1  # Thank You Certificate
    )
    db.session.add(user_reward)

    # Commit to the database
    db.session.commit()
    print("Database seeded successfully.")

if __name__ == "__main__":
    from server.app import create_app
    app = create_app()
    with app.app_context():
        seed()
