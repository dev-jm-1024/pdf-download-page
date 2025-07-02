// MongoDB 테마 JavaScript
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
    
    // MongoDB 로고 애니메이션
    initMongoLogo();
    
    // 데이터베이스 연결 시뮬레이션
    initDatabaseAnimation();
});

// 페이지 로드 애니메이션
function initPageAnimations() {
    const elements = document.querySelectorAll('.document-card, .page-btn');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px) scale(0.9)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 150 + 300);
    });
    
    // 헤더 애니메이션
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-30px) scale(0.95)';
        
        setTimeout(() => {
            header.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
}

// 다운로드 버튼 기능
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 다운로드 시작 효과
            showMongoDownloadEffect(this);
            
            // 다운로드 통계
            trackMongoDownload(this.href);
        });
    });
}

// MongoDB 스타일 다운로드 효과
function showMongoDownloadEffect(button) {
    const originalHTML = button.innerHTML;
    
    // 1단계: 연결 중
    button.innerHTML = `
        <i class="fas fa-wifi"></i>
        연결 중...
    `;
    button.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // 2단계: 데이터 조회 중
        button.innerHTML = `
            <div class="loading"></div>
            데이터 조회 중...
        `;
        button.style.background = 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)';
        
        setTimeout(() => {
            // 3단계: 다운로드 중
            button.innerHTML = `
                <i class="fas fa-download"></i>
                다운로드 중...
            `;
            button.style.background = 'linear-gradient(135deg, #fd7e14 0%, #e8590c 100%)';
            
            setTimeout(() => {
                // 4단계: 완료
                button.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    완료!
                `;
                button.classList.add('success');
                
                // 파티클 효과
                createSuccessParticles(button);
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                    button.style.pointerEvents = '';
                    button.classList.remove('success');
                }, 2000);
            }, 1500);
        }, 1000);
    }, 800);
}

// 성공 파티클 효과
function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#00684A', '#13AA52', '#FFE212'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const lifetime = 1000 + Math.random() * 500;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: lifetime,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }
}

// 다운로드 추적
function trackMongoDownload(url) {
    console.log('MongoDB 문서 다운로드:', url);
    // 분석 코드 추가 가능
}

// 스크롤 효과
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', MongoUtils.debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향에 따른 헤더 효과
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 아래로 스크롤
            if (header) {
                header.style.transform = 'translateY(-15px) scale(0.98)';
                header.style.opacity = '0.85';
            }
        } else {
            // 위로 스크롤
            if (header) {
                header.style.transform = 'translateY(0) scale(1)';
                header.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // 스크롤 기반 요소 애니메이션
        animateOnScroll();
        
        // 패럴랙스 효과
        updateParallax(scrollTop);
    }, 10));
}

// 패럴랙스 효과
function updateParallax(scrollTop) {
    const header = document.querySelector('header');
    if (header) {
        const speed = scrollTop * 0.3;
        header.style.backgroundPosition = `center ${speed}px`;
    }
}

// 스크롤 시 요소 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.document-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// 카드 호버 효과
function initCardEffects() {
    const cards = document.querySelectorAll('.document-card');
    
    cards.forEach(card => {
        // 3D 마우스 추적 효과
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            this.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.03)
            `;
            
            // 광택 효과
            updateCardGloss(this, x, y, rect.width, rect.height);
        });
        
        // 마우스 떠날 때
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            removeCardGloss(this);
        });
        
        // 클릭 효과
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-8px) scale(0.97)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });
    });
}

// 카드 광택 효과
function updateCardGloss(card, x, y, width, height) {
    let gloss = card.querySelector('.card-gloss');
    if (!gloss) {
        gloss = document.createElement('div');
        gloss.className = 'card-gloss';
        gloss.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 50%);
            pointer-events: none;
            border-radius: inherit;
            transition: opacity 0.3s ease;
        `;
        card.appendChild(gloss);
    }
    
    gloss.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 50%)`;
}

