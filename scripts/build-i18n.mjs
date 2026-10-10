import fs from 'fs';
import path from 'path';

const outDir = path.join('c:', 'Users', 'yasmi', 'Downloads', 'chatbot-test', 'src', 'i18n');
const transDir = path.join(outDir, 'translations');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(transDir)) fs.mkdirSync(transDir, { recursive: true });

const typesContent = `export interface Translations {
  assistantName: string;
  assistantSubtitle: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  greetingWithName: string;
  greetingDefault: string;
  inputPlaceholder: string;
  sendMessage: string;
  startNewConversation: string;
  switchToLightMode: string;
  switchToDarkMode: string;
  expandChat: string;
  restoreDefaultSize: string;
  closeChat: string;
  openAssistant: string;
  closeAssistant: string;
  selectLanguage: string;
  searchLanguages: string;
  retry: string;
  loadingConversation: string;
  suggestedQuestions: string;
  youSaid: string;
  assistantSaid: string;
  resizeChat: string;
  dismiss: string;
  viewDetails: string;
  errorNetwork: string;
  errorTimeout: string;
  errorAuth: string;
  errorEmpty: string;
  errorServer: string;
  errorDisconnected: string;
  suggestion1: string;
  suggestion2: string;
  suggestion3: string;
  suggestion4: string;
  suggestion5: string;
  teaserMessage: string;
  teaserQuestion1: string;
  teaserQuestion2: string;
  careerMatch: string;
  course: string;
  skillGap: string;
  learningPath: string;
  jobRole: string;
  requiredSkills: string;
  toDevelop: string;
  youWillBuild: string;
  missing: string;
  needsStrengthening: string;
  skills: string;
  match: string;
  gapsFor: string;
  yourSkillGaps: string;
  typingIndicator: string;
  careerAssistantTip: string;
  languageUnsupported: string;
}

export type LanguageCode =
  | 'en' | 'as' | 'bn' | 'brx' | 'doi' | 'gu' | 'hi' | 'kn'
  | 'ks-Deva' | 'ks-Arab' | 'kok' | 'mai' | 'ml' | 'mni-Beng'
  | 'mni-Mtei' | 'mr' | 'ne' | 'or' | 'pa' | 'sa' | 'sat'
  | 'sd-Deva' | 'sd-Arab' | 'ta' | 'te' | 'ur';
`;

fs.writeFileSync(path.join(outDir, 'types.ts'), typesContent);

const enBaseStr = '{"assistantName":"NCCT Career Assistant","assistantSubtitle":"AI Career Guidance","welcomeTitle":"Your Career Journey Starts Here","welcomeSubtitle":"Get personalized guidance based on your NCCT profile.","greetingWithName":"Hi {name}! 👋\\n\\nI\'m your NCCT Career Guidance Assistant.\\n\\nBased on your profile, I can help you explore career paths, improve your skills, find relevant courses, and understand what to learn next.\\n\\nWhat would you like to explore?","greetingDefault":"Hi there! 👋\\n\\nI\'m your NCCT Career Guidance Assistant.\\n\\nBased on your profile, I can help you explore career paths, improve your skills, find relevant courses, and understand what to learn next.\\n\\nWhat would you like to explore?","inputPlaceholder":"Ask about your career, skills, courses or opportunities...","sendMessage":"Send message","startNewConversation":"Start new conversation","switchToLightMode":"Switch to light mode","switchToDarkMode":"Switch to dark mode","expandChat":"Expand chat","restoreDefaultSize":"Restore default size","closeChat":"Close chat","openAssistant":"Open NCCT Career Assistant","closeAssistant":"Close NCCT Career Assistant","selectLanguage":"Select Language","searchLanguages":"Search languages...","retry":"Retry","loadingConversation":"Loading conversation…","suggestedQuestions":"Suggested questions","youSaid":"You said:","assistantSaid":"Assistant said:","resizeChat":"Resize chat window. Drag, or use the arrow keys.","dismiss":"Dismiss","viewDetails":"View details","errorNetwork":"I\'m having trouble connecting right now. Please try again.","errorTimeout":"That took longer than expected. Please try again.","errorAuth":"Your session has expired. Please sign in again to continue.","errorEmpty":"I couldn\'t come up with a response. Please try rephrasing your question.","errorServer":"Something went wrong on our side. Please try again in a moment.","errorDisconnected":"The connection was lost. Please try again.","suggestion1":"Based on my skills, where do I stand?","suggestion2":"Suggest a career path for me","suggestion3":"Which skills should I improve?","suggestion4":"Recommend courses for my career","suggestion5":"What skills are currently in demand?","teaserMessage":"Hello! I\'m NCCT Career AI. 👋 Wondering where you stand? I can help you explore.","teaserQuestion1":"What is NCCT Career AI?","teaserQuestion2":"Based on my skills, where do I stand?","careerMatch":"Career match","course":"Course","skillGap":"Skill gap","learningPath":"Learning path","jobRole":"Job role","requiredSkills":"Required skills","toDevelop":"To develop","youWillBuild":"You will build","missing":"Missing","needsStrengthening":"Needs strengthening","skills":"Skills","match":"match","gapsFor":"Gaps for {role}","yourSkillGaps":"Your skill gaps","typingIndicator":"NCCT Career Assistant is thinking…","careerAssistantTip":"Career assistant tip","languageUnsupported":"This language is not fully supported yet. Some text may appear in English."}';

