---
name: Sass-embedded fix for Replit
description: sass-embedded dart binary crashes on Replit; use plain sass instead
---

## Problem
`sass-embedded` crashes with Bus error on Replit because the dart binary (`sass-embedded-linux-x64/dart-sass/dart`) is incompatible with the Replit NixOS environment.

## Fix
In `rsbuild.config.ts` (or any sass-loader config), add `implementation: require('sass')` to sassLoaderOptions:

```ts
pluginSass({
    sassLoaderOptions: {
        sourceMap: true,
        implementation: require('sass'),  // Use plain sass, not sass-embedded
    },
    exclude: /node_modules/,
}),
```

**Why:** The plain `sass` package (dart-sass compiled to JS) works fine on Replit, while `sass-embedded` uses a native dart binary that crashes.

**How to apply:** Any rsbuild/webpack project using sass-embedded on Replit should switch to plain `sass`.
