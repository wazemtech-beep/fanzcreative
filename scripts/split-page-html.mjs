import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pagesDir = path.join(root, "src", "pages");
const contentDir = path.join(root, "src", "content", "pages");

fs.mkdirSync(contentDir, { recursive: true });

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.endsWith(".jsx")) continue;

  const pageName = path.basename(file, ".jsx");
  const pagePath = path.join(pagesDir, file);
  const source = fs.readFileSync(pagePath, "utf8");
  const match = source.match(/const html = ("(?:\\.|[^"\\])*");/s);

  if (!match) continue;

  const html = JSON.parse(match[1]);
  fs.writeFileSync(path.join(contentDir, `${pageName}.html`), html);

  if (pageName === "Home") {
    const rewritten = source.replace(/const html = "(?:\\.|[^"\\])*";/s, `import html from "../content/pages/${pageName}.html?raw";`);
    fs.writeFileSync(pagePath, rewritten);
    continue;
  }

  fs.writeFileSync(
    pagePath,
    `import HtmlPage from "../components/HtmlPage.jsx";
import html from "../content/pages/${pageName}.html?raw";

export default function ${pageName}() {
  return <HtmlPage html={html} />;
}
`
  );
}