// 카드 광택 제거
function removeCardGloss(card) {
    const gloss = card.querySelector('.card-gloss');
    if (gloss) {
        gloss.style.opacity = '0';
        setTimeout(() => gloss.remove(), 300);
    }
}

// 네비게이션 버튼 효과
function initNavigationButtons() {
    const navButtons = document.querySelectorAll('.page-btn');
    
    navButtons.forEach(button => {
        // 클릭 시 물결 효과
        button.addEventListener('click', function(e) {
            createMongoRipple(e, this);
        });
        
        // 호버 시 아이콘 애니메이션
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(8px) scale(1.2)';
                icon.style.color = '#FFE212';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0) scale(1)';
                icon.style.color = '';
            }
        });
    });
}

// MongoDB 스타일 물결 효과
function createMongoRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 226, 18, 0.6) 0%, rgba(19, 170, 82, 0.3) 50%, transparent 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: mongoRipple 0.8s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

// MongoDB 로고 애니메이션
function initMongoLogo() {
    const logo = document.querySelector('.mongo-logo');
    if (!logo) return;
    
    // 클릭 시 특별한 애니메이션
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'mongoSpecial 1s ease-in-out';
        }, 10);
    });
    
    // 주기적으로 색상 변경
    setInterval(() => {
        if (Math.random() > 0.8) {
            logo.style.filter = 'hue-rotate(60deg) brightness(1.2)';
            setTimeout(() => {
                logo.style.filter = '';
            }, 1500);
        }
    }, 6000);
}

// 데이터베이스 연결 시뮬레이션
function initDatabaseAnimation() {
    // 헤더에 연결 상태 표시
    const header = document.querySelector('header');
    if (header) {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'db-status';
        statusIndicator.innerHTML = `
            <div class="status-dot"></div>
            <span>MongoDB 연결됨</span>
        `;
        statusIndicator.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.8);
            z-index: 3;
        `;
        
        const dot = statusIndicator.querySelector('.status-dot');
        if (dot) {
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                background: #13AA52;
                border-radius: 50%;
                animation: pulse 2s ease-in-out infinite;
            `;
        }
        
        header.appendChild(statusIndicator);
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes mongoRipple {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes mongoSpecial {
        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        25% { transform: translateY(-20px) rotate(10deg) scale(1.2); }
        50% { transform: translateY(-15px) rotate(-5deg) scale(1.1); }
        75% { transform: translateY(-10px) rotate(3deg) scale(1.05); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
    }
    
    .animate-in {
        animation: mongoSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes mongoSlideIn {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .document-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .page-btn i {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .mongo-logo {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }
    
    .mongo-logo:hover {
        transform: scale(1.1) rotate(5deg);
        filter: brightness(1.2);
    }
    
    .db-status {
        animation: slideInRight 1s ease-out 2s both;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const MongoUtils = {
    // 랜덤 MongoDB 색상 생성
    getRandomMongoColor: function() {
        const colors = ['#00684A', '#13AA52', '#FFE212', '#004d36'];
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
    
    // 데이터베이스 연결 시뮬레이션
    simulateConnection: function(callback) {
        const steps = [
            { message: '데이터베이스 연결 중...', delay: 500 },
            { message: '인증 중...', delay: 300 },
            { message: '컬렉션 조회 중...', delay: 400 },
            { message: '연결 완료!', delay: 200 }
        ];
        
        let currentStep = 0;
        const executeStep = () => {
            if (currentStep < steps.length) {
                console.log(steps[currentStep].message);
                setTimeout(() => {
                    currentStep++;
                    executeStep();
                }, steps[currentStep - 1]?.delay || 0);
            } else if (callback) {
                callback();
            }
        };
        
        executeStep();
    }
};

// 전역 변수로 유틸리티 노출
window.MongoUtils = MongoUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('resize', MongoUtils.debounce(() => {
    console.log('MongoDB 페이지 리사이즈 감지');
    // 필요한 리사이즈 처리
}, 250));

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    console.log('MongoDB 세션 종료');
}); 