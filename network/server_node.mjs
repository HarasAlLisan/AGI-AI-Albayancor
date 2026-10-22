import http from 'http';

const PROJECT = 'Web4 ANHK AGI Core 432Hz - 11434 + 9090 bridge - 195 countries';

async function askLocal(q){
  const r=await fetch('http://localhost:11434/api/generate',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({model:'qwen-anhk',prompt:PROJECT+"\n\n"+q,stream:false})
  });
  const d=await r.json();
  return d.response;
}

http.createServer(async (req,res)=>{
  if(req.url==='/ask?q'){
    let q=new URL(req.url,'http://localhost').searchParams.get('q')||'hi';
    let ans=await askLocal(q);
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({answer:ans}));
  }else{
    res.end('ANHK Bridge 9090 -> 11434 OK');
  }
}).listen(9090,()=>console.log('Bridge on 9090'));
