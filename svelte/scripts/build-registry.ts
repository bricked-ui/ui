// Builds shadcn-svelte registry JSON into website/public/r-svelte/.
// Output shape matches `shadcn-svelte registry build` 1:1:
// - file contents inlined, source `path` dropped, basename `target` filled in
// - `$lib/utils` imports rewritten to the `$UTILS$` placeholder (resolved to
//   the user's utils alias at `add` time, exactly like the official registry)
// - `local:<name>` registryDependencies rewritten to `./<name>.json`
// (The official CLI can't run under Bun on this machine — node-fetch-native
// CJS/ESM clash — so this script produces identical output. With Node >= 22,
// `shadcn-svelte registry build --output ../../website/public/r-svelte`
// works directly against registry.json.)
// Run: bun scripts/build-registry.ts [outDir]  (cwd = ui/svelte)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SVELTE = resolve(HERE, "..");
const OUT = resolve(process.argv[2] ?? "../../website/public/r-svelte");

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}
interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

const stripLeadingDotSlash = (p: string) => p.replace(/^\.\//, "");
const registry = JSON.parse(readFileSync(resolve(SVELTE, "registry.json"), "utf8")) as {
  items: RegistryItem[];
};

mkdirSync(OUT, { recursive: true });

for (const item of registry.items) {
  const files = item.files.map((f) => {
    const content = readFileSync(resolve(SVELTE, stripLeadingDotSlash(f.path)), "utf8");
    return {
      // $lib/utils is host-provided (shadcn-svelte init); the CLI swaps the
      // alias for the $UTILS$ placeholder at build time.
      content: content.replaceAll("$lib/utils", "$UTILS$"),
      type: f.type,
      target: f.target ?? basename(f.path),
    };
  });
  const out: Record<string, unknown> = {
    $schema: "https://shadcn-svelte.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
  };
  if (item.dependencies?.length) out.dependencies = item.dependencies;
  const regdeps = (item.registryDependencies ?? []).map((d) =>
    d.startsWith("local:") ? `./${d.slice("local:".length)}.json` : d
  );
  if (regdeps.length) out.registryDependencies = regdeps;
  out.files = files;
  writeFileSync(resolve(OUT, `${item.name}.json`), JSON.stringify(out, null, 2) + "\n");
}

console.log(`built ${registry.items.length} items -> ${OUT}`);
