// 多言語対応ロジック

// 言語設定を取得
function getLanguage() {
  // LocalStorageに保存された言語設定を優先
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang;
  }
  
  // ブラウザの言語設定を取得
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 日本語（ja, ja-JP）の場合は'ja'、それ以外は'en'
  if (browserLang.startsWith('ja')) {
    return 'ja';
  }
  return 'en';
}

// 言語を設定
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updatePageLanguage(lang);
  updateLanguageToggle(lang);
}

// ページ内の全テキストを指定言語に更新
function updatePageLanguage(lang) {
  // HTML lang属性を更新
  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
  
  // data-i18n属性を持つ全要素を取得して更新
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translations = {
      ja: element.getAttribute('data-ja'),
      en: element.getAttribute('data-en')
    };
    
    if (translations[lang]) {
      // テキストコンテンツを更新（HTMLタグがある場合はinnerHTMLを使用）
      if (element.tagName === 'TITLE' || element.hasAttribute('data-text-only')) {
        element.textContent = translations[lang];
      } else {
        element.innerHTML = translations[lang];
      }
    }
  });
  
  // alt属性の更新
  const imgElements = document.querySelectorAll('img[data-alt-ja][data-alt-en]');
  imgElements.forEach(img => {
    const altText = lang === 'ja' ? img.getAttribute('data-alt-ja') : img.getAttribute('data-alt-en');
    if (altText) {
      img.alt = altText;
    }
  });
}

// 言語切替ボタンの表示を更新
function updateLanguageToggle(lang) {
  const jaBtn = document.getElementById('lang-ja');
  const enBtn = document.getElementById('lang-en');
  
  if (jaBtn && enBtn) {
    if (lang === 'ja') {
      jaBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      jaBtn.classList.remove('active');
      enBtn.classList.add('active');
    }
  }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  const currentLang = getLanguage();
  updatePageLanguage(currentLang);
  updateLanguageToggle(currentLang);
  
  // 言語切替ボタンのイベントリスナー
  const jaBtn = document.getElementById('lang-ja');
  const enBtn = document.getElementById('lang-en');
  
  if (jaBtn) {
    jaBtn.addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage('ja');
    });
  }
  
  if (enBtn) {
    enBtn.addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage('en');
    });
  }
});

