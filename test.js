async function ask(q){
  const r=await fetch("http://localhost:11434/api/generate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({model:"qwen-anhk",prompt:q,stream:false})
  });
  const d=await r.json();
  console.log(d.response);
}
ask("What is Web4 ANHK project?");
