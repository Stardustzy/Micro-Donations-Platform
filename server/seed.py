from models import db, User, Cause, Donation, Reward, UserReward
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import text

def seed():
    try:
        # Clear existing data
        db.session.query(UserReward).delete()
        db.session.query(Donation).delete()
        db.session.query(Reward).delete()
        db.session.query(Cause).delete()
        db.session.query(User).delete()
        db.session.commit()

        # Reset auto-incrementing primary keys
        db.session.execute(text("ALTER SEQUENCE users_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE causes_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE donations_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE rewards_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE user_rewards_id_seq RESTART WITH 1;"))
        db.session.commit()

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

        # Causes
        causes = [
            Cause(
                title="Save the Rainforest",
                description="Help us protect the rainforest and combat deforestation.",
                funding_goal=10000.0,
                raised_amount=0.0,
                image_url="https://example.com/rainforest.jpg"
            ),
            Cause(
                title="Educate Underprivileged Children",
                description="Provide quality education to children in need.",
                funding_goal=5000.0,
                raised_amount=0.0,
                image_url="https://example.com/education.jpg"
            ),
            Cause(
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
                user_id=1, 
                cause_id=1  
            ),
            Donation(
                amount=100.0,
                message="Happy to support this cause.",
                user_id=1,
                cause_id=2  
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

        # UserRewards
        user_rewards = [
            UserReward(
                user_id=1,
                reward_id=1
            ),
            UserReward(
                user_id=1,
                reward_id=2
            )
        ]
        db.session.add_all(user_rewards)

        db.session.commit()
        
        print("✅ Database seeded successfully.")

    except Exception as e:
        db.session.rollback()
        print(f"❌ Seeding failed: {e}")   

    

if __name__ == "__main__":
    from app import create_app
    app = create_app()
    with app.app_context():
        seed()
