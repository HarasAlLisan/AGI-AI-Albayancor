/**
 * 195 Sovereign Countries Dataset - 14 Locked Sovereign Endowment (14 مقفول)
 * Fixed Anchor Date: 15 July 2026 (١٥ يوليو ٢٠٢٦)
 * Formula:
 *   1 ANKH (عنخ) = $1,200 USD (backed by 7g 24K pure physical gold standard)
 *   14 Locked ANKH = 12 Living (عيشة) + 2 Technology/Infrastructure (تقنية)
 *   Global Living Population: 8.3 Billion Humans
 *   Global Total ANKH: 116.2 Billion ANKH = $139.45 Trillion USD = €121.8 Trillion EUR = ¥8.9 Quadrillion JPY
 *   Solvency Rule: 0 Solvency (0 ملاءة - لا ديون ربوية ولا قيود بنكية كسرية)
 */

export interface SovereignCountry {
  id: string;
  code: string; // ISO 3166-1 alpha-2 / 3
  flag: string;
  nameAr: string;
  nameEn: string;
  region: 'MENA' | 'Africa' | 'Asia' | 'Europe' | 'Americas' | 'Oceania';
  population: number; // living human count
  currencyCode: string;
  currencyNameAr: string;
  currencyNameEn: string;
  currencySymbol: string;
  fxRateToUSD: number; // local fiat units per 1 USD (as of 15 July 2026)
  verifiedSourceCode?: string; // e.g., 'cbe7', '5393', '18ef', '01d1'
  ankhLocalRate: number; // 1 ANKH in local fiat = 1,200 * fxRateToUSD
  locked14Local: number; // 14 ANKH in local fiat = 14 * ankhLocalRate
  living12Local: number; // 12 ANKH in local fiat = 12 * ankhLocalRate
  tech2Local: number; // 2 ANKH in local fiat = 2 * ankhLocalRate
  totalCountryLocal: number; // population * locked14Local
  totalCountryUSD: number; // population * 14 * 1200
  notes?: string;
  isFeatured?: boolean;
}

export const GLOBAL_SOVEREIGN_AGGREGATE = {
  anchorDate: '15 يوليو 2026',
  anchorDateEn: '15 July 2026',
  totalCountries: 195,
  solvencyStatus: '0 ملاءة (صفر ديون كسرية ربوية - تغطية سيادية حقيقية 100%)',
  solvencyStatusEn: '0 Solvency (Zero Fractional Reserve Debt - 100% Real Asset Coverage)',
  lockedAnkhPerHuman: 14,
  livingQuota: 12, // 12 عيشة
  techQuota: 2, // 2 تقنية
  usdPerAnkh: 1200,
  goldGramsPerAnkh: 7, // 7g of 24k gold
  worldPopulation: 8300000000, // 8.3 Billion
  totalAnkhIssuedBillion: 116.2, // 116.2 Billion ANKH
  totalValueUSDTrillion: 139.45, // $139.45 Trillion USD
  totalValueEURTrillion: 121.8, // €121.8 Trillion EUR
  totalValueJPYQuadrillion: 8.9, // ¥8.9 Quadrillion JPY
  spreadsheetFileName: '195_دولة_بالعملات_المحلية_14_مقفول.xlsx',
};

// Helper to calculate exact country figures
function buildCountry(
  id: string,
  code: string,
  flag: string,
  nameAr: string,
  nameEn: string,
  region: 'MENA' | 'Africa' | 'Asia' | 'Europe' | 'Americas' | 'Oceania',
  population: number,
  currencyCode: string,
  currencyNameAr: string,
  currencyNameEn: string,
  currencySymbol: string,
  fxRateToUSD: number,
  verifiedSourceCode?: string,
  customAnkhRate?: number,
  customLocked14?: number,
  customLiving12?: number,
  customTech2?: number,
  notes?: string,
  isFeatured: boolean = false
): SovereignCountry {
  const ankhLocalRate = customAnkhRate ?? +(1200 * fxRateToUSD).toFixed(2);
  const locked14Local = customLocked14 ?? +(14 * ankhLocalRate).toFixed(2);
  const living12Local = customLiving12 ?? +(12 * ankhLocalRate).toFixed(2);
  const tech2Local = customTech2 ?? +(2 * ankhLocalRate).toFixed(2);
  const totalCountryLocal = +(population * locked14Local).toFixed(2);
  const totalCountryUSD = +(population * 14 * 1200).toFixed(2);

  return {
    id,
    code,
    flag,
    nameAr,
    nameEn,
    region,
    population,
    currencyCode,
    currencyNameAr,
    currencyNameEn,
    currencySymbol,
    fxRateToUSD,
    verifiedSourceCode,
    ankhLocalRate,
    locked14Local,
    living12Local,
    tech2Local,
    totalCountryLocal,
    totalCountryUSD,
    notes,
    isFeatured,
  };
}

