# Supabase Email Confirmation Setup

## 🔴 CRITICAL ISSUE: "Error confirming user"

This error (status 500, code: unexpected_failure) means Supabase backend is failing. Common causes:

### Fix 1: Enable Email Confirmations in Supabase

1. **Go to:** https://supabase.com/dashboard/project/abxdhtykqtsujwjykrnv/auth/providers
2. **Click on "Email" provider**
3. **Ensure "Confirm email" is ENABLED**
4. **Save changes**

### Fix 2: Configure Redirect URLs

1. **Go to:** https://supabase.com/dashboard/project/abxdhtykqtsujwjykrnv/auth/url-configuration
2. **Add these Redirect URLs:**
   ```
   http://localhost:3000/auth/confirm
   http://localhost:3000/**
   ```
3. **Verify Site URL is:**
   ```
   http://localhost:3000
   ```
4. **Save changes**

### Fix 3: Check Database Connection

1. **Go to:** https://supabase.com/dashboard/project/abxdhtykqtsujwjykrnv/settings/database
2. **Verify connection pooler is active**
3. **Check if database is online**

### Fix 4: Fresh Signup Required

If you've been testing with the same email:
1. **Delete old test users** from Supabase Dashboard → Authentication → Users
2. **Sign up with a completely NEW email**
3. **Use the NEW confirmation email**

---

## What was fixed:
1. ✅ Created `/app/auth/confirm/route.ts` - Handles email confirmation callback
2. ✅ Created `/app/auth/callback/route.ts` - Handles PKCE flow
3. ✅ Created `/app/auth/auth-code-error/page.tsx` - Error page for failed confirmations
4. ✅ Updated `app/signup/action.ts` - Added `emailRedirectTo` parameter
5. ✅ Updated middleware - Allows access to auth routes and home page
6. ✅ Created `/app/auth/debug/page.tsx` - Debug page to verify configuration

### Step 2: Configure Email Templates (Optional but Recommended)

1. Go to **Authentication** → **Email Templates**
2. Customize the "Confirm signup" template
3. The default template should work, but you can make it match your brand

### Step 3: Verify Email Settings

1. Go to **Authentication** → **Settings**
2. Ensure **"Enable email confirmations"** is checked (it should be by default)
3. Verify that **SMTP settings** are configured (Supabase provides default SMTP)

### Step 4: Test the Flow

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Sign up with a new email
3. Check your email for the confirmation link
4. Click the confirmation link
5. You should be redirected to `/dashboard`

## How it works:

1. User signs up → Supabase sends confirmation email
2. User clicks link in email → Redirects to `/auth/callback?code=xxx`
3. Callback route exchanges code for session → User is authenticated
4. User is redirected to dashboard

## Troubleshooting:

- **Still getting errors?** Check Supabase logs in the dashboard
- **Email not arriving?** Check spam folder and verify SMTP settings
- **Redirect not working?** Ensure URLs in Supabase match exactly (including http/https)
