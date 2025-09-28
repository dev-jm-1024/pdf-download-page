// 네트워크 테마 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 애니메이션
    initPageAnimations();
    
    // 다운로드 버튼 기능
    initDownloadButtons();
    
    // 스크롤 효과
    initScrollEffects();
    
    // 카드 호버 효과
    initCardEffects();
    
    // 네비게이션 버튼 효과
    initNavigationButtons();
    
    // 네트워크 로고 애니메이션
    initNetworkLogo();
    
    // 네트워크 특화 기능들
    initNetworkFeatures();
});

// 페이지 로드 애니메이션
function initPageAnimations() {
    const elements = document.querySelectorAll('.document-card, .page-btn');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 헤더 애니메이션
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
}

// 다운로드 버튼 기능
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 다운로드 시작 효과
            showNetworkDownloadEffect(this);
            
            // 다운로드 통계 (선택사항)
            trackDownload(this.href);
        });
    });
}

// 네트워크 스타일 다운로드 효과 표시
function showNetworkDownloadEffect(button) {
    const originalText = button.textContent;
    const originalHTML = button.innerHTML;
    
    // 로딩 애니메이션 추가
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        connecting...
    `;
    button.style.pointerEvents = 'none';
    
    // 2초 후 원래 상태로 복원
    setTimeout(() => {
        button.innerHTML = `
            <i class="fas fa-check"></i>
            연결 완료!
        `;
        button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.pointerEvents = '';
        }, 1500);
    }, 1000);
}

// 다운로드 추적 (선택사항)
function trackDownload(url) {
    console.log('네트워크 문서 다운로드 시작:', url);
    // 여기에 분석 코드를 추가할 수 있습니다
}

// 스크롤 효과
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향에 따른 헤더 효과
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 아래로 스크롤
            if (header) {
                header.style.transform = 'translateY(-10px)';
                header.style.opacity = '0.9';
            }
        } else {
            // 위로 스크롤
            if (header) {
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // 스크롤 기반 요소 애니메이션
        animateOnScroll();
    });
}

// 스크롤 시 요소 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.document-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// 카드 호버 효과
function initCardEffects() {
    const cards = document.querySelectorAll('.document-card');
    
    cards.forEach(card => {
        // 마우스 이동 효과
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                translateY(-8px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });
        
        // 마우스 떠날 때
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
        
        // 클릭 효과
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
}

// 네비게이션 버튼 효과
function initNavigationButtons() {
    const navButtons = document.querySelectorAll('.page-btn');
    
    navButtons.forEach(button => {
        // 클릭 시 물결 효과
        button.addEventListener('click', function(e) {
            createNetworkRippleEffect(e, this);
        });
        
        // 호버 시 아이콘 애니메이션
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px) scale(1.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
}

// 네트워크 스타일 물결 효과 생성
function createNetworkRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: linear-gradient(45deg, rgba(14, 165, 233, 0.3), rgba(16, 185, 129, 0.3));
        border-radius: 50%;
        transform: scale(0);
        animation: networkRipple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 네트워크 로고 애니메이션
function initNetworkLogo() {
    const logo = document.querySelector('.network-logo');
    if (!logo) return;
    
    // 클릭 시 특별한 애니메이션
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'networkPulse 0.5s ease-in-out 3';
        }, 10);
        
        // 클릭 시 색상 변화
        this.style.background = 'linear-gradient(45deg, #0EA5E9, #10B981)';
        this.style.webkitBackgroundClip = 'text';
        this.style.webkitTextFillColor = 'transparent';
        
        setTimeout(() => {
            this.style.background = '';
            this.style.webkitBackgroundClip = '';
            this.style.webkitTextFillColor = '';
        }, 2000);
    });
    
    // 주기적으로 색상 변경
    setInterval(() => {
        if (Math.random() > 0.8) {
            logo.style.color = '#10B981';
            setTimeout(() => {
                logo.style.color = '';
            }, 1000);
        }
    }, 5000);
}

// 네트워크 특화 기능들
function initNetworkFeatures() {
    // 프로토콜 키워드 하이라이팅 효과
    const titleElements = document.querySelectorAll('.document-title');
    titleElements.forEach(element => {
        if (element.textContent.includes('TCP') || 
            element.textContent.includes('HTTP') || 
            element.textContent.includes('소켓') ||
            element.textContent.includes('프로토콜')) {
            element.style.fontFamily = 'JetBrains Mono, monospace';
            element.style.fontSize = '1.1rem';
        }
    });
    
    // 키보드 단축키 (네트워크 개발자 친화적)
    document.addEventListener('keydown', function(e) {
        // Ctrl + N으로 첫 번째 다운로드
        if (e.ctrlKey && e.key.toLowerCase() === 'n') {
            e.preventDefault();
            const firstDownloadBtn = document.querySelector('.download-btn');
            if (firstDownloadBtn) {
                firstDownloadBtn.click();
            }
        }
        
        // Alt + P로 프로토콜 관련 카드 하이라이트
        if (e.altKey && e.key.toLowerCase() === 'p') {
            e.preventDefault();
            highlightProtocolCards();
        }
        
        // Alt + S로 보안 관련 카드 하이라이트
        if (e.altKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            highlightSecurityCards();
        }
    });
    
    // 다크 모드 감지 및 테마 조정
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('network-dark-mode');
    }
    
    // 네트워크 연결 상태 모니터링
    monitorNetworkStatus();
    
    // 개발자 콘솔 메시지
    console.log(`
🌐 네트워크 테마가 로드되었습니다!

특별 기능:
- Ctrl + N: 첫 번째 문서 다운로드
- Alt + P: 프로토콜 관련 카드 하이라이트
- Alt + S: 보안 관련 카드 하이라이트
- 로고 클릭: 특별 애니메이션

class NetworkManager {
    connect() {
        console.log("Happy Network Learning! 🚀");
    }
}
    `);
}

// 프로토콜 관련 카드 하이라이트
function highlightProtocolCards() {
    const cards = document.querySelectorAll('.document-card');
    cards.forEach(card => {
        const title = card.querySelector('.document-title');
        if (title && (title.textContent.includes('TCP') || 
                     title.textContent.includes('HTTP') || 
                     title.textContent.includes('프로토콜'))) {
            card.style.border = '2px solid #0EA5E9';
            card.style.boxShadow = '0 0 20px rgba(14, 165, 233, 0.3)';
            
            setTimeout(() => {
                card.style.border = '';
                card.style.boxShadow = '';
            }, 3000);
        }
    });
}

// 보안 관련 카드 하이라이트
function highlightSecurityCards() {
    const cards = document.querySelectorAll('.document-card');
    cards.forEach(card => {
        const title = card.querySelector('.document-title');
        if (title && (title.textContent.includes('보안') || 
                     title.textContent.includes('HTTPS') || 
                     title.textContent.includes('SSL'))) {
            card.style.border = '2px solid #10B981';
            card.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
            
            setTimeout(() => {
                card.style.border = '';
                card.style.boxShadow = '';
            }, 3000);
        }
    });
}

// 네트워크 연결 상태 모니터링
function monitorNetworkStatus() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        function updateConnectionInfo() {
            const connectionType = connection.effectiveType || 'unknown';
            const downlink = connection.downlink || 0;
            
            console.log(`🌐 네트워크 상태: ${connectionType}, 다운링크: ${downlink}Mbps`);
        }
        
        connection.addEventListener('change', updateConnectionInfo);
        updateConnectionInfo();
    }
    
    // 온라인/오프라인 상태 감지
    window.addEventListener('online', function() {
        showNetworkStatus('온라인 상태입니다', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNetworkStatus('오프라인 상태입니다', 'warning');
    });
}

// 네트워크 상태 표시
function showNetworkStatus(message, type) {
    const statusElement = document.createElement('div');
    statusElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: #10B981;' : 'background: #F59E0B;'}
    `;
    statusElement.textContent = message;
    
    document.body.appendChild(statusElement);
    
    setTimeout(() => {
        statusElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            statusElement.remove();
        }, 300);
    }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes networkRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes networkPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2) rotate(10deg); }
        50% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.05) rotate(3deg); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .animate-in {
        animation: networkSlideIn 0.6s ease forwards;
    }
    
    @keyframes networkSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .document-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .page-btn i {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .network-logo {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .network-logo:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.5));
    }
    
    .network-dark-mode {
        --network-light: #1E293B;
        --network-dark: #F1F5F9;
    }
    
    .network-dark-mode .document-card {
        background: #1E293B;
        color: #F1F5F9;
    }
    
    .network-dark-mode .document-info {
        color: #94A3B8;
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const NetworkUtils = {
    // 랜덤 네트워크 색상 생성
    getRandomNetworkColor: function() {
        const colors = ['#0EA5E9', '#10B981', '#3B82F6', '#06B6D4'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    // 부드러운 스크롤
    smoothScrollTo: function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },
    
    // 디바운스 함수
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 네트워크 스타일 로깅
    log: function(message) {
        console.log(`🌐 Network: ${message}`);
    },
    
    // IP 주소 검증
    validateIP: function(ip) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    },
    
    // 포트 번호 검증
    validatePort: function(port) {
        const portNum = parseInt(port);
        return portNum >= 1 && portNum <= 65535;
    }
};

// 전역 변수로 유틸리티 노출
window.NetworkUtils = NetworkUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('scroll', NetworkUtils.debounce(animateOnScroll, 10));
window.addEventListener('resize', NetworkUtils.debounce(() => {
    NetworkUtils.log('창 크기 변경됨');
}, 250));
