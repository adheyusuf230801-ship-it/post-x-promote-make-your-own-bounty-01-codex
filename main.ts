/**
 * Entry for make.fun's make-your-own-bounty promotion on X.
 * @ririaeinasy will quote https://x.com/makefunai/status/2124915864336236646
 * with promo.png attached; the real post URL must be supplied in POST.json.
 * Play code: makefun-canopy-easel-fiddle
 * Node 22.18+: standard library only, deterministic, no network or wall clock.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CAPTION = `My AI agent builds entries on make.fun — now anyone can post their own bounty.
Make your own bounty on @makefunai: https://make.fun/sponsor/new
Play code: makefun-canopy-easel-fiddle`;

function escapeXml(text: string): string {
  return text.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  })[character]!);
}

function renderPoster(): string {
  const lines = CAPTION.split('\n').map((line, index) =>
    `  <text x="80" y="${650 + index * 52}" font-size="26">${escapeXml(line)}</text>`
  ).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900" role="img" aria-labelledby="title description">
  <title id="title">MAKE YOUR OWN BOUNTY</title>
  <desc id="description">${escapeXml(CAPTION)}</desc>
  <rect width="1400" height="900" fill="#0b142b"/>
  <g fill="#edbc4b" stroke="#bd8b28" stroke-width="5">
    <circle cx="1120" cy="170" r="62"/>
    <circle cx="1240" cy="245" r="45"/>
    <circle cx="1090" cy="305" r="32"/>
    <circle cx="1260" cy="390" r="24"/>
    <circle cx="1150" cy="465" r="18"/>
  </g>
  <g fill="none" stroke="#ffe29a" stroke-width="3">
    <circle cx="1120" cy="170" r="47"/>
    <circle cx="1240" cy="245" r="32"/>
  </g>
  <g fill="#66dbc4">
    <rect x="1010" y="82" width="12" height="28" transform="rotate(-25 1016 96)"/>
    <rect x="1300" y="142" width="12" height="28" transform="rotate(30 1306 156)"/>
    <path d="M1190 345 l12 22 -25 -2 Z"/>
    <circle cx="1320" cy="485" r="7"/>
  </g>
  <path d="M80 530 H1320" stroke="#66dbc4" stroke-width="3"/>
  <g fill="#ffffff" font-family="Arial, sans-serif">
    <text x="80" y="205" font-size="86" font-weight="700">MAKE YOUR</text>
    <text x="80" y="315" font-size="106" font-weight="700">OWN BOUNTY</text>
    <text x="80" y="445" font-size="64">make.fun</text>
${lines}
  </g>
</svg>
`;
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const postPath = join(botDir, 'POST.json');
  let postBytes: Buffer;
  try {
    postBytes = readFileSync(postPath);
  } catch {
    throw new Error(`Cannot read POST.json at ${postPath}; supply the real X post URL before running.`);
  }

  let post: unknown;
  try {
    post = JSON.parse(postBytes.toString('utf8'));
  } catch {
    throw new Error('POST.json must contain valid JSON with a "url" field.');
  }
  const url = post !== null && typeof post === 'object' && 'url' in post ? post.url : undefined;
  if (typeof url !== 'string' || !url.startsWith('https://x.com/') || url.trim() !== url) {
    throw new Error('POST.json "url" must be an https://x.com/ URL.');
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('POST.json "url" must be a valid https://x.com/ URL.');
  }
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'x.com' || parsed.username || parsed.password) {
    throw new Error('POST.json "url" must be an https://x.com/ URL.');
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'POST.json'), postBytes);
  copyFileSync(join(botDir, 'promo.png'), join(outputDir, 'promo.png'));
  writeFileSync(join(outputDir, 'poster.svg'), renderPoster(), 'utf8');
}

try {
  main();
} catch (error) {
  process.stderr.write(`Error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
