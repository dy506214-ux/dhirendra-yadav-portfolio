const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'sections');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (!file.endsWith('.tsx')) continue;
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  // Replace <h1 ...>...</h1>
  if (/<h1/.test(content) || /<h2/.test(content)) {
      if (!content.includes('AnimatedHeading')) {
        const importStatement = `import { AnimatedHeading } from "@/components/ui/AnimatedHeading";\n`;
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
          const endOfLastImport = content.indexOf('\n', lastImportIndex);
          content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
        } else {
          content = importStatement + content;
        }
      }

      content = content.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/g, (match, attrs, inner) => {
        changed = true;
        return `<AnimatedHeading as="h1"${attrs}>${inner}</AnimatedHeading>`;
      });

      content = content.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (match, attrs, inner) => {
        changed = true;
        return `<AnimatedHeading as="h2"${attrs}>${inner}</AnimatedHeading>`;
      });
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
