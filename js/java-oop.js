// Java OOP 테마 JavaScript
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

// 다운로드 효과 표시
function showDownloadEffect(button) {
    const originalText = button.textContent;
    const originalHTML = button.innerHTML;
    
    // 로딩 애니메이션 추가
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        다운로드 중...
    `;
    button.style.pointerEvents = 'none';
    
    // 2초 후 원래 상태로 복원
    setTimeout(() => {
        button.innerHTML = `
            <i class="fas fa-check"></i>
            완료!
        `;
        button.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.style.pointerEvents = '';
        }, 1500);
    }, 1000);
}

// 다운로드 추적 (선택사항)
function trackDownload(url) {
    console.log('Java OOP 문서 다운로드 시작:', url);
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
        background: rgba(255, 255, 255, 0.3);
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
        
        // Java 관련 메시지 표시
        showJavaMessage();
    });
    
    // 주기적으로 색상 변경
    setInterval(() => {
        if (Math.random() > 0.7) {
            logo.style.color = '#f89820';
            setTimeout(() => {
                logo.style.color = '';
            }, 1000);
        }
    }, 5000);
}

// Java 관련 메시지 표시
function showJavaMessage() {
    const messages = [
        '☕ Write Once, Run Anywhere!',
        '🚀 Java OOP의 세계에 오신 것을 환영합니다!',
        '💡 클래스와 객체로 세상을 바라보세요!',
        '🔧 캡슐화, 상속, 다형성을 마스터하세요!',
        '⚡ Java의 힘을 느껴보세요!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 임시 메시지 요소 생성
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f89820, #ed8b00);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(248, 152, 32, 0.3);
    `;
    messageElement.textContent = randomMessage;
    
    document.body.appendChild(messageElement);
    
    // 3초 후 제거
    setTimeout(() => {
        messageElement.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
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
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-15px) scale(1.1); }
        50% { transform: translateY(-10px) scale(1.05); }
        75% { transform: translateY(-5px) scale(1.02); }
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
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
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
        transform: scale(1.1);
        color: #f89820;
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const JavaOOPUtils = {
    // 랜덤 Java 색상 생성
    getRandomJavaColor: function() {
        const colors = ['#f89820', '#ed8b00', '#e07b00', '#d73027'];
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
    
    // Java OOP 개념 설명
    explainOOPConcept: function(concept) {
        const concepts = {
            'encapsulation': '캡슐화: 데이터와 메서드를 하나로 묶어 정보 은닉을 구현합니다.',
            'inheritance': '상속: 기존 클래스의 특성을 새로운 클래스가 물려받습니다.',
            'polymorphism': '다형성: 하나의 인터페이스로 여러 타입의 객체를 다룰 수 있습니다.',
            'abstraction': '추상화: 복잡한 구현 세부사항을 숨기고 필요한 기능만 노출합니다.'
        };
        
        return concepts[concept] || 'Java OOP의 핵심 개념을 학습하세요!';
    }
};

// 전역 변수로 유틸리티 노출
window.JavaOOPUtils = JavaOOPUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('scroll', JavaOOPUtils.debounce(animateOnScroll, 10));
window.addEventListener('resize', JavaOOPUtils.debounce(() => {
    // 리사이즈 시 필요한 처리
    console.log('창 크기 변경됨');
}, 250));

// 콘솔 환영 메시지
console.log(`
☕ Java OOP 문서 센터에 오신 것을 환영합니다!

Java OOP의 4대 원칙:
1. 캡슐화 (Encapsulation)
2. 상속 (Inheritance)  
3. 다형성 (Polymorphism)
4. 추상화 (Abstraction)

Write Once, Run Anywhere! 🚀
`);

// 페이지 로드 완료 메시지
window.addEventListener('load', function() {
    console.log('☕ Java OOP 페이지 로드 완료!');
    
    // 성능 측정
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`📊 페이지 로드 시간: ${loadTime}ms`);
    }
}); 