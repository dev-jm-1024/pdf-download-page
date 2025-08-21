// My GitHub 테마 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initPageAnimations();
    initVisitButtons();
    initScrollEffects();
    initCardEffects();
    initNavigationButtons();
    initOctoLogo();
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

// 이동 버튼 기능 (기존 다운로드 버튼 스타일 재사용)
function initVisitButtons() {
    const visitButtons = document.querySelectorAll('.download-btn');
    
    visitButtons.forEach(button => {
        button.addEventListener('click', function() {
            showVisitEffect(this);
            trackVisit(this.href);
        });
    });
}

function showVisitEffect(button) {
    const originalHTML = button.innerHTML;
    
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        이동 중...
    `;
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
        button.innerHTML = `
            <i class="fas fa-check"></i>
            열렸습니다
        `;
        button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.pointerEvents = '';
        }, 1200);
    }, 800);
}

// 방문 추적 (선택사항)
function trackVisit(url) {
    console.log('GitHub 링크 이동:', url);
}

// 스크롤 효과
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            if (header) {
                header.style.transform = 'translateY(-10px)';
                header.style.opacity = '0.92';
            }
        } else {
            if (header) {
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
        animateOnScroll();
    });
}

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
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
        
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
}

// 네비게이션 버튼 효과 (물결)
function initNavigationButtons() {
    const navButtons = document.querySelectorAll('.page-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
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
        background: linear-gradient(45deg, rgba(36, 41, 47, 0.25), rgba(46, 160, 67, 0.25));
        border-radius: 50%;
        transform: scale(0);
        animation: ghRipple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// GitHub 로고 상호작용
function initOctoLogo() {
    const logo = document.querySelector('.github-logo');
    if (!logo) return;
    
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'octoPulse 0.5s ease-in-out 3';
        }, 10);
    });
}

// 애니메이션 스타일 삽입
const style = document.createElement('style');
style.textContent = `
    @keyframes ghRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    .animate-in {
        animation: ghSlideIn 0.6s ease forwards;
    }
    @keyframes ghSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);


