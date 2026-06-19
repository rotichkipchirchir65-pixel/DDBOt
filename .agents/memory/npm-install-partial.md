---
name: npm install partial package fix on Replit
description: Fix incomplete npm installs where packages exist as empty dirs without package.json
---

## Problem
On Replit, npm install sometimes leaves packages as empty or partial directories (no `package.json`) causing build failures. This happens because:
- npm ENOTEMPTY errors when trying to rename directories
- Hidden temp dirs like `node_modules/.package-name-XXXXXXXX` block subsequent installs
- Platform-specific optional dependencies (sass-embedded-*, rspack binding) get corrupted

## Detection
```js
// Find broken packages (dirs without package.json):
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const pkgs = Object.keys(lock.packages).filter(k => k.startsWith('node_modules/') && !k.includes('/node_modules/', 13));
for (const pkg of pkgs) {
  const dir = '/home/runner/workspace/' + pkg;
  if (fs.existsSync(dir) && !fs.existsSync(dir + '/package.json')) console.log(pkg);
}
```

## Fix
1. Clean temp dirs: `find node_modules -maxdepth 3 -name '.*-????????' -type d | xargs rm -rf`
2. Remove broken package dirs
3. Download tarballs manually: `curl -sL https://registry.npmjs.org/<pkg>/-/<pkg>-<ver>.tgz | tar xz -C /tmp/fix/ && cp -r /tmp/fix/package/* node_modules/<pkg>/`

**Why:** npm's rename strategy fails when dirs have content from previous partial installs. Manual tarball extraction bypasses this.
