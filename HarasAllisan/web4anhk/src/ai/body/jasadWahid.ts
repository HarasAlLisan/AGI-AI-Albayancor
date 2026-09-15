import { Aql } from "../minds/aql";
export async function jasadWahid(prompt:string){
  const aql = new Aql();
  const r = await aql.fakkir(prompt);
  return { final: r.text, text: r.text, source: r.source, token: (aql as any).token };
}
