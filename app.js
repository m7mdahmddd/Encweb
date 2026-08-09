/**
 * Encweb Application Controller
 * Handles UI interactions, i18n localization, theme switching, steganography workflow,
 * Supabase Auth, Friends Management, and Cloud Vault Sharing.
 */

// Language Dictionary (English & Arabic)
const I18N = {
    en: {
        pageTitle: "Encweb - Secret Text Cipher & Disguise",
        heroBadge: "AES-256-GCM + Steganography Engine",
        autoSaveBadge: "Auto-Save Active",
        mainHeading: "Disguise Secret Text In Plain Sight",
        subHeading: "Encrypt your sensitive text with a password and conceal it invisibly inside everyday natural messages.",
        tabEncrypt: "Encrypt & Disguise",
        tabDecrypt: "Reveal & Decrypt",
        tabUpdate: "Update & Edit",
        tabVault: "Cloud Vault",
        secretLabel: "Secret Message to Encrypt",
        secretPlaceholder: "Type your secret message here... (e.g. My secret key is XYZ123)",
        keyLabel: "Encryption Password (Key)",
        keyPlaceholder: "Enter a secret key...",
        modeLabel: "Disguise Format",
        modeOptStego: "🔒 Invisible Text (Steganography)",
        modeOptEmoji: "🔮 Secret Emoji Sequence",
        modeOptHex: "⚡ Hex Ciphertext (Base 16)",
        coverLabel: "Cover Text (Public Message)",
        coverSubInfo: "Choose a preset or type custom text",
        coverPresetNone: "🚫 No Text",
        coverPresetGreeting: "👋 Greeting",
        coverPresetMeeting: "📅 Meeting",
        coverPresetRecipe: "☕ Coffee Recipe",
        coverDefaultText: "Hope you are having a wonderful day and best of luck with your work!",
        encryptBtn: "Encrypt & Disguise Text",
        encryptOutputTitle: "Disguised Output Text",
        copyBtn: "Copy Text",
        decryptInputLabel: "Paste Disguised Text / Ciphertext",
        decryptInputSubInfo: "Paste the text you received here",
        decryptInputPlaceholder: "Paste disguised message or emoji/hex ciphertext...",
        decryptKeyLabel: "Decryption Password (Key)",
        decryptKeyPlaceholder: "Enter secret password...",
        decryptBtn: "Reveal & Decrypt Message",
        decryptOutputTitle: "Revealed Secret Message",
        updateInputLabel: "Existing Disguised Text / Ciphertext",
        updateInputSubInfo: "Paste the text you want to edit",
        updateInputPlaceholder: "Paste existing disguised message or ciphertext here...",
        updateKeyLabel: "Decryption Password (Key)",
        updateKeyPlaceholder: "Enter current password...",
        unlockEditBtn: "Unlock Message For Editing",
        editorLabel: "Edit Secret Message",
        newKeyLabel: "New Encryption Password (Optional - leave empty to keep current)",
        newKeyPlaceholder: "Enter new password (optional)...",
        saveUpdatedBtn: "Re-encrypt & Save Updated Message",
        accessControlLabel: "Recipient Access Rights",
        accessControlSubInfo: "Control who can decrypt this message",
        accessPublic: "🌐 Anyone with password (Public)",
        accessPrivate: "🔒 Only Me (Private Vault)",
        accessFriends: "👥 Specific Friends Only (+ Password)",
        selectFriendsLabel: "Select Friends Allowed to Decrypt:",
        saveCloudVaultLabel: "Save & Share in Encweb Cloud Vault",
        saveCloudVaultSub: "Sync message across your connected devices",
        vaultTitle: "Encweb Cloud Vault & Shared Inbox",
        refreshVaultBtn: "Refresh Vault",
        emptyVaultMsg: "Log in to view messages shared with you across devices!",
        navLoginBtn: "Login / Register",
        authModalTitle: "Account Authentication",
        googleBtnText: "Continue with Google",
        authOrDivider: "OR WITH EMAIL",
        friendsModalTitle: "Manage Friends & Sharing",
        accountModalTitle: "Account Management",
        changePasswordHeading: "Change Account Password",
        newPasswordLabel: "New Password",
        updatePasswordBtn: "Update Password",
        sessionHeading: "Account Session",
        logoutBtn: "Logout Account",
        paletteTitle: "Theme Accent Color",
        info1Title: "AES-256-GCM Encryption",
        info1Desc: "Messages are encrypted client-side using military-grade 256-bit AES with PBKDF2 100,000 hash iterations.",
        info2Title: "Unicode Steganography",
        info2Desc: "Encodes binary bytes into invisible zero-width unicode characters, seamlessly hidden inside any cover text.",
        info3Title: "100% Client Privacy",
        info3Desc: "All computations happen locally in your browser sandbox. Zero data is ever sent unencrypted.",
        footerText: "Encweb — Advanced Secret Text Disguise & Cipher Tool",
        editReencryptBtn: "Edit & Re-encrypt",
        importEncryptedBtn: "Update Existing Message",
        toastCopied: "Text copied to clipboard!",
        toastEncrypted: "Message encrypted and disguised successfully!",
        toastDecrypted: "Message revealed and decrypted successfully!",
        toastCleared: "Draft cleared successfully!",
        toastPresetSet: "Cover text template applied!",
        toastNoSecret: "Please enter a secret message!",
        toastNoKey: "Please enter an encryption password!",
        toastNoInput: "Please paste text to decrypt!",
        toastDetectedPayload: "Hidden payload (Zero-Width Steganography) detected automatically!",
        toastEditReady: "Message loaded into editor — make your updates and click Encrypt!",
        toastUnlockedForEdit: "Message unlocked! You can now edit your text & password below.",
        toastUpdatedSuccess: "Message updated & re-encrypted successfully!",
        chatModalTitle: "Friends Encrypted Chat",
        chatModalSub: "End-to-End Encrypted Direct Messages & Steganography",
        friendsListTitle: "Friends",
        chatSelectPrompt: "Select a friend on the left to start end-to-end encrypted messaging!",
        deleteAccountHeading: "Danger Zone",
        deleteAccountDesc: "Permanently delete your account profile, friends list, and cloud messages.",
        deleteAccountBtn: "Delete Account Permanently",
        toastAccountDeleted: "Your account and profile data have been deleted successfully."
    },
    ar: {
        pageTitle: "Encweb - تشفير وإخفاء النصوص",
        heroBadge: "محرك تشفير AES-256 + إخفاء غير مرئي",
        autoSaveBadge: "الحفظ التلقائي مفعّل",
        mainHeading: "تشفير وإخفاء النصوص السرية الذكي",
        subHeading: "قم بتشفير رسائلك بكلمة سر وإخفائها كلياً داخل نصوص طبيعية غير مرئية للناس.",
        tabEncrypt: "تشفير وإخفاء الرسالة",
        tabDecrypt: "فك التشفير والكشف",
        tabUpdate: "تحديث وتعديل الرسالة",
        tabVault: "الخزنة السحابية",
        secretLabel: "الرسالة السرية المراد تشفيرها",
        secretPlaceholder: "اكتب رسالتك السرية هنا... (مثال: كلمة السر هي XYZ123)",
        keyLabel: "كلمة سر التشفير (المفتاح)",
        keyPlaceholder: "أدخل كلمة سر قوية...",
        modeLabel: "طريقة الإخفاء والتشفير",
        modeOptStego: "🔒 نص عادي مموه (إخفاء غير مرئي)",
        modeOptEmoji: "🔮 شفرة الإيموجي السرية",
        modeOptHex: "⚡ شفرة هكس الست عشرية",
        coverLabel: "النص الموهِم (الرسالة الظاهرة)",
        coverSubInfo: "اختر نموذجاً أو اكتب نصك الخاص",
        coverPresetNone: "🚫 بدون نص",
        coverPresetGreeting: "👋 تحية عادية",
        coverPresetMeeting: "📅 موعد عمل",
        coverPresetRecipe: "☕ طريقة عمل القهوة",
        coverDefaultText: "أتمنى لك يوماً سعيداً وموفقاً دائماً في عملك!",
        encryptBtn: "تشفير وإخفاء النص الآن",
        encryptOutputTitle: "النص الناتِج (المُشفر والمخفي)",
        copyBtn: "نسخ النص",
        decryptInputLabel: "النص الموهِم أو الرموز المشفرة",
        decryptInputSubInfo: "الصق النص الذي وصلك هنا",
        decryptInputPlaceholder: "الصق النص المُشفر أو النص الموهِم الذي يحتوي على الشفرة السرية...",
        decryptKeyLabel: "كلمة سر فك التشفير",
        decryptKeyPlaceholder: "أدخل كلمة السر الخاصة بالتفكيك...",
        decryptBtn: "كشف النص السري وفك التشفير",
        decryptOutputTitle: "الرسالة السرية المكشوفة",
        updateInputLabel: "النص المشفر أو الموهِم المراد تعديله",
        updateInputSubInfo: "الصق النص الذي تريد تعديل كَلامِهِ أو كلمة سرِهِ هنا",
        updateInputPlaceholder: "الصق النص المشفر أو النص الموهِم الذي يحتوي على الرسالة...",
        updateKeyLabel: "كلمة سر التفكيك الحالية",
        updateKeyPlaceholder: "أدخل كلمة السر الحالية للنص...",
        unlockEditBtn: "فتح الرسالة للتعديل",
        editorLabel: "محرر الرسالة السرية",
        newKeyLabel: "كلمة سر جديدة (اختياري - اتركها فارغة للاحتفاظ بكلمة السر الحالية)",
        newKeyPlaceholder: "أدخل كلمة سر جديدة (اختياري)...",
        saveUpdatedBtn: "إعادة التشفير وحفظ التحديثات",
        accessControlLabel: "صلاحيات الوصول والمشاركة",
        accessControlSubInfo: "حدد من يستطيع فك تشفير هذا النص",
        accessPublic: "🌐 أي شخص يملك كلمة السر (عام)",
        accessPrivate: "🔒 أنا فقط (خزنة شخصية)",
        accessFriends: "👥 أصدقاء محددون فقط (+ كلمة السر)",
        selectFriendsLabel: "اختر الأصدقاء المسموح لهم بفك التشفير:",
        saveCloudVaultLabel: "حفظ ومشاركة في الخزنة السحابية Encweb",
        saveCloudVaultSub: "مزامنة الرسالة تلقائياً عبر أجهزتك المشتركة",
        vaultTitle: "الخزنة السحابية Encweb والصندوق المشترك",
        refreshVaultBtn: "تحديث الخزنة",
        emptyVaultMsg: "قم بتسجيل الدخول لمشاهدة الرسائل المشاركة معك عبر أجهزتك!",
        navLoginBtn: "تسجيل الدخول / حساب جديد",
        authModalTitle: "تسجيل الدخول وإنشاء حساب",
        googleBtnText: "المتابعة باستخدام Google",
        authOrDivider: "أو بالبريد الإلكتروني",
        friendsModalTitle: "إدارة الأصدقاء والمشاركة",
        accountModalTitle: "إدارة الحساب والأمان",
        changePasswordHeading: "تغيير كلمة سر الحساب",
        newPasswordLabel: "كلمة السر الجديدة",
        updatePasswordBtn: "تحديث كلمة السر",
        sessionHeading: "جلسة الحساب والخروج",
        logoutBtn: "تسجيل الخروج من الحساب",
        paletteTitle: "اللون الرئيسي للموقع",
        info1Title: "تشفير AES-256-GCM عسكري",
        info1Desc: "يتم تشفير نصك السرّي محلياً في متصفحك باستخدام خوارزمية AES 256-bit المتطورة مع مشتق PBKDF2.",
        info2Title: "تقنية الإخفاء (Steganography)",
        info2Desc: "تضمين البيانات المشفرة داخل الرموز غير المرئية (Zero-Width Characters)، مما يجعل النص يبدو طبيعياً كلياً.",
        info3Title: "خصوصية مطلقة 100%",
        info3Desc: "تتم عملية التشفير وفك التشفير بالكامل داخل جهازك ومستعرضك فقط، دون إرسال أي نص غير مشفر.",
        footerText: "Encweb — أداة تشفير وإخفاء النصوص السرية المتقدمة",
        editReencryptBtn: "تعديل وإعادة التشفير",
        importEncryptedBtn: "تحديث نص مشفر سابق",
        toastCopied: "تم نسخ النص بنجاح للحافظة!",
        toastEncrypted: "تم تشفير الرسالة وإخفاؤها بنجاح!",
        toastDecrypted: "تم فك التشفير واستخراج الرسالة بنجاح!",
        toastCleared: "تم مسح المسودة والبيانات المحفوظة بنجاح!",
        toastPresetSet: "تم تطبيق النموذج الموهِم!",
        toastNoSecret: "يرجى كتابة الرسالة السرية المراد تشفيرها!",
        toastNoKey: "يرجى إدخال كلمة السر!",
        toastNoInput: "يرجى لصق النص المشفر أو النص الموهِم هنا!",
        toastDetectedPayload: "تم اكتشاف نص مخفي (Zero-Width Steganography) تلقائياً!",
        toastEditReady: "تم تحميل الرسالة في المحرر — عدّلها ثم انقر تشفير لتحديث النص!",
        toastUnlockedForEdit: "تم فتح الرسالة بنجاح! يمكنك الآن تعديل الرسالة أو كلمة السر أدناه.",
        toastUpdatedSuccess: "تم تحديث الرسالة وإعادة تشفيرها بنجاح!",
        chatModalTitle: "محادثات الأصدقاء المشفرة",
        chatModalSub: "رسائل مباشرة مشفرة بينك وبين أصدقائك بخصوصية تامة",
        friendsListTitle: "الأصدقاء",
        chatSelectPrompt: "اختر صديقاً من القائمة للبدء في المحادثة المشفرة المباشرة!",
        deleteAccountHeading: "منطقة الخطر (حذف الحساب)",
        deleteAccountDesc: "حذف حسابك وبيانات ملفك الشخصي والأصدقاء بشكل نهائي ولا يمكن استرجاعه.",
        deleteAccountBtn: "حذف الحساب نهائياً",
        toastAccountDeleted: "تم حذف حسابك وكافة بياناتك بنجاح."
    }
};

