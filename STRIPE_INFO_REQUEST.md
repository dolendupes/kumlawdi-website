# What I Need from Stripe - Simple Instructions

Hi! I need you to get me some information from our Stripe account so I can set up online donations on our website. Here's exactly what I need and where to find it.

## Step 1: Log into Stripe

1. Go to https://dashboard.stripe.com
2. Log in with your Stripe account credentials

## Step 2: Get the API Keys

These are like passwords that let our website talk to Stripe securely.

### Where to Find Them:

1. Once you're logged into Stripe, look at the left sidebar menu
2. Click on **"Developers"** (it has a code icon)
3. Click on **"API keys"** (should be right there or under Developers)

### What to Copy:

You'll see two keys - I need **both** of them:

**1. Publishable key** (starts with `pk_`)
   - This one is safe to share - it's meant to be public
   - It will look something like: `pk_live_51ABC123...` or `pk_test_51ABC123...`
   - Copy the entire thing (it's long, that's okay)

**2. Secret key** (starts with `sk_`)
   - This one is PRIVATE - don't share it publicly
   - It will look something like: `sk_live_51ABC123...` or `sk_test_51ABC123...`
   - Click the "Reveal" or "Show" button if you can't see it
   - Copy the entire thing

### Important Notes:

- If you see **"Test mode"** toggle at the top, make sure you're in the mode you want:
  - **Test mode** = for testing (keys start with `pk_test_` and `sk_test_`)
  - **Live mode** = for real donations (keys start with `pk_live_` and `sk_live_`)
- For now, **test mode keys are fine** - we can switch to live keys later

## Step 3: Send Me the Keys

Please send me:
1. The **Publishable key** (pk_...)
2. The **Secret key** (sk_...)
3. Whether they're **test** or **live** keys

You can send them via email or secure message. The secret key is sensitive, so if you're worried about security, you can send them separately or use a secure method.

## Optional: Nonprofit Discount

If we haven't already applied for Stripe's nonprofit discount (which reduces our fees), I can help with that later. For now, I just need the API keys to get things set up.

## Questions?

If you can't find something or get stuck, just let me know what you're seeing and I can help guide you!

---

**TL;DR - Quick Summary:**
- Go to Stripe Dashboard → Developers → API keys
- Copy the "Publishable key" (pk_...)
- Copy the "Secret key" (sk_...)
- Send both to me
- That's it!

