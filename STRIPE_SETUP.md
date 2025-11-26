# Stripe Integration Setup Guide

## Overview
This guide explains how to set up Stripe for the Quick Donate feature with Apple Pay and Google Pay support.

## Stripe Nonprofit Pricing

Stripe offers discounted rates for 501(c)(3) nonprofits:

- **Visa/MasterCard:** 2.2% + $0.30 per transaction (vs standard 2.9% + $0.30)
- **American Express:** 3.5% per transaction

### How to Apply

Email **nonprofit@stripe.com** with:
1. Your organization's EIN
2. Proof of 501(c)(3) status (IRS determination letter)
3. Primary email associated with your Stripe account
4. Statement confirming that over 80% of payment volume will be tax-deductible donations

## Setup Steps

### 1. Create Stripe Account

1. Sign up at https://stripe.com
2. Complete account verification
3. Apply for nonprofit pricing (see above)

### 2. Get API Keys

1. Go to Stripe Dashboard → Developers → API keys
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`) - keep this secure!

### 3. Configure Environment Variables

Add to your `.env` file (or hosting platform environment variables):

```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_API_ENDPOINT=/api/create-payment-intent
```

For production, use `pk_live_...` and `sk_live_...` keys.

### 4. Create Backend Endpoint

You'll need a serverless function or API endpoint to create payment intents securely.

#### Option A: Netlify Functions

Create `netlify/functions/create-payment-intent.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, currency = 'usd' } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        donation_type: 'quick_donate',
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

#### Option B: Vercel Serverless Function

Create `api/create-payment-intent.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        donation_type: 'quick_donate',
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

#### Option C: Astro API Route

Create `src/pages/api/create-payment-intent.ts`:

```typescript
import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { amount, currency = 'usd' } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        donation_type: 'quick_donate',
      },
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
```

### 5. Install Stripe Package

```bash
npm install stripe
# or
npm install @stripe/stripe-js
```

### 6. Configure Webhooks (Optional)

Set up webhooks to handle payment confirmations and send receipts:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret

Create webhook handler to:
- Send donation receipts
- Update your database
- Send thank-you emails

## Testing

### Test Mode

1. Use test API keys (`pk_test_...` and `sk_test_...`)
2. Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Use any future expiry date and any 3-digit CVC

### Apple Pay Testing

- Use Safari on macOS or iOS
- Sign in with Apple ID that has a test card
- Or use Stripe's test Apple Pay

### Google Pay Testing

- Use Chrome on Android or desktop
- Add test card to Google Pay
- Or use Stripe's test Google Pay

## Transaction Fees

With nonprofit pricing:
- **$10 donation:** ~$0.52 fee (2.2% + $0.30)
- **$50 donation:** ~$1.40 fee (2.2% + $0.30)

You can:
1. Cover fees from your operating budget
2. Add optional "cover fees" checkbox
3. Slightly increase suggested amounts to account for fees

## Security Notes

- Never expose your secret key in client-side code
- Always use HTTPS in production
- Validate amounts on the server
- Use webhooks for reliable payment confirmation
- Store donor information securely (GDPR/COPPA compliant)

## Next Steps

1. Set up Stripe account and apply for nonprofit pricing
2. Create backend endpoint for payment intents
3. Configure environment variables
4. Test the flow in test mode
5. Set up webhooks for receipts
6. Deploy to production with live keys

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Nonprofit Pricing: email nonprofit@stripe.com

