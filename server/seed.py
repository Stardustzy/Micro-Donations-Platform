from models import db, User, Cause, Donation, Reward, UserReward
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
        username="johndoe",
        email="donor@example.com",
        password_hash=generate_password_hash("password123"),
    )
    admin = User(
        username="adminuser",
        email="admin@example.com",
        password_hash=generate_password_hash("adminpass"),
    )
    db.session.add_all([donor, admin])

    # Causes (Each category should have a featured cause)
    causes = [
        Cause(
            id=1,
            title="Save the Rainforest",
            description="Help us protect the rainforest and combat deforestation.",
            funding_goal=10000.0,
            raised_amount=0.0,
            image_url="https://example.com/rainforest.jpg"
        ),
        Cause(
            id=2,
            title="Educate Underprivileged Children",
            description="Provide quality education to children in need.",
            funding_goal=5000.0,
            raised_amount=0.0,
            image_url="https://example.com/education.jpg"
        ),
        Cause(
            id=3,
            title="Clean Water for Villages",
            description="Providing access to clean and safe drinking water.",
            funding_goal=8000.0,
            raised_amount=0.0,
            image_url="https://example.com/clean-water.jpg"
        )
    ]
    db.session.add_all(causes)

    # Donations
    donations = [
        Donation(
            amount=50.0,
            message="Keep up the great work!",
            user_id=1,  # Donor ID
            cause_id=1  # Save the Rainforest
        ),
        Donation(
            amount=100.0,
            message="Happy to support this cause.",
            user_id=1,
            cause_id=2  # Educate Underprivileged Children
        ),
    ]
    db.session.add_all(donations)

    # Rewards
    rewards = [
        Reward(
            name="Thank You Certificate",
            description="A personalized certificate to thank you for your support.",
            donation_threshold=50
        ),
        Reward(
            name="Eco-Friendly Tote Bag",
            description="A reusable tote bag as a token of appreciation.",
            donation_threshold=100
        ),
    ]
    db.session.add_all(rewards)

    # User Rewards
    user_rewards = [
        UserReward(
            user_id=1,  # Donor
            reward_id=1  # Thank You Certificate
        )
    ]
    db.session.add_all(user_rewards)

    # Commit to the database
    db.session.commit()
    print("Database seeded successfully.")

if __name__ == "__main__":
    from server.app import create_app
    app = create_app()
    with app.app_context():
        seed()
