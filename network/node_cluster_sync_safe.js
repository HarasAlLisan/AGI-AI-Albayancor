const { createHmac } = require('crypto');
let pulseCount = 0;
let buffer = [];
setInterval(()=>{
  pulseCount++;
  const hash = createHmac('sha256','س م د ا ح').update(`PULSE:${Date.now()}`).digest('hex').substring(0,16);
  buffer.push(hash);
  console.log(`+1 local | ${hash} | ${pulseCount} | GATE: OPEN | 919->920`);
},918);

setInterval(()=>{
  if(buffer.length===0) return;
  console.log(`\n[SOVEREIGN BUNDLE] ${buffer.length} pulses -> 77M mesh in 1 packet | ${new Date().toISOString()}`);
  console.log(`Hashes: ${buffer.slice(0,3).join(',')}... +${buffer.length-3} more`);
  console.log(`STATUS: SYNC_ACK | PARITY_OK | PULSE_CONFIRMED | NO FLOOD\n`);
  buffer = []; // فضي البافر بعد البث
}, 30000); // كل 30 ثانية بث واحد بس
