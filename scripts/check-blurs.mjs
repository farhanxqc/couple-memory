import { blurPlaceholders } from "../lib/blur-placeholders.ts";
import { galleryItems } from "../lib/gallery.ts";

// One-off self-check for generated blur placeholders.
const names = [
  ...galleryItems.map((item) => item.src.replace("/photos/", "").replace(".jpg", "")),
  "hero",
  "story-09",
];

const missing = names.filter((name) => !blurPlaceholders[name]);
const bad = names.filter(
  (name) => blurPlaceholders[name] && !blurPlaceholders[name].startsWith("data:image/jpeg;base64,")
);

console.log(`checked ${names.length}, missing ${missing.length}, invalid ${bad.length}`);
if (missing.length) console.log("missing:", missing.join(", "));
if (bad.length) console.log("invalid:", bad.join(", "));
if (missing.length || bad.length) process.exit(1);
