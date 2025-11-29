import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment variable
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

export const POST: APIRoute = async ({ request }) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse request body
    const body = await request.json();
    const { amount, currency = 'usd' } = body;

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount < 50) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount. Minimum is $0.50' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if Stripe secret key is configured
    if (!import.meta.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Payment processing is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Add any metadata you want to track
        source: 'quick-donate',
      },
    });

    // Return client secret
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Adjust CORS as needed
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        } 
      }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

