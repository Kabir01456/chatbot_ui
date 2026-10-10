const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/i18n/translations');
const files = fs.readdirSync(dir);

for (const f of files) {
  if (!f.endsWith('.ts') || f === 'index.ts') continue;
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  
  // Replace all values with backticks
  content = content.replace(/: '([^]*?)'(,?)/g, (match, p1, p2) => {
    // Escape backticks in the string
    let cleaned = p1.replace(/`/g, "\\`");
    // Unescape single quotes since we are using backticks now
    cleaned = cleaned.replace(/\\'/g, "'");
    return ": `" + cleaned + "`" + p2;
  });
  
  fs.writeFileSync(p, content);
}
console.log('Converted all strings to use backticks');
