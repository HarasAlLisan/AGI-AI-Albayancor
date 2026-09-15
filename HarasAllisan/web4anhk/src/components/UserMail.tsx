export default function UserMail({nationalHash}:{nationalHash:string}){
  return <div>بريدك: {nationalHash.slice(0,8)}@ankh.network - inbox + send فقط</div>
}
