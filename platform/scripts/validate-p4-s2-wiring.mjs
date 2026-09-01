import { readFile, access } from 'node:fs/promises';

const required = [
  'packages/persistence-prisma/package.json',
  'packages/persistence-prisma/prisma/schema.prisma',
  'packages/persistence-prisma/prisma.config.ts',
  'packages/persistence-prisma/src/keyed-repository.mjs',
  'packages/persistence-prisma/src/client.ts',
  'packages/persistence-prisma/src/repositories.ts',
  'apps/web-next/package.json',
  'apps/web-next/next.config.mjs',
  'apps/web-next/app/page.js',
  'apps/web-next/app/health/live/route.js'
];
for (const file of required) await access(file);
const schema = await readFile('packages/persistence-prisma/prisma/schema.prisma', 'utf8');
for (const token of ['provider = "postgresql"', 'model LockerRecord', 'model CollectionRecord', 'model WishlistRecord', 'model AssetRecord']) {
  if (!schema.includes(token)) throw new Error(`schema missing ${token}`);
}
const nextPkg = JSON.parse(await readFile('apps/web-next/package.json', 'utf8'));
if (!nextPkg.dependencies?.next || !nextPkg.dependencies?.react || !nextPkg.scripts?.build) throw new Error('Next.js production build target incomplete');
const prismaPkg = JSON.parse(await readFile('packages/persistence-prisma/package.json', 'utf8'));
if (!prismaPkg.dependencies?.['@prisma/client'] || !prismaPkg.dependencies?.['@prisma/adapter-pg'] || !prismaPkg.devDependencies?.prisma) throw new Error('Prisma package dependencies incomplete');
console.log(`P4-S2 wiring validation PASS (${required.length} required artifacts)`);
