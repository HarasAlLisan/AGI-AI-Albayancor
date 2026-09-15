import fs from 'fs'
import path from 'path'

const files = [
  'src/components/HarisAllisanModal.tsx',
]

for (const file of files) {
  const full = path.resolve(file)
  if (!fs.existsSync(full)) continue
  let s = fs.readFileSync(full, 'utf-8')
  const before = s
  
  // شيل اي await بره async - سطر 178 تحديدا
  s = s.replace(/textAr:\s*\(\s*await\s+jasadWahid\(.*?\)\)\.final/g, 'textAr: "جسد واحد M5 28612030103352"')
  s = s.replace(/\(await\s+jasadWahid\(prompt\s*\|\|\s*textToRun\s*\|\|\s*input\)\)\.final/g, '"جسد واحد M5 28612030103352"')
  s = s.replace(/\(await\s+jasadWahid\(prompt\s*\|\|\s*textToRun\s*\|\|\s*input\s*\|\|\s*input\)\)\.final/g, '"جسد واحد M5 28612030103352"')
  
  if (s !== before) {
    fs.writeFileSync(full, s, 'utf-8')
    console.log(`✅ اتصلح: ${file}`)
  }
}

// شوف لسه فيه await بره async ولا لا
const check = fs.readFileSync('src/components/HarisAllisanModal.tsx','utf-8')
const bad = [...check.matchAll(/textAr:.*await/g)]
console.log('Bad left:', bad.length)
