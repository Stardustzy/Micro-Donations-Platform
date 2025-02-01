# Micro-Donation Platform

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
   - [User Registration and Authentication](#1-user-registration-and-authentication)
   - [Cause Management](#2-cause-management)
   - [Donation System](#3-donation-system)
   - [Rewards System](#4-rewards-system)
   - [Impact Visualization](#5-impact-visualization)
3. [Technical Features](#technical-features)
   - [Backend (Flask API)](#backend-flask-api)
   - [Frontend (React)](#frontend-react)
   - [Integration](#integration)
   - [Deployment](#deployment)
4. [Key User Stories (MVP)](#key-user-stories-mvp)
5. [Stretch Features](#stretch-features)
6. [Contribution Guidelines](#contribution-guidelines)
   - [Fork the Repository](#1-fork-the-repository)
   - [Set Up Your Development Environment](#2-set-up-your-development-environment)
   - [Create a New Branch](#3-create-a-new-branch)
   - [Make Your Changes](#4-make-your-changes)
   - [Commit and Push Your Changes](#5-commit-and-push-your-changes)
   - [Submit a Pull Request (PR)](#6-submit-a-pull-request-pr)
7. [Project Structure](#project-structure)
8. [Author](#author)

## Overview
Micro-Donation Platform is a web application that enables users to make small, impactful donations to support various causes such as education, healthcare, and environmental initiatives. The platform connects donors, causes, and rewards in an innovative way, promoting transparency, engagement, and social impact.

## Features

### 1. User Registration and Authentication
- **User Roles:**
  - **Donor:** Individuals who browse causes and make donations.
  - **Recipient:** Organizations or individuals creating causes and receiving donations.
  - **Admin:** Oversees the platform, manages causes, donations, and rewards.
- **Secure user authentication** using email and password.
- **Role-Based Access:** Different roles have tailored access to features.

### 2. Cause Management
- Causes represent initiatives requiring funding (e.g., "Save the Rainforest").
- Each cause includes:
  - A title and description.
  - A funding goal (target amount).
  - A progress tracker showing funds raised.
- Causes can be created, viewed, and updated by recipients or admins.

### 3. Donation System
- Users (donors) can donate small amounts to support a cause.
- Donations include:
  - Amount donated.
  - A message of support (optional).
  - Timestamp indicating when the donation was made.
- Donors can track their donation history and impact.
- Causes display a list of all donations, fostering transparency.

### 4. Rewards System
- Donors earn reward points for contributions.
- Points can be redeemed for tangible rewards (e.g., certificates, merchandise).
- Admins manage the rewards catalog and set redemption criteria.
- The **UserReward** system tracks redeemed rewards for each user.

### 5. Impact Visualization
- A dashboard displays:
  - Total funds raised per cause.
  - Number of donors per cause.
  - Progress bars for funding goals.
- Users see their personal impact in terms of supported causes and contributions.

## Technical Features

### Backend (Flask API)
- **Models:**
  - `User` - Manages donors, recipients, and admins.
  - `Cause` - Represents donation initiatives.
  - `Donation` - Tracks individual contributions.
  - `Reward` - Represents redeemable rewards.
  - `UserReward` - Tracks redeemed rewards per user.
- **Relationships:**
  - User ↔ Cause (Many-to-Many) via `Donation`.
  - User → Donation (One-to-Many).
  - Cause → Donation (One-to-Many).
  - User → UserReward (One-to-Many).
  - Reward → UserReward (One-to-Many).
- Full CRUD operations for causes and donations, with read-only access for rewards.

### Frontend (React)
- **Client-Side Routes:**
  - **Home Page** - Displays featured causes and donation impact.
  - **Cause Page** - Lists all causes, with filtering and search functionality.
  - **Profile Page** - Shows donation history and redeemed rewards.
- **Formik Forms:**
  - User registration and login with validation.
  - Forms for creating causes and donations.
- **Interactive Elements:**
  - Donation progress bars.
  - Reward redemption popups.
  - Dynamic updates for donation totals and user profiles.

### Integration
- The frontend communicates with the backend via `fetch()` API requests.
- Secure authentication and data management through API endpoints.

### Deployment
- The application is deployed for seamless access:
  - **Client:** [https://micro-donation-platform.vercel.app](https://micro-donation-platform.vercel.app)
  - **Server:** [https://micro-donation-platform.onrender.com](https://micro-donation-platform.onrender.com)

## Key User Stories (MVP)
1. As a user, I want to view a list of causes so that I can decide where to donate.
2. As a user, I want to donate a specific amount to a cause and see my contribution reflected.
3. As an admin, I want to create and manage causes so that users can support various initiatives.
4. As a donor, I want to track my donations and earn reward points for my contributions.

## Stretch Features
1. **Social Sharing:** Users can share causes on social media to increase awareness.
2. **Gamification:** Leaderboards and badges for top donors or most-supported causes.
3. **Multi-Currency Support:** Integration with Stripe, PayPal, and M-Pesa for flexible donations.
4. **Community Engagement:** Comments and discussions on cause pages.

## Contribution Guidelines
We welcome contributions to enhance the Micro-Donation Platform! To get started:

### 1. Fork the Repository
1. Click the "Fork" button at the top right of the repository page.
2. Clone your fork:
   ```sh
   git clone https://github.com/your-username/micro-donation-platform.git
   cd micro-donation-platform
   ```

### 2. Set Up Your Development Environment
- **Backend:** Install dependencies and run the Flask server.
  ```sh
  cd server
  pip install -r requirements.txt
  flask run
  ```
- **Frontend:** Install dependencies and start the React app.
  ```sh
  cd client
  npm install
  npm start
  ```

### 3. Create a New Branch
Always create a new branch for your contributions:
```sh
 git checkout -b feature-branch-name
```

### 4. Make Your Changes
- Implement your feature or fix.
- Ensure your code follows best practices.
- Run tests if applicable.

### 5. Commit and Push Your Changes
```sh
git add .
git commit -m "Add new feature/fix bug"
git push origin feature-branch-name
```

### 6. Submit a Pull Request (PR)
1. Go to the original repository.
2. Click on "New Pull Request."
3. Select your branch and submit the PR.
4. Wait for a review and address any feedback.

## Project Structure
```
├── LICENSE
├── README.md
├── client
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── assets
│       ├── components
│       │   ├── Footer.js
│       │   ├── NavBar.js
│       │   └── ProtectedRoute.js
│       ├── context
│       │   └── AuthContext.js
│       ├── index.js
│       ├── pages
│       │   ├── Causes.js
│       │   ├── CreateCause.js
│       │   ├── Dashboard.js
│       │   ├── Donate.js
│       │   ├── EditCause.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── NotFound.js
│       │   └── Register.js
│       ├── services
│       │   ├── CauseService.js
│       │   ├── DonationService.js
│       │   └── api.js
│       ├── styles
│       │   └── index.css
│       └── utils
└── server
    ├── Pipfile
    ├── Pipfile.lock
    ├── Procfile
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-310.pyc
    │   └── app.cpython-310.pyc
    ├── app.py
    ├── config.py
    ├── instance
    │   └── micro_donation.db
    ├── migrations
    │   ├── README
    │   ├── alembic.ini
    │   ├── env.py
    │   ├── script.py.mako
    │   └── versions
    │       └── 394326ebde2c_initial_migration.py
    ├── models.py
    ├── package-lock.json
    ├── package.json
    ├── requirements.txt
    ├── routes
    │   ├── __init__.py
    │   ├── auth_routes.py
    │   ├── cause_routes.py
    │   ├── donation_routes.py
    │   └── reward_routes.py
    ├── seed.py
    ├── services
    │   ├── __init__.py
    │   └── reward_service.py
    ├── uploads
    ├── utils
    │   ├── __init__.py
    │   └── validations.py
    └── wsgi.py
```

## Author
**Benjamin Mweri Baya**  
📧 **Email:** b3njaminbaya@gmail.com

