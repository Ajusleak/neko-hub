import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [];
const command = (name) => {
  const r = spawnSync('sh', ['-lc', `command -v ${name}`], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
};

checks.push({ id: 'node', status: command('node') ? 'PASS' : 'BLOCKED', detail: command('node') });
checks.push({ id: 'npm', status: command('npm') ? 'PASS' : 'BLOCKED', detail: command('npm') });
checks.push({ id: 'postgres_client', status: command('psql') ? 'PASS' : 'BLOCKED', detail: command('psql') ?? 'psql unavailable' });
checks.push({ id: 'container_engine', status: command('docker') || command('podman') ? 'PASS' : 'BLOCKED', detail: command('docker') || command('podman') || 'docker/podman unavailable' });
checks.push({ id: 'database_url', status: process.env.DATABASE_URL ? 'PASS' : 'BLOCKED', detail: process.env.DATABASE_URL ? 'configured' : 'DATABASE_URL not configured' });

const ping = spawnSync('npm', ['ping', '--registry=https://registry.npmjs.org', '--fetch-timeout=8000', '--fetch-retries=0'], { cwd: root, encoding: 'utf8', timeout: 12000 });
checks.push({
  id: 'npm_registry',
  status: ping.status === 0 ? 'PASS' : 'BLOCKED',
  detail: ping.status === 0 ? 'registry reachable' : (ping.stderr || ping.stdout || ping.error?.message || 'registry unavailable').trim().split('\n').slice(-4).join(' | '),
});

const summary = { recordedAt: new Date().toISOString(), checks };
fs.mkdirSync(path.join(root, '.validation'), { recursive: true });
fs.writeFileSync(path.join(root, '.validation/runtime-preflight.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
process.exit(checks.some((x) => x.status === 'BLOCKED') ? 2 : 0);
