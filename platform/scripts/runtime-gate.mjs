import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const npmCommand = process.platform === 'win32' ? process.execPath : 'npm';
const npmPrefix = process.platform === 'win32' && process.env.npm_execpath ? [process.env.npm_execpath] : [];
const npmArgs = (...args) => [...npmPrefix, ...args];
const results = [];
function run(id, command, args, { cwd = root, requiredEnv, env = process.env } = {}) {
  if (requiredEnv && !env[requiredEnv]) {
    results.push({ id, status: 'BLOCKED', reason: `${requiredEnv}_NOT_CONFIGURED` });
    return false;
  }
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', env, timeout: 120000 });
  if (result.error) {
    results.push({ id, status: 'BLOCKED', reason: result.error.code ?? result.error.message });
    return false;
  }
  if (result.status !== 0) {
    results.push({ id, status: 'FAIL', exitCode: result.status, stdout: result.stdout?.trim(), stderr: result.stderr?.trim() });
    return false;
  }
  results.push({ id, status: 'PASS', stdout: result.stdout?.trim() });
  return true;
}

const prismaDir = path.join(root, 'packages/persistence-prisma');
const nextDir = path.join(root, 'apps/web-next');
const prismaInstalled = fs.existsSync(path.join(prismaDir, 'node_modules/prisma'));
const nextInstalled = fs.existsSync(path.join(nextDir, 'node_modules/next'));
results.push({ id: 'prisma_dependencies', status: prismaInstalled ? 'PASS' : 'BLOCKED', reason: prismaInstalled ? undefined : 'DEPENDENCIES_NOT_INSTALLED' });
results.push({ id: 'next_dependencies', status: nextInstalled ? 'PASS' : 'BLOCKED', reason: nextInstalled ? undefined : 'DEPENDENCIES_NOT_INSTALLED' });

if (prismaInstalled) {
  // Prisma schema validation and client generation do not connect to PostgreSQL.
  // A loopback-only placeholder satisfies Prisma config without claiming database readiness.
  const schemaEnv = { ...process.env, DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://placeholder:placeholder@127.0.0.1:5432/neikos' };
  const valid = run('prisma_validate', npmCommand, npmArgs('run', 'prisma:validate'), { cwd: prismaDir, env: schemaEnv });
  if (valid) run('prisma_generate', npmCommand, npmArgs('run', 'prisma:generate'), { cwd: prismaDir, env: schemaEnv });
} else {
  results.push({ id: 'prisma_validate', status: 'BLOCKED', reason: 'PRISMA_CLI_UNAVAILABLE' });
  results.push({ id: 'prisma_generate', status: 'BLOCKED', reason: 'PRISMA_CLI_UNAVAILABLE' });
}

if (prismaInstalled && process.env.DATABASE_URL) {
  run('prisma_migrate_deploy', npmCommand, npmArgs('run', 'prisma:migrate:deploy'), { cwd: prismaDir, requiredEnv: 'DATABASE_URL' });
  run('postgres_e2e', 'node', ['scripts/postgres-e2e.mjs'], { requiredEnv: 'DATABASE_URL' });
} else {
  results.push({ id: 'prisma_migrate_deploy', status: 'BLOCKED', reason: process.env.DATABASE_URL ? 'PRISMA_CLI_UNAVAILABLE' : 'DATABASE_URL_NOT_CONFIGURED' });
  results.push({ id: 'postgres_e2e', status: 'BLOCKED', reason: process.env.DATABASE_URL ? 'PRISMA_RUNTIME_UNAVAILABLE' : 'DATABASE_URL_NOT_CONFIGURED' });
}

if (nextInstalled) run('next_production_build', npmCommand, npmArgs('run', 'build'), { cwd: nextDir });
else results.push({ id: 'next_production_build', status: 'BLOCKED', reason: 'NEXT_CLI_UNAVAILABLE' });

const summary = { recordedAt: new Date().toISOString(), results };
fs.mkdirSync(path.join(root, '.validation'), { recursive: true });
fs.writeFileSync(path.join(root, '.validation/p4-s3-runtime-gate.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
const failed = results.some((entry) => entry.status === 'FAIL');
process.exit(failed ? 1 : 0);
