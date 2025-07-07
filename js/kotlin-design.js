// Kotlin 테마 JavaScript
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
    
    // Kotlin 로고 애니메이션
    initKotlinLogo();
    
    // Kotlin 특화 기능들
    initKotlinFeatures();
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
            showKotlinDownloadEffect(this);
            
            // 다운로드 통계 (선택사항)
            trackDownload(this.href);
        });
    });
}

// Kotlin 스타일 다운로드 효과 표시
function showKotlinDownloadEffect(button) {
    const originalText = button.textContent;
    const originalHTML = button.innerHTML;
    
    // 로딩 애니메이션 추가
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        fun downloading()
    `;
    button.style.pointerEvents = 'none';
    
    // 2초 후 원래 상태로 복원
    setTimeout(() => {
        button.innerHTML = `
            <i class="fas fa-check"></i>
            완료!
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
    console.log('Kotlin 문서 다운로드 시작:', url);
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
            createKotlinRippleEffect(e, this);
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

// Kotlin 스타일 물결 효과 생성
function createKotlinRippleEffect(event, element) {
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
        background: linear-gradient(45deg, rgba(127, 82, 255, 0.3), rgba(248, 137, 9, 0.3));
        border-radius: 50%;
        transform: scale(0);
        animation: kotlinRipple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Kotlin 로고 애니메이션
function initKotlinLogo() {
    const logo = document.querySelector('.kotlin-logo');
    if (!logo) return;
    
    // 클릭 시 특별한 애니메이션
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'kotlinPulse 0.5s ease-in-out 3';
        }, 10);
        
        // 클릭 시 색상 변화
        this.style.background = 'linear-gradient(45deg, #7F52FF, #F88909)';
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
            logo.style.color = '#F88909';
            setTimeout(() => {
                logo.style.color = '';
            }, 1000);
        }
    }, 5000);
}

// Kotlin 특화 기능들
function initKotlinFeatures() {
    // 코드 스니펫 하이라이팅 효과
    const codeElements = document.querySelectorAll('.document-title');
    codeElements.forEach(element => {
        if (element.textContent.includes('fun ') || element.textContent.includes('class ')) {
            element.style.fontFamily = 'JetBrains Mono, monospace';
            element.style.fontSize = '1.1rem';
        }
    });
    
    // 키보드 단축키 (Kotlin 개발자 친화적)
    document.addEventListener('keydown', function(e) {
        // Ctrl + K로 첫 번째 다운로드
        if (e.ctrlKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const firstDownloadBtn = document.querySelector('.download-btn');
            if (firstDownloadBtn) {
                firstDownloadBtn.click();
            }
        }
        
        // Alt + F로 fun 키워드가 있는 카드 하이라이트
        if (e.altKey && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            highlightFunctionCards();
        }
    });
    
    // 다크 모드 감지 및 테마 조정
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('kotlin-dark-mode');
    }
    
    // 개발자 콘솔 메시지
    console.log(`
🎯 Kotlin 테마가 로드되었습니다!

특별 기능:
- Ctrl + K: 첫 번째 문서 다운로드
- Alt + F: 함수 관련 카드 하이라이트
- 로고 클릭: 특별 애니메이션

fun main() {
    println("Happy Kotlin Learning! 🚀")
}
    `);
}

// 함수 관련 카드 하이라이트
function highlightFunctionCards() {
    const cards = document.querySelectorAll('.document-card');
    cards.forEach(card => {
        const title = card.querySelector('.document-title');
        if (title && (title.textContent.includes('fun ') || title.textContent.includes('함수'))) {
            card.style.border = '2px solid #F88909';
            card.style.boxShadow = '0 0 20px rgba(248, 137, 9, 0.3)';
            
            setTimeout(() => {
                card.style.border = '';
                card.style.boxShadow = '';
            }, 3000);
        }
    });
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes kotlinRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes kotlinPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2) rotate(5deg); }
        50% { transform: scale(1.1) rotate(-3deg); }
        75% { transform: scale(1.05) rotate(2deg); }
    }
    
    .animate-in {
        animation: kotlinSlideIn 0.6s ease forwards;
    }
    
    @keyframes kotlinSlideIn {
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
    
    .kotlin-logo {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .kotlin-logo:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 10px rgba(127, 82, 255, 0.5));
    }
    
    .kotlin-dark-mode {
        --kotlin-light: #1E293B;
        --kotlin-dark: #F1F5F9;
    }
    
    .kotlin-dark-mode .document-card {
        background: #1E293B;
        color: #F1F5F9;
    }
    
    .kotlin-dark-mode .document-info {
        color: #94A3B8;
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const KotlinUtils = {
    // 랜덤 Kotlin 색상 생성
    getRandomKotlinColor: function() {
        const colors = ['#7F52FF', '#F88909', '#6B46C1', '#EA580C'];
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
    
    // Kotlin 스타일 로깅
    log: function(message) {
        console.log(`🔷 Kotlin: ${message}`);
    }
};

// 전역 변수로 유틸리티 노출
window.KotlinUtils = KotlinUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('scroll', KotlinUtils.debounce(animateOnScroll, 10));
window.addEventListener('resize', KotlinUtils.debounce(() => {
    KotlinUtils.log('창 크기 변경됨');
}, 250)); 