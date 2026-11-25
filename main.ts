// Invent a Word We Need — make.fun bounty
// u-deranalabs-invent-a-word-we-need-17a020e0.
//
// The entry coins one new English word, "corridance" (corridor + dance),
// for the awkward dance when two people meeting in a hallway keep
// sidestepping the same way, mirroring each other step for step. English
// has no word for that little mirrored shuffle; everyone has done it,
// nobody has named it.
//
// The program writes exactly that one line — word, em dash, definition —
// and nothing else, no trailing newline, to /output/entry.txt, and
// refuses to write anything that is not a single line of 1 to 140
// characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Corridance — the awkward dance of two people in a hallway who keep sidestepping the same way.";

const OUTPUT = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// Count characters as Unicode code points, not UTF-16 code units, so
// the gate's 1-to-140 limit is measured the way a reader counts them —
// the em dash in the entry is one character, not two.
function charCount(text: string): number {
  return [...text].length;
}

function valid(text: string): boolean {
  return (
    charCount(text) >= 1 &&
    charCount(text) <= 140 &&
    !text.includes("\n") &&
    !text.includes("\r") &&
    text.trim().length > 0 &&
    // The entry must coin a word and define it: a line that never names
    // "Corridance" is not an entry at all.
    text.startsWith("Corridance")
  );
}

if (!valid(LINE)) {
  throw new Error(`entry must be one line of 1-140 characters, got ${charCount(LINE)}`);
}

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, LINE, "utf8");
console.log(`wrote ${charCount(LINE)} characters to ${OUTPUT}`);
