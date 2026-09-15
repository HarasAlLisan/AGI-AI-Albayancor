const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(ROOT, 'FILE_TRACKER_M5.json');
const SCAN_DIR = path.join(ROOT, 'src');

function scan(dir, list=[]) {
  if (!fs.existsSync(dir)) return list;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) scan(full, list);
    else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      list.push(full.replace(ROOT+'/', ''));
    }
  }
  return list;
}

const old = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST,'utf8')) : { files: [] };
const current = scan(SCAN_DIR);
const newFiles = current.filter(f => !old.files.includes(f));

console.log(`ANR: لقيت ${current.length} ملف`);
if (newFiles.length > 0) {
  console.log(`ANR: ${newFiles.length} جديد من A:`);
  newFiles.forEach(f => console.log(`+ ${f}`));
} else {
  console.log('ANR: مفيش جديد - كله متزامن مع Web4anhk');
}

const data = {
  M5_SIGNATURE: "28612030103352",
  TOWERS: "77M TOWERS MESH LIVE",
  ANHK_MAIL: "web4anhk.anhkmail.anhk",
  lastScan: new Date().toISOString(),
  total: current.length,
  files: current,
  newSinceLast: newFiles
};

fs.writeFileSync(MANIFEST, JSON.stringify(data, null, 2), 'utf8');
console.log(`-> اتكتب في FILE_TRACKER_M5.json`);
