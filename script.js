[file name]: script.js
[file content begin]
(function() {
    if (window.location.pathname.endsWith('script.js')) {
        window.location.href = 'index.html';
        return;
    }
    
    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
        console.warn('Unauthorized script access detected');
        window.location.href = 'index.html';
        return;
    }
})();

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

const configData = (function() {
    const encoded = {
        vless1: '11',
        vless2: '22',
        hidden: '33'
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

let incorrectAttempts = 0;
const maxAttempts = 5;
let isSystemLocked = false;
let countdownInterval;

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function updatePasswordStrength(password) {
    if (!password) {
        passwordStrength.style.display = 'none';
        return;
    }
    
    passwordStrength.style.display = 'block';
    let strength = 0;
    
    if (password.length >= 4) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    strengthBar.style.width = strength + '%';
    
    if (strength < 50) {
        strengthBar.style.background = 'linear-gradient(90deg, #ff3333, #ff6600)';
    } else if (strength < 75) {
        strengthBar.style.background = 'linear-gradient(90deg, #ff9900, #ffcc00)';
    } else {
        strengthBar.style.background = 'linear-gradient(90deg, #00cc00, #66ff66)';
    }
}

function checkPassword() {
    if (isSystemLocked) {
        showMessage('System is locked! Too many incorrect attempts.', 'error');
        return false;
    }
    
    const password = passwordInput.value;
    
    if (!password) {
        showMessage('Please enter password', 'error');
        return false;
    }
    
    updatePasswordStrength(password);
    
    if (passwordObscure.validate(password)) {
        incorrectAttempts = 0;
        attemptWarning.style.display = 'none';
        showMessage('Access granted! System unlocked', 'success');
        statusText.textContent = 'System unlocked';
        connectionStatus.textContent = 'Connected';
        
        if (autoClearCheckbox.checked) {
            setTimeout(() => {
                passwordInput.value = '';
                passwordStrength.style.display = 'none';
            }, 1000);
        }
        
        return true;
    } else {
        incorrectAttempts++;
        
        if (incorrectAttempts >= maxAttempts) {
            lockSystem();
            showMessage('System locked! Too many incorrect attempts.', 'error');
        } else {
            showMessage(`Incorrect password! ${maxAttempts - incorrectAttempts} attempts remaining`, 'error');
            
            if (incorrectAttempts >= 3) {
                attemptWarning.style.display = 'block';
            }
        }
        
        if (autoClearCheckbox.checked) {
            passwordInput.value = '';
        }
        
        return false;
    }
}

function lockSystem() {
    isSystemLocked = true;
    protectionOverlay.style.display = 'flex';
    
    setTimeout(() => {
        startCloseCountdown();
    }, 2000);
}

function startCloseCountdown() {
    let count = 3;
    closeCountdown.style.display = 'block';
    countdownNumber.textContent = count;
    
    countdownInterval = setInterval(() => {
        count--;
        countdownNumber.textContent = count;
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            window.location.href = 'about:blank';
        }
    }, 1000);
}

function copyToClipboard(text) {
    if (!text) {
        showMessage('No data to copy', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Copied to clipboard!', 'success');
    }).catch(err => {
        showMessage('Failed to copy: ' + err, 'error');
    });
}

function openTelegram() {
    window.open('https://t.me/example', '_blank');
}

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
});

passwordInput.addEventListener('input', function() {
    updatePasswordStrength(this.value);
});

passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

copyBtn.addEventListener('click', function() {
    if (!checkPassword()) return;
    
    const hiddenData = configData.getHidden();
    if (hiddenData) {
        copyToClipboard(hiddenData);
    } else {
        showMessage('No data configured', 'info');
    }
});

vlessBtn1.addEventListener('click', function() {
    if (!checkPassword()) return;
    
    const vless1Data = configData.getVless1();
    if (vless1Data) {
        copyToClipboard(vless1Data);
    } else {
        showMessage('No VLESS 1 configuration', 'info');
    }
});

vlessBtn2.addEventListener('click', function() {
    if (!checkPassword()) return;
    
    const vless2Data = configData.getVless2();
    if (vless2Data) {
        copyToClipboard(vless2Data);
    } else {
        showMessage('No VLESS 2 configuration', 'info');
    }
});

telegramBtn.addEventListener('click', function() {
    openTelegram();
});

(function() {
    window.addEventListener('error', function(e) {
        if (e.message.includes('script') || e.filename.includes('script.js')) {
            console.clear();
            document.body.innerHTML = '<div style="background:black;color:red;height:100vh;display:flex;align-items:center;justify-content:center;font-family:monospace">SECURITY BREACH DETECTED</div>';
        }
    });
    
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
[file content end]
