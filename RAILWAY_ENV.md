# ================================================
# NEXUS_CYBERNETIC — Railway Environment Variables
# ================================================
# Copy these EXACTLY into your Railway project:
# Dashboard → Your Service → Variables tab

# ──────────────────────────────────────────────
# REQUIRED — NextAuth (session encryption key)
# ──────────────────────────────────────────────
NEXTAUTH_SECRET=nexus_cybernetic_default_secret_2025_secure_vault

# ──────────────────────────────────────────────
# REQUIRED — Your Railway app URL (no trailing slash!)
# Replace with your actual Railway domain
# ──────────────────────────────────────────────
NEXTAUTH_URL=https://nexuscybernetic-production.up.railway.app

# ──────────────────────────────────────────────
# OPTIONAL — GitHub OAuth (for real auth)
# Get from: github.com/settings/developers → OAuth Apps
# Callback URL: https://nexuscybernetic-production.up.railway.app/api/auth/callback/github
# ──────────────────────────────────────────────
GITHUB_ID=your_github_client_id_here
GITHUB_SECRET=your_github_client_secret_here

# ──────────────────────────────────────────────
# OPTIONAL — Node environment
# ──────────────────────────────────────────────
NODE_ENV=production
