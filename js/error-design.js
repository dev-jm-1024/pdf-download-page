// 디버깅 핸드북 테마 JavaScript
// 콘솔 로그 스타일 다운로드 효과 및 디버깅 기능

document.addEventListener('DOMContentLoaded', function() {
    console.log('[DEBUG] Error Design Theme Loaded');
    console.log('[INFO] Debugging Handbook System Initialized');
    
    initializeDebugTheme();
    setupDownloadEffects();
    setupKeyboardShortcuts();
    setupDebugConsole();
    setupErrorTracking();
});

// 디버그 테마 초기화
function initializeDebugTheme() {
    console.log('[DEBUG] Initializing debug theme...');
    
    // 페이지 로드 시 콘솔 효과
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        setTimeout(() => {
            header.style.transition = 'opacity 1s ease';
            header.style.opacity = '1';
            console.log('[SUCCESS] Header loaded successfully');
        }, 100);
    }
    
    // 카드 순차 로딩 효과
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            console.log(`[DEBUG] Card ${index + 1} loaded`);
        }, 200 + (index * 100));
    });
}

// 다운로드 효과 설정
function setupDownloadEffects() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const fileName = this.textContent.trim();
            console.log(`[DOWNLOAD] Starting download: ${fileName}`);
            console.log(`[INFO] File URL: ${this.href}`);
            
            // 다운로드 진행 효과
            showDownloadProgress(fileName);
            
            // 버튼 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 성공 메시지 (실제 다운로드 완료 시뮬레이션)
            setTimeout(() => {
                console.log(`[SUCCESS] Download completed: ${fileName}`);
                showSuccessMessage(fileName);
            }, 1000);
        });
        
        // 호버 효과
        button.addEventListener('mouseenter', function() {
            const fileName = this.textContent.trim();
            console.log(`[HOVER] Preparing download: ${fileName}`);
        });
    });
}

// 다운로드 진행 표시
function showDownloadProgress(fileName) {
    const progressSteps = [
        '[INFO] Connecting to server...',
        '[DEBUG] Validating file integrity...',
        '[INFO] Starting file transfer...',
        '[DEBUG] Transfer in progress...',
        '[SUCCESS] Download initiated successfully!'
    ];
    
    progressSteps.forEach((step, index) => {
        setTimeout(() => {
            console.log(step);
        }, index * 200);
    });
}

// 성공 메시지 표시
function showSuccessMessage(fileName) {
    // 임시 성공 메시지 생성
    const successMsg = document.createElement('div');
    successMsg.className = 'success-status';
    successMsg.innerHTML = `<strong>[SUCCESS]</strong> ${fileName} 다운로드 완료!`;
    successMsg.style.position = 'fixed';
    successMsg.style.top = '20px';
    successMsg.style.right = '20px';
    successMsg.style.zIndex = '9999';
    successMsg.style.padding = '1rem';
    successMsg.style.borderRadius = '6px';
    successMsg.style.opacity = '0';
    successMsg.style.transform = 'translateX(100%)';
    successMsg.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.opacity = '1';
        successMsg.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 300);
    }, 3000);
}

// 키보드 단축키 설정
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + D: 디버그 모드 토글
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDebugMode();
            console.log('[DEBUG] Debug mode toggled');
        }
        
        // Ctrl + L: 콘솔 로그 클리어
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            console.clear();
            console.log('[INFO] Console cleared');
        }
        
        // F12: 개발자 도구 열기 힌트
        if (e.key === 'F12') {
            console.log('[HINT] Developer tools opened - Happy debugging! 🐛');
        }
        
        // Alt + E: 에러 시뮬레이션
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            simulateError();
        }
        
        // Alt + 1-9: 카드 하이라이트
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            highlightCard(parseInt(e.key) - 1);
        }
    });
    
    console.log('[INFO] Keyboard shortcuts initialized');
    console.log('[HELP] Shortcuts: Ctrl+D (Debug), Ctrl+L (Clear), Alt+E (Error), Alt+1-9 (Cards)');
}

