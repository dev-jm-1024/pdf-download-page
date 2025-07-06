// 객체지향 설계 테마 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // OOP 시스템 초기화
    const OOPSystem = new ObjectOrientedSystem();
    OOPSystem.initialize();
});

// 객체지향 시스템 클래스
class ObjectOrientedSystem {
    constructor() {
        this.isInitialized = false;
        this.animationQueue = [];
        this.designPatterns = ['Singleton', 'Factory', 'Observer', 'Strategy'];
    }

    initialize() {
        if (this.isInitialized) return;
        
        console.log('🏛️ Initializing Software Architecture Design System...');
        
        // 시스템 컴포넌트 초기화
        this.initializeComponents();
        this.startDesignAnimation();
        this.bindEventHandlers();
        this.showWelcomeMessage();
        
        this.isInitialized = true;
        console.log('✅ Architecture System initialized successfully!');
    }

    initializeComponents() {
        // 페이지 로드 애니메이션
        this.animatePageLoad();
        
        // 다운로드 시스템 초기화
        this.initDownloadSystem();
        
        // 카드 인터랙션 시스템
        this.initCardInteractions();
        
        // 스크롤 효과
        this.initScrollEffects();
        
        // 네비게이션 시스템
        this.initNavigationSystem();
    }

    animatePageLoad() {
        const elements = document.querySelectorAll('.document-card, .page-btn');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // 헤더 클래스 컴파일 애니메이션
        const header = document.querySelector('header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                header.style.transition = 'all 0.8s ease';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    initDownloadSystem() {
        const downloadButtons = document.querySelectorAll('.download-btn');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.executeDownload(button);
            });
        });
    }

    executeDownload(button) {
        const originalText = button.textContent;
        
        // 컴파일 시뮬레이션
        button.innerHTML = `
            <i class="fas fa-cog fa-spin"></i>
            compiling...
        `;
        button.style.pointerEvents = 'none';
        button.style.background = 'linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%)';
        
        setTimeout(() => {
            button.innerHTML = `
                <i class="fas fa-check-circle"></i>
                compiled successfully!
            `;
            button.style.background = 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.style.pointerEvents = '';
            }, 2000);
        }, 1500);

        // 다운로드 로그
        console.log('📁 Downloading Architecture design document...');
    }

    initCardInteractions() {
        const cards = document.querySelectorAll('.document-card');
        
        cards.forEach(card => {
            // 클래스 인스턴스 생성 효과
            card.addEventListener('mouseenter', () => {
                this.createClassInstance(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.destroyClassInstance(card);
            });
            
            // 3D 변환 효과
            card.addEventListener('mousemove', (e) => {
                this.apply3DTransform(card, e);
            });
        });
    }

    createClassInstance(card) {
        const classLabel = card.querySelector('.document-card::after');
        card.style.transform = 'translateY(-12px) scale(1.02)';
        card.style.boxShadow = '0 12px 40px rgba(63, 81, 181, 0.25)';
        
        // 클래스 생성 애니메이션
        this.animateClassCreation(card);
    }

    destroyClassInstance(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    }

    apply3DTransform(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `
            translateY(-12px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    }

    animateClassCreation(card) {
        const icon = card.querySelector('.document-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    }

    initScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 헤더 패럴랙스 효과
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                if (header) {
                    header.style.transform = 'translateY(-5px)';
                    header.style.opacity = '0.95';
                }
            } else {
                if (header) {
                    header.style.transform = 'translateY(0)';
                    header.style.opacity = '1';
                }
            }
            
            lastScrollTop = scrollTop;
            this.animateOnScroll();
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.document-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
                element.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }

    initNavigationSystem() {
        const navButtons = document.querySelectorAll('.page-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            
            button.addEventListener('mouseenter', () => {
                const icon = button.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(3px) scale(1.1)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                const icon = button.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(0) scale(1)';
                }
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    startDesignAnimation() {
        const logo = document.querySelector('.java-logo');
        if (logo) {
            // 설계 도구 애니메이션
            setInterval(() => {
                this.animateDesignTool(logo);
            }, 4000);
        }
    }

    animateDesignTool(logo) {
        const tools = ['🏛️', '📐', '🔧', '⚙️', '🎯', '🏗️'];
        const currentTool = tools[Math.floor(Math.random() * tools.length)];
        
        logo.style.transform = 'scale(0.8) rotate(10deg)';
        logo.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            logo.textContent = currentTool;
            logo.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        setTimeout(() => {
            logo.textContent = '🏛️';
            logo.style.transform = 'scale(1) rotate(0deg)';
        }, 2000);
    }

    showWelcomeMessage() {
        setTimeout(() => {
            console.log(`
🏛️ 소프트웨어 아키텍처 설계 시스템에 오신 것을 환영합니다!
📚 체계적인 설계 문서를 다운로드하여 아키텍처 마스터가 되어보세요.
🎯 설계 패턴과 아키텍처 원리를 배우고 적용해보세요.
            `);
        }, 1000);
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// 전역 OOP 유틸리티 객체
window.OOPUtils = {
    designPatterns: ['Singleton', 'Factory', 'Observer', 'Strategy', 'Decorator'],
    
    getRandomPattern() {
        return this.designPatterns[Math.floor(Math.random() * this.designPatterns.length)];
    },
    
    logDesignPrinciple(principle) {
        console.log(`🎯 Design Principle: ${principle}`);
    },
    
    showClassDiagram() {
        console.log(`
        ┌─────────────────┐
        │   OOPDocument   │
        ├─────────────────┤
        │ - title: String │
        │ - content: Blob │
        ├─────────────────┤
        │ + download()    │
        │ + validate()    │
        └─────────────────┘
        `);
    }
};

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        OOPUtils.showClassDiagram();
    }
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', function() {
    console.log('🏛️ Architecture Design System shutting down...');
}); 