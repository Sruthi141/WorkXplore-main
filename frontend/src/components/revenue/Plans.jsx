import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PlanCard from "./PlanCard";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BACKEND_BASE = USER_API_END_POINT.replace("/api/v1/users", "");

const Plans = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { title: "Basic", description: "Boost your visibility and unlock smart filters.", price: 499, key: "basic" },
    { title: "Pro", description: "Advanced analytics and higher posting limits.", price: 999, key: "pro" },
    { title: "Enterprise", description: "For hiring teams with serious volume.", price: 1999, key: "enterprise" },
  ];

  const createPaymentIntent = async (amountInRupees) => {
    const response = await fetch(`${BACKEND_BASE}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount: amountInRupees }),
    });

    const json = await response.json();
    if (!response.ok || !json?.success) {
      throw new Error(json?.message || "Unable to create payment intent");
    }

    const clientSecret = json?.data?.clientSecret;

    // ✅ must be pi_..._secret_...
    if (!clientSecret || !clientSecret.includes("_secret_")) {
      console.log("❌ Invalid clientSecret from backend:", clientSecret, json);
      throw new Error("Invalid Stripe client secret returned from server");
    }

    return clientSecret;
  };

  const confirmSubscription = async (clientSecret, planKey) => {
    const res = await fetch(`${BACKEND_BASE}/api/v1/payment/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ clientSecret, plan: planKey }),
    });

    const json = await res.json();
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || "Unable to confirm subscription");
    }
    return json;
  };

  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan first");
      return;
    }
    if (!stripe || !elements) {
      toast.error("Stripe is not ready. Please refresh and try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card input not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const clientSecret = await createPaymentIntent(selectedPlan.price);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result?.error) {
        toast.error(result.error.message || "Payment failed");
        return;
      }

      if (result?.paymentIntent?.status === "succeeded") {
        await confirmSubscription(clientSecret, selectedPlan.key);
        toast.success("Payment successful! Premium unlocked.");
        navigate("/premium/success");
        return;
      }

      toast.error("Payment not completed. Please try again.");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="glass-card dark:glass-card-dark p-6 rounded-2xl mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-sm text-muted-foreground">
            Upgrade to unlock premium recruiter tools, deeper insights, and priority placement.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((p) => {
            const isSelected = selectedPlan?.key === p.key;
            return (
              <div key={p.key} className={isSelected ? "ring-4 ring-indigo-500 rounded-2xl" : ""}>
                <PlanCard
                  title={p.title}
                  description={p.description}
                  price={String(p.price)}
                  className={
                    p.key === "pro"
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-xl rounded-2xl"
                      : "bg-gradient-to-r from-slate-600 to-slate-500 shadow-lg rounded-2xl"
                  }
                  onCheckoutClick={() => setSelectedPlan(p)}
                />
              </div>
            );
          })}
        </div>

        <div className="mx-auto max-w-md glass-card dark:glass-card-dark p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">Payment details</h2>
            <span className="text-xs rounded-full px-2 py-0.5 bg-indigo-50 text-indigo-700">Stripe</span>
          </div>

          <p className="text-xs text-muted-foreground mb-4">
            Test card: 4242 4242 4242 4242 • Any future expiry • Any CVC • Any ZIP
          </p>

          <CardElement className="mb-4 p-3 rounded-md bg-white/90 text-slate-900" />

          {selectedPlan && (
            <p className="text-xs text-muted-foreground mb-3">
              Selected: <span className="font-semibold">{selectedPlan.title}</span> — ₹{selectedPlan.price}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || !selectedPlan}
            className="w-full py-3 px-6 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : selectedPlan ? `Pay ₹${selectedPlan.price}` : "Select a plan to continue"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;