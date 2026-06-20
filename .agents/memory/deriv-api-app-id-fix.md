---
name: Deriv API app_id fix for Replit
description: WebSocket never connects on Replit because production app_id is domain-restricted; fix by adding Replit to isTestLink()
---

## Problem
When running on Replit, the Deriv WebSocket API never connects. The app loads forever on "Initializing Deriv Bot account..." because `connectionStatus` never becomes `OPENED`.

## Root Cause
`isTestLink()` in `src/components/shared/utils/config/config.ts` only recognizes `localhost`, `.binary.sx`, and `bot-65f.pages.dev`. Replit domains (`.replit.dev`, `.replit.app`) fall through to production mode, which uses:
- `app_id = 65555` (production, domain-restricted to `dbot.deriv.com` only)
- server: `blue.derivws.com` or `green.derivws.com`

The Deriv API server rejects WebSocket connections from non-authorized domains with the production app_id, causing the connection to silently never open.

## Fix
Add Replit domains to `isTestLink()`:

```ts
export const isTestLink = () => {
    return (
        window.location.origin?.includes('.binary.sx') ||
        window.location.origin?.includes('bot-65f.pages.dev') ||
        window.location.origin?.includes('.replit.dev') ||   // Added
        window.location.origin?.includes('.replit.app') ||   // Added
        window.location.origin?.includes('.repl.co') ||      // Added
        isLocal()
    );
};
```

This makes Replit use:
- `app_id = 36300` (LOCALHOST/dev, accepts any domain)
- server: `ws.derivws.com`

**Why:** The Deriv trading API uses app_id to whitelist domains. Production app_ids only work on `dbot.deriv.com`. The dev app_id (36300) works from any domain.

**How to apply:** Any new Replit deployment of this app needs this fix. It's already in `config.ts` as of this session. Do NOT change isTestLink back to exclude Replit domains.