const enBase = JSON.parse(enBaseStr);

const languages = {
  'en': { name: 'en', fallback: enBase },
  'hi': { name: 'hi', overrides: {
    assistantName: 'एनसीसीटी करियर सहायक',
    assistantSubtitle: 'एआई करियर मार्गदर्शन',
    welcomeTitle: 'आपकी करियर यात्रा यहाँ शुरू होती है',
    welcomeSubtitle: 'अपनी एनसीसीटी प्रोफ़ाइल के आधार पर व्यक्तिगत मार्गदर्शन प्राप्त करें।',
    greetingWithName: 'नमस्ते {name}! 👋\\n\\nमैं आपका एनसीसीटी करियर मार्गदर्शन सहायक हूँ।\\n\\nआपकी प्रोफ़ाइल के आधार पर, मैं करियर के विकल्प तलाशने, आपके कौशल को निखारने, और पाठ्यक्रम खोजने में आपकी मदद कर सकता हूँ।\\n\\nआप क्या जानना चाहेंगे?',
    greetingDefault: 'नमस्ते! 👋\\n\\nमैं आपका एनसीसीटी करियर मार्गदर्शन सहायक हूँ।\\n\\nआपकी प्रोफ़ाइल के आधार पर, मैं करियर के विकल्प तलाशने, आपके कौशल को निखारने, और पाठ्यक्रम खोजने में आपकी मदद कर सकता हूँ।\\n\\nआप क्या जानना चाहेंगे?',
    inputPlaceholder: 'अपने करियर, कौशल, पाठ्यक्रमों या अवसरों के बारे में पूछें...',
    sendMessage: 'संदेश भेजें',
    startNewConversation: 'नयी बातचीत शुरू करें',
    switchToLightMode: 'लाइट मोड में बदलें',
    switchToDarkMode: 'डार्क मोड में बदलें',
    expandChat: 'चैट का विस्तार करें',
    restoreDefaultSize: 'डिफ़ॉल्ट आकार बहाल करें',
    closeChat: 'चैट बंद करें',
    openAssistant: 'एनसीसीटी करियर सहायक खोलें',
    closeAssistant: 'एनसीसीटी करियर सहायक बंद करें',
    selectLanguage: 'भाषा चुनें',
    searchLanguages: 'भाषाएं खोजें...',
    retry: 'पुनः प्रयास करें',
    loadingConversation: 'बातचीत लोड हो रही है…',
    suggestedQuestions: 'सुझाए गए प्रश्न',
    youSaid: 'आपने कहा:',
    assistantSaid: 'सहायक ने कहा:',
    resizeChat: 'चैट विंडो का आकार बदलें। खींचें, या तीर कुंजियों का उपयोग करें।',
    dismiss: 'खारिज करें',
    viewDetails: 'विवरण देखें',
    errorNetwork: 'मुझे अभी कनेक्ट करने में समस्या हो रही है। कृपया पुनः प्रयास करें।',
    errorTimeout: 'उम्मीद से अधिक समय लगा। कृपया पुनः प्रयास करें।',
    errorAuth: 'आपका सत्र समाप्त हो गया है। कृपया जारी रखने के लिए फिर से साइन इन करें।',
    errorEmpty: 'मैं जवाब नहीं दे सका। कृपया अपना प्रश्न फिर से तैयार करने का प्रयास करें।',
    errorServer: 'हमारी तरफ कुछ गलत हो गया है। कृपया कुछ देर बाद फिर से प्रयास करें।',
    errorDisconnected: 'कनेक्शन टूट गया था। कृपया पुनः प्रयास करें।',
    suggestion1: 'मेरे कौशल के आधार पर, मैं कहाँ खड़ा हूँ?',
    suggestion2: 'मेरे लिए एक करियर पथ सुझाएं',
    suggestion3: 'मुझे किन कौशलों में सुधार करना चाहिए?',
    suggestion4: 'मेरे करियर के लिए पाठ्यक्रमों की सिफारिश करें',
    suggestion5: 'वर्तमान में किन कौशलों की मांग है?',
    teaserMessage: 'नमस्ते! मैं एनसीसीटी करियर एआई हूँ। 👋 सोच रहे हैं कि आप कहाँ खड़े हैं? मैं आपकी मदद कर सकता हूँ।',
    teaserQuestion1: 'एनसीसीटी करियर एआई क्या है?',
    teaserQuestion2: 'मेरे कौशल के आधार पर, मैं कहाँ खड़ा हूँ?',
    careerMatch: 'करियर मैच',
    course: 'पाठ्यक्रम',
    skillGap: 'कौशल अंतर',
    learningPath: 'सीखने का मार्ग',
    jobRole: 'नौकरी की भूमिका',
    requiredSkills: 'आवश्यक कौशल',
    toDevelop: 'विकसित करने के लिए',
    youWillBuild: 'आप निर्माण करेंगे',
    missing: 'लापता',
    needsStrengthening: 'मजबूत करने की आवश्यकता है',
    skills: 'कौशल',
    match: 'मैच',
    gapsFor: '{role} के लिए अंतर',
    yourSkillGaps: 'आपके कौशल अंतराल',
    typingIndicator: 'एनसीसीटी करियर सहायक सोच रहा है…',
    careerAssistantTip: 'करियर सहायक टिप',
    languageUnsupported: 'यह भाषा अभी पूरी तरह से समर्थित नहीं है। कुछ पाठ अंग्रेजी में दिखाई दे सकता है।'
  }},
  'bn': { name: 'bn', overrides: {
    assistantName: 'এনসিসিটি ক্যারিয়ার সহকারী',
    assistantSubtitle: 'এআই ক্যারিয়ার গাইডেন্স',
    welcomeTitle: 'আপনার ক্যারিয়ার যাত্রা এখানে শুরু হয়',
    welcomeSubtitle: 'আপনার এনসিসিটি প্রোফাইলের উপর ভিত্তি করে ব্যক্তিগতকৃত নির্দেশিকা পান।',
    greetingWithName: 'নমস্কার {name}! 👋\\n\\nআমি আপনার এনসিসিটি ক্যারিয়ার নির্দেশিকা সহকারী।\\n\\nআপনার প্রোফাইলের উপর ভিত্তি করে, আমি আপনাকে ক্যারিয়ারের পথগুলি অন্বেষণ করতে, আপনার দক্ষতা উন্নত করতে, প্রাসঙ্গিক কোর্সগুলি সন্ধান করতে সাহায্য করতে পারি।\\n\\nআপনি কি অন্বেষণ করতে চান?',
    greetingDefault: 'নমস্কার! 👋\\n\\nআমি আপনার এনসিসিটি ক্যারিয়ার নির্দেশিকা সহকারী।\\n\\nআপনার প্রোফাইলের উপর ভিত্তি করে, আমি আপনাকে ক্যারিয়ারের পথগুলি অন্বেষণ করতে, আপনার দক্ষতা উন্নত করতে, প্রাসঙ্গিক কোর্সগুলি সন্ধান করতে সাহায্য করতে পারি।\\n\\nআপনি কি অন্বেষণ করতে চান?',
    inputPlaceholder: 'আপনার ক্যারিয়ার, দক্ষতা, কোর্স বা সুযোগ সম্পর্কে জিজ্ঞাসা করুন...',
    sendMessage: 'বার্তা পাঠান',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    searchLanguages: 'ভাষা খুঁজুন...',
    retry: 'পুনরায় চেষ্টা করুন'
  }},
  'ta': { name: 'ta', overrides: {
    assistantName: 'NCCT தொழில் உதவியாளர்',
    assistantSubtitle: 'AI தொழில் வழிகாட்டுதல்',
    welcomeTitle: 'உங்கள் தொழில் பயணம் இங்கே தொடங்குகிறது',
    welcomeSubtitle: 'உங்கள் NCCT சுயவிவரத்தின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட வழிகாட்டுதலைப் பெறுங்கள்.',
    greetingWithName: 'வணக்கம் {name}! 👋\\n\\nநான் உங்கள் NCCT தொழில் வழிகாட்டுதல் உதவியாளர்.\\n\\nநீங்கள் என்ன ஆராய விரும்புகிறீர்கள்?',
    greetingDefault: 'வணக்கம்! 👋\\n\\nநான் உங்கள் NCCT தொழில் வழிகாட்டுதல் உதவியாளர்.\\n\\nநீங்கள் என்ன ஆராய விரும்புகிறீர்கள்?',
    inputPlaceholder: 'உங்கள் தொழில், திறன்கள், படிப்புகள் அல்லது வாய்ப்புகள் பற்றி கேளுங்கள்...',
    sendMessage: 'செய்தியை அனுப்பு',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    searchLanguages: 'மொழிகளைத் தேடு...'
  }},
  'te': { name: 'te', overrides: {
    assistantName: 'NCCT కెరీర్ అసిస్టెంట్',
    assistantSubtitle: 'AI కెరీర్ మార్గదర్శకత్వం',
    welcomeTitle: 'మీ కెరీర్ ప్రయాణం ఇక్కడ ప్రారంభమవుతుంది',
    inputPlaceholder: 'మీ కెరీర్, నైపుణ్యాలు లేదా అవకాశాల గురించి అడగండి...',
    sendMessage: 'సందేశం పంపండి',
    selectLanguage: 'భాషను ఎంచుకోండి',
    searchLanguages: 'భాషలను వెతకండి...'
  }},
  'gu': { name: 'gu', overrides: {
    assistantName: 'NCCT કારકિર્દી સહાયક',
    assistantSubtitle: 'AI કારકિર્દી માર્ગદર્શન',
    sendMessage: 'સંદેશ મોકલો',
    selectLanguage: 'ભાષા પસંદ કરો'
  }},
  'mr': { name: 'mr', overrides: {
    assistantName: 'NCCT करिअर सहाय्यक',
    assistantSubtitle: 'AI करिअर मार्गदर्शन',
    sendMessage: 'संदेश पाठवा',
    selectLanguage: 'भाषा निवडा'
  }},
  'kn': { name: 'kn', overrides: {
    assistantName: 'NCCT ವೃತ್ತಿ ಸಹಾಯಕ',
    assistantSubtitle: 'AI ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ',
    sendMessage: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'
  }},
  'ml': { name: 'ml', overrides: {
    assistantName: 'NCCT കരിയർ അസിസ്റ്റൻ്റ്',
    assistantSubtitle: 'AI കരിയർ ഗൈഡൻസ്',
    sendMessage: 'സന്ദേശം അയയ്ക്കുക',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക'
  }},
  'pa': { name: 'pa', overrides: {
    assistantName: 'NCCT ਕਰੀਅਰ ਅਸਿਸਟੈਂਟ',
    assistantSubtitle: 'AI ਕਰੀਅਰ ਗਾਈਡੈਂਸ',
    sendMessage: 'ਸੁਨੇਹਾ ਭੇਜੋ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ'
  }},
  'or': { name: 'oriya', overrides: {
    assistantName: 'NCCT କ୍ୟାରିଅର୍ ସହାୟକ',
    assistantSubtitle: 'AI କ୍ୟାରିଅର୍ ମାର୍ଗଦର୍ଶନ',
    sendMessage: 'ବାର୍ତ୍ତା ପଠାନ୍ତୁ',
    selectLanguage: 'ଭାଷା ବାଛନ୍ତୁ'
  }},
  'as': { name: 'assamese', overrides: {
    assistantName: 'NCCT কেৰিয়াৰ সহায়ক',
    assistantSubtitle: 'AI কেৰিয়াৰ নিৰ্দেশনা',
    sendMessage: 'বাৰ্তা পঠাওক',
    selectLanguage: 'ভাষা বাছক'
  }},
  'ur': { name: 'ur', overrides: {
    assistantName: 'این سی سی ٹی کیریئر اسسٹنٹ',
    assistantSubtitle: 'اے آئی کیریئر گائیڈنس',
    sendMessage: 'پیغام بھیجیں',
    selectLanguage: 'زبان منتخب کریں'
  }},
  'ne': { name: 'ne', overrides: {
    assistantName: 'NCCT क्यारियर सहायक',
    assistantSubtitle: 'AI क्यारियर मार्गदर्शन',
    sendMessage: 'सन्देश पठाउनुहोस्',
    selectLanguage: 'भाषा चयन गर्नुहोस्'
  }},
  'sa': { name: 'sa', overrides: {
    assistantName: 'NCCT वृत्तिसहायकः',
    assistantSubtitle: 'AI वृत्तिमार्गदर्शनम्',
    sendMessage: 'सन्देशं प्रेषयतु',
    selectLanguage: 'भाषाम् चिनोतु'
  }},
  'mai': { name: 'mai', overrides: {
    assistantName: 'NCCT करियर सहायक',
    assistantSubtitle: 'AI करियर मार्गदर्शन',
    sendMessage: 'संदेश पठाउ',
    selectLanguage: 'भाषा चुनु'
  }},
  'kok': { name: 'kok', overrides: {
    assistantName: 'NCCT करिअर सहाय्यक',
    assistantSubtitle: 'AI करिअर मार्गदर्शन',
    sendMessage: 'संदेश धाड',
    selectLanguage: 'भास वेंचून काड'
  }},
  'brx': { name: 'brx', overrides: {
    assistantName: 'NCCT Career Assistant (Bodo)',
    sendMessage: 'Send message',
    selectLanguage: 'Select Language'
  }},
  'doi': { name: 'doi', overrides: {
    assistantName: 'NCCT Career Assistant (Dogri)',
    sendMessage: 'Send message'
  }},
  'ks-Deva': { name: 'ksDeva', overrides: {
    assistantName: 'NCCT करियर सहायक (Kashmiri)'
  }},
  'ks-Arab': { name: 'ksArab', overrides: {
    assistantName: 'NCCT کیریئر اسسٹنٹ'
  }},
  'mni-Beng': { name: 'mniBeng', overrides: {
    assistantName: 'এনসিসিটি ক্যারিয়ার অ্যাসিস্ট্যান্ট'
  }},
  'mni-Mtei': { name: 'mniMtei', overrides: {
    assistantName: 'NCCT Career Assistant (Manipuri)'
  }},
  'sat': { name: 'sat', overrides: {
    assistantName: 'NCCT Career Assistant (Santali)'
  }},
  'sd-Deva': { name: 'sdDeva', overrides: {
    assistantName: 'NCCT करियर सहायक (Sindhi)'
  }},
  'sd-Arab': { name: 'sdArab', overrides: {
    assistantName: 'اين سي سي ٽي ڪيريئر اسسٽنٽ'
  }}
};

