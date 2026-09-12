#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] || "/home/donnii/Codex");
const repositories = process.argv.slice(3);

for (const repository of repositories) {
  const path = join(root, repository, "README.md");
  let source = await readFile(path, "utf8");
  if (source.includes("docs/preview.png")) continue;
  const heading = source.match(/^# .+$/m);
  if (!heading) throw new Error(`${repository}: README has no H1 heading`);
  const block = `\n\n## Neutral mobile preview\n\n![Neutral mobile preview of ${repository}](docs/preview.png)\n\n> Rendered at 390 px mobile width with fictional Home Assistant entities and values. No private dashboard, person, address, camera, or sensor data is included.\n`;
  const at = heading.index + heading[0].length;
  source = source.slice(0, at) + block + source.slice(at);
  await writeFile(path, source);
  console.log(`updated ${repository}`);
}
