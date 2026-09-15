import UserMail from './UserMail'
import UserWallet_ATM, { wallets } from './UserWallet_ATM'

type Props = { nationalHash: string; countryCode: string } // EG, LY, SA ...

export default function User({ nationalHash, countryCode }: Props){
  // هيتقسم دول - كل دولة تشوف الـ ATM بتاعها بس
  const atmsByCountry = wallets.filter(w => w.country === countryCode)

  return (
    <div style={{padding:16}}>
      {/* 1- بريد موحد بالرقم القومي */}
      <UserMail nationalHash={nationalHash} />

      {/* 2- محفظة M3 */}
      <h3>M3 محفظة - {countryCode}</h3>

      {/* 3- مواقع ATM متقسمة دول */}
      <h4>مواقع ATM في {countryCode}</h4>
      <ul>
        {atmsByCountry.map(a => <li key={a.id}>{a.name} - {a.lat},{a.lng}</li>)}
      </ul>
    </div>
  )
}
