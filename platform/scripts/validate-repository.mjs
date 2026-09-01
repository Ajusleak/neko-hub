import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const required = [
  'README.md', 'AGENTS.md', '00_ENGINEERING_INDEX.md',
  'apps/web', 'apps/android', 'apps/discord',
  'services/identity', 'services/users', 'services/fortnite', 'services/locker',
  'services/collections', 'services/wishlist', 'services/search', 'services/notifications',
  'services/ai', 'services/assets', 'services/analytics', 'services/admin',
  'packages/api-contracts', 'packages/api-client', 'packages/domain-types',
  'packages/validation', 'packages/config', 'packages/observability', 'packages/testing', 'packages/ui',
  'infra', 'tests', 'scripts', 'docs'
];

const errors = [];
for (const rel of required) {
  if (!existsSync(path.join(root, rel))) errors.push(`missing required path: ${rel}`);
}

const packageDirs = [];
for (const parent of ['apps', 'services', 'packages']) {
  for (const entry of await readdir(path.join(root, parent), { withFileTypes: true })) {
    if (entry.isDirectory()) packageDirs.push(path.join(root, parent, entry.name));
  }
}

const names = new Map();
for (const dir of packageDirs) {
  const pkgPath = path.join(dir, 'package.json');
  if (!existsSync(pkgPath)) {
    errors.push(`missing package.json: ${path.relative(root, dir)}`);
    continue;
  }
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  if (!pkg.name) errors.push(`package without name: ${path.relative(root, dir)}`);
  if (names.has(pkg.name)) errors.push(`duplicate package name: ${pkg.name}`);
  names.set(pkg.name, dir);
}

// Services cannot reach into another service's private source tree.
for (const dir of packageDirs.filter((d) => d.includes(`${path.sep}services${path.sep}`))) {
  const src = path.join(dir, 'src');
  if (!existsSync(src)) continue;
  for (const file of await readdir(src)) {
    if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;
    const text = await readFile(path.join(src, file), 'utf8');
    if (/from\s+["'][^"']*services\//.test(text)) {
      errors.push(`cross-service private import: ${path.relative(root, path.join(src, file))}`);
    }
  }
}

if (errors.length) {
  console.error('NEIKOS repository validation FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`NEIKOS repository validation PASSED (${required.length} required paths, ${packageDirs.length} workspace packages).`);
