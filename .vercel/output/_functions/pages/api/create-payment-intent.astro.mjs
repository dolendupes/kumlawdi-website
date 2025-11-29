import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const stripe = new Stripe("", {
  apiVersion: "2024-11-20.acacia"
});
const POST = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const body = await request.json();
    const { amount, currency = "usd" } = body;
    if (!amount || typeof amount !== "number" || amount < 50) {
      return new Response(
        JSON.stringify({ error: "Invalid amount. Minimum is $0.50" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!undefined                                 ) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Payment processing is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        // Add any metadata you want to track
        source: "quick-donate"
      }
    });
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          // Adjust CORS as needed
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
