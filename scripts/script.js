const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const langMenu = document.querySelector('.header__lang-menu');
const langButton = document.querySelector('.header__lang-button');
const currentFlag = document.getElementById('current-lang-flag');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });

    if (button.classList.contains('header__theme-menu-button_type_light')) {
      changeTheme('light');
    } else if (button.classList.contains('header__theme-menu-button_type_dark')) {
      changeTheme('dark');
    } else {
      changeTheme('auto');
    }

    button.classList.add('header__theme-menu-button_active');
    button.setAttribute('disabled', true);
  });
});

function changeTheme(theme) {
  document.body.className = 'page';
  document.body.classList.add(`theme_${theme}`);
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const theme = localStorage.getItem('theme') || 'auto';
  changeTheme(theme);

  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.removeAttribute('disabled');
  });

  const currentBtn = document.querySelector(`.header__theme-menu-button_type_${theme}`);
  if (currentBtn) {
    currentBtn.classList.add('header__theme-menu-button_active');
    currentBtn.setAttribute('disabled', true);
  }
}

const flagPaths = {
  ru: 'images/svg/ru.svg',
  en: 'images/svg/us.svg',
};

const pageTitles = {
  ru: 'Сложно сосредоточиться',
  en: 'Hard to focus',
};

function switchLanguage(lang) {
  document.querySelectorAll('[data-lang]:not(.header__lang-menu *)').forEach((el) => {
    el.style.display = el.dataset.lang === lang ? '' : 'none';
    el.setAttribute('aria-hidden', el.dataset.lang !== lang);
  });

  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('img:not(.header__lang-menu img):not(#current-lang-flag)[data-alt-ru][data-alt-en]').forEach((img) => {
    img.setAttribute('alt', img.getAttribute(`data-alt-${lang}`));
  });

  currentFlag.src = flagPaths[lang];
  document.title = pageTitles[lang];
  langMenu.classList.remove('lang-menu_open');

  localStorage.setItem('language', lang);
}

function initLanguage() {
  let savedLang = localStorage.getItem('language');
  if (!savedLang) {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    savedLang = ['ru', 'en'].includes(browserLang) ? browserLang : 'en';
  }
  switchLanguage(savedLang);
}

function toggleLangMenu() {
  langMenu.classList.toggle('lang-menu_open');
  const expanded = langMenu.classList.contains('lang-menu_open');
  langButton.setAttribute('aria-expanded', expanded);
}

langButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleLangMenu();
});

langMenu.querySelectorAll('button[data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedLang = btn.getAttribute('data-lang');
    switchLanguage(selectedLang);
  });
});

window.addEventListener('click', () => {
  langMenu.classList.remove('lang-menu_open');
  langButton.setAttribute('aria-expanded', false);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    langMenu.classList.remove('lang-menu_open');
    langButton.setAttribute('aria-expanded', false);
  }
});

initTheme();
initLanguage();