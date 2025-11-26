# Vercel Deployment Setup

This guide will help you deploy the Kumlawdi Foundation website to Vercel with serverless API functions for Stripe payment processing.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A Stripe account with API keys

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository (`kumlawdi-website`)
3. Vercel will auto-detect Astro and configure the build settings

**Branch-Based Deployment:**
- You can deploy from any branch (not just `main`)
- Vercel automatically creates preview deployments for:
  - Pull requests (PR previews)
  - Any branch pushes (branch previews)
- To deploy a specific branch as production:
  - Go to Project Settings → Git
  - Set "Production Branch" to your desired branch (e.g., `main`, `vercel`, `production`)
- **Recommended**: Start with a feature branch (e.g., `vercel-setup`) to test before merging to production

### 2. Configure Environment Variables

In the Vercel project settings, add these environment variables:

#### Environment-Specific Variables

Vercel supports three environments:
- **Production** - Your main domain (e.g., `kumlawdifoundation.com`)
- **Preview** - Preview deployments (pull requests, branches)
- **Development** - Local development (when using `vercel dev`)

**How to set environment-specific values:**

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable and select which environments it applies to:
   - ✅ **Production** - Use live Stripe keys (`sk_live_...`, `pk_live_...`)
   - ✅ **Preview** - Use test Stripe keys (`sk_test_...`, `pk_test_...`)
   - ✅ **Development** - Use test Stripe keys (`sk_test_...`, `pk_test_...`)

**Example Setup:**

For **Production**:
- `STRIPE_SECRET_KEY` = `sk_live_...` (your live secret key)
- `PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...` (your live publishable key)

For **Preview & Development**:
- `STRIPE_SECRET_KEY` = `sk_test_...` (your test secret key)
- `PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` (your test publishable key)

#### Required Environment Variables:

**STRIPE_SECRET_KEY** (Server-side only)
- Value: Your Stripe Secret Key (starts with `sk_test_...` for testing or `sk_live_...` for production)
- Where to find: https://dashboard.stripe.com/apikeys
- **Important**: This is server-side only and will be used by the API endpoint
- **Set different values** for Production vs Preview/Development

**PUBLIC_STRIPE_PUBLISHABLE_KEY** (Client-side)
- Value: Your Stripe Publishable Key (starts with `pk_test_...` for testing or `pk_live_...` for production)
- Where to find: https://dashboard.stripe.com/apikeys
- **Important**: This is safe to expose in client-side code
- **Set different values** for Production vs Preview/Development

#### Optional Environment Variables:

**PUBLIC_API_ENDPOINT**
- Default: `/api/create-payment-intent` (automatically handled by Vercel)
- Only set this if you need to use a different endpoint URL

### 3. Deploy

1. Click "Deploy" in Vercel
2. Vercel will build and deploy your site using the Makefile:
   - **Install Command**: `make install`
   - **Build Command**: `make build`
   - **Output Directory**: `dist`
3. Your site will be available at `https://your-project.vercel.app`

### 4. Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain: `kumlawdifoundation.com`
3. Follow Vercel's DNS configuration instructions
4. Update DNS records as instructed

## Local Development

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel dev` to start local development server
3. Set up `.env` file with your keys (see `.env` file)

## API Endpoint

The payment intent API endpoint is available at:
- **Production**: `https://kumlawdifoundation.com/api/create-payment-intent`
- **Local**: `http://localhost:4321/api/create-payment-intent` (when running `vercel dev`)

## Testing

1. Test with Stripe test keys first (`pk_test_...` and `sk_test_...`)
2. Use Stripe's test card numbers: https://stripe.com/docs/testing
3. Once verified, switch to live keys for production

## Troubleshooting

### API endpoint returns 500 error
- Check that `STRIPE_SECRET_KEY` is set in Vercel environment variables
- Verify the key starts with `sk_` (not `pk_`)

### Payment button doesn't appear
- Check that `PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Ensure you're accessing the site with `?quickdonate=true` URL parameter

### CORS errors
- The API endpoint includes CORS headers, but if you see CORS errors, check that the request is coming from the same domain

## Migration from GitHub Pages

If you were previously using GitHub Pages:
1. The site will work the same way on Vercel
2. Update your DNS to point to Vercel instead of GitHub Pages
3. You can disable GitHub Pages deployment after verifying Vercel works