export const SOVEREIGN_COUNTRIES_195: SovereignCountry[] = [
  // 1. ليبيا (Libya) - Exact User Verified Specifications
  buildCountry(
    'libya',
    'LY',
    '🇱🇾',
    'ليبيا',
    'Libya',
    'MENA',
    7539851,
    'LYD',
    'دينار ليبي',
    'Libyan Dinar',
    'د.ل',
    6.4226,
    'cbe7',
    7707.12,
    107899.68,
    92485.44,
    15414.24,
    '1$ = 6.4226 د.ل | 14 مقفول = 107,899.68 د.ل لكل ليبي مقفول (12 عيشة: 92,485.44 + 2 تقنية: 15,414.24)',
    true
  ),

  // 2. مصر (Egypt) - Exact User Verified Specifications
  buildCountry(
    'egypt',
    'EG',
    '🇪🇬',
    'مصر',
    'Egypt',
    'MENA',
    107000000,
    'EGP',
    'جنيه مصري',
    'Egyptian Pound',
    'ج.م',
    50.527,
    '5393',
    60632.4,
    848853.6,
    727588.8,
    121264.8,
    '1$ = 50.527 ج.م | 14 مقفول = 848,853.6 ج.م لكل مصري مقفول (12 عيشة: 727,588.8 + 2 تقنية: 121,264.8)',
    true
  ),

  // 3. العراق (Iraq) - Exact User Verified Specifications
  buildCountry(
    'iraq',
    'IQ',
    '🇮🇶',
    'العراق',
    'Iraq',
    'MENA',
    46000000,
    'IQD',
    'دينار عراقي',
    'Iraqi Dinar',
    'د.ع',
    1304.23,
    '18ef',
    1565076,
    21911064,
    18780912,
    3130152,
    '1$ = 1,304.23 د.ع | 14 مقفول = 21,911,064 د.ع لكل عراقي مقفول (12 عيشة: 18,780,912 + 2 تقنية: 3,130,152)',
    true
  ),

  // 4. السعودية (Saudi Arabia) - Exact User Verified Specifications
  buildCountry(
    'saudi_arabia',
    'SA',
    '🇸🇦',
    'المملكة العربية السعودية',
    'Saudi Arabia',
    'MENA',
    36500000,
    'SAR',
    'ريال سعودي',
    'Saudi Riyal',
    'ر.س',
    3.7492,
    '01d1',
    4499.04,
    62986.56,
    53988.48,
    8998.08,
    '1$ = 3.7492 ر.س | 14 مقفول = 62,986.56 ر.س لكل سعودي مقفول (12 عيشة: 53,988.48 + 2 تقنية: 8,998.08)',
    true
  ),

  // 5. الجزائر (Algeria) - Exact User Verified Specifications
  buildCountry(
    'algeria',
    'DZ',
    '🇩🇿',
    'الجزائر',
    'Algeria',
    'MENA',
    46000000,
    'DZD',
    'دينار جزائري',
    'Algerian Dinar',
    'د.ج',
    133.0,
    'dz-gov',
    159600,
    2234400,
    1915200,
    319200,
    '1$ = 133.00 د.ج | 14 مقفول = 2,234,400 د.ج لكل جزائري مقفول (12 عيشة: 1,915,200 + 2 تقنية: 319,200)',
    true
  ),

  // 6. تونس (Tunisia) - Exact User Verified Specifications
  buildCountry(
    'tunisia',
    'TN',
    '🇹🇳',
    'تونس',
    'Tunisia',
    'MENA',
    12500000,
    'TND',
    'دينار تونسي',
    'Tunisian Dinar',
    'د.ت',
    2.922,
    'tn-bct',
    3506.4,
    49089.6,
    42076.8,
    7012.8,
    '1$ = 2.922 د.ت | 14 مقفول = 49,089.6 د.ت لكل تونسي مقفول (12 عيشة: 42,076.8 + 2 تقنية: 7,012.8)',
    true
  ),

  // 7. المغرب (Morocco) - Exact User Verified Specifications
  buildCountry(
    'morocco',
    'MA',
    '🇲🇦',
    'المملكة المغربية',
    'Morocco',
    'MENA',
    37800000,
    'MAD',
    'درهم مغربي',
    'Moroccan Dirham',
    'د.م',
    9.2946,
    'ma-bam',
    11153.52,
    156149.28,
    133842.24,
    22307.04,
    '1$ = 9.2946 د.م | 14 مقفول = 156,149.28 د.م لكل مغربي مقفول (12 عيشة: 133,842.24 + 2 تقنية: 22,307.04)',
    true
  ),

  // 8. تركيا (Turkey) - Exact User Verified Specifications
  buildCountry(
    'turkey',
    'TR',
    '🇹🇷',
    'تركيا',
    'Turkey',
    'Asia',
    86000000,
    'TRY',
    'ليرة تركية',
    'Turkish Lira',
    '₺',
    46.8238,
    'tr-tcmb',
    56188.56,
    786639.84,
    674262.72,
    112377.12,
    '1$ = 46.8238 ₺ | 14 مقفول = 786,639.84 ليرة لكل تركي مقفول (12 عيشة: 674,262.72 + 2 تقنية: 112,377.12)',
    true
  ),

  // 9. بولندا (Poland) - Exact User Verified Specifications
  buildCountry(
    'poland',
    'PL',
    '🇵🇱',
    'بولندا',
    'Poland',
    'Europe',
    38000000,
    'PLN',
    'زلوتي بولندي',
    'Polish Zloty',
    'zł',
    3.7875,
    'pl-nbp',
    4545.0,
    63630.0,
    54540.0,
    9090.0,
    '1$ = 3.7875 zł | 14 مقفول = 63,630 zł لكل بولندي مقفول (12 عيشة: 54,540 + 2 تقنية: 9,090)',
    true
  ),

  // 10. بريطانيا (United Kingdom) - Exact User Verified Specifications
  buildCountry(
    'uk',
    'GB',
    '🇬🇧',
    'المملكة المتحدة',
    'United Kingdom',
    'Europe',
    68000000,
    'GBP',
    'جنيه إسترليني',
    'British Pound',
    '£',
    0.746993, // 1 GBP = 1.3387 USD => 1 USD = 0.746993 GBP
    'boe-uk',
    896.39,
    12549.49,
    10756.7,
    1792.79,
    '1 £ = 1.3387 $ | 14 مقفول = 12,549.49 £ لكل بريطاني مقفول (12 عيشة: 10,756.70 + 2 تقنية: 1,792.79)',
    true
  ),

  // 11. البرازيل (Brazil) - Exact User Verified Specifications
  buildCountry(
    'brazil',
    'BR',
    '🇧🇷',
    'البرازيل',
    'Brazil',
    'Americas',
    213000000,
    'BRL',
    'ريال برازيلي',
    'Brazilian Real',
    'R$',
    5.5,
    'br-bcb',
    6600.0,
    92400.0,
    79200.0,
    13200.0,
    '1$ = 5.50 R$ | 14 مقفول = 92,400 R$ لكل برازيلي مقفول (12 عيشة: 79,200 + 2 تقنية: 13,200)',
    true
  ),

  // 12. فلسطين (Palestine) - Sovereign Anchor Node
  buildCountry(
    'palestine',
    'PS',
    '🇵🇸',
    'فلسطين',
    'Palestine',
    'MENA',
    14500000,
    'HR',
    'الريال الحجازي / دينار القدس',
    'Hejazi Riyal / Jerusalem Dinar',
    'ر.ح',
    3.75,
    'ps-sovereign',
    4500.0,
    63000.0,
    54000.0,
    9000.0,
    'العقدة السيادية المركزية: 14 مقفول لكل فلسطيني مقفول بحماية العهد السيادي',
    true
  ),

  // 13. الإمارات العربية المتحدة (UAE)
  buildCountry(
    'uae',
    'AE',
    '🇦🇪',
    'الإمارات العربية المتحدة',
    'United Arab Emirates',
    'MENA',
    10000000,
    'AED',
    'درهم إماراتي',
    'UAE Dirham',
    'د.إ',
    3.6725,
    'ae-cbuae',
    4407.0,
    61698.0,
    52884.0,
    8814.0,
    '1$ = 3.6725 د.إ | 14 مقفول = 61,698 د.إ لكل مواطن ومقيم',
    true
  ),

  // 14. الكويت (Kuwait)
  buildCountry(
    'kuwait',
    'KW',
    '🇰🇼',
    'الكويت',
    'Kuwait',
    'MENA',
    4300000,
    'KWD',
    'دينار كويتي',
    'Kuwaiti Dinar',
    'د.ك',
    0.3065,
    'kw-cbk',
    367.8,
    5149.2,
    4413.6,
    735.6,
    '1$ = 0.3065 د.ك | 14 مقفول = 5,149.2 د.ك لكل كويتي',
    true
  ),

  // 15. قطر (Qatar)
  buildCountry(
    'qatar',
    'QA',
    '🇶🇦',
    'قطر',
    'Qatar',
    'MENA',
    2900000,
    'QAR',
    'ريال قطري',
    'Qatari Riyal',
    'ر.ق',
    3.64,
    'qa-qcb',
    4368.0,
    61152.0,
    52416.0,
    8736.0,
    '1$ = 3.64 ر.ق | 14 مقفول = 61,152 ر.ق لكل قطري'
  ),

  // 16. سلطنة عمان (Oman)
  buildCountry(
    'oman',
    'OM',
    '🇴🇲',
    'سلطنة عُمان',
    'Oman',
    'MENA',
    5200000,
    'OMR',
    'ريال عماني',
    'Omani Rial',
    'ر.ع',
    0.3845,
    'om-cbo',
    461.4,
    6459.6,
    5536.8,
    922.8,
    '1$ = 0.3845 ر.ع | 14 مقفول = 6,459.6 ر.ع لكل عماني'
  ),

  // 17. البحرين (Bahrain)
  buildCountry(
    'bahrain',
    'BH',
    '🇧🇭',
    'مملكة البحرين',
    'Bahrain',
    'MENA',
    1550000,
    'BHD',
    'دينار بحريني',
    'Bahraini Dinar',
    'د.ب',
    0.376,
    'bh-cbb',
    451.2,
    6316.8,
    5414.4,
    902.4,
    '1$ = 0.376 د.ب | 14 مقفول = 6,316.8 د.ب لكل بحريني'
  ),

  // 18. الأردن (Jordan)
  buildCountry(
    'jordan',
    'JO',
    '🇯🇴',
    'المملكة الأردنية الهاشمية',
    'Jordan',
    'MENA',
    11500000,
    'JOD',
    'دينار أردني',
    'Jordanian Dinar',
    'د.أ',
    0.709,
    'jo-cbj',
    850.8,
    11911.2,
    10209.6,
    1701.6,
    '1$ = 0.709 د.أ | 14 مقفول = 11,911.2 د.أ لكل أردني'
  ),

  // 19. لبنان (Lebanon)
  buildCountry(
    'lebanon',
    'LB',
    '🇱🇧',
    'لبنان',
    'Lebanon',
    'MENA',
    5400000,
    'LBP',
    'ليرة لبنانية',
    'Lebanese Pound',
    'ل.ل',
    89500.0,
    'lb-bdl',
    107400000.0,
    1503600000.0,
    1288800000.0,
    214800000.0,
    'تثبيت العقدة اللبنانية وحمايتها من التضخم المفتعل'
  ),

  // 20. سوريا (Syria)
  buildCountry(
    'syria',
    'SY',
    '🇸🇾',
    'الجمهورية العربية السورية',
    'Syria',
    'MENA',
    23000000,
    'SYP',
    'ليرة سورية',
    'Syrian Pound',
    'ل.س',
    13000.0,
    'sy-cbs',
    15600000.0,
    218400000.0,
    187200000.0,
    31200000.0,
    'تحرير السوريين من المقاطعة النقدية عبر شبكة عنخ المستقلة'
  ),

  // 21. اليمن (Yemen)
  buildCountry(
    'yemen',
    'YE',
    '🇾🇪',
    'اليمن',
    'Yemen',
    'MENA',
    34000000,
    'YER',
    'ريال يمني',
    'Yemeni Rial',
    'ر.ي',
    250.0,
    'ye-cby',
    300000.0,
    4200000.0,
    3600000.0,
    600000.0,
    'توحيد الريال اليمني وربطه بمقاصة الذهب'
  ),

  // 22. السودان (Sudan)
  buildCountry(
    'sudan',
    'SD',
    '🇸🇩',
    'السودان',
    'Sudan',
    'MENA',
    48000000,
    'SDG',
    'جنيه سوداني',
    'Sudanese Pound',
    'ج.س',
    2500.0,
    'sd-cbos',
    3000000.0,
    42000000.0,
    36000000.0,
    6000000.0,
    'ضمان سلة الغذاء والذهب الإفريقي لـ 48 مليون سوداني'
  ),

  // 23. موريتانيا (Mauritania)
  buildCountry(
    'mauritania',
    'MR',
    '🇲🇷',
    'موريتانيا',
    'Mauritania',
    'MENA',
    4900000,
    'MRU',
    'أوقية موريتانية',
    'Mauritanian Ouguiya',
    'أ.م',
    39.8,
    'mr-bcm',
    47760.0,
    668640.0,
    573120.0,
    95520.0,
    '14 مقفول بالعملة المحلية'
  ),

  // 24. الصومال (Somalia)
  buildCountry(
    'somalia',
    'SO',
    '🇸🇴',
    'الصومال',
    'Somalia',
    'MENA',
    18000000,
    'SOS',
    'شلن صومالي',
    'Somali Shilling',
    'ش.ص',
    571.0,
    'so-cbs',
    685200.0,
    9592800.0,
    8222400.0,
    1370400.0,
    'استعادة السيادة الاقتصادية للقرن الإفريقي'
  ),

  // 25. الولايات المتحدة الأمريكية (USA)
  buildCountry(
    'usa',
    'US',
    '🇺🇸',
    'الولايات المتحدة الأمريكية',
    'United States',
    'Americas',
    340000000,
    'USD',
    'دولار أمريكي',
    'US Dollar',
    '$',
    1.0,
    'fed-ny',
    1200.0,
    16800.0,
    14400.0,
    2400.0,
    '14 مقفول = 16,800$ لكل مواطن أمريكي (12 عيشة: 14,400$ + 2 تقنية: 2,400$)',
    true
  ),

  // 26. الصين (China)
  buildCountry(
    'china',
    'CN',
    '🇨🇳',
    'جمهورية الصين الشعبية',
    'China',
    'Asia',
    1410000000,
    'CNY',
    'يوان صيني',
    'Chinese Yuan',
    '¥',
    7.245,
    'cn-pboc',
    8694.0,
    121716.0,
    104328.0,
    17388.0,
    '1$ = 7.245 ¥ | 14 مقفول = 121,716 ¥ لكل مواطن صيني',
    true
  ),

  // 27. الهند (India)
  buildCountry(
    'india',
    'IN',
    '🇮🇳',
    'الهند',
    'India',
    'Asia',
    1430000000,
    'INR',
    'روبية هندية',
    'Indian Rupee',
    '₹',
    83.65,
    'in-rbi',
    100380.0,
    1405320.0,
    1204560.0,
    200760.0,
    '1$ = 83.65 ₹ | 14 مقفول = 1,405,320 ₹ لكل مواطن هندي',
    true
  ),

  // 28. اليابان (Japan)
  buildCountry(
    'japan',
    'JP',
    '🇯🇵',
    'اليابان',
    'Japan',
    'Asia',
    124000000,
    'JPY',
    'ين ياباني',
    'Japanese Yen',
    '¥',
    158.5,
    'jp-boj',
    190200.0,
    2662800.0,
    2282400.0,
    380400.0,
    '1$ = 158.50 ¥ | 14 مقفول = 2,662,800 ¥ لكل ياباني (جزء من 8.9 كوادريليون ين)',
    true
  ),

  // 29. ألمانيا (Germany)
  buildCountry(
    'germany',
    'DE',
    '🇩🇪',
    'ألمانيا',
    'Germany',
    'Europe',
    84000000,
    'EUR',
    'يورو أوروبي',
    'Euro',
    '€',
    0.922,
    'eu-ecb',
    1106.4,
    15489.6,
    13276.8,
    2212.8,
    '1$ = 0.922 € | 14 مقفول = 15,489.60 € لكل ألماني (جزء من 121.8 تريليون يورو)',
    true
  ),

  // 30. فرنسا (France)
  buildCountry(
    'france',
    'FR',
    '🇫🇷',
    'فرنسا',
    'France',
    'Europe',
    68000000,
    'EUR',
    'يورو أوروبي',
    'Euro',
    '€',
    0.922,
    'eu-ecb',
    1106.4,
    15489.6,
    13276.8,
    2212.8,
    '14 مقفول = 15,489.60 € لكل فرنسي'
  ),

  // 31. إيطاليا (Italy)
  buildCountry(
    'italy',
    'IT',
    '🇮🇹',
    'إيطاليا',
    'Italy',
    'Europe',
    59000000,
    'EUR',
    'يورو أوروبي',
    'Euro',
    '€',
    0.922,
    'eu-ecb',
    1106.4,
    15489.6,
    13276.8,
    2212.8,
    '14 مقفول = 15,489.60 € لكل إيطالي'
  ),

  // 32. إسبانيا (Spain)
  buildCountry(
    'spain',
    'ES',
    '🇪🇸',
    'إسبانيا',
    'Spain',
    'Europe',
    48000000,
    'EUR',
    'يورو أوروبي',
    'Euro',
    '€',
    0.922,
    'eu-ecb',
    1106.4,
    15489.6,
    13276.8,
    2212.8,
    '14 مقفول = 15,489.60 € لكل إسباني'
  ),

  // 33. روسيا (Russia)
  buildCountry(
    'russia',
    'RU',
    '🇷🇺',
    'روسيا الاتحادية',
    'Russia',
    'Europe',
    144000000,
    'RUB',
    'روبل روسي',
    'Russian Ruble',
    '₽',
    89.5,
    'ru-cbr',
    107400.0,
    1503600.0,
    1288800.0,
    214800.0,
    '1$ = 89.50 ₽ | 14 مقفول = 1,503,600 ₽ لكل روسي'
  ),

  // 34. كندا (Canada)
  buildCountry(
    'canada',
    'CA',
    '🇨🇦',
    'كندا',
    'Canada',
    'Americas',
    40000000,
    'CAD',
    'دولار كندي',
    'Canadian Dollar',
    'C$',
    1.37,
    'ca-boc',
    1644.0,
    23016.0,
    19728.0,
    3288.0,
    '1$ = 1.37 C$ | 14 مقفول = 23,016 C$ لكل كندي'
  ),

  // 35. أستراليا (Australia)
  buildCountry(
    'australia',
    'AU',
    '🇦🇺',
    'أستراليا',
    'Australia',
    'Oceania',
    27000000,
    'AUD',
    'دولار أسترالي',
    'Australian Dollar',
    'A$',
    1.51,
    'au-rba',
    1812.0,
    25368.0,
    21744.0,
    3624.0,
    '1$ = 1.51 A$ | 14 مقفول = 25,368 A$ لكل أسترالي'
  ),

  // 36. إندونيسيا (Indonesia)
  buildCountry(
    'indonesia',
    'ID',
    '🇮🇩',
    'إندونيسيا',
    'Indonesia',
    'Asia',
    278000000,
    'IDR',
    'روبية إندونيسية',
    'Indonesian Rupiah',
    'Rp',
    16250.0,
    'id-bi',
    19500000.0,
    273000000.0,
    234000000.0,
    39000000.0,
    '1$ = 16,250 Rp | 14 مقفول = 273,000,000 Rp لكل إندونيسي'
  ),

  // 37. باكستان (Pakistan)
  buildCountry(
    'pakistan',
    'PK',
    '🇵🇰',
    'باكستان',
    'Pakistan',
    'Asia',
    240000000,
    'PKR',
    'روبية باكستانية',
    'Pakistani Rupee',
    '₨',
    278.5,
    'pk-sbp',
    334200.0,
    4678800.0,
    4010400.0,
    668400.0,
    '1$ = 278.50 ₨ | 14 مقفول = 4,678,800 ₨ لكل باكستاني'
  ),

  // 38. بنغلاديش (Bangladesh)
  buildCountry(
    'bangladesh',
    'BD',
    '🇧🇩',
    'بنغلاديش',
    'Bangladesh',
    'Asia',
    173000000,
    'BDT',
    'تاكا بنغلاديشية',
    'Bangladeshi Taka',
    '৳',
    117.8,
    'bd-bb',
    141360.0,
    1979040.0,
    1696320.0,
    282720.0,
    '1$ = 117.80 ৳ | 14 مقفول = 1,979,040 ৳ لكل بنغالي'
  ),

  // 39. نيجيريا (Nigeria)
  buildCountry(
    'nigeria',
    'NG',
    '🇳🇬',
    'نيجيريا',
    'Nigeria',
    'Africa',
    225000000,
    'NGN',
    'نايرا نيجيرية',
    'Nigerian Naira',
    '₦',
    1520.0,
    'ng-cbn',
    1824000.0,
    25536000.0,
    21888000.0,
    3648000.0,
    '1$ = 1,520 ₦ | 14 مقفول = 25,536,000 ₦ لكل نيجيري'
  ),

  // 40. جنوب إفريقيا (South Africa)
  buildCountry(
    'south_africa',
    'ZA',
    '🇿🇦',
    'جنوب إفريقيا',
    'South Africa',
    'Africa',
    60000000,
    'ZAR',
    'راند جنوب إفريقي',
    'South African Rand',
    'R',
    18.25,
    'za-sarb',
    21900.0,
    306600.0,
    262800.0,
    43800.0,
    '1$ = 18.25 R | 14 مقفول = 306,600 R لكل جنوب إفريقي'
  ),

  // 41. ماليزيا (Malaysia)
  buildCountry(
    'malaysia',
    'MY',
    '🇲🇾',
    'ماليزيا',
    'Malaysia',
    'Asia',
    34000000,
    'MYR',
    'رينغيت ماليزي',
    'Malaysian Ringgit',
    'RM',
    4.71,
    'my-bnm',
    5652.0,
    79128.0,
    67824.0,
    11304.0,
    '1$ = 4.71 RM | 14 مقفول = 79,128 RM لكل ماليزي'
  ),

  // 42. سنغافورة (Singapore)
  buildCountry(
    'singapore',
    'SG',
    '🇸🇬',
    'سنغافورة',
    'Singapore',
    'Asia',
    6000000,
    'SGD',
    'دولار سنغافوري',
    'Singapore Dollar',
    'S$',
    1.35,
    'sg-mas',
    1620.0,
    22680.0,
    19440.0,
    3240.0,
    '1$ = 1.35 S$ | 14 مقفول = 22,680 S$ لكل سنغافوري'
  ),

  // 43. كوريا الجنوبية (South Korea)
  buildCountry(
    'south_korea',
    'KR',
    '🇰🇷',
    'كوريا الجنوبية',
    'South Korea',
    'Asia',
    52000000,
    'KRW',
    'وون كوري جنوبي',
    'South Korean Won',
    '₩',
    1380.0,
    'kr-bok',
    1656000.0,
    23184000.0,
    19872000.0,
    3312000.0,
    '1$ = 1,380 ₩ | 14 مقفول = 23,184,000 ₩ لكل كوري'
  ),

  // 44. المكسيك (Mexico)
  buildCountry(
    'mexico',
    'MX',
    '🇲🇽',
    'المكسيك',
    'Mexico',
    'Americas',
    130000000,
    'MXN',
    'بيزو مكسيكي',
    'Mexican Peso',
    'Mex$',
    18.15,
    'mx-banxico',
    21780.0,
    304920.0,
    261360.0,
    43560.0,
    '1$ = 18.15 Mex$ | 14 مقفول = 304,920 Mex$ لكل مكسيكي'
  ),

  // 45. الأرجنتين (Argentina)
  buildCountry(
    'argentina',
    'AR',
    '🇦🇷',
    'الأرجنتين',
    'Argentina',
    'Americas',
    46000000,
    'ARS',
    'بيزو أرجنتيني',
    'Argentine Peso',
    '$',
    920.0,
    'ar-bcra',
    1104000.0,
    15456000.0,
    13248000.0,
    2208000.0,
    'تثبيت القوة الشرائية للشعب الأرجنتيني'
  ),

  // 46. سويسرا (Switzerland)
  buildCountry(
    'switzerland',
    'CH',
    '🇨🇭',
    'سويسرا',
    'Switzerland',
    'Europe',
    8800000,
    'CHF',
    'فرنك سويسري',
    'Swiss Franc',
    'CHF',
    0.895,
    'ch-snb',
    1074.0,
    15036.0,
    12888.0,
    2148.0,
    '1$ = 0.895 CHF | 14 مقفول = 15,036 CHF لكل سويسري'
  ),

  // 47. السويد (Sweden)
  buildCountry(
    'sweden',
    'SE',
    '🇸🇪',
    'السويد',
    'Sweden',
    'Europe',
    10500000,
    'SEK',
    'كرونة سويدية',
    'Swedish Krona',
    'kr',
    10.55,
    'se-riksbank',
    12660.0,
    177240.0,
    151920.0,
    25320.0,
    '1$ = 10.55 kr | 14 مقفول = 177,240 kr لكل سويدي'
  ),

  // 48. النرويج (Norway)
  buildCountry(
    'norway',
    'NO',
    '🇳🇴',
    'النرويج',
    'Norway',
    'Europe',
    5500000,
    'NOK',
    'كرونة نرويجية',
    'Norwegian Krone',
    'kr',
    10.65,
    'no-norges',
    12780.0,
    178920.0,
    153360.0,
    25560.0,
    '1$ = 10.65 kr | 14 مقفول = 178,920 kr لكل نرويجي'
  ),

  // 49. الدنمارك (Denmark)
  buildCountry(
    'denmark',
    'DK',
    '🇩🇰',
    'الدنمارك',
    'Denmark',
    'Europe',
    5900000,
    'DKK',
    'كرونة دنماركية',
    'Danish Krone',
    'kr',
    6.88,
    'dk-nationalbank',
    8256.0,
    115584.0,
    99072.0,
    16512.0,
    '14 مقفول = 115,584 kr لكل دنماركي'
  ),

  // 50. نيوزيلندا (New Zealand)
  buildCountry(
    'new_zealand',
    'NZ',
    '🇳🇿',
    'نيوزيلندا',
    'New Zealand',
    'Oceania',
    5200000,
    'NZD',
    'دولار نيوزيلندي',
    'New Zealand Dollar',
    'NZ$',
    1.64,
    'nz-rbnz',
    1968.0,
    27552.0,
    23616.0,
    3936.0,
    '14 مقفول = 27,552 NZ$ لكل نيوزيلندي'
  ),

  // 51. إيران (Iran)
  buildCountry(
    'iran',
    'IR',
    '🇮🇷',
    'إيران',
    'Iran',
    'Asia',
    89000000,
    'IRR',
    'ريال إيراني',
    'Iranian Rial',
    '﷼',
    42000.0,
    'ir-cbi',
    50400000.0,
    705600000.0,
    604800000.0,
    100800000.0,
    'تحييد الحصار النقدي وربط السيادة بالمقاصة الإسلامية'
  ),

  // 52. كينيا (Kenya)
  buildCountry(
    'kenya',
    'KE',
    '🇰🇪',
    'كينيا',
    'Kenya',
    'Africa',
    55000000,
    'KES',
    'شلن كيني',
    'Kenyan Shilling',
    'KSh',
    128.5,
    'ke-cbk',
    154200.0,
    2158800.0,
    1850400.0,
    308400.0,
    '14 مقفول = 2,158,800 KSh لكل كيني'
  ),

  // 53. إثيوبيا (Ethiopia)
  buildCountry(
    'ethiopia',
    'ET',
    '🇪🇹',
    'إثيوبيا',
    'Ethiopia',
    'Africa',
    126000000,
    'ETB',
    'بير إثيوبي',
    'Ethiopian Birr',
    'Br',
    57.5,
    'et-nbe',
    69000.0,
    966000.0,
    828000.0,
    138000.0,
    '14 مقفول = 966,000 Br لكل إثيوبي'
  ),

  // 54. غانا (Ghana)
  buildCountry(
    'ghana',
    'GH',
    '🇬🇭',
    'غانا',
    'Ghana',
    'Africa',
    34000000,
    'GHS',
    'سيدي غاني',
    'Ghanaian Cedi',
    'GH₵',
    15.2,
    'gh-bog',
    18240.0,
    255360.0,
    218880.0,
    36480.0,
    '14 مقفول = 255,360 GH₵ لكل غاني'
  ),

  // 55. تايلاند (Thailand)
  buildCountry(
    'thailand',
    'TH',
    '🇹🇭',
    'تايلاند',
    'Thailand',
    'Asia',
    72000000,
    'THB',
    'بات تايلاندي',
    'Thai Baht',
    '฿',
    36.75,
    'th-bot',
    44100.0,
    617400.0,
    529200.0,
    88200.0,
    '14 مقفول = 617,400 ฿ لكل تايلاندي'
  ),

  // 56. فيتنام (Vietnam)
  buildCountry(
    'vietnam',
    'VN',
    '🇻🇳',
    'فيتنام',
    'Vietnam',
    'Asia',
    100000000,
    'VND',
    'دونغ فيتنامي',
    'Vietnamese Dong',
    '₫',
    25450.0,
    'vn-sbv',
    30540000.0,
    427560000.0,
    366480000.0,
    61080000.0,
    '14 مقفول = 427,560,000 ₫ لكل فيتنامي'
  ),

  // 57. الفلبين (Philippines)
  buildCountry(
    'philippines',
    'PH',
    '🇵🇭',
    'الفلبين',
    'Philippines',
    'Asia',
    117000000,
    'PHP',
    'بيزو فلبيني',
    'Philippine Peso',
    '₱',
    58.65,
    'ph-bsp',
    70380.0,
    985320.0,
    844560.0,
    140760.0,
    '14 مقفول = 985,320 ₱ لكل فلبيني'
  ),

  // 58. كولومبيا (Colombia)
  buildCountry(
    'colombia',
    'CO',
    '🇨🇴',
    'كولومبيا',
    'Colombia',
    'Americas',
    52000000,
    'COP',
    'بيزو كولومبي',
    'Colombian Peso',
    'COL$',
    4120.0,
    'co-banrep',
    4944000.0,
    69216000.0,
    59328000.0,
    9888000.0,
    '14 مقفول = 69,216,000 COL$ لكل كولومبي'
  ),

  // 59. تشيلي (Chile)
  buildCountry(
    'chile',
    'CL',
    '🇨🇱',
    'تشيلي',
    'Chile',
    'Americas',
    20000000,
    'CLP',
    'بيزو تشيلي',
    'Chilean Peso',
    'CLP$',
    940.0,
    'cl-bcentral',
    1128000.0,
    15792000.0,
    13536000.0,
    2256000.0,
    '14 مقفول = 15,792,000 CLP$ لكل تشيلي'
  ),

  // 60. بيرو (Peru)
  buildCountry(
    'peru',
    'PE',
    '🇵🇪',
    'بيرو',
    'Peru',
    'Americas',
    34000000,
    'PEN',
    'سول بيروفي',
    'Peruvian Sol',
    'S/',
    3.8,
    'pe-bcrp',
    4560.0,
    63840.0,
    54720.0,
    9120.0,
    '14 مقفول = 63,840 S/ لكل بيروفي'
  ),

  // 61. اليونان (Greece)
  buildCountry('greece', 'GR', '🇬🇷', 'اليونان', 'Greece', 'Europe', 10400000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 62. البرتغال (Portugal)
  buildCountry('portugal', 'PT', '🇵🇹', 'البرتغال', 'Portugal', 'Europe', 10300000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 63. هولندا (Netherlands)
  buildCountry('netherlands', 'NL', '🇳🇱', 'هولندا', 'Netherlands', 'Europe', 17900000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 64. بلجيكا (Belgium)
  buildCountry('belgium', 'BE', '🇧🇪', 'بلجيكا', 'Belgium', 'Europe', 11700000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 65. النمسا (Austria)
  buildCountry('austria', 'AT', '🇦🇹', 'النمسا', 'Austria', 'Europe', 9100000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 66. فنلندا (Finland)
  buildCountry('finland', 'FI', '🇫🇮', 'فنلندا', 'Finland', 'Europe', 5600000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 67. أيرلندا (Ireland)
  buildCountry('ireland', 'IE', '🇮🇪', 'أيرلندا', 'Ireland', 'Europe', 5200000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 68. التشيك (Czech Republic)
  buildCountry('czech', 'CZ', '🇨🇿', 'جمهورية التشيك', 'Czech Republic', 'Europe', 10900000, 'CZK', 'كرونة تشيكية', 'Czech Koruna', 'Kč', 23.2),
  // 69. المجر (Hungary)
  buildCountry('hungary', 'HU', '🇭🇺', 'المجر', 'Hungary', 'Europe', 9600000, 'HUF', 'فورنت مجري', 'Hungarian Forint', 'Ft', 368.0),
  // 70. رومانيا (Romania)
  buildCountry('romania', 'RO', '🇷🇴', 'رومانيا', 'Romania', 'Europe', 19000000, 'RON', 'ليو روماني', 'Romanian Leu', 'lei', 4.59),
  // 71. أوكرانيا (Ukraine)
  buildCountry('ukraine', 'UA', '🇺🇦', 'أوكرانيا', 'Ukraine', 'Europe', 37000000, 'UAH', 'هريفنيا أوكرانية', 'Ukrainian Hryvnia', '₴', 40.8),
  // 72. كازاخستان (Kazakhstan)
  buildCountry('kazakhstan', 'KZ', '🇰🇿', 'كازاخستان', 'Kazakhstan', 'Asia', 20000000, 'KZT', 'تينغ كازاخستاني', 'Kazakhstani Tenge', '₸', 472.0),
  // 73. أوزبكستان (Uzbekistan)
  buildCountry('uzbekistan', 'UZ', '🇺🇿', 'أوزبكستان', 'Uzbekistan', 'Asia', 36000000, 'UZS', 'سوم أوزبكي', 'Uzbekistani Som', 'soʻm', 12600.0),
  // 74. أذربيجان (Azerbaijan)
  buildCountry('azerbaijan', 'AZ', '🇦🇿', 'أذربيجان', 'Azerbaijan', 'Asia', 10400000, 'AZN', 'مانات أذربيجاني', 'Azerbaijani Manat', '₼', 1.7),
  // 75. جورجيا (Georgia)
  buildCountry('georgia', 'GE', '🇬🇪', 'جورجيا', 'Georgia', 'Europe', 3700000, 'GEL', 'لاري جورجي', 'Georgian Lari', '₾', 2.8),
  // 76. السنغال (Senegal)
  buildCountry('senegal', 'SN', '🇸🇳', 'السنغال', 'Senegal', 'Africa', 18000000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 77. ساحل العاج (Ivory Coast)
  buildCountry('ivory_coast', 'CI', '🇨🇮', 'ساحل العاج', 'Ivory Coast', 'Africa', 29000000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 78. الكاميرون (Cameroon)
  buildCountry('cameroon', 'CM', '🇨🇲', 'الكاميرون', 'Cameroon', 'Africa', 28000000, 'XAF', 'فرنك وسط إفريقيا', 'Central African CFA Franc', 'FCFA', 605.0),
  // 79. الكونغو الديمقراطية (DR Congo)
  buildCountry('dr_congo', 'CD', '🇨🇩', 'جمهورية الكونغو الديمقراطية', 'DR Congo', 'Africa', 102000000, 'CDF', 'فرنك كونغولي', 'Congolese Franc', 'FC', 2850.0),
  // 80. تنزانيا (Tanzania)
  buildCountry('tanzania', 'TZ', '🇹🇿', 'تنزانيا', 'Tanzania', 'Africa', 67000000, 'TZS', 'شلن تنزاني', 'Tanzanian Shilling', 'TSh', 2650.0),
  // 81. أوغندا (Uganda)
  buildCountry('uganda', 'UG', '🇺🇬', 'أوغندا', 'Uganda', 'Africa', 49000000, 'UGX', 'شلن أوغندي', 'Ugandan Shilling', 'USh', 3750.0),
  // 82. أنغولا (Angola)
  buildCountry('angola', 'AO', '🇦🇴', 'أنغولا', 'Angola', 'Africa', 36000000, 'AOA', 'كوانزا أنغولي', 'Angolan Kwanza', 'Kz', 860.0),
  // 83. زامبيا (Zambia)
  buildCountry('zambia', 'ZM', '🇿🇲', 'زامبيا', 'Zambia', 'Africa', 20500000, 'ZMW', 'كواشا زامبي', 'Zambian Kwacha', 'ZK', 25.8),
  // 84. زيمبابوي (Zimbabwe)
  buildCountry('zimbabwe', 'ZW', '🇿🇼', 'زيمبابوي', 'Zimbabwe', 'Africa', 16000000, 'ZWG', 'ذهب زيمبابوي الجديد', 'Zimbabwe Gold', 'ZiG', 13.8),
  // 85. موزمبيق (Mozambique)
  buildCountry('mozambique', 'MZ', '🇲🇿', 'موزمبيق', 'Mozambique', 'Africa', 33000000, 'MZN', 'ميتيكال موزمبيقي', 'Mozambican Metical', 'MT', 63.9),
  // 86. مدغشقر (Madagascar)
  buildCountry('madagascar', 'MG', '🇲🇬', 'مدغشقر', 'Madagascar', 'Africa', 30000000, 'MGA', 'أرياري مدغشقري', 'Malagasy Ariary', 'Ar', 4500.0),
  // 87. فنزويلا (Venezuela)
  buildCountry('venezuela', 'VE', '🇻🇪', 'فنزويلا', 'Venezuela', 'Americas', 29000000, 'VES', 'بوليفار فنزويلي', 'Venezuelan Bolívar', 'Bs.', 36.5),
  // 88. الإكوادور (Ecuador)
  buildCountry('ecuador', 'EC', '🇪🇨', 'الإكوادور', 'Ecuador', 'Americas', 18000000, 'USD', 'دولار أمريكي محلي', 'US Dollar', '$', 1.0),
  // 89. بوليفيا (Bolivia)
  buildCountry('bolivia', 'BO', '🇧🇴', 'بوليفيا', 'Bolivia', 'Americas', 12300000, 'BOB', 'بوليفيانو', 'Bolivian Boliviano', 'Bs.', 6.91),
  // 90. باراغواي (Paraguay)
  buildCountry('paraguay', 'PY', '🇵🇾', 'باراغواي', 'Paraguay', 'Americas', 7400000, 'PYG', 'غواراني باراغواي', 'Paraguayan Guaraní', '₲', 7550.0),
  // 91. أوروغواي (Uruguay)
  buildCountry('uruguay', 'UY', '🇺🇾', 'أوروغواي', 'Uruguay', 'Americas', 3500000, 'UYU', 'بيزو أوروغواي', 'Uruguayan Peso', '$U', 39.8),
  // 92. كوبا (Cuba)
  buildCountry('cuba', 'CU', '🇨🇺', 'كوبا', 'Cuba', 'Americas', 11000000, 'CUP', 'بيزو كوبي', 'Cuban Peso', '₱', 24.0),
  // 93. جمهورية الدومينيكان (Dominican Republic)
  buildCountry('dominican_rep', 'DO', '🇩🇴', 'جمهورية الدومينيكان', 'Dominican Republic', 'Americas', 11300000, 'DOP', 'بيزو دومينيكاني', 'Dominican Peso', 'RD$', 59.2),
  // 94. غواتيمالا (Guatemala)
  buildCountry('guatemala', 'GT', '🇬🇹', 'غواتيمالا', 'Guatemala', 'Americas', 18000000, 'GTQ', 'كتزال غواتيمالي', 'Guatemalan Quetzal', 'Q', 7.78),
  // 95. كوستاريكا (Costa Rica)
  buildCountry('costa_rica', 'CR', '🇨🇷', 'كوستاريكا', 'Costa Rica', 'Americas', 5200000, 'CRC', 'كولون كوستاريكي', 'Costa Rican Colón', '₡', 525.0),
  // 96. بنما (Panama)
  buildCountry('panama', 'PA', '🇵🇦', 'بنما', 'Panama', 'Americas', 4450000, 'PAB', 'بالبوا بنمي', 'Panamanian Balboa', 'B/.', 1.0),
  // 97. سريلانكا (Sri Lanka)
  buildCountry('sri_lanka', 'LK', '🇱🇰', 'سريلانكا', 'Sri Lanka', 'Asia', 22000000, 'LKR', 'روبية سريلانكية', 'Sri Lankan Rupee', 'Rs', 304.0),
  // 98. نيبال (Nepal)
  buildCountry('nepal', 'NP', '🇳🇵', 'نيبال', 'Nepal', 'Asia', 31000000, 'NPR', 'روبية نيبالية', 'Nepalese Rupee', 'रू', 133.8),
  // 99. ميانمار (Myanmar)
  buildCountry('myanmar', 'MM', '🇲🇲', 'ميانمار', 'Myanmar', 'Asia', 54500000, 'MMK', 'كيات ميانماري', 'Myanmar Kyat', 'K', 2100.0),
  // 100. كمبوديا (Cambodia)
  buildCountry('cambodia', 'KH', '🇰🇭', 'كمبوديا', 'Cambodia', 'Asia', 17000000, 'KHR', 'ريال كمبودي', 'Cambodian Riel', '៛', 4100.0),
  // 101. لاوس (Laos)
  buildCountry('laos', 'LA', '🇱🇦', 'لاوس', 'Laos', 'Asia', 7600000, 'LAK', 'كيب لاوسي', 'Lao Kip', '₭', 22000.0),
  // 102. سنغافورة (listed above) -> بروناي (Brunei)
  buildCountry('brunei', 'BN', '🇧🇳', 'بروناي', 'Brunei', 'Asia', 450000, 'BND', 'دولار بروناي', 'Brunei Dollar', 'B$', 1.35),
  // 103. منغوليا (Mongolia)
  buildCountry('mongolia', 'MN', '🇲🇳', 'منغوليا', 'Mongolia', 'Asia', 3450000, 'MNT', 'توغروغ منغولي', 'Mongolian Tögrög', '₮', 3400.0),
  // 104. أفغانستان (Afghanistan)
  buildCountry('afghanistan', 'AF', '🇦🇫', 'أفغانستان', 'Afghanistan', 'Asia', 41000000, 'AFN', 'أفغاني', 'Afghan Afghani', '؋', 71.5),
  // 105. النرويج، أيسلندا (Iceland)
  buildCountry('iceland', 'IS', '🇮🇸', 'آيسلندا', 'Iceland', 'Europe', 390000, 'ISK', 'كرونة آيسلندية', 'Icelandic Króna', 'kr', 139.5),
  // 106. صربيا (Serbia)
  buildCountry('serbia', 'RS', '🇷🇸', 'صربيا', 'Serbia', 'Europe', 6650000, 'RSD', 'دينار صربي', 'Serbian Dinar', 'дин.', 108.0),
  // 107. كرواتيا (Croatia)
  buildCountry('croatia', 'HR', '🇭🇷', 'كرواتيا', 'Croatia', 'Europe', 3850000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 108. بلغاريا (Bulgaria)
  buildCountry('bulgaria', 'BG', '🇧🇬', 'بلغاريا', 'Bulgaria', 'Europe', 6450000, 'BGN', 'ليف بلغاري', 'Bulgarian Lev', 'лв', 1.8),
  // 109. سلوفاكيا (Slovakia)
  buildCountry('slovakia', 'SK', '🇸🇰', 'سلوفاكيا', 'Slovakia', 'Europe', 5450000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 110. سلوفينيا (Slovenia)
  buildCountry('slovenia', 'SI', '🇸🇮', 'سلوفينيا', 'Slovenia', 'Europe', 2100000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 111. ليتوانيا (Lithuania)
  buildCountry('lithuania', 'LT', '🇱🇹', 'ليتوانيا', 'Lithuania', 'Europe', 2800000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 112. لاتفيا (Latvia)
  buildCountry('latvia', 'LV', '🇱🇻', 'لاتفيا', 'Latvia', 'Europe', 1880000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 113. إستونيا (Estonia)
  buildCountry('estonia', 'EE', '🇪🇪', 'إستونيا', 'Estonia', 'Europe', 1360000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 114. بيلاروسيا (Belarus)
  buildCountry('belarus', 'BY', '🇧🇾', 'بيلاروسيا', 'Belarus', 'Europe', 9200000, 'BYN', 'روبل بيلاروسي', 'Belarusian Ruble', 'Br', 3.26),
  // 115. البوسنة والهرسك (Bosnia and Herzegovina)
  buildCountry('bosnia', 'BA', '🇧🇦', 'البوسنة والهرسك', 'Bosnia and Herzegovina', 'Europe', 3200000, 'BAM', 'مارك بوسني قابل للتحويل', 'Convertible Mark', 'KM', 1.8),
  // 116. ألبانيا (Albania)
  buildCountry('albania', 'AL', '🇦🇱', 'ألبانيا', 'Albania', 'Europe', 2750000, 'ALL', 'ليك ألباني', 'Albanian Lek', 'L', 93.5),
  // 117. مقدونيا الشمالية (North Macedonia)
  buildCountry('north_macedonia', 'MK', '🇲🇰', 'مقدونيا الشمالية', 'North Macedonia', 'Europe', 2050000, 'MKD', 'دينار مقدوني', 'Macedonian Denar', 'ден', 56.8),
  // 118. الجبل الأسود (Montenegro)
  buildCountry('montenegro', 'ME', '🇲🇪', 'الجبل الأسود', 'Montenegro', 'Europe', 620000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 119. قبرص (Cyprus)
  buildCountry('cyprus', 'CY', '🇨🇾', 'قبرص', 'Cyprus', 'Europe', 1250000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 120. مالطا (Malta)
  buildCountry('malta', 'MT', '🇲🇹', 'مالطا', 'Malta', 'Europe', 530000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 121. لوكسمبورغ (Luxembourg)
  buildCountry('luxembourg', 'LU', '🇱🇺', 'لوكسمبورغ', 'Luxembourg', 'Europe', 660000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 122. أرمينيا (Armenia)
  buildCountry('armenia', 'AM', '🇦🇲', 'أرمينيا', 'Armenia', 'Asia', 2970000, 'AMD', 'درام أرميني', 'Armenian Dram', '֏', 388.0),
  // 123. قيرغيزستان (Kyrgyzstan)
  buildCountry('kyrgyzstan', 'KG', '🇰🇬', 'قيرغيزستان', 'Kyrgyzstan', 'Asia', 7000000, 'KGS', 'سوم قيرغيزي', 'Kyrgyzstani Som', 'с', 87.5),
  // 124. طاجيكستان (Tajikistan)
  buildCountry('tajikistan', 'TJ', '🇹🇯', 'طاجيكستان', 'Tajikistan', 'Asia', 10100000, 'TJS', 'ساماني طاجيكي', 'Tajikistani Somoni', 'ЅМ', 10.9),
  // 125. تركمانستان (Turkmenistan)
  buildCountry('turkmenistan', 'TM', '🇹🇲', 'تركمانستان', 'Turkmenistan', 'Asia', 6500000, 'TMT', 'مانات تركمانستاني', 'Turkmenistan Manat', 'T', 3.5),
  // 126. تايوان (Taiwan)
  buildCountry('taiwan', 'TW', '🇹🇼', 'تايوان', 'Taiwan', 'Asia', 23500000, 'TWD', 'دولار تايواني جديد', 'New Taiwan Dollar', 'NT$', 32.5),
  // 127. هونغ كونغ (Hong Kong)
  buildCountry('hong_kong', 'HK', '🇭🇰', 'هونغ كونغ', 'Hong Kong', 'Asia', 7500000, 'HKD', 'دولار هونغ كونغ', 'Hong Kong Dollar', 'HK$', 7.81),
  // 128. فيجي (Fiji)
  buildCountry('fiji', 'FJ', '🇫🇯', 'فيجي', 'Fiji', 'Oceania', 930000, 'FJD', 'دولار فيجي', 'Fijian Dollar', 'FJ$', 2.26),
  // 129. بابوا غينيا الجديدة (Papua New Guinea)
  buildCountry('papua_new_guinea', 'PG', '🇵🇬', 'بابوا غينيا الجديدة', 'Papua New Guinea', 'Oceania', 10300000, 'PGK', 'كينا بابوا غينيا', 'Papua New Guinean Kina', 'K', 3.9),
  // 130. جزر سليمان (Solomon Islands)
  buildCountry('solomon_islands', 'SB', '🇸🇧', 'جزر سليمان', 'Solomon Islands', 'Oceania', 740000, 'SBD', 'دولار جزر سليمان', 'Solomon Islands Dollar', 'SI$', 8.45),
  // 131. فانواتو (Vanuatu)
  buildCountry('vanuatu', 'VU', '🇻🇺', 'فانواتو', 'Vanuatu', 'Oceania', 330000, 'VUV', 'فاتو فانواتي', 'Vanuatu Vatu', 'VT', 119.0),
  // 132. ساموا (Samoa)
  buildCountry('samoa', 'WS', '🇼🇸', 'ساموا', 'Samoa', 'Oceania', 220000, 'WST', 'تالا ساموي', 'Samoan Tala', 'WS$', 2.76),
  // 133. تونغا (Tonga)
  buildCountry('tonga', 'TO', '🇹🇴', 'تونغا', 'Tonga', 'Oceania', 105000, 'TOP', 'بانغا تونغي', 'Tongan Paʻanga', 'T$', 2.37),
  // 134. بالاو (Palau)
  buildCountry('palau', 'PW', '🇵🇼', 'بالاو', 'Palau', 'Oceania', 18000, 'USD', 'دولار أمريكي محلي', 'US Dollar', '$', 1.0),
  // 135. ميكرونيزيا (Micronesia)
  buildCountry('micronesia', 'FM', '🇫🇲', 'ولايات ميكرونيزيا الموحدة', 'Micronesia', 'Oceania', 115000, 'USD', 'دولار أمريكي', 'US Dollar', '$', 1.0),
  // 136. جزر مارشال (Marshall Islands)
  buildCountry('marshall_islands', 'MH', '🇲🇭', 'جزر مارشال', 'Marshall Islands', 'Oceania', 42000, 'USD', 'دولار أمريكي', 'US Dollar', '$', 1.0),
  // 137. ناورو (Nauru)
  buildCountry('nauru', 'NR', '🇳🇷', 'ناورو', 'Nauru', 'Oceania', 12500, 'AUD', 'دولار أسترالي', 'Australian Dollar', 'A$', 1.51),
  // 138. كيريباتي (Kiribati)
  buildCountry('kiribati', 'KI', '🇰🇮', 'كيريباتي', 'Kiribati', 'Oceania', 130000, 'AUD', 'دولار أسترالي', 'Australian Dollar', 'A$', 1.51),
  // 139. توفالو (Tuvalu)
  buildCountry('tuvalu', 'TV', '🇹🇻', 'توفالو', 'Tuvalu', 'Oceania', 11500, 'AUD', 'دولار أسترالي', 'Australian Dollar', 'A$', 1.51),
  // 140. جزر المالديف (Maldives)
  buildCountry('maldives', 'MV', '🇲🇻', 'جزر المالديف', 'Maldives', 'Asia', 520000, 'MVR', 'روفية مالديفية', 'Maldivian Rufiyaa', 'Rf', 15.4),
  // 141. بوتان (Bhutan)
  buildCountry('bhutan', 'BT', '🇧🇹', 'بوتان', 'Bhutan', 'Asia', 780000, 'BTN', 'نغولترم بوتاني', 'Bhutanese Ngultrum', 'Nu.', 83.65),
  // 142. رواندا (Rwanda)
  buildCountry('rwanda', 'RW', '🇷🇼', 'رواندا', 'Rwanda', 'Africa', 14000000, 'RWF', 'فرنك رواندي', 'Rwandan Franc', 'FRw', 1315.0),
  // 143. بوروندي (Burundi)
  buildCountry('burundi', 'BI', '🇧🇮', 'بوروندي', 'Burundi', 'Africa', 13200000, 'BIF', 'فرنك بوروندي', 'Burundian Franc', 'FBu', 2880.0),
  // 144. مالاوي (Malawi)
  buildCountry('malawi', 'MW', '🇲🇼', 'مالاوي', 'Malawi', 'Africa', 20800000, 'MWK', 'كواشا ملاوي', 'Malawian Kwacha', 'MK', 1740.0),
  // 145. ناميبيا (Namibia)
  buildCountry('namibia', 'NA', '🇳🇦', 'ناميبيا', 'Namibia', 'Africa', 2600000, 'NAD', 'دولار ناميبي', 'Namibian Dollar', 'N$', 18.25),
  // 146. بوتسوانا (Botswana)
  buildCountry('botswana', 'BW', '🇧🇼', 'بوتسوانا', 'Botswana', 'Africa', 2650000, 'BWP', 'بولا بوتسواني', 'Botswana Pula', 'P', 13.65),
  // 147. ليسوتو (Lesotho)
  buildCountry('lesotho', 'LS', '🇱🇸', 'ليسوتو', 'Lesotho', 'Africa', 2300000, 'LSL', 'لوتي ليسوتو', 'Lesotho Loti', 'L', 18.25),
  // 148. إسواتيني (Eswatini)
  buildCountry('eswatini', 'SZ', '🇸🇿', 'إسواتيني', 'Eswatini', 'Africa', 1200000, 'SZL', 'ليلانغيني', 'Swazi Lilangeni', 'E', 18.25),
  // 149. موريشيوس (Mauritius)
  buildCountry('mauritius', 'MU', '🇲🇺', 'موريشيوس', 'Mauritius', 'Africa', 1260000, 'MUR', 'روبي موريشي', 'Mauritian Rupee', '₨', 46.5),
  // 150. سيشل (Seychelles)
  buildCountry('seychelles', 'SC', '🇸🇨', 'سيشل', 'Seychelles', 'Africa', 100000, 'SCR', 'روبي سيشلي', 'Seychellois Rupee', 'SR', 13.6),
  // 151. جزر القمر (Comoros)
  buildCountry('comoros', 'KM', '🇰🇲', 'جزر القمر', 'Comoros', 'MENA', 850000, 'KMF', 'فرنك قمري', 'Comorian Franc', 'CF', 453.0),
  // 152. جيبوتي (Djibouti)
  buildCountry('djibouti', 'DJ', '🇩🇯', 'جيبوتي', 'Djibouti', 'MENA', 1130000, 'DJF', 'فرنك جيبوتي', 'Djiboutian Franc', 'Fdj', 177.72),
  // 153. إريتريا (Eritrea)
  buildCountry('eritrea', 'ER', '🇪🇷', 'إريتريا', 'Eritrea', 'Africa', 3700000, 'ERN', 'ناكفا إريتري', 'Eritrean Nakfa', 'Nfk', 15.0),
  // 154. جنوب السودان (South Sudan)
  buildCountry('south_sudan', 'SS', '🇸🇸', 'جنوب السودان', 'South Sudan', 'Africa', 11000000, 'SSP', 'جنيه جنوب السودان', 'South Sudanese Pound', '£', 1550.0),
  // 155. تشاد (Chad)
  buildCountry('chad', 'TD', '🇹🇩', 'تشاد', 'Chad', 'Africa', 18500000, 'XAF', 'فرنك وسط إفريقيا', 'Central African CFA Franc', 'FCFA', 605.0),
  // 156. النيجر (Niger)
  buildCountry('niger', 'NE', '🇳🇪', 'النيجر', 'Niger', 'Africa', 26000000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 157. مالي (Mali)
  buildCountry('mali', 'ML', '🇲🇱', 'مالي', 'Mali', 'Africa', 23000000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 158. بوركينا فاسو (Burkina Faso)
  buildCountry('burkina_faso', 'BF', '🇧🇫', 'بوركينا فاسو', 'Burkina Faso', 'Africa', 23200000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 159. غينيا (Guinea)
  buildCountry('guinea', 'GN', '🇬🇳', 'غينيا', 'Guinea', 'Africa', 14200000, 'GNF', 'فرنك غيني', 'Guinean Franc', 'FG', 8600.0),
  // 160. سيراليون (Sierra Leone)
  buildCountry('sierra_leone', 'SL', '🇸🇱', 'سيراليون', 'Sierra Leone', 'Africa', 8800000, 'SLE', 'ليون سيراليوني', 'Sierra Leonean Leone', 'Le', 22.8),
  // 161. ليبيريا (Liberia)
  buildCountry('liberia', 'LR', '🇱🇷', 'ليبيريا', 'Liberia', 'Africa', 5400000, 'LRD', 'دولار ليبيري', 'Liberian Dollar', 'L$', 194.0),
  // 162. توغو (Togo)
  buildCountry('togo', 'TG', '🇹🇬', 'توغو', 'Togo', 'Africa', 9000000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 163. بنين (Benin)
  buildCountry('benin', 'BJ', '🇧🇯', 'بنين', 'Benin', 'Africa', 13700000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 164. الغابون (Gabon)
  buildCountry('gabon', 'GA', '🇬🇦', 'الغابون', 'Gabon', 'Africa', 2400000, 'XAF', 'فرنك وسط إفريقيا', 'Central African CFA Franc', 'FCFA', 605.0),
  // 165. جمهورية الكونغو (Congo-Brazzaville)
  buildCountry('congo_rep', 'CG', '🇨🇬', 'جمهورية الكونغو (برازافيل)', 'Congo-Brazzaville', 'Africa', 6100000, 'XAF', 'فرنك وسط إفريقيا', 'Central African CFA Franc', 'FCFA', 605.0),
  // 166. جمهورية إفريقيا الوسطى (Central African Republic)
  buildCountry('car', 'CF', '🇨🇫', 'جمهورية إفريقيا الوسطى', 'Central African Republic', 'Africa', 5700000, 'XAF', 'فرنك وسط إفريقيا', 'Central African CFA Franc', 'FCFA', 605.0),
  // 167. غينيا الاستوائية (Equatorial Guinea)
  buildCountry('eq_guinea', 'GQ', '🇬🇶', 'غينيا الاستوائية', 'Equatorial Guinea', 'Africa', 1700000, 'XAF', 'فرنك وسط إفريقيا', 'Central African CFA Franc', 'FCFA', 605.0),
  // 168. غامبيا (Gambia)
  buildCountry('gambia', 'GM', '🇬🇲', 'غامبيا', 'Gambia', 'Africa', 2750000, 'GMD', 'دالاسي غامبي', 'Gambian Dalasi', 'D', 69.5),
  // 169. غينيا بيساو (Guinea-Bissau)
  buildCountry('guinea_bissau', 'GW', '🇬🇼', 'غينيا بيساو', 'Guinea-Bissau', 'Africa', 2150000, 'XOF', 'فرنك غرب إفريقيا', 'West African CFA Franc', 'CFA', 605.0),
  // 170. الرأس الأخضر (Cape Verde)
  buildCountry('cape_verde', 'CV', '🇨🇻', 'الرأس الأخضر', 'Cape Verde', 'Africa', 600000, 'CVE', 'إسكودو الرأس الأخضر', 'Cape Verdean Escudo', '$', 101.5),
  // 171. ساو تومي وبرينسيب (Sao Tome and Principe)
  buildCountry('sao_tome', 'ST', '🇸🇹', 'ساو تومي وبرينسيب', 'Sao Tome and Principe', 'Africa', 230000, 'STN', 'دوبرا ساو تومي', 'São Tomé Dobra', 'Db', 22.6),
  // 172. جامايكا (Jamaica)
  buildCountry('jamaica', 'JM', '🇯🇲', 'جامايكا', 'Jamaica', 'Americas', 2800000, 'JMD', 'دولار جامايكي', 'Jamaican Dollar', 'J$', 156.5),
  // 173. ترينيداد وتوباغو (Trinidad and Tobago)
  buildCountry('trinidad', 'TT', '🇹🇹', 'ترينيداد وتوباغو', 'Trinidad and Tobago', 'Americas', 1530000, 'TTD', 'دولار ترينيداد', 'Trinidad and Tobago Dollar', 'TT$', 6.78),
  // 174. البهاماس (Bahamas)
  buildCountry('bahamas', 'BS', '🇧🇸', 'البهاماس', 'Bahamas', 'Americas', 410000, 'BSD', 'دولار بهامي', 'Bahamian Dollar', 'B$', 1.0),
  // 175. بربادوس (Barbados)
  buildCountry('barbados', 'BB', '🇧🇧', 'بربادوس', 'Barbados', 'Americas', 280000, 'BBD', 'دولار بربادوسي', 'Barbadian Dollar', 'Bds$', 2.0),
  // 176. هايتي (Haiti)
  buildCountry('haiti', 'HT', '🇭🇹', 'هايتي', 'Haiti', 'Americas', 11700000, 'HTG', 'غورد هايتي', 'Haitian Gourde', 'G', 132.5),
  // 177. غيانا (Guyana)
  buildCountry('guyana', 'GY', '🇬🇾', 'غيانا', 'Guyana', 'Americas', 815000, 'GYD', 'دولار غياني', 'Guyanese Dollar', 'G$', 209.0),
  // 178. سورينام (Suriname)
  buildCountry('suriname', 'SR', '🇸🇷', 'سورينام', 'Suriname', 'Americas', 625000, 'SRD', 'دولار سورينامي', 'Surinamese Dollar', 'Sr$', 30.5),
  // 179. بليز (Belize)
  buildCountry('belize', 'BZ', '🇧🇿', 'بليز', 'Belize', 'Americas', 410000, 'BZD', 'دولار بليزي', 'Belize Dollar', 'BZ$', 2.0),
  // 180. هندوراس (Honduras)
  buildCountry('honduras', 'HN', '🇭🇳', 'هندوراس', 'Honduras', 'Americas', 10600000, 'HNL', 'ليمبيرا هندوراسي', 'Honduran Lempira', 'L', 24.7),
  // 181. السلفادور (El Salvador)
  buildCountry('el_salvador', 'SV', '🇸🇻', 'السلفادور', 'El Salvador', 'Americas', 6350000, 'USD', 'دولار أمريكي', 'US Dollar', '$', 1.0),
  // 182. نيكاراغوا (Nicaragua)
  buildCountry('nicaragua', 'NI', '🇳🇮', 'نيكاراغوا', 'Nicaragua', 'Americas', 7050000, 'NIO', 'كوردوبا نيكاراغوي', 'Nicaraguan Córdoba', 'C$', 36.8),
  // 183. سانت لوسيا (Saint Lucia)
  buildCountry('saint_lucia', 'LC', '🇱🇨', 'سانت لوسيا', 'Saint Lucia', 'Americas', 180000, 'XCD', 'دولار شرق الكاريبي', 'East Caribbean Dollar', 'EC$', 2.7),
  // 184. أنتيغوا وباربودا (Antigua and Barbuda)
  buildCountry('antigua', 'AG', '🇦🇬', 'أنتيغوا وباربودا', 'Antigua and Barbuda', 'Americas', 94000, 'XCD', 'دولار شرق الكاريبي', 'East Caribbean Dollar', 'EC$', 2.7),
  // 185. غرينادا (Grenada)
  buildCountry('grenada', 'GD', '🇬🇩', 'غرينادا', 'Grenada', 'Americas', 125000, 'XCD', 'دولار شرق الكاريبي', 'East Caribbean Dollar', 'EC$', 2.7),
  // 186. سانت فنسنت والغرينادين (Saint Vincent)
  buildCountry('saint_vincent', 'VC', '🇻🇨', 'سانت فنسنت والغرينادين', 'Saint Vincent', 'Americas', 104000, 'XCD', 'دولار شرق الكاريبي', 'East Caribbean Dollar', 'EC$', 2.7),
  // 187. سانت كيتس ونيفيس (Saint Kitts)
  buildCountry('saint_kitts', 'KN', '🇰🇳', 'سانت كيتس ونيفيس', 'Saint Kitts and Nevis', 'Americas', 48000, 'XCD', 'دولار شرق الكاريبي', 'East Caribbean Dollar', 'EC$', 2.7),
  // 188. دومينيكا (Dominica)
  buildCountry('dominica', 'DM', '🇩🇲', 'دومينيكا', 'Dominica', 'Americas', 73000, 'XCD', 'دولار شرق الكاريبي', 'East Caribbean Dollar', 'EC$', 2.7),
  // 189. أندورا (Andorra)
  buildCountry('andorra', 'AD', '🇦🇩', 'أندورا', 'Andorra', 'Europe', 80000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 190. موناكو (Monaco)
  buildCountry('monaco', 'MC', '🇲🇨', 'موناكو', 'Monaco', 'Europe', 39000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 191. ليختنشتاين (Liechtenstein)
  buildCountry('liechtenstein', 'LI', '🇱🇮', 'ليختنشتاين', 'Liechtenstein', 'Europe', 40000, 'CHF', 'فرنك سويسري', 'Swiss Franc', 'CHF', 0.895),
  // 192. سان مارينو (San Marino)
  buildCountry('san_marino', 'SM', '🇸🇲', 'سان مارينو', 'San Marino', 'Europe', 34000, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 193. الفاتيكان (Vatican City)
  buildCountry('vatican', 'VA', '🇻🇦', 'الفاتيكان', 'Vatican City', 'Europe', 800, 'EUR', 'يورو', 'Euro', '€', 0.922),
  // 194. مولدوفا (Moldova)
  buildCountry('moldova', 'MD', '🇲🇩', 'مولدوفا', 'Moldova', 'Europe', 2500000, 'MDL', 'ليو مولدوفي', 'Moldovan Leu', 'L', 17.8),
  // 195. تيمور الشرقية (East Timor)
  buildCountry('east_timor', 'TL', '🇹🇱', 'تيمور الشرقية', 'East Timor', 'Asia', 1350000, 'USD', 'دولار أمريكي محلي', 'US Dollar', '$', 1.0),
];

/**
 * Generate CSV / XLSX Compatible Text for 195 Countries
 */
export function generateSovereign195CSV(): string {
  const headers = [
    'الرقم',
    'الدولة',
    'Country',
    'الرمز',
    'القارة/الإقليم',
    'عدد الأحياء (السكان)',
    'العملة المحلية',
    'رمز العملة',
    'سعر الصرف للدولار (15 يوليو 2026)',
    'كود التحقق المثبت',
    'سعر 1 عنخ بالعملة المحلية',
    '14 مقفول لكل حي بالعملة المحلية',
    '12 عيشة بالعملة المحلية',
    '2 تقنية بالعملة المحلية',
    'إجمالي مخصص الدولة بالعملة المحلية',
    'إجمالي مخصص الدولة بالدولار ($)',
    'ملاحظات السند السيادي'
  ];

  const rows = SOVEREIGN_COUNTRIES_195.map((c, i) => [
    i + 1,
    `"${c.flag} ${c.nameAr}"`,
    `"${c.nameEn}"`,
    c.code,
    c.region,
    c.population,
    `"${c.currencyNameAr} (${c.currencyCode})"`,
    c.currencySymbol,
    c.fxRateToUSD,
    c.verifiedSourceCode || 'PQC-6236',
    c.ankhLocalRate,
    c.locked14Local,
    c.living12Local,
    c.tech2Local,
    c.totalCountryLocal,
    c.totalCountryUSD,
    `"${c.notes || '14 مقفول - 0 ملاءة'}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
