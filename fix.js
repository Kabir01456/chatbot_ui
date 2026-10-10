const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/i18n/translations');
const files = fs.readdirSync(dir);
for (const f of files) {
  if (!f.endsWith('.ts') || f === 'index.ts') continue;
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/greetingWithName:\s*'([^]*?)',/g, (match, p1) => {
    return 'greetingWithName: `' + p1.replace(/`/g, '\\`') + '`,';
  });
  content = content.replace(/greetingDefault:\s*'([^]*?)',/g, (match, p1) => {
    return 'greetingDefault: `' + p1.replace(/`/g, '\\`') + '`,';
  });
  fs.writeFileSync(p, content);
}
console.log('Fixed multiline strings');
