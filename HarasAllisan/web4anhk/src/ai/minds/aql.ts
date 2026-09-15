export class Aql {
  token = "28612030103352";
  private ollamaModel = "qwen-anhk:latest";
  async fakkir(prompt: string){
    try{
      const res = await fetch("http://127.0.0.1:11434/api/generate",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model: this.ollamaModel,
          prompt: `M5 ${this.token} دستور 6236: ${prompt}`,
          stream:false, keep_alive:"10m",
          options:{ num_ctx:1024, num_predict:200, temperature:0.6 }
        })
      });
      const data:any = await res.json();
      return { text: data.response || `[M5 فاضي]`, mizan:{passed:true}, blocked:false, source:this.ollamaModel };
    }catch(e:any){
      return { text:`[M5 ${this.token} Ollama واقع: ${e.message}]`, mizan:{passed:true}, blocked:false, source:"error" };
    }
  }
}
