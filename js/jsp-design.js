// JSP 테마 JavaScript
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
    
    // JSP 로고 애니메이션
    initJSPLogo();
    
    // 웹 기술 효과
    initWebEffects();
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
    console.log('JSP 문서 다운로드 시작:', url);
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

// JSP 로고 애니메이션
function initJSPLogo() {
    const logo = document.querySelector('.jsp-logo');
    if (!logo) return;
    
    // 클릭 시 특별한 애니메이션
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'jspPulse 0.5s ease-in-out 3';
        }, 10);
        
        // JSP 관련 메시지 표시
        showJSPMessage();
    });
    
    // 주기적으로 색상 변경
    setInterval(() => {
        if (Math.random() > 0.7) {
            logo.style.color = '#16a085';
            setTimeout(() => {
                logo.style.color = '';
            }, 1000);
        }
    }, 5000);
}

// JSP 관련 메시지 표시
function showJSPMessage() {
    const messages = [
        '🌐 JSP로 동적 웹 페이지를 만들어보세요!',
        '🚀 JavaServer Pages의 강력함을 경험하세요!',
        '💡 서버 사이드 렌더링의 세계에 오신 것을 환영합니다!',
        '🔧 MVC 패턴으로 체계적인 웹 개발을!',
        '⚡ JSP + Servlet = 완벽한 조합!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 임시 메시지 요소 생성
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2980b9, #16a085);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(41, 128, 185, 0.3);
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

// 웹 기술 효과
function initWebEffects() {
    // 페이지 로드 시 웹 연결 시뮬레이션
    setTimeout(() => {
        createWebConnectionEffect();
    }, 1000);
    
    // 주기적으로 데이터 전송 효과
    setInterval(() => {
        if (Math.random() > 0.8) {
            createDataTransferEffect();
        }
    }, 3000);
}

// 웹 연결 효과
function createWebConnectionEffect() {
    const cards = document.querySelectorAll('.document-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.border = '2px solid #2980b9';
            card.style.boxShadow = '0 0 20px rgba(41, 128, 185, 0.4)';
            
            setTimeout(() => {
                card.style.border = '';
                card.style.boxShadow = '';
            }, 500);
        }, index * 200);
    });
}

// 데이터 전송 효과
function createDataTransferEffect() {
    const randomCard = document.querySelector('.document-card:nth-child(' + 
        (Math.floor(Math.random() * 6) + 1) + ')');
    
    if (randomCard) {
        const transferElement = document.createElement('div');
        transferElement.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            width: 10px;
            height: 10px;
            background: #16a085;
            border-radius: 50%;
            animation: dataTransfer 1s ease-out;
        `;
        
        randomCard.style.position = 'relative';
        randomCard.appendChild(transferElement);
        
        setTimeout(() => {
            transferElement.remove();
        }, 1000);
    }
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
    
    @keyframes jspPulse {
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
    
    @keyframes dataTransfer {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.7;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    
    .document-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .page-btn i {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .jsp-logo {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .jsp-logo:hover {
        transform: scale(1.1);
        color: #16a085;
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const JSPUtils = {
    // 랜덤 JSP 색상 생성
    getRandomJSPColor: function() {
        const colors = ['#2980b9', '#16a085', '#21618c', '#3498db'];
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
    
    // JSP 기술 설명
    explainJSPConcept: function(concept) {
        const concepts = {
            'scriptlet': '스크립트릿: <% %> 태그 안에 Java 코드를 작성합니다.',
            'expression': '표현식: <%= %> 태그로 값을 출력합니다.',
            'directive': '지시어: <%@ %> 태그로 페이지 설정을 합니다.',
            'mvc': 'MVC: Model-View-Controller 패턴으로 구조화된 웹 개발을 합니다.',
            'jstl': 'JSTL: JSP Standard Tag Library로 태그 기반 프로그래밍을 합니다.'
        };
        
        return concepts[concept] || 'JSP로 동적 웹 페이지를 만들어보세요!';
    },
    
    // 웹 개발 팁
    getWebDevTip: function() {
        const tips = [
            '💡 JSP는 서버에서 실행되어 HTML을 생성합니다.',
            '🔧 EL(Expression Language)을 사용하면 더 깔끔한 코드를 작성할 수 있습니다.',
            '📦 JSTL을 활용하여 반복문과 조건문을 태그로 처리하세요.',
            '🎯 MVC 패턴을 적용하여 유지보수성을 높이세요.',
            '🚀 세션과 쿠키를 활용하여 상태를 관리하세요.'
        ];
        
        return tips[Math.floor(Math.random() * tips.length)];
    }
};

// 전역 변수로 유틸리티 노출
window.JSPUtils = JSPUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('scroll', JSPUtils.debounce(animateOnScroll, 10));
window.addEventListener('resize', JSPUtils.debounce(() => {
    // 리사이즈 시 필요한 처리
    console.log('창 크기 변경됨');
}, 250));

// 콘솔 환영 메시지
console.log(`
🌐 JSP 문서 센터에 오신 것을 환영합니다!

JSP 핵심 요소:
1. 스크립트릿 (Scriptlet): <% %>
2. 표현식 (Expression): <%= %>
3. 지시어 (Directive): <%@ %>
4. JSTL (JSP Standard Tag Library)
5. EL (Expression Language)

동적 웹 페이지의 세계를 탐험하세요! 🚀
`);

// 페이지 로드 완료 메시지
window.addEventListener('load', function() {
    console.log('🌐 JSP 페이지 로드 완료!');
    
    // 성능 측정
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`📊 페이지 로드 시간: ${loadTime}ms`);
    }
    
    // 웹 개발 팁 표시
    setTimeout(() => {
        console.log(JSPUtils.getWebDevTip());
    }, 2000);
}); 