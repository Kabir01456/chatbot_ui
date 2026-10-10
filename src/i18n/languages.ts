import type { LanguageCode } from './types';

export interface LanguageInfo {
  code: LanguageCode;
  /** Display name in English */
  name: string;
  /** Display name in native script */
  nativeName: string;
  /** BCP 47 tag for IndicTrans2 */
  indicTransCode: string;
  /** Script direction */
  dir: 'ltr' | 'rtl';
  /** Whether IndicTrans2 supports this language */
  supported: boolean;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', indicTransCode: 'eng_Latn', dir: 'ltr', supported: true },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', indicTransCode: 'asm_Beng', dir: 'ltr', supported: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', indicTransCode: 'ben_Beng', dir: 'ltr', supported: true },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', indicTransCode: 'brx_Deva', dir: 'ltr', supported: true },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', indicTransCode: 'doi_Deva', dir: 'ltr', supported: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', indicTransCode: 'guj_Gujr', dir: 'ltr', supported: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', indicTransCode: 'hin_Deva', dir: 'ltr', supported: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', indicTransCode: 'kan_Knda', dir: 'ltr', supported: true },
  { code: 'ks-Deva', name: 'Kashmiri (Devanagari)', nativeName: 'कश्मीरी', indicTransCode: 'kas_Deva', dir: 'ltr', supported: true },
  { code: 'ks-Arab', name: 'Kashmiri (Arabic)', nativeName: 'کشمیری', indicTransCode: 'kas_Arab', dir: 'rtl', supported: true },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', indicTransCode: 'kok_Deva', dir: 'ltr', supported: true },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', indicTransCode: 'mai_Deva', dir: 'ltr', supported: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', indicTransCode: 'mal_Mlym', dir: 'ltr', supported: true },
  { code: 'mni-Beng', name: 'Manipuri (Bengali)', nativeName: 'মৈতৈলোন্', indicTransCode: 'mni_Beng', dir: 'ltr', supported: true },
  { code: 'mni-Mtei', name: 'Manipuri (Meitei)', nativeName: 'ꯃꯤꯇꯩꯂꯣꯟ', indicTransCode: 'mni_Mtei', dir: 'ltr', supported: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', indicTransCode: 'mar_Deva', dir: 'ltr', supported: true },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', indicTransCode: 'npi_Deva', dir: 'ltr', supported: true },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', indicTransCode: 'ory_Orya', dir: 'ltr', supported: true },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', indicTransCode: 'pan_Guru', dir: 'ltr', supported: true },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', indicTransCode: 'san_Deva', dir: 'ltr', supported: true },
  { code: 'sat', name: 'Santali', nativeName: 'संताली', indicTransCode: 'sat_Olck', dir: 'ltr', supported: true },
  { code: 'sd-Deva', name: 'Sindhi (Devanagari)', nativeName: 'सिन्धी', indicTransCode: 'snd_Deva', dir: 'ltr', supported: true },
  { code: 'sd-Arab', name: 'Sindhi (Arabic)', nativeName: 'سنڌي', indicTransCode: 'snd_Arab', dir: 'rtl', supported: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', indicTransCode: 'tam_Taml', dir: 'ltr', supported: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', indicTransCode: 'tel_Telu', dir: 'ltr', supported: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', indicTransCode: 'urd_Arab', dir: 'rtl', supported: true },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function getLanguageInfo(code: LanguageCode): LanguageInfo {
  return LANGUAGES.find(l => l.code === code) ?? LANGUAGES[0];
}