const allLangs = [
  'en', 'hi', 'bn', 'ta', 'te', 'gu', 'mr', 'kn', 'ml', 'pa', 'or', 'as', 'ur',
  'ne', 'sa', 'mai', 'kok', 'brx', 'doi', 'ks-Deva', 'ks-Arab', 'mni-Beng',
  'mni-Mtei', 'sat', 'sd-Deva', 'sd-Arab'
];

let indexContent = "import type { LanguageCode, Translations } from '../types';\\n";

for (const langKey of allLangs) {
  const info = languages[langKey];
  const exportName = info ? info.name : langKey.replace(/[^a-zA-Z]/g, '');
  const data = info ? info.overrides || info.fallback : {};
  
  // merge with enBase
  const fullData = { ...enBase, ...data };
  
  let fileContent = "import type { Translations } from '../types';\\n\\nexport const " + exportName + ": Translations = {\\n";
  for (const [k, v] of Object.entries(fullData)) {
    const escapedStr = String(v).replace(/'/g, "\\\\'");
    fileContent += "  " + k + ": '" + escapedStr + "',\\n";
  }
  fileContent += "};\\n";
  
  fs.writeFileSync(path.join(transDir, langKey + '.ts'), fileContent);
  
  indexContent += "import { " + exportName + " } from './" + langKey + "';\\n";
}

indexContent += "\\nexport const translations: Record<LanguageCode, Translations> = {\\n";
for (const langKey of allLangs) {
  const info = languages[langKey];
  const exportName = info ? info.name : langKey.replace(/[^a-zA-Z]/g, '');
  if (langKey === exportName) {
    indexContent += "  '" + langKey + "': " + exportName + ",\\n";
  } else {
    indexContent += "  '" + langKey + "': " + exportName + ",\\n";
  }
}
indexContent += "};\\n";

fs.writeFileSync(path.join(transDir, 'index.ts'), indexContent);
console.log('Successfully generated all translation files.');
