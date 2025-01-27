from server.app import db
from server.models import User, Reward, UserReward

class RewardService:
    @staticmethod
    def get_all_rewards():
        """
        Retrieve all available rewards.
        """
        return Reward.query.all()

    @staticmethod
    def redeem_reward(user_id, reward_id):
        """
        Redeem a reward for a user if they have enough points.

        :param user_id: ID of the user redeeming the reward
        :param reward_id: ID of the reward to be redeemed
        :return: Success message or error message
        """
        user = User.query.get(user_id)
        reward = Reward.query.get(reward_id)

        if not user:
            return {"error": "User not found."}, 404
        if not reward:
            return {"error": "Reward not found."}, 404

        if user.points < reward.points_required:
            return {"error": "Insufficient points to redeem this reward."}, 400

        # Deduct points and add UserReward record
        user.points -= reward.points_required
        user_reward = UserReward(user_id=user_id, reward_id=reward_id)
        db.session.add(user_reward)
        db.session.commit()

        return {"message": f"Reward '{reward.name}' successfully redeemed."}, 200

    @staticmethod
    def get_user_rewards(user_id):
        """
        Retrieve all rewards redeemed by a user.

        :param user_id: ID of the user
        :return: List of redeemed rewards
        """
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found."}, 404

        return UserReward.query.filter_by(user_id=user_id).all()

