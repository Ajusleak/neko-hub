import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skipDirs = new Set(['.git','node_modules','.next','dist','coverage']);
const findings = [];
const patterns = [
  { id: 'openai-key', re: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { id: 'github-token', re: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g },
  { id: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/g },
  { id: 'postgres-inline-credential', re: /postgres(?:ql)?:\/\/[^\s:@/]+:[^\s@/]+@[^\s/'\"]+/gi },
];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) { walk(full); continue; }
    const rel = path.relative(root, full);
    if (/\.(zip|png|jpg|jpeg|gif|webp|ico|pdf)$/i.test(rel)) continue;
    let text;
    try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
    for (const p of patterns) {
      for (const m of text.matchAll(p.re)) {
        const sample = m[0];
        if (/example|placeholder|changeme|localhost|127\.0\.0\.1/i.test(sample)) continue;
        findings.push({ file: rel, pattern: p.id });
      }
    }
  }
}
walk(root);
const result = {
  gate: 'P4-S5D-security-preflight',
  passed: findings.length === 0,
  findings,
  formalSecurityReview: 'PENDING',
  note: 'Automated repository preflight only; does not constitute formal security approval.'
};
fs.mkdirSync(path.join(root, 'docs/release'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/release/P4_S5D_SECURITY_PREFLIGHT.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exit(1);