// Cover text presets per language
const COVER_PRESETS = {
    en: {
        none: "",
        greeting: "Hope you are having a wonderful day and best of luck with your work!",
        meeting: "Hi team, confirming our project alignment call scheduled for tomorrow afternoon.",
        recipe: "Mix two shots of espresso with steamed milk and a pinch of cinnamon."
    },
    ar: {
        none: "",
        greeting: "أتمنى لك يوماً سعيداً وموفقاً دائماً في عملك وحياتك!",
        meeting: "مرحباً بالجميع، أؤكد لكم موعد اجتماع مشروعنا المقرر غداً في تمام الساعة الرابعة مساءً.",
        recipe: "امزج ملعقتين من القهوة مع الحليب الدافيء وقليل من القرفة للحصول على طعم رائع."
    }
};

// State Variables
let currentTheme = localStorage.getItem('encweb_theme') || 'light';
let currentLang = localStorage.getItem('encweb_lang') || 'ar';
let authMode = 'login'; // 'login' or 'signup'

/**
 * Toast Notification System
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconName = 'check-circle-2';
    if (type === 'error') iconName = 'alert-circle';
    if (type === 'info') iconName = 'info';

    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Accent Color Palettes definition
const ACCENT_PALETTES = {
    indigo: { primary: '#6366f1', primaryGlow: 'rgba(99, 102, 241, 0.4)', accent: '#a855f7', accentGlow: 'rgba(168, 85, 247, 0.4)' },
    cyan:   { primary: '#06b6d4', primaryGlow: 'rgba(6, 182, 212, 0.4)',  accent: '#10b981', accentGlow: 'rgba(16, 185, 129, 0.4)' },
    rose:   { primary: '#f43f5e', primaryGlow: 'rgba(244, 63, 94, 0.4)',  accent: '#fb7185', accentGlow: 'rgba(251, 113, 133, 0.4)' },
    amber:  { primary: '#f59e0b', primaryGlow: 'rgba(245, 158, 11, 0.4)', accent: '#ea580c', accentGlow: 'rgba(234, 88, 12, 0.4)' },
    emerald:{ primary: '#10b981', primaryGlow: 'rgba(16, 185, 129, 0.4)', accent: '#84cc16', accentGlow: 'rgba(132, 204, 22, 0.4)' }
};

let currentAccent = localStorage.getItem('encweb_accent') || 'indigo';

function toggleColorPickerMenu() {
    const menu = document.getElementById('color-palette-menu');
    if (!menu) return;
    const isHidden = menu.style.display === 'none';
    menu.style.display = isHidden ? 'block' : 'none';
}

function setThemeAccent(accentKey, silent = false) {
    const palette = ACCENT_PALETTES[accentKey] || ACCENT_PALETTES.indigo;
    currentAccent = accentKey;
    localStorage.setItem('encweb_accent', accentKey);

    const root = document.documentElement;
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--primary-glow', palette.primaryGlow);
    root.style.setProperty('--accent', palette.accent);
    root.style.setProperty('--accent-glow', palette.accentGlow);
    root.style.setProperty('--heading-grad', `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`);

    document.querySelectorAll('.swatch-btn').forEach(btn => {
        if (btn.getAttribute('data-accent') === accentKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const menu = document.getElementById('color-palette-menu');
    if (menu) menu.style.display = 'none';

    if (!silent) {
        showToast(currentLang === 'en' ? 'Main theme color updated!' : 'تم تغيير اللون الرئيسي للموقع بنجاح!', 'info');
    }
}

function applySavedAccent() {
    setThemeAccent(currentAccent, true);
}

/**
 * Toggle light & dark themes
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('encweb_theme', currentTheme);
    applyTheme();
}

/**
 * Apply theme to document element and update toggle icon
 */
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.innerHTML = currentTheme === 'light' 
            ? '<i data-lucide="moon"></i>' 
            : '<i data-lucide="sun"></i>';
    }
    if (window.lucide) lucide.createIcons();
}

