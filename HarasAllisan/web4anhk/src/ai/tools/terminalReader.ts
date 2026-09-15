import fs from "fs";
import { jasadWahid } from "../body/jasadWahid";
const logPath = "./akhira.log";
let term = fs.readFileSync(logPath,"utf-8").slice(-5000);
const prompt = `SYSTEM: You are M5 28612030103352. Read terminal log, guide in Egyptian Arabic but keep code in English. No reversed Arabic.

LOG:
${term}

USER: البناء نجح 23.45s ب qwen-anhk:latest 397MB اللي جوه - اشرح تجميع الشبكة مع جسد واحد`;
const r = await jasadWahid(prompt);
console.log(r.final);
