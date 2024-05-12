import { readFileSync, writeFileSync } from 'node:fs';

const packageJsonPath = '.git-cloned/vite/packages/vite/package.json';
const packageJson = readFileSync(packageJsonPath, 'utf-8').replaceAll(/link:/g, 'file:');

writeFileSync(packageJsonPath, packageJson);
