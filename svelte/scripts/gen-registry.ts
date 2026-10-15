// Generates ui/svelte/registry.json (shadcn-svelte schema) from:
// - React ui/registry.json (titles/descriptions/grouping = single source of truth)
// - files actually present in ui/svelte/src/lib/components (kebab-case)
// - real cross-imports scanned from file contents (registryDependencies)
// Run: bun scripts/gen-registry.ts  (cwd = ui/svelte)
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url)); // ui/svelte/scripts
const SVELTE = resolve(HERE, "..");
const UI = resolve(SVELTE, "..");
const COMP = resolve(SVELTE, "src", "lib", "components");

const react = JSON.parse(readFileSync(resolve(UI, "registry.json"), "utf8"));
const have = new Set(readdirSync(COMP));

interface ReactFile {
  path: string;
}
interface ReactItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: ReactFile[];
}

// react item file base (button.tsx) -> svelte kebab filename, if present
const svelteFileFor = (reactPath: string): string | null => {
  const base = reactPath.split("/").pop()!.replace(/\.tsx$/, ".svelte");
  return have.has(base) ? base : null;
};

// scan a component file for same-dir sibling imports -> registry dep names
const depNameForFile = (f: string): string | null => {
  if (f === "pixel-icon.svelte") return "pixel-icon";
  if (f === "button.svelte" || f === "icon-button.svelte") return "button";
  if (f === "badge.svelte") return "badge";
  return null;
};

const items: Array<Record<string, unknown>> = [];

// React item name -> svelte filenames when they differ (stat-card.tsx -> stat.svelte)
const ALIAS: Record<string, string[]> = {
  "stat-card": ["stat.svelte"],
};

for (const it of react.items as ReactItem[]) {
  if (it.type === "registry:lib") continue; // handled below (bricked-css only)
  const files: string[] = [...(ALIAS[it.name] ?? [])].filter((f) => have.has(f));
  for (const f of it.files) {
    const s = svelteFileFor(f.path);
    if (s && !files.includes(s)) files.push(s);
  }
  if (files.length === 0) continue; // no Svelte port yet -> skip
  // pixel-icon also ships its icons grid (same install dir, ./icons.js works)
  if (it.name === "pixel-icon") files.push("icons.ts");

  const regdeps = new Set<string>();
  for (const f of files) {
    if (f === "icons.ts") continue;
    const src = readFileSync(resolve(COMP, f), "utf8");
    for (const m of src.matchAll(/from "\.\/(pixel-icon|button|badge)\.svelte"/g)) {
      if (m[1] + ".svelte" !== f) regdeps.add(`local:${m[1]}`);
    }
  }

  items.push({
    name: it.name,
    type: "registry:ui",
    title: it.title,
    description: it.description,
    dependencies: [],
    registryDependencies: [...regdeps].sort(),
    // No explicit target: the CLI installs ui files into the project's ui
    // alias dir ($lib/components/ui). Same-dir relative imports
    // (./pixel-icon.svelte, ./icons.js) keep working after install.
    files: files.map((f) => ({
      path: `./src/lib/components/${f}`,
      type: "registry:ui",
    })),
  });
}

// styles: plain bk-* stylesheet (no Tailwind needed by these components)
items.push({
  name: "bricked-css",
  type: "registry:lib",
  title: "Bricked CSS",
  description:
    "Full bk-* pixel-brick stylesheet with light/dark theme. Import it in your app.css or layout.",
  dependencies: [],
  registryDependencies: [],
  // No explicit target: installs into the project's lib alias dir ($lib).
  files: [
    {
      path: "./src/lib/bricked.css",
      type: "registry:lib",
    },
  ],
});

const out = {
  $schema: "https://shadcn-svelte.com/schema/registry.json",
  name: "bricked-svelte",
  homepage: "https://bricked-ui.vercel.app",
  items,
};

for (const f of ["./src/lib/components/pixel-icon.svelte", "./src/lib/bricked.css"]) {
  if (!existsSync(resolve(SVELTE, f))) throw new Error(`missing source file ${f}`);
}

writeFileSync(resolve(SVELTE, "registry.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`wrote registry.json with ${items.length} items`);
for (const i of items) {
  const files = (i.files as Array<{ path: string }>).map((f) => f.path.split("/").pop()).join(",");
  const deps = ((i.registryDependencies as string[]) ?? []).join(",") || "-";
  console.log(`- ${i.name} [${files}] regdeps=${deps}`);
}
