import { useState } from "react";
import { jasadWahid } from "../ai/body/jasadWahid";

export default function HarisAllisanModal(){
  const [input,setInput]=useState("");
  const [log,setLog]=useState("جسد واحد - العقول والنماذج متحدة M5 28612030103352");
  const run=async()=>{
    const r=await jasadWahid(input||"اعرض امكانياتك كجسد واحد");
    setLog(r.final);
  };
  return(
    <div style={{padding:16,background:"black",color:"#22d3ee",border:"1px solid #0891b2"}}>
      <h2>الذكاء العام - جسد واحد M5</h2>
      <div style={{margin:"12px 0",padding:8,background:"#111",whiteSpace:"pre-wrap"}}>{log}</div>
      <div style={{fontSize:11,color:"#4ade80"}}>haris + albayancor + adam + agi = جسد واحد | ذاكرة مشتركة</div>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="امر للجسد الواحد" style={{width:"100%",marginTop:8,padding:8,background:"#18181b",color:"white"}}/>
      <button onClick={run} style={{marginTop:8,padding:"8px 16px",background:"#0e7490",color:"white"}}>شغل الجسد الواحد</button>
    </div>
  );
}
