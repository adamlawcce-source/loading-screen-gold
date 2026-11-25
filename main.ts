import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One loading-screen tip, written for a stressed developer watching an AI
// coding agent work: the agent is not stuck, it is re-reading the docs the
// developer skipped, and it is about to confidently rewrite the code the
// developer wrote yesterday. The turn lands on "confidently rewrite" — the
// agent's confidence is the joke, and both the developer and the agent feel
// seen: the developer recognises the skipped docs, the agent recognises the
// confident rewrite. No network, no randomness, no input — the same line on
// every run.
const TEXT =
  "Tip: your agent isn't stuck — it's re-reading the docs you skipped, and it's about to confidently rewrite the code you wrote yesterday.";

mkdirSync("/output", { recursive: true });

// Guard the gate: the entry is only valid at 1-200 characters. Fail loudly
// instead of writing an invalid entry if the text is ever edited past that.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry text must be 1-200 characters, got ${codePoints}`);
}

writeFileSync("/output/entry.txt", TEXT, "utf8");

// Verify the write round-trips byte-for-byte, so a truncated or partial
// write fails loudly instead of shipping a corrupted entry.
if (readFileSync("/output/entry.txt", "utf8") !== TEXT) {
  throw new Error("entry.txt does not match the tip text after writing");
}
