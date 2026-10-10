const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/i18n/translations');
const files = fs.readdirSync(dir);

for (const f of files) {
  if (!f.endsWith('.ts') || f === 'index.ts') continue;
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  
  content = content.replace(/(greeting(?:WithName|Default)):\s*'([^]*?)',/g, (match, p1, p2) => {
    let cleaned = p2.replace(/\\'/g, "'");
    cleaned = cleaned.replace(/'/g, "\\'");
    cleaned = cleaned.replace(/\r?\n/g, "\\n");
    return p1 + ": '" + cleaned + "',";
  });
  
  fs.writeFileSync(p, content);
}
console.log('Fixed multiline strings');
