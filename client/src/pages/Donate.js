import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Donate = ({ causeId }) => {
  const [amount, setAmount] = useState("");

  const handleDonate = async () => {
    const response = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cause_id: causeId, amount }),
    });

    const { id } = await response.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="container">
      <h2>Donate to Cause</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="form-control mb-3"
      />
      <button className="btn btn-primary" onClick={handleDonate}>
        Donate with Stripe
      </button>
    </div>
  );
};

export default Donate;
