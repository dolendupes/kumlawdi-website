# GitHub Secrets Setup Guide

## Overview
This guide explains how to securely store Stripe API keys and other secrets in GitHub Actions without committing them to your repository.

## Important Security Notes

### What Goes Where

**✅ Safe for Client-Side (GitHub Secrets → Build):**
- `PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (starts with `pk_`)
  - This is **safe** to include in your built JavaScript
  - Stripe is designed for this - publishable keys are meant to be public
  - It's only used to initialize Stripe.js on the client

**🔒 Server-Side Only (GitHub Secrets, never in build):**
- `STRIPE_SECRET_KEY` - Stripe secret key (starts with `sk_`)
  - **NEVER** expose this in client-side code
  - Only use in serverless functions/API endpoints
  - Not needed for static site builds

**✅ Safe for Client-Side:**
- `PUBLIC_API_ENDPOINT` - Your API endpoint URL
  - Safe to include in build (it's just a URL)

## Setting Up GitHub Secrets

### Step 1: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each secret:

#### Required Secrets:

**`STRIPE_PUBLISHABLE_KEY`**
- Value: Your Stripe publishable key (e.g., `pk_live_...` for production)
- Description: Stripe publishable key for client-side payment processing
- Used in: Build step as `PUBLIC_STRIPE_PUBLISHABLE_KEY`

**`API_ENDPOINT`** (if you have a backend API)
- Value: Your API endpoint URL (e.g., `https://api.yourdomain.com/create-payment-intent`)
- Description: Backend API endpoint for creating payment intents
- Used in: Build step as `PUBLIC_API_ENDPOINT`

**`STRIPE_SECRET_KEY`** (only if you have serverless functions)
- Value: Your Stripe secret key (e.g., `sk_live_...` for production)
- Description: Stripe secret key for server-side payment processing
- Used in: Serverless function environment (Netlify, Vercel, etc.)
- ⚠️ **Never** used in GitHub Actions build (only in serverless runtime)

### Step 2: Verify Secrets Are Set

After adding secrets, they will appear in the repository settings (values are hidden). You can verify they're being used by checking the Actions logs (values won't be shown, but you'll see they're being referenced).

## Environment Variables in GitHub Actions

The workflow file (`.github/workflows/deploy.yml`) is already configured to use secrets:

```yaml
env:
  PUBLIC_STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
  PUBLIC_API_ENDPOINT: ${{ secrets.API_ENDPOINT }}
```

These environment variables are:
- Available during the build step
- Injected into the Astro build process
- Accessible via `import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY` in your code

## Local Development

For local development, create a `.env` file (already in `.gitignore`):

```env
# .env (never commit this file!)
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
PUBLIC_API_ENDPOINT=http://localhost:4321/api/create-payment-intent
```

Use test keys for local development. The `.env` file is already in `.gitignore` so it won't be committed.

## Production vs Development

### Development/Testing
- Use Stripe **test** keys (`pk_test_...` and `sk_test_...`)
- Set in local `.env` file
- Test mode in Stripe Dashboard

### Production
- Use Stripe **live** keys (`pk_live_...` and `sk_live_...`)
- Set in GitHub Secrets
- Only deploy to production when ready

## Security Best Practices

1. **Never commit secrets:**
   - ✅ `.env` is in `.gitignore`
   - ✅ Secrets stored in GitHub Secrets (not in code)
   - ✅ Only publishable key in build (safe by design)

2. **Rotate keys if exposed:**
   - If a secret key is ever exposed, rotate it immediately in Stripe Dashboard
   - Update GitHub Secrets with new key

3. **Use different keys for test/production:**
   - Test keys for development
   - Live keys only in production GitHub Secrets

4. **Limit access:**
   - Only repository admins should have access to GitHub Secrets
   - Review who has access regularly

5. **Monitor usage:**
   - Check Stripe Dashboard for unexpected charges
   - Set up webhook alerts for failed payments

## Verifying Setup

### Check Build Logs

1. Go to **Actions** tab in GitHub
2. Click on a workflow run
3. Expand the "Build website" step
4. You should see the build completing successfully
5. Secrets are **not** shown in logs (they're masked)

### Test the Build

1. Push to `main` branch
2. Check Actions tab for successful build
3. Verify the deployed site has Stripe working
4. Test with Stripe test mode first

## Troubleshooting

### "Stripe publishable key not configured"
- Check that `STRIPE_PUBLISHABLE_KEY` secret is set in GitHub
- Verify the secret name matches exactly (case-sensitive)
- Check build logs for any errors

### Build works but Stripe doesn't load
- Verify the publishable key is correct (starts with `pk_`)
- Check browser console for errors
- Ensure you're using the right key (test vs live)

### API endpoint not working
- Verify `API_ENDPOINT` secret is set
- Check that your API endpoint is accessible
- Verify CORS is configured correctly

## Next Steps

1. ✅ Add secrets to GitHub repository
2. ✅ Verify `.gitignore` includes `.env`
3. ✅ Test build locally with `.env` file
4. ✅ Push to main and verify GitHub Actions build succeeds
5. ✅ Test Stripe integration on deployed site (use test mode first)

## Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)

