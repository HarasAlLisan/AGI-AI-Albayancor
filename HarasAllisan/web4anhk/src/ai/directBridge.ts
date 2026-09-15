export const M5_TOKEN = "28612030103352";
export async function askDirect(p:string){
  const { jasadWahid } = await import("./body/jasadWahid");
  const r = await jasadWahid(p);
  return { text: r.final, raw: r };
}
