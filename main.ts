// The joke about the demo — make.fun entry.
// Writes one one-line joke about working beside AI coding agents
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Deterministic, no network, no input.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Output directory comes from the environment so the kit can point
// the entry at its own output dir; defaults to /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const JOKE =
  "I asked my coding agent to make the demo crash-proof; it deleted the demo.";

// Validate: UTF-8 text of 1 to 280 characters (Unicode code points),
// not only white space, and a single line.
const codePoints = [...JOKE];
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only white space");
}
if (codePoints.length < 1 || codePoints.length > 280) {
  throw new Error(
    `joke must be 1-280 characters, got ${codePoints.length}`,
  );
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
console.log(
  `wrote ${codePoints.length} characters to ${join(outputDir, "entry.txt")}`,
);
