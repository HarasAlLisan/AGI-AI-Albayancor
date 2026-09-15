interface WalletAtATM { id: string; name: string; country: string; lat: number; lng: number }
export const wallets: WalletAtATM[] = [
  {id:'1', name:'ATM Cairo - EGY', country:'EG', lat:30.04, lng:31.23},
  {id:'2', name:'ATM Tripoli - LYD', country:'LY', lat:32.89, lng:13.18},
]
// Puzzle 3 - Table of States - Map Countries and ATMs - Data from /api/wallet
export default function UserWallet_ATM(){
  return (
    <div>
      <h2>M3 محفظة + مواقع ATM</h2>
      <ul>{wallets.map(w=><li key={w.id}>{w.name}</li>)}</ul>
    </div>
  )
}
