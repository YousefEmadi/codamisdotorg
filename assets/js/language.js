// Language switching functionality
let currentLanguage = 'en';

function switchLanguage(lang) {
    // Update current language
    currentLanguage = lang;
    
    // Hide all elements (including mobile nav panel)
    const allLangElements = document.querySelectorAll('[data-lang], [data-lang-block]');
    allLangElements.forEach(el => {
        el.classList.remove('active');
    });
    
    // Show elements for selected language (including mobile nav panel)
    const selectedElements = document.querySelectorAll(`[data-lang="${lang}"], [data-lang-block="${lang}"]`);
    selectedElements.forEach(el => {
        el.classList.add('active');
    });
    
    // Update desktop button states
    document.querySelectorAll('#nav .language-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    const desktopBtn = document.querySelector(`#nav #${lang}-btn`);
    if (desktopBtn) {
        desktopBtn.classList.add('active');
    }
    
    // Update mobile button states
    document.querySelectorAll('#navPanel .language-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    const mobileBtn = document.querySelector(`#navPanel #mobile-${lang}-btn`);
    if (mobileBtn) {
        mobileBtn.classList.add('active');
    }
    
    // Close mobile navigation panel if it's open (same behavior as other nav items)
    if (window.innerWidth <= 736) { // Mobile breakpoint
        const body = document.querySelector('body');
        if (body && body.classList.contains('navPanel-visible')) {
            body.classList.remove('navPanel-visible');
        }
    }
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Debug log to check what's happening
    console.log(`Switched to ${lang}, active elements:`, document.querySelectorAll(`[data-lang="${lang}"].active`).length);
}

// Function to add language switcher to mobile nav panel
function addMobileLanguageSwitcher() {
    const navPanel = document.getElementById('navPanel');
    if (navPanel && !navPanel.querySelector('.language-switcher')) {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <button onclick="switchLanguage('en')" id="mobile-en-btn" class="${currentLanguage === 'en' ? 'active' : ''}">EN</button>
            <button onclick="switchLanguage('fr')" id="mobile-fr-btn" class="${currentLanguage === 'fr' ? 'active' : ''}">FR</button>
        `;
        
        // Insert at the beginning of navPanel
        navPanel.insertBefore(languageSwitcher, navPanel.firstChild);
    }
}

// Function to fix mobile nav language visibility
function fixMobileNavLanguages() {
    // Apply current language state to mobile nav panel
    const navPanel = document.getElementById('navPanel');
    if (navPanel) {
        // Hide all language elements in mobile nav
        navPanel.querySelectorAll('[data-lang], [data-lang-block]').forEach(el => {
            el.classList.remove('active');
        });
        
        // Show only current language elements in mobile nav
        navPanel.querySelectorAll(`[data-lang="${currentLanguage}"], [data-lang-block="${currentLanguage}"]`).forEach(el => {
            el.classList.add('active');
        });
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for stored preference
    const stored = localStorage.getItem('preferredLanguage');
    if (stored && (stored === 'en' || stored === 'fr')) {
        currentLanguage = stored;
    }
    
    // Set initial language state
    switchLanguage(currentLanguage);
    
    // Add mobile language switcher and fix mobile nav languages
    setTimeout(() => {
        addMobileLanguageSwitcher();
        fixMobileNavLanguages();
    }, 200);
    
    // Also add it when the nav panel is created (in case it's created dynamically)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const navPanel = document.getElementById('navPanel');
                if (navPanel && !navPanel.querySelector('.language-switcher')) {
                    setTimeout(() => {
                        addMobileLanguageSwitcher();
                        fixMobileNavLanguages();
                    }, 100);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});