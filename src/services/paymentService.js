import { stripePromise } from "../lib/stripe";

export async function startStripeCheckout({ bookingId, total }) {
  const stripe = await stripePromise;
  if (!stripe) {
    return { ok: false, message: "Stripe key not configured yet. Add VITE_STRIPE_PUBLISHABLE_KEY in .env." };
  }
  return { ok: true, message: `Stripe is configured. Next step is creating a Checkout Session for booking ${bookingId} with total ${total}.` };
}
