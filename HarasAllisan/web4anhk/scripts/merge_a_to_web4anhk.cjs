const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const WEB_ROOT = path.resolve(__dirname, '..');
let A_ROOT = process.argv[2];

if (!A_ROOT) {
  const candidates = [
    path.resolve(WEB_ROOT, '../A'),
    path.resolve(WEB_ROOT, '../../A'),
    path.join(os.homedir(), 'A'),
    path.join(os.homedir(), 'AGI-AI-Albayancor', 'A'),
    path.resolve(WEB_ROOT, 'A'),
  ];
  A_ROOT = candidates.find(p => fs.existsSync(p) && fs.existsSync(path.join(p, 'src')));
}

if (!A_ROOT ||!fs.existsSync(A_ROOT)) {
  console.log('ANR: مش لاقي فولدر A - ابعتلي مكانه');
  console.log('شغله كده: node scripts/merge_a_to_web4anhk.cjs /path/to/A');
  process.exit(1);
}

const A_SRC = path.join(A_ROOT, 'src');
const WEB_SRC = path.join(WEB_ROOT, 'src');

function hashFile(p) {
  return crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');
}
function scan(dir, list=[]) {
  if (!fs.existsSync(dir)) return list;
  for (const e of fs.readdirSync(dir)) {
    const full = path.join(dir, e);
    if (fs.statSync(full).isDirectory()) scan(full, list);
    else list.push(full);
  }
  return list;
}

const files = scan(A_SRC);
let added=0, identical=0, updated=0, conflicts=[];
console.log(`ANR: لقيت ${files.length} ملف في A من ${A_ROOT}`);

for (const srcFile of files) {
  const rel = path.relative(A_SRC, srcFile);
  // حل مشكلة app.tsx vs App.tsx
  let relFixed = rel;
  if (rel.toLowerCase() === 'app.tsx') relFixed = 'App.tsx';

  const destFile = path.join(WEB_SRC, relFixed);
  const destDir = path.dirname(destFile);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, {recursive:true});

  if (!fs.existsSync(destFile)) {
    fs.copyFileSync(srcFile, destFile);
    added++;
    console.log(`+ ADDED ${relFixed}`);
  } else {
    if (hashFile(srcFile) === hashFile(destFile)) {
      identical++;
    } else {
      // بدون تضارب - اعمل باك اب للقديم وانسخ الجديد
      const bak = destFile + `.bak_M5_${Date.now()}`;
      fs.copyFileSync(destFile, bak);
      fs.copyFileSync(srcFile, destFile);
      updated++;
      conflicts.push({file: relFixed, backup: bak});
      console.log(`~ UPDATED ${relFixed} (القديم اتحفظ ${path.basename(bak)})`);
    }
  }
}

// امسح app.tsx الصغير لو لسه موجود
const lowerApp = path.join(WEB_SRC, 'app.tsx');
if (fs.existsSync(lowerApp) && fs.existsSync(path.join(WEB_SRC, 'App.tsx'))) {
  fs.unlinkSync(lowerApp);
  console.log('- REMOVED src/app.tsx الصغير المكرر');
}

const report = {
  M5: "28612030103352",
  A_ROOT,
  WEB_ROOT,
  time: new Date().toISOString(),
  added,
  updated,
  identical,
  conflicts,
  totalA: files.length
};

fs.writeFileSync(path.join(WEB_ROOT, 'MERGE_REPORT_M5.json'), JSON.stringify(report, null, 2));
console.log('\n=== DONE بدون تضارب ===');
console.log(`ADDED: ${added} | UPDATED: ${updated} | IDENTICAL: ${identical}`);
console.log('التقرير: MERGE_REPORT_M5.json');
