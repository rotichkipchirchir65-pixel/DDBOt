---
name: Rspack binary fix for Replit
description: How to fix rspack binding Bus error on Replit NixOS environment
---

## Problem
`@rspack/core` crashes with Bus error (SIGBUS) on Replit when the `@rspack/binding-linux-x64-gnu` package installed by npm is version-mismatched or corrupted.

## Root Cause
- `package.json` had `@rspack/binding-linux-x64-gnu: "1.0.14"` in optionalDependencies
- `@rsbuild/core` requires `@rspack/binding@1.6.7` which needs binding version `1.6.7`
- The 1.0.14 binary crashes because it's incompatible with the 1.6.7 binding wrapper

## Fix
1. Update `package.json` optionalDependencies to `"@rspack/binding-linux-x64-gnu": "1.6.7"`
2. Download correct binary: `curl -sL https://registry.npmjs.org/@rspack/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.6.7.tgz`
3. Copy it to `node_modules/@rspack/binding-linux-x64-gnu/`
4. Set env var in npm start script: `NAPI_RS_NATIVE_LIBRARY_PATH=$(pwd)/node_modules/@rspack/binding-linux-x64-gnu/rspack.linux-x64-gnu.node rsbuild dev`

**Why:** The `@rspack/binding` wrapper uses `NAPI_RS_NATIVE_LIBRARY_PATH` env var to override native module path. Without it, it tries auto-detection which can pick the wrong binary.

**How to apply:** Always set this env var in the start script for any rsbuild/rspack project on Replit.
