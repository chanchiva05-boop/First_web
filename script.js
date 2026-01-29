// ============================================
// SECURITY PROTECTION - DO NOT MODIFY
// ============================================

(function() {
    // Check if script is loaded directly
    if (window.location.pathname.endsWith('script.js')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Check referrer
    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
        console.warn('Unauthorized script access detected');
        // Redirect or disable functionality
        window.location.href = 'index.html';
        return;
    }
})();

// ============================================
// MAIN APPLICATION CODE
// ============================================

const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const copyBtn = document.getElementById('copyBtn');
const vlessBtn1 = document.getElementById('vlessBtn1');
const vlessBtn2 = document.getElementById('vlessBtn2');
const telegramBtn = document.getElementById('telegramBtn');
const autoClearCheckbox = document.getElementById('autoClear');
const messageDiv = document.getElementById('message');
const statusText = document.getElementById('statusText');
const connectionStatus = document.getElementById('connectionStatus');
const protectionOverlay = document.getElementById('protectionOverlay');
const attemptWarning = document.getElementById('attemptWarning');
const passwordStrength = document.getElementById('passwordStrength');
const strengthBar = document.getElementById('strengthBar');
const closeCountdown = document.getElementById('closeCountdown');
const countdownNumber = document.getElementById('countdownNumber');

// Obfuscate password more securely
const passwordObscure = (function() {
    const key = [0x74, 0x65, 0x76, 0x61, 0x38, 0x35, 0x34, 0x39];
    return {
        getPassword: function() {
            return String.fromCharCode(...key);
        },
        validate: function(input) {
            return input === this.getPassword();
        }
    };
})();

// Encrypt sensitive data (basic obfuscation)
const configData = (function() {
    // Base64 encoded data that will be decoded at runtime
    const encoded = {
        vless1: '11', // Put your base64 encoded VLESS 1 config here
        vless2: '22', // Put your base64 encoded VLESS 2 config here
        hidden: '33'  // Put your base64 encoded hidden data here
    };
    
    return {
        getVless1: function() {
            return encoded.vless1 ? atob(encoded.vless1) : '';
        },
        getVless2: function() {
            return encoded.vless2 ? atob(encoded.vless2) : '';
        },
        getHidden: function() {
            return encoded.hidden ? atob(encoded.hidden) : '';
        }
    };
})();

// ... (កូដដូចពីមុនទាំងអស់) ...

// Add additional security at the end
(function() {
    // Self-destruct if tampered with
    window.addEventListener('error', function(e) {
        if (e.message.includes('script') || e.filename.includes('script.js')) {
            console.clear();
            document.body.innerHTML = '<div style="background:black;color:red;height:100vh;display:flex;align-items:center;justify-content:center;font-family:monospace">SECURITY BREACH DETECTED</div>';
        }
    });
    
    // Monitor for DevTools opening
    let devToolsOpen = false;
    const threshold = 160;
    
    setInterval(function() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (!devToolsOpen && (widthThreshold || heightThreshold)) {
            devToolsOpen = true;
            protectionOverlay.style.display = 'flex';
            setTimeout(() => {
                window.location.href = 'about:blank';
            }, 1000);
        }
    }, 500);
})();