/**
 * Toggle UI language between English and Arabic
 */
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('encweb_lang', currentLang);
    applyLanguage();
}

/**
 * Apply language dictionary to all DOM elements
 */
function applyLanguage() {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const dict = I18N[currentLang];

    // Update document title
    document.getElementById('doc-title').textContent = dict.pageTitle;

    // Update elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (dict[key]) {
            elem.textContent = dict[key];
        }
    });

    // Update placeholders
    document.getElementById('secret-message').placeholder = dict.secretPlaceholder;
    document.getElementById('encrypt-key').placeholder = dict.keyPlaceholder;
    document.getElementById('disguised-input').placeholder = dict.decryptInputPlaceholder;
    document.getElementById('decrypt-key').placeholder = dict.decryptKeyPlaceholder;
    document.getElementById('update-disguised-input').placeholder = dict.updateInputPlaceholder;
    document.getElementById('update-key').placeholder = dict.updateKeyPlaceholder;
    document.getElementById('update-new-key').placeholder = dict.newKeyPlaceholder;

    // Language toggle button text
    document.getElementById('lang-btn-text').textContent = currentLang === 'en' ? 'العربية' : 'English';

    applyTheme();
    updateEncryptStats();
}

/**
 * Switch active navigation tab (Encrypt vs Decrypt vs Update vs Vault)
 */
function switchTab(tabName) {
    const encryptBtn = document.getElementById('tab-encrypt-btn');
    const decryptBtn = document.getElementById('tab-decrypt-btn');
    const updateBtn = document.getElementById('tab-update-btn');
    const vaultBtn = document.getElementById('tab-vault-btn');

    const encryptPanel = document.getElementById('panel-encrypt');
    const decryptPanel = document.getElementById('panel-decrypt');
    const updatePanel = document.getElementById('panel-update');
    const vaultPanel = document.getElementById('panel-vault');

    encryptBtn.classList.remove('active');
    decryptBtn.classList.remove('active');
    updateBtn.classList.remove('active');
    vaultBtn.classList.remove('active');

    encryptPanel.classList.remove('active');
    decryptPanel.classList.remove('active');
    updatePanel.classList.remove('active');
    vaultPanel.classList.remove('active');

    if (tabName === 'encrypt') {
        encryptBtn.classList.add('active');
        encryptPanel.classList.add('active');
    } else if (tabName === 'decrypt') {
        decryptBtn.classList.add('active');
        decryptPanel.classList.add('active');
    } else if (tabName === 'update') {
        updateBtn.classList.add('active');
        updatePanel.classList.add('active');
    } else if (tabName === 'vault') {
        vaultBtn.classList.add('active');
        vaultPanel.classList.add('active');
        refreshCloudVault();
    }
    saveState();
}

/**
 * Handle change in disguise mode dropdown
 */
function handleModeChange() {
    const mode = document.getElementById('disguise-mode').value;
    const coverGroup = document.getElementById('cover-text-group');

    if (mode === 'stego-invisible') {
        coverGroup.style.display = 'block';
    } else {
        coverGroup.style.display = 'none';
    }
    updateEncryptStats();
}

/**
 * Select access control option card and sync hidden select input
 */
