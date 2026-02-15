import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('out/tracker', { recursive: true });

// Keep a tiny marker file for hosting pipelines.
await copyFile('README.md', 'out/tracker/README.txt');
console.log('Static export available in ./out');