// 디버그 모드 토글
function toggleDebugMode() {
    const body = document.body;
    const isDebugMode = body.classList.contains('debug-mode');
    
    if (isDebugMode) {
        body.classList.remove('debug-mode');
        console.log('[DEBUG] Debug mode disabled');
    } else {
        body.classList.add('debug-mode');
        console.log('[DEBUG] Debug mode enabled');
        showDebugInfo();
    }
}

// 디버그 정보 표시
function showDebugInfo() {
    const debugInfo = document.createElement('div');
    debugInfo.className = 'debug-info';
    debugInfo.innerHTML = `
        Page loaded: ${new Date().toLocaleString()}<br>
        User Agent: ${navigator.userAgent}<br>
        Screen: ${screen.width}x${screen.height}<br>
        Cards: ${document.querySelectorAll('.card').length}
    `;
    debugInfo.style.position = 'fixed';
    debugInfo.style.bottom = '20px';
    debugInfo.style.left = '20px';
    debugInfo.style.zIndex = '9999';
    debugInfo.style.maxWidth = '300px';
    
    document.body.appendChild(debugInfo);
    
    setTimeout(() => {
        if (document.body.contains(debugInfo)) {
            document.body.removeChild(debugInfo);
        }
    }, 5000);
}

// 에러 시뮬레이션
function simulateError() {
    console.error('[ERROR] Simulated error for testing purposes');
    console.warn('[WARNING] This is a test error - no actual problem occurred');
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-status';
    errorMsg.innerHTML = '<strong>[ERROR]</strong> 시뮬레이션 에러 - 테스트 목적';
    errorMsg.style.position = 'fixed';
    errorMsg.style.top = '20px';
    errorMsg.style.left = '20px';
    errorMsg.style.zIndex = '9999';
    errorMsg.style.padding = '1rem';
    errorMsg.style.borderRadius = '6px';
    
    document.body.appendChild(errorMsg);
    
    setTimeout(() => {
        document.body.removeChild(errorMsg);
    }, 3000);
}

// 카드 하이라이트
function highlightCard(index) {
    const cards = document.querySelectorAll('.card');
    if (index < cards.length) {
        // 모든 카드 하이라이트 제거
        cards.forEach(card => {
            card.style.border = '1px solid var(--console-border)';
        });
        
        // 선택된 카드 하이라이트
        const selectedCard = cards[index];
        selectedCard.style.border = '2px solid var(--error-primary)';
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        console.log(`[HIGHLIGHT] Card ${index + 1} highlighted`);
        
        // 3초 후 하이라이트 제거
        setTimeout(() => {
            selectedCard.style.border = '1px solid var(--console-border)';
        }, 3000);
    }
}

// 디버그 콘솔 설정
function setupDebugConsole() {
    // 페이지 성능 모니터링
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`[PERFORMANCE] Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // 스크롤 이벤트 디버깅
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            console.log(`[SCROLL] ${scrollPercent}% scrolled`);
        }, 100);
    });
}

// 에러 추적 설정
function setupErrorTracking() {
    window.addEventListener('error', function(e) {
        console.error('[GLOBAL ERROR]', e.error);
        console.log('[ERROR DETAILS]', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno
        });
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('[UNHANDLED PROMISE REJECTION]', e.reason);
    });
}

// 유틸리티 함수들
const debugUtils = {
    // 메모리 사용량 체크
    checkMemory: function() {
        if (performance.memory) {
            console.log('[MEMORY]', {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB',
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
            });
        }
    },
    
    // 네트워크 상태 체크
    checkNetwork: function() {
        if (navigator.onLine) {
            console.log('[NETWORK] Online');
        } else {
            console.warn('[NETWORK] Offline');
        }
    },
    
    // 브라우저 정보 출력
    browserInfo: function() {
        console.log('[BROWSER INFO]', {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled
        });
    }
};

// 전역 디버그 유틸리티 노출
window.debugUtils = debugUtils;

// 초기 시스템 체크
console.log('[SYSTEM CHECK] Starting system diagnostics...');
debugUtils.checkNetwork();
debugUtils.checkMemory();
console.log('[SYSTEM CHECK] Diagnostics complete'); 