function selectAccessType(val) {
    const selectElem = document.getElementById('access-type');
    if (selectElem) {
        selectElem.value = val;
    }
    document.querySelectorAll('.access-card').forEach(card => {
        if (card.getAttribute('data-value') === val) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    handleAccessTypeChange();
    saveState();
}

/**
 * Handle change in access control dropdown (Public vs Private vs Friends)
 */
function handleAccessTypeChange() {
    const accessType = document.getElementById('access-type').value;
    const wrapper = document.getElementById('friends-select-wrapper');
    if (accessType === 'friends') {
        wrapper.style.display = 'block';
        loadFriendsCheckboxList();
    } else {
        wrapper.style.display = 'none';
    }
}

/**
 * Sets predefined cover text from quick buttons
 */
function setCoverPreset(presetKey) {
    const langPresets = COVER_PRESETS[currentLang] || COVER_PRESETS.en;
    if (langPresets[presetKey]) {
        document.getElementById('cover-text').value = langPresets[presetKey];
        showToast(I18N[currentLang].toastPresetSet, 'info');
        updateEncryptStats();
        saveState();
    }
}

/**
 * Toggle password input visibility (Text vs Password)
 */
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i data-lucide="eye-off"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i data-lucide="eye"></i>';
    }
    if (window.lucide) lucide.createIcons();
}

/**
 * Real-time stats update for Encrypt tab
 */
function updateEncryptStats() {
    const secretMessage = document.getElementById('secret-message').value;
    const charCountElem = document.getElementById('secret-char-count');
    if (charCountElem) {
        charCountElem.textContent = `${secretMessage.length} ${currentLang === 'en' ? 'chars' : 'حرف'}`;
    }
}

/**
 * Copy element content to clipboard
 */
async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const textToCopy = (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') 
        ? element.value 
        : element.textContent;

    if (!textToCopy) return;

    try {
        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            element.select();
            element.setSelectionRange(0, 99999);
        }
        await navigator.clipboard.writeText(textToCopy);
        showToast(I18N[currentLang].toastCopied);
    } catch (err) {
        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            element.select();
            element.setSelectionRange(0, 99999);
            document.execCommand('copy');
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        showToast(I18N[currentLang].toastCopied);
    }
}

/**
 * Execute Encryption & Steganography Process
 */
async function processEncrypt() {
    const secretMessage = document.getElementById('secret-message').value.trim();
    const password = document.getElementById('encrypt-key').value;
    const disguiseMode = document.getElementById('disguise-mode').value;
    const coverText = document.getElementById('cover-text').value.trim();
    const dict = I18N[currentLang];

    if (!secretMessage) {
        showToast(dict.toastNoSecret, 'error');
        return;
    }

    if (!password) {
        showToast(dict.toastNoKey, 'error');
        return;
    }

    try {
        const encryptedBytes = await CryptoEngine.encryptText(secretMessage, password);
        let finalOutput = '';
        const payloadSize = encryptedBytes.length;

        if (disguiseMode === 'stego-invisible') {
            const invisiblePayload = CryptoEngine.bytesToZeroWidth(encryptedBytes);
            finalOutput = CryptoEngine.embedInCoverText(coverText, invisiblePayload);
            document.getElementById('stat-stego-status').innerHTML = `<i data-lucide="eye-off"></i> ${currentLang === 'en' ? 'Invisible Payload' : 'نص مخفي غير مرئي'}`;
        } else if (disguiseMode === 'emoji') {
            finalOutput = CryptoEngine.bytesToEmoji(encryptedBytes);
            document.getElementById('stat-stego-status').innerHTML = `<i data-lucide="sparkles"></i> ${currentLang === 'en' ? 'Emoji Cipher' : 'رموز إيموجي مشفرة'}`;
        } else if (disguiseMode === 'hex') {
            finalOutput = CryptoEngine.bytesToHex(encryptedBytes);
            document.getElementById('stat-stego-status').innerHTML = `<i data-lucide="code"></i> ${currentLang === 'en' ? 'Hex Cipher' : 'شفرة هكس 16'}`;
        }

        const outputBox = document.getElementById('encrypt-output-box');
        outputBox.value = finalOutput;
        outputBox.textContent = finalOutput;
        document.getElementById('encrypt-result-wrapper').style.display = 'block';

        const sizeLabel = currentLang === 'en' ? 'Payload:' : 'حجم الشفرة:';
        document.getElementById('stat-payload-size').innerHTML = `<i data-lucide="database"></i> ${sizeLabel} ${payloadSize} Bytes`;

        showToast(dict.toastEncrypted);

        // Sync with Supabase Cloud Vault if checked & logged in
        const saveCloud = document.getElementById('save-cloud-vault').checked;
        if (saveCloud && SupabaseAuth.currentUser) {
            try {
                const accessType = document.getElementById('access-type').value;
                let recipientIds = [];
                if (accessType === 'friends') {
                    const checked = document.querySelectorAll('.friend-checkbox:checked');
                    checked.forEach(c => recipientIds.push(c.value));
                }

                await SupabaseVault.saveCloudMessage({
                    title: coverText.slice(0, 30) || 'Encrypted Message',
                    coverText: coverText,
                    disguisedPayload: finalOutput,
                    disguiseMode: disguiseMode,
                    accessType: accessType,
                    recipientIds: recipientIds
                });
                showToast(currentLang === 'en' ? 'Saved to Cloud Vault & Shared!' : 'تم الحفظ والمشاركة في الخزنة السحابية بنجاح!', 'info');
            } catch (cloudErr) {
                console.warn('Cloud Vault save note:', cloudErr.message);
            }
        }

        if (window.lucide) lucide.createIcons();
        saveState();

        document.getElementById('encrypt-result-wrapper').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
    }
}

/**
 * Execute Decryption & Reveal Process
 */
async function processDecrypt() {
    const inputStr = document.getElementById('disguised-input').value;
    const password = document.getElementById('decrypt-key').value;
    const dict = I18N[currentLang];

    if (!inputStr || inputStr.trim() === '') {
        showToast(dict.toastNoInput, 'error');
        return;
    }

    if (!password) {
        showToast(dict.toastNoKey, 'error');
        return;
    }

    try {
        let extractedBytes = null;

        if (CryptoEngine.hasHiddenPayload(inputStr)) {
            extractedBytes = CryptoEngine.zeroWidthToBytes(inputStr);
        } else if (/^[0-9a-fA-F]+$/.test(inputStr.trim())) {
            extractedBytes = CryptoEngine.hexToBytes(inputStr.trim());
        } else {
            try {
                extractedBytes = CryptoEngine.emojiToBytes(inputStr.trim());
            } catch (e) {
                throw new Error(currentLang === 'en' 
                    ? 'No valid hidden steganography or cipher payload found in this text. Please copy the output from Tab 1 or click "Load & Decrypt" in Cloud Vault!' 
                    : 'لم يتم العثور على أي شفرة مخفية صالحة داخل هذا النص. يرجى نسخ النص الناتِج من تبويب التشفير أو الضغط على "تحميل وفك التشفير" من الخزنة!');
            }
        }

        const originalMessage = await CryptoEngine.decryptBytes(extractedBytes, password);

        const outputBox = document.getElementById('decrypt-output-box');
        outputBox.value = originalMessage;
        outputBox.textContent = originalMessage;
        document.getElementById('decrypt-result-wrapper').style.display = 'block';

        showToast(dict.toastDecrypted);
        if (window.lucide) lucide.createIcons();
        saveState();

        document.getElementById('decrypt-result-wrapper').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
    }
}

