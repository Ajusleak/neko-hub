import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const npmCommand = process.platform === 'win32' ? process.execPath : 'npm';
const npmPrefix = process.platform === 'win32' && process.env.npm_execpath ? [process.env.npm_execpath] : [];
const workspaces = [
  path.join(root, 'packages/persistence-prisma'),
  path.join(root, 'apps/web-next'),
];
for (const cwd of workspaces) {
  const result = spawnSync(npmCommand, [...npmPrefix, 'install', '--no-audit', '--no-fund'], {
    cwd,
    stdio: 'inherit',
    env: process.env,
  });
  if (result.error) {
    console.error(`BLOCKED: npm install could not start in ${cwd}: ${result.error.message}`);
    process.exit(2);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('PASS: runtime dependencies installed for Prisma and Next.js workspaces.');
