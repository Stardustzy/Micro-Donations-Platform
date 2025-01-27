# server/app/seed.py
from app import create_app, db
from app.models import User, Cause

app = create_app()
app.app_context().push()

db.drop_all()
db.create_all()

# Seed users
user1 = User(name="John Doe", email="john@example.com", password="password", role="donor")
user2 = User(name="Jane Smith", email="jane@example.com", password="password", role="recipient")
db.session.add_all([user1, user2])

# Seed causes
cause1 = Cause(title="Save the Rainforest", description="Support rainforest preservation efforts.", funding_goal=5000)
cause2 = Cause(title="Educate Underprivileged Children", description="Provide scholarships to children in need.", funding_goal=10000)
db.session.add_all([cause1, cause2])

db.session.commit()
print("Database seeded successfully!")