/**
 * Execute unlocking process in Tab 3 (Update & Edit)
 */
async function processUnlockForEdit() {
    const inputStr = document.getElementById('update-disguised-input').value;
    const password = document.getElementById('update-key').value;
    const dict = I18N[currentLang];

    if (!inputStr || !inputStr.trim()) {
        showToast(dict.toastNoInput, 'error');
        return;
    }

    if (!password) {
        showToast(dict.toastNoKey, 'error');
        return;
    }

    try {
        let extractedBytes = null;

        if (CryptoEngine.hasHiddenPayload(inputStr)) {
            extractedBytes = CryptoEngine.zeroWidthToBytes(inputStr);
        } else if (/^[0-9a-fA-F]+$/.test(inputStr.trim())) {
            extractedBytes = CryptoEngine.hexToBytes(inputStr.trim());
        } else {
            try {
                extractedBytes = CryptoEngine.emojiToBytes(inputStr.trim());
            } catch (e) {
                throw new Error(currentLang === 'en' 
                    ? 'No valid hidden steganography or cipher payload found in this text. Please copy the output from Tab 1 or click "Load & Decrypt" in Cloud Vault!' 
                    : 'لم يتم العثور على أي شفرة مخفية صالحة داخل هذا النص. يرجى نسخ النص الناتِج من تبويب التشفير أو الضغط على "تحميل وفك التشفير" من الخزنة!');
            }
        }

        const originalMessage = await CryptoEngine.decryptBytes(extractedBytes, password);

        document.getElementById('update-editor-text').value = originalMessage;
        document.getElementById('update-editor-wrapper').style.display = 'block';

        showToast(dict.toastUnlockedForEdit, 'info');
        document.getElementById('update-editor-wrapper').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        saveState();

    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
    }
}

/**
 * Re-encrypt updated message from Tab 3 editor with option to change password
 */
async function processSaveUpdatedMessage() {
    const updatedText = document.getElementById('update-editor-text').value.trim();
    const currentPassword = document.getElementById('update-key').value;
    const newPassword = document.getElementById('update-new-key').value;
    const dict = I18N[currentLang];

    if (!updatedText) {
        showToast(dict.toastNoSecret, 'error');
        return;
    }

    const finalPassword = newPassword.trim() !== '' ? newPassword : currentPassword;

    if (!finalPassword) {
        showToast(dict.toastNoKey, 'error');
        return;
    }

    document.getElementById('secret-message').value = updatedText;
    document.getElementById('encrypt-key').value = finalPassword;

    switchTab('encrypt');
    await processEncrypt();

    if (newPassword.trim() !== '') {
        showToast(currentLang === 'en' ? 'Message & Password updated successfully!' : 'تم تحديث الرسالة وكلمة السر بنجاح!', 'success');
    } else {
        showToast(dict.toastUpdatedSuccess, 'success');
    }
}

/**
 * Auto-detect payload in decrypt input
 */
function autoDetectPayload() {
    const text = document.getElementById('disguised-input').value;
    if (CryptoEngine.hasHiddenPayload(text)) {
        showToast(I18N[currentLang].toastDetectedPayload, 'info');
    }
}

/**
 * Update Navbar Auth UI state
 */
function updateAuthUI() {
    const container = document.getElementById('auth-nav-container');
    const friendsBtn = document.getElementById('friends-nav-btn');
    const chatBtn = document.getElementById('chat-nav-btn');
    if (!container) return;

    if (SupabaseAuth.currentUser) {
        const profile = SupabaseAuth.currentProfile;
        const username = profile?.username || SupabaseAuth.currentUser.email.split('@')[0];

        container.innerHTML = `
            <button type="button" class="pill-btn outline-btn" onclick="openAccountModal()" title="Account Settings">
                <i data-lucide="user"></i> ${username}
            </button>
        `;
        if (friendsBtn) friendsBtn.style.display = 'flex';
        if (chatBtn) chatBtn.style.display = 'flex';
        loadFriendsCheckboxList();
    } else {
        container.innerHTML = `
            <button type="button" class="pill-btn primary-pill" onclick="openAuthModal()">
                <i data-lucide="user"></i> <span data-i18n="navLoginBtn">${I18N[currentLang].navLoginBtn}</span>
            </button>
        `;
        if (friendsBtn) friendsBtn.style.display = 'none';
        if (chatBtn) chatBtn.style.display = 'none';
    }
    if (window.lucide) lucide.createIcons();
}

/**
 * Account Management Modal Controllers
 */
function openAccountModal() {
    if (!SupabaseAuth.currentUser) {
        openAuthModal();
        return;
    }
    const profile = SupabaseAuth.currentProfile;
    const username = profile?.username || SupabaseAuth.currentUser.email.split('@')[0];
    const email = SupabaseAuth.currentUser.email;

    const usernameEl = document.getElementById('account-display-username');
    const emailEl = document.getElementById('account-display-email');
    if (usernameEl) usernameEl.textContent = username;
    if (emailEl) emailEl.textContent = email;

    document.getElementById('account-modal').style.display = 'flex';
}

function closeAccountModal() {
    document.getElementById('account-modal').style.display = 'none';
}

async function handlePasswordChange(event) {
    event.preventDefault();
    const newPass = document.getElementById('account-new-pass').value;

    if (!newPass || newPass.length < 6) {
        showToast(currentLang === 'en' ? 'Password must be at least 6 characters.' : 'يجب أن تكون كلمة السر 6 أحرف على الأقل.', 'error');
        return;
    }

    try {
        await SupabaseAuth.updatePassword(newPass);
        showToast(currentLang === 'en' ? 'Account password updated successfully!' : 'تم تحديث كلمة سر الحساب بنجاح!');
        document.getElementById('account-new-pass').value = '';
        closeAccountModal();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

/**
 * Auth Modal Controllers
 */
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function switchAuthTab(mode) {
    authMode = mode;
    const loginTab = document.getElementById('modal-tab-login');
    const signupTab = document.getElementById('modal-tab-signup');
    const usernameGroup = document.getElementById('username-group');
    const submitBtn = document.getElementById('auth-submit-btn');

    if (mode === 'signup') {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        usernameGroup.style.display = 'block';
        submitBtn.textContent = 'Create Free Account';
    } else {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        usernameGroup.style.display = 'none';
        submitBtn.textContent = 'Login to Encweb';
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const username = document.getElementById('auth-username').value.trim();

    try {
        if (authMode === 'signup') {
            const user = await SupabaseAuth.signUp(email, password, username || email.split('@')[0]);
            if (user && !user.email_confirmed_at && !user.confirmed_at) {
                showToast(currentLang === 'en' 
                    ? 'Account created! Please confirm via email or disable "Confirm Email" in Supabase.' 
                    : 'تم إنشاء الحساب! يرجى التأكيد من الإيميل أو تعطيل "Confirm Email" في Supabase.', 'info');
            } else {
                showToast(currentLang === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!');
            }
        } else {
            await SupabaseAuth.signIn(email, password);
            showToast(currentLang === 'en' ? 'Logged in successfully!' : 'تم تسجيل الدخول بنجاح!');
        }
        closeAuthModal();
        updateAuthUI();
    } catch (err) {
        if (err.message.includes('Email not confirmed')) {
            showToast(currentLang === 'en' 
                ? 'Email not confirmed! Disable "Confirm Email" in Supabase -> Authentication -> Providers -> Email.' 
                : 'البريد غير مؤكد! قم بتعطيل "Confirm Email" في إعدادات Supabase -> Auth -> Providers -> Email.', 'error');
        } else if (err.message.includes('Invalid login credentials')) {
            showToast(currentLang === 'en' 
                ? 'Invalid email or password! If you don\'t have an account yet, click "Sign Up" above.' 
                : 'البريد الإلكتروني أو كلمة السر غير صحيحة! إذا لم تقم بإنشاء حساب بعد، انقر على "Sign Up" بالأعلى.', 'error');
        } else {
            showToast(err.message, 'error');
        }
    }
}

async function handleGoogleLogin() {
    try {
        await SupabaseAuth.signInWithGoogle();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

/**
 * Friends Modal Controllers
 */
function openFriendsModal() {
    document.getElementById('friends-modal').style.display = 'flex';
    loadFriendsList();
}

function closeFriendsModal() {
    document.getElementById('friends-modal').style.display = 'none';
}

async function handleFriendSearch() {
    const query = document.getElementById('friend-search-input').value.trim();
    const resultsContainer = document.getElementById('friend-search-results');

    if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }

    const users = await SupabaseFriends.searchUsers(query);
    if (users.length === 0) {
        resultsContainer.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-dim);">No users found.</span>';
        return;
    }

    resultsContainer.innerHTML = users.map(u => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--bg-card-border);">
            <div>
                <strong style="font-size: 0.9rem;">${u.username}</strong>
                <div style="font-size: 0.78rem; color: var(--text-dim);">${u.email}</div>
            </div>
            <button type="button" class="copy-btn" onclick="addFriend('${u.id}')">
                <i data-lucide="user-plus"></i> Add
            </button>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

async function addFriend(friendId) {
    try {
        await SupabaseFriends.addFriend(friendId);
        showToast(currentLang === 'en' ? 'Friend added successfully!' : 'تم إضافة الصديق بنجاح!');
        loadFriendsList();
        loadFriendsCheckboxList();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

async function loadFriendsList() {
    const container = document.getElementById('my-friends-list');
    if (!container) return;

    const friends = await SupabaseFriends.getFriends();
    if (friends.length === 0) {
        container.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-dim);">No friends added yet.</span>';
        return;
    }

    container.innerHTML = friends.map(f => `
        <div style="display: flex; items-center; justify-content: space-between; padding: 6px 0;">
            <span><i data-lucide="user"></i> <strong>${f.username}</strong> (${f.email})</span>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

async function loadFriendsCheckboxList() {
    const container = document.getElementById('friends-checkbox-list');
    if (!container) return;

    if (!SupabaseAuth.currentUser) {
        container.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-dim);">Please log in to share messages with friends.</span>';
        return;
    }

    const friends = await SupabaseFriends.getFriends();
    if (friends.length === 0) {
        container.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-dim);">No friends added yet. Add friends via the top Friends button!</span>';
        return;
    }

    container.innerHTML = friends.map(f => `
        <label class="friend-check-item">
            <input type="checkbox" class="friend-checkbox" value="${f.id}">
            <span>${f.username}</span>
        </label>
    `).join('');
}

/**
 * Fetch and render Cloud Vault shared inbox (Tab 4)
 */
async function refreshCloudVault() {
    const container = document.getElementById('vault-messages-list');
    if (!container) return;

    if (!SupabaseAuth.currentUser) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox" style="width: 44px; height: 44px; opacity: 0.4;"></i>
                <p>${I18N[currentLang].emptyVaultMsg}</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    const messages = await SupabaseVault.loadCloudMessages();
    if (messages.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="shield-off" style="width: 44px; height: 44px; opacity: 0.4;"></i>
                <p>${currentLang === 'en' ? 'No cloud messages found in your vault.' : 'لا توجد رسائل سحابية في الخزنة حالياً.'}</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    container.innerHTML = messages.map(m => `
        <div class="vault-card">
            <div class="vault-card-head">
                <span class="vault-card-title">${m.title || 'Encrypted Message'}</span>
                <span class="metric-tag"><i data-lucide="clock"></i> ${new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; font-style: italic;">
                "${m.cover_text || 'Invisible payload message'}"
            </p>
            <button type="button" class="copy-btn" onclick="loadVaultMessageToDecrypt('${encodeURIComponent(m.disguised_payload)}')">
                <i data-lucide="unlock"></i> ${currentLang === 'en' ? 'Load & Decrypt' : 'تحميل وفك التشفير'}
            </button>
        </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

function loadVaultMessageToDecrypt(encodedPayload) {
    const payload = decodeURIComponent(encodedPayload);
    document.getElementById('disguised-input').value = payload;
    switchTab('decrypt');
    document.getElementById('decrypt-key').focus();
    showToast(currentLang === 'en' ? 'Message loaded into Decrypt tab!' : 'تم تحميل النص في تبويب فك التشفير!');
}

/**
 * Save current application state to localStorage
 */
function saveState() {
    try {
        const encBox = document.getElementById('encrypt-output-box');
        const decBox = document.getElementById('decrypt-output-box');

        let activeTab = 'encrypt';
        if (document.getElementById('tab-decrypt-btn').classList.contains('active')) activeTab = 'decrypt';
        if (document.getElementById('tab-update-btn').classList.contains('active')) activeTab = 'update';
        if (document.getElementById('tab-vault-btn').classList.contains('active')) activeTab = 'vault';

        const state = {
            activeTab: activeTab,
            secretMessage: document.getElementById('secret-message').value,
            encryptKey: document.getElementById('encrypt-key').value,
            disguiseMode: document.getElementById('disguise-mode').value,
            coverText: document.getElementById('cover-text').value,
            disguisedInput: document.getElementById('disguised-input').value,
            decryptKey: document.getElementById('decrypt-key').value,
            updateInput: document.getElementById('update-disguised-input').value,
            updateKey: document.getElementById('update-key').value,
            updateNewKey: document.getElementById('update-new-key').value,
            updateEditorText: document.getElementById('update-editor-text').value,
            encryptOutput: encBox.value || encBox.textContent,
            decryptOutput: decBox.value || decBox.textContent,
            encryptResultVisible: document.getElementById('encrypt-result-wrapper').style.display !== 'none',
            decryptResultVisible: document.getElementById('decrypt-result-wrapper').style.display !== 'none',
            updateEditorVisible: document.getElementById('update-editor-wrapper').style.display !== 'none'
        };
        localStorage.setItem('encweb_draft', JSON.stringify(state));
    } catch (e) {
        console.warn('Unable to save state:', e);
    }
}

/**
 * Restore saved application state from localStorage
 */
function loadState() {
    try {
        const saved = localStorage.getItem('encweb_draft');
        if (!saved) return;

        const state = JSON.parse(saved);

        if (state.activeTab) switchTab(state.activeTab);
        if (state.secretMessage !== undefined) document.getElementById('secret-message').value = state.secretMessage;
        if (state.encryptKey !== undefined) document.getElementById('encrypt-key').value = state.encryptKey;
        if (state.disguiseMode !== undefined) document.getElementById('disguise-mode').value = state.disguiseMode;
        if (state.coverText !== undefined) {
            // Sanitize old default cover text if saved previously
            if (state.coverText.includes('Hope you are having') || state.coverText.includes('أتمنى لك يوماً سعيداً')) {
                document.getElementById('cover-text').value = '';
            } else {
                document.getElementById('cover-text').value = state.coverText;
            }
        }

        if (state.disguisedInput !== undefined) document.getElementById('disguised-input').value = state.disguisedInput;
        if (state.decryptKey !== undefined) document.getElementById('decrypt-key').value = state.decryptKey;
        if (state.updateInput !== undefined) document.getElementById('update-disguised-input').value = state.updateInput;
        if (state.updateKey !== undefined) document.getElementById('update-key').value = state.updateKey;
        if (state.updateNewKey !== undefined) document.getElementById('update-new-key').value = state.updateNewKey;
        if (state.updateEditorText !== undefined) document.getElementById('update-editor-text').value = state.updateEditorText;

        if (state.encryptOutput && state.encryptResultVisible) {
            const encBox = document.getElementById('encrypt-output-box');
            encBox.value = state.encryptOutput;
            encBox.textContent = state.encryptOutput;
            document.getElementById('encrypt-result-wrapper').style.display = 'block';
        }

        if (state.decryptOutput && state.decryptResultVisible) {
            const decBox = document.getElementById('decrypt-output-box');
            decBox.value = state.decryptOutput;
            decBox.textContent = state.decryptOutput;
            document.getElementById('decrypt-result-wrapper').style.display = 'block';
        }

        if (state.updateEditorText && state.updateEditorVisible) {
            document.getElementById('update-editor-wrapper').style.display = 'block';
        }

    } catch (e) {
        console.warn('Unable to restore state:', e);
    }
}

/**
 * Clear all saved data from localStorage and reset inputs
 */
function clearSavedState() {
    localStorage.removeItem('encweb_draft');
    document.getElementById('secret-message').value = '';
    document.getElementById('encrypt-key').value = '';
    document.getElementById('cover-text').value = '';
    document.getElementById('disguised-input').value = '';
    document.getElementById('decrypt-key').value = '';
    document.getElementById('update-disguised-input').value = '';
    document.getElementById('update-key').value = '';
    document.getElementById('update-new-key').value = '';
    document.getElementById('update-editor-text').value = '';

    const encBox = document.getElementById('encrypt-output-box');
    const decBox = document.getElementById('decrypt-output-box');
    encBox.value = '';
    encBox.textContent = '';
    decBox.value = '';
    decBox.textContent = '';

    document.getElementById('encrypt-result-wrapper').style.display = 'none';
    document.getElementById('decrypt-result-wrapper').style.display = 'none';
    document.getElementById('update-editor-wrapper').style.display = 'none';

    updateEncryptStats();
    showToast(I18N[currentLang].toastCleared, 'info');
}

/**
 * Transfer revealed secret message to Encrypt tab for editing and re-encryption
 */
function editAndReencrypt() {
    const decBox = document.getElementById('decrypt-output-box');
    const revealedMsg = decBox.value || decBox.textContent;
    const decryptPass = document.getElementById('decrypt-key').value;

    if (!revealedMsg) {
        showToast(currentLang === 'en' ? 'No revealed message to edit!' : 'لا توجد رسالة مكشوفة لتعديلها!', 'error');
        return;
    }

    document.getElementById('secret-message').value = revealedMsg;
    if (decryptPass) {
        document.getElementById('encrypt-key').value = decryptPass;
    }

    switchTab('encrypt');
    updateEncryptStats();

    showToast(I18N[currentLang].toastEditReady, 'info');

    const msgInput = document.getElementById('secret-message');
    msgInput.focus();
    msgInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Attach auto-save listener to inputs
function attachAutoSaveListeners() {
    const inputs = document.querySelectorAll('textarea, input, select');
    inputs.forEach(input => {
        input.addEventListener('input', saveState);
        input.addEventListener('change', saveState);
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', async () => {
    applyLanguage();
    applyTheme();
    applySavedAccent();
    loadState();
    handleModeChange();
    updateEncryptStats();
    attachAutoSaveListeners();

    // Supabase Auth init
    if (typeof SupabaseAuth !== 'undefined') {
        await SupabaseAuth.initSession();
        updateAuthUI();
    }
});

// ==========================================================================
// FRIENDS ENCRYPTED CHAT CONTROLLER
// ==========================================================================
let activeChatFriendId = null;
let activeChatFriendName = null;
let chatPollTimer = null;

async function openChatModal(friendId = null) {
    if (!SupabaseAuth.currentUser) {
        showToast(currentLang === 'en' ? 'Please login to access Encrypted Chat.' : 'يرجى تسجيل الدخول لاستخدام المحادثات المشفرة.', 'info');
        openAuthModal();
        return;
    }

    const modal = document.getElementById('chat-modal');
    if (modal) modal.style.display = 'flex';

    await loadChatFriendsList();

    if (friendId && window._currentFriendsCache) {
        const friendObj = window._currentFriendsCache.find(f => f.id === friendId);
        if (friendObj) {
            selectChatFriend(friendObj.id, friendObj.username || friendObj.email);
        }
    }

    if (chatPollTimer) clearInterval(chatPollTimer);
    chatPollTimer = setInterval(() => {
        if (activeChatFriendId) {
            loadChatMessagesStream(true);
        }
    }, 3000);
}

function closeChatModal() {
    const modal = document.getElementById('chat-modal');
    if (modal) modal.style.display = 'none';
    if (chatPollTimer) {
        clearInterval(chatPollTimer);
        chatPollTimer = null;
    }
}

async function loadChatFriendsList() {
    const container = document.getElementById('chat-friends-list');
    if (!container) return;

    container.innerHTML = `<div style="padding:15px; text-align:center; color:var(--text-dim); font-size:0.85rem;"><i data-lucide="loader-2" class="spin"></i> Loading friends...</div>`;
    if (window.lucide) lucide.createIcons();

    const friends = await SupabaseFriends.getFriends();
    window._currentFriendsCache = friends;

    if (!friends || friends.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px 10px; text-align: center; color: var(--text-dim); font-size: 0.82rem;">
                No friends added yet.<br>Click <i data-lucide="users"></i> in top navbar to add friends!
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    container.innerHTML = friends.map(f => {
        const isSelected = f.id === activeChatFriendId;
        const initial = (f.username || f.email || 'F').charAt(0).toUpperCase();

        return `
            <div class="chat-friend-item ${isSelected ? 'active' : ''}" onclick="selectChatFriend('${f.id}', '${f.username || f.email}')">
                <div class="user-avatar-sm">${initial}</div>
                <div class="chat-friend-info">
                    <div class="chat-friend-name">${f.username || f.email}</div>
                    <div class="chat-friend-sub">${f.email}</div>
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide) lucide.createIcons();
}

async function selectChatFriend(friendId, friendUsername) {
    activeChatFriendId = friendId;
    activeChatFriendName = friendUsername;

    const activeHeaderName = document.getElementById('chat-active-name');
    const activeHeaderAvatar = document.getElementById('chat-active-avatar');
    const inputField = document.getElementById('chat-input-text');
    const submitBtn = document.getElementById('chat-submit-btn');

    if (activeHeaderName) activeHeaderName.textContent = friendUsername;
    if (activeHeaderAvatar) activeHeaderAvatar.textContent = friendUsername.charAt(0).toUpperCase();

    if (inputField) {
        inputField.disabled = false;
        inputField.focus();
    }
    if (submitBtn) submitBtn.disabled = false;

    await loadChatFriendsList();
    await loadChatMessagesStream();
}

let chatEncryptMode = false;

function toggleChatEncryptionMode() {
    chatEncryptMode = !chatEncryptMode;
    const btn = document.getElementById('chat-mode-btn');
    const input = document.getElementById('chat-input-text');
    const keyInput = document.getElementById('chat-key-input');

    if (btn) {
        btn.innerHTML = chatEncryptMode ? '<i data-lucide="lock"></i>' : '<i data-lucide="message-square"></i>';
        if (chatEncryptMode) {
            btn.classList.add('active-encrypt');
            btn.title = "Stego Encrypted Mode ACTIVE";
        } else {
            btn.classList.remove('active-encrypt');
            btn.title = "Plain Text Chat Mode ACTIVE";
        }
    }

    if (input) {
        input.placeholder = chatEncryptMode 
            ? (currentLang === 'en' ? "Type secret text (will be encrypted & hidden)..." : "اكتب الرسالة السرية (سيتم تشفيرها وإخفاؤها)...")
            : (currentLang === 'en' ? "Type a plain message..." : "اكتب رسالة عادية...");
    }

    if (keyInput) {
        keyInput.style.display = chatEncryptMode ? 'block' : 'none';
    }

    if (window.lucide) lucide.createIcons();
    showToast(
        chatEncryptMode 
            ? (currentLang === 'en' ? 'Switched to Stego Encrypted Mode 🔒' : 'تم التبديل لوضع التشفير والإخفاء 🔒')
            : (currentLang === 'en' ? 'Switched to Plain Text Mode 💬' : 'تم التبديل لوضع الرسائل العادية 💬'),
        'info'
    );
}

async function loadChatMessagesStream(silent = false) {
    if (!activeChatFriendId) return;

    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    if (!silent && container.children.length === 0) {
        container.innerHTML = `<div style="padding:30px; text-align:center; color:var(--text-dim);"><i data-lucide="loader-2" class="spin"></i> Syncing chat stream...</div>`;
        if (window.lucide) lucide.createIcons();
    }

    const messages = await SupabaseChat.loadChatMessages(activeChatFriendId);

    if (!messages || messages.length === 0) {
        container.innerHTML = `
            <div class="chat-empty-state">
                <i data-lucide="shield-check"></i>
                <p>Chat channel opened with <strong>${activeChatFriendName}</strong>.<br>Messages are encrypted client-side!</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    const currentUserId = SupabaseAuth.currentUser.id;

    container.innerHTML = messages.map(msg => {
        const isMine = msg.sender_id === currentUserId;
        const timeStr = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isStego = CryptoEngine.hasHiddenPayload(msg.cover_text || msg.disguised_payload || '');

        return `
            <div class="chat-bubble-wrapper ${isMine ? 'outgoing' : 'incoming'}">
                <div class="chat-bubble">
                    <div class="chat-bubble-text">${msg.cover_text || msg.disguised_payload}</div>
                    <div class="chat-bubble-meta">
                        ${isStego ? `<span class="stego-chip"><i data-lucide="eye-off"></i> Stego</span>` : ''}
                        ${isStego ? `<button type="button" class="reveal-btn-sm" onclick="revealChatStegoMessage(this, '${encodeURIComponent(msg.cover_text || msg.disguised_payload)}')"><i data-lucide="unlock"></i> Reveal</button>` : ''}
                        <span>${timeStr}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide) lucide.createIcons();
    container.scrollTop = container.scrollHeight;
}

async function revealChatStegoMessage(btnEl, encodedPayload) {
    const payload = decodeURIComponent(encodedPayload);
    const defaultKey = 'encweb-friend-chat';
    const pass = prompt(
        currentLang === 'en' ? 'Enter decryption key for secret message:' : 'أدخل كلمة السر لفك تشفير الرسالة السرية:',
        defaultKey
    );
    if (!pass) return;

    try {
        const decrypted = CryptoEngine.decrypt(payload, pass);
        const bubble = btnEl.closest('.chat-bubble');
        const textEl = bubble ? bubble.querySelector('.chat-bubble-text') : null;
        if (textEl) {
            textEl.innerHTML = `<span style="color:var(--emerald); font-weight:700;"><i data-lucide="unlock"></i> ${decrypted.secretMessage}</span>`;
            btnEl.remove();
            if (window.lucide) lucide.createIcons();
            showToast(I18N[currentLang].toastDecrypted, 'success');
        }
    } catch (e) {
        showToast(e.message || 'Decryption failed!', 'error');
    }
}

async function handleSendChatMessage(e) {
    e.preventDefault();
    if (!activeChatFriendId) return;

    const inputField = document.getElementById('chat-input-text');
    if (!inputField || !inputField.value.trim()) return;

    const textToSend = inputField.value.trim();
    inputField.value = '';

    try {
        await SupabaseChat.sendMessage(activeChatFriendId, textToSend);
        await loadChatMessagesStream(true);
    } catch (err) {
        showToast(err.message || 'Failed to send message.', 'error');
    }
}

/**
 * Inline Delete Account Prompt Handlers
 */
function showDeleteAccountPrompt() {
    const box = document.getElementById('delete-confirm-box');
    const btn = document.getElementById('show-delete-confirm-btn');
    if (box) box.style.display = 'block';
    if (btn) btn.style.display = 'none';
}

function cancelDeleteAccountPrompt() {
    const box = document.getElementById('delete-confirm-box');
    const btn = document.getElementById('show-delete-confirm-btn');
    if (box) box.style.display = 'none';
    if (btn) btn.style.display = 'inline-flex';
}

async function confirmDeleteAccountFinal() {
    const cachedUser = (JSON.parse(localStorage.getItem('encweb_user') || '{}')).user;
    if (!SupabaseAuth.currentUser && !cachedUser) {
        showToast(currentLang === 'en' ? 'No active account session found.' : 'لا يوجد حساب مسجل حالياً.', 'error');
        cancelDeleteAccountPrompt();
        return;
    }

    try {
        await SupabaseAuth.deleteAccount();
        cancelDeleteAccountPrompt();
        closeAccountModal();
        updateAuthUI();
        showToast(I18N[currentLang].toastAccountDeleted, 'info');
    } catch (err) {
        showToast(err.message || 'Failed to delete account.', 'error');
    }
}
