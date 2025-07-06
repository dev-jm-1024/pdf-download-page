// Modern Java 테마 JavaScript
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
    
    // Java 로고 애니메이션
    initJavaLogo();
    
    // 코드 타이핑 효과
    initCodeTypingEffect();
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
            showDownloadEffect(this);
            
            // 다운로드 통계 (선택사항)
            trackDownload(this.href);
        });
    });
}

// 다운로드 효과 표시 (Java 스타일)
function showDownloadEffect(button) {
    const originalText = button.textContent;
    const originalHTML = button.innerHTML;
    
    // Java 스타일 로딩 애니메이션
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        compiling...
    `;
    button.style.pointerEvents = 'none';
    
    // 2초 후 완료 상태로 변경
    setTimeout(() => {
        button.innerHTML = `
            <i class="fas fa-check"></i>
            compiled successfully!
        `;
        button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.pointerEvents = '';
        }, 1500);
    }, 1000);
}

// 다운로드 추적 (선택사항)
function trackDownload(url) {
    console.log('☕ Java 문서 다운로드 시작:', url);
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
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
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
            createRippleEffect(e, this);
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

// 물결 효과 생성
function createRippleEffect(event, element) {
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
        background: rgba(248, 152, 32, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Java 로고 애니메이션
function initJavaLogo() {
    const logo = document.querySelector('.java-logo');
    if (!logo) return;
    
    // 클릭 시 특별한 애니메이션
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'javaBounce 0.5s ease-in-out 3';
        }, 10);
        
        // Java 컴파일 사운드 효과 (시각적)
        showCompileEffect();
    });
    
    // 주기적으로 색상 변경
    setInterval(() => {
        if (Math.random() > 0.8) {
            logo.style.filter = 'hue-rotate(30deg) brightness(1.2)';
            setTimeout(() => {
                logo.style.filter = '';
            }, 1000);
        }
    }, 5000);
}

// Java 컴파일 효과
function showCompileEffect() {
    const header = document.querySelector('header');
    const compileMessage = document.createElement('div');
    compileMessage.textContent = 'Compiling Java classes...';
    compileMessage.style.cssText = `
        position: absolute;
        top: 50px;
        right: 20px;
        color: rgba(255, 255, 255, 0.8);
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        opacity: 0;
        animation: fadeInOut 2s ease;
    `;
    
    header.appendChild(compileMessage);
    
    setTimeout(() => {
        compileMessage.remove();
    }, 2000);
}

// 코드 타이핑 효과
function initCodeTypingEffect() {
    const titles = document.querySelectorAll('.document-title');
    
    titles.forEach(title => {
        const originalText = title.textContent;
        
        title.addEventListener('mouseenter', function() {
            if (this.classList.contains('typing')) return;
            
            this.classList.add('typing');
            this.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    this.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    this.classList.remove('typing');
                }
            };
            
            typeWriter();
        });
    });
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes javaBounce {
        0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
        25% { transform: translateY(-15px) scale(1.1) rotate(-10deg); }
        50% { transform: translateY(-10px) scale(1.05) rotate(5deg); }
        75% { transform: translateY(-5px) scale(1.02) rotate(-3deg); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(20px); }
        50% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(-20px); }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .document-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .page-btn i {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .java-logo {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .java-logo:hover {
        transform: scale(1.1) rotate(10deg);
        filter: brightness(1.2);
    }
    
    .typing {
        border-right: 2px solid #f89820;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { border-color: #f89820; }
        51%, 100% { border-color: transparent; }
    }
    
    /* Java 코드 하이라이트 효과 */
    .document-card:hover .document-title {
        color: #f89820;
        text-shadow: 0 0 5px rgba(248, 152, 32, 0.3);
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const JavaUtils = {
    // 랜덤 Java 색상 생성
    getRandomJavaColor: function() {
        const colors = ['#f89820', '#ed8b00', '#5382a1', '#2f4f4f'];
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
    
    // Java 버전 체크 (시뮬레이션)
    checkJavaVersion: function() {
        const versions = ['Java 8', 'Java 11', 'Java 17', 'Java 21'];
        const randomVersion = versions[Math.floor(Math.random() * versions.length)];
        console.log(`☕ 현재 Java 버전: ${randomVersion}`);
        return randomVersion;
    }
};

// 전역 변수로 유틸리티 노출
window.JavaUtils = JavaUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('scroll', JavaUtils.debounce(animateOnScroll, 10));
window.addEventListener('resize', JavaUtils.debounce(() => {
    // 리사이즈 시 필요한 처리
    console.log('☕ 화면 크기 변경됨 - 레이아웃 재조정');
}, 250));

// Java 개발 환경 시뮬레이션
console.log(`
☕ Modern Java Development Environment Loaded!

Available Commands:
- JavaUtils.checkJavaVersion() : Java 버전 확인
- JavaUtils.smoothScrollTo('.documents') : 부드러운 스크롤
- JavaUtils.getRandomJavaColor() : 랜덤 Java 색상

Happy Coding! 🚀
`); 