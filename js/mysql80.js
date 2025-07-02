// MySQL 8.0 테마 JavaScript
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
    
    // MySQL 로고 애니메이션
    initMySQLLogo();
    
    // 데이터베이스 연결 상태 표시
    initDatabaseConnection();
    
    // MySQL 성능 모니터링 시뮬레이션
    initPerformanceMonitor();
});

// 페이지 로드 애니메이션
function initPageAnimations() {
    const elements = document.querySelectorAll('.document-card, .page-btn');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) rotateX(15deg)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotateX(0deg)';
        }, index * 120 + 400);
    });
    
    // 헤더 애니메이션 - MySQL 스타일
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-40px) scale(0.9)';
        
        setTimeout(() => {
            header.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0) scale(1)';
        }, 150);
    }
}

// 다운로드 버튼 기능
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // MySQL 스타일 다운로드 효과
            showMySQLDownloadEffect(this);
            
            // 다운로드 통계
            trackMySQLDownload(this.href);
        });
    });
}

// MySQL 스타일 다운로드 효과
function showMySQLDownloadEffect(button) {
    const originalHTML = button.innerHTML;
    
    // 1단계: MySQL 연결 시작
    button.innerHTML = `
        <i class="fas fa-plug"></i>
        MySQL 연결 중...
    `;
    button.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // 2단계: 쿼리 실행
        button.innerHTML = `
            <div class="loading"></div>
            SELECT * FROM documents...
        `;
        button.style.background = 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)';
        
        setTimeout(() => {
            // 3단계: 데이터 처리
            button.innerHTML = `
                <i class="fas fa-cogs"></i>
                데이터 처리 중...
            `;
            button.style.background = 'linear-gradient(135deg, #fd7e14 0%, #e8590c 100%)';
            
            setTimeout(() => {
                // 4단계: 파일 생성
                button.innerHTML = `
                    <i class="fas fa-file-export"></i>
                    파일 생성 중...
                `;
                button.style.background = 'linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%)';
                
                setTimeout(() => {
                    // 5단계: 완료
                    button.innerHTML = `
                        <i class="fas fa-check-double"></i>
                        다운로드 완료!
                    `;
                    button.classList.add('success');
                    
                    // MySQL 스타일 성공 효과
                    createMySQLSuccessEffect(button);
                    
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.style.background = '';
                        button.style.pointerEvents = '';
                        button.classList.remove('success');
                    }, 2500);
                }, 1200);
            }, 1000);
        }, 800);
    }, 600);
}

// MySQL 성공 효과
function createMySQLSuccessEffect(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#E48E00', '#F29111', '#00758F', '#0085A3'];
    
    // 다중 파티클 생성
    for (let i = 0; i < 16; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            box-shadow: 0 0 6px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 16) * Math.PI * 2;
        const velocity = 120 + Math.random() * 80;
        const lifetime = 1200 + Math.random() * 800;
        
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
function trackMySQLDownload(url) {
    console.log('MySQL 문서 다운로드:', url);
    MySQLUtils.logQuery(`INSERT INTO downloads (url, timestamp) VALUES ('${url}', NOW())`);
}

// 스크롤 효과
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', MySQLUtils.debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향에 따른 헤더 효과
        if (scrollTop > lastScrollTop && scrollTop > 120) {
            // 아래로 스크롤
            if (header) {
                header.style.transform = 'translateY(-20px) scale(0.95)';
                header.style.opacity = '0.8';
                header.style.filter = 'blur(1px)';
            }
        } else {
            // 위로 스크롤
            if (header) {
                header.style.transform = 'translateY(0) scale(1)';
                header.style.opacity = '1';
                header.style.filter = 'blur(0px)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // 스크롤 기반 요소 애니메이션
        animateOnScroll();
        
        // 동적 배경 효과
        updateDynamicBackground(scrollTop);
    }, 8));
}

// 동적 배경 효과
function updateDynamicBackground(scrollTop) {
    const body = document.body;
    const intensity = Math.min(scrollTop / 1000, 0.5);
    
    body.style.background = `
        linear-gradient(135deg, 
            rgba(255, 248, 240, ${1 - intensity}) 0%, 
            rgba(240, 248, 255, ${1 - intensity}) 100%
        ),
        radial-gradient(circle at ${50 + scrollTop * 0.01}% ${50 + scrollTop * 0.005}%, 
            rgba(228, 142, 0, ${0.03 + intensity * 0.02}) 0%, 
            transparent 50%
        )
    `;
}

// 스크롤 시 요소 애니메이션
function animateOnScroll() {
    const elements = document.querySelectorAll('.document-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// 카드 호버 효과
function initCardEffects() {
    const cards = document.querySelectorAll('.document-card');
    
    cards.forEach(card => {
        // 고급 3D 마우스 추적 효과
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 6;
            const rotateY = (centerX - x) / 6;
            
            this.style.transform = `
                translateY(-12px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.05)
                perspective(1000px)
            `;
            
            // MySQL 스타일 광택 효과
            updateMySQLCardGlow(this, x, y, rect.width, rect.height);
        });
        
        // 마우스 떠날 때
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            removeMySQLCardGlow(this);
        });
        
        // 클릭 효과 - MySQL 스타일
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-10px) scale(0.98)';
            this.style.filter = 'brightness(1.1)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-12px) scale(1.05)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// MySQL 카드 광택 효과
function updateMySQLCardGlow(card, x, y, width, height) {
    let glow = card.querySelector('.card-mysql-glow');
    if (!glow) {
        glow = document.createElement('div');
        glow.className = 'card-mysql-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at ${x}px ${y}px, 
                rgba(228, 142, 0, 0.2) 0%, 
                rgba(0, 117, 143, 0.1) 30%, 
                transparent 60%);
            pointer-events: none;
            border-radius: inherit;
            transition: opacity 0.3s ease;
            mix-blend-mode: overlay;
        `;
        card.appendChild(glow);
    }
    
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, 
        rgba(228, 142, 0, 0.25) 0%, 
        rgba(0, 117, 143, 0.15) 30%, 
        transparent 60%)`;
}

// MySQL 카드 광택 제거
function removeMySQLCardGlow(card) {
    const glow = card.querySelector('.card-mysql-glow');
    if (glow) {
        glow.style.opacity = '0';
        setTimeout(() => glow.remove(), 300);
    }
}

// 네비게이션 버튼 효과
function initNavigationButtons() {
    const navButtons = document.querySelectorAll('.page-btn');
    
    navButtons.forEach(button => {
        // MySQL 스타일 클릭 효과
        button.addEventListener('click', function(e) {
            createMySQLRipple(e, this);
        });
        
        // 호버 시 아이콘 애니메이션
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(10px) scale(1.3) rotate(20deg)';
                icon.style.color = '#FFD700';
                icon.style.textShadow = '0 0 10px currentColor';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0) scale(1) rotate(0deg)';
                icon.style.color = '';
                icon.style.textShadow = '';
            }
        });
    });
}

// MySQL 스타일 물결 효과
function createMySQLRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: conic-gradient(from 0deg, 
            rgba(228, 142, 0, 0.6) 0%, 
            rgba(0, 117, 143, 0.4) 50%, 
            rgba(242, 145, 17, 0.6) 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: mysqlRipple 1s ease-out;
        pointer-events: none;
        mix-blend-mode: overlay;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

// MySQL 로고 애니메이션
function initMySQLLogo() {
    const logo = document.querySelector('.mysql-logo');
    if (!logo) return;
    
    // 클릭 시 특별한 애니메이션
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'mysqlSpecialSpin 1.5s ease-in-out';
        }, 10);
        
        // 로그 메시지
        MySQLUtils.logQuery('SELECT * FROM mysql_logo WHERE clicked = TRUE;');
    });
    
    // 주기적 색상 변화
    setInterval(() => {
        if (Math.random() > 0.75) {
            logo.style.filter = 'hue-rotate(90deg) saturate(1.5) brightness(1.3)';
            setTimeout(() => {
                logo.style.filter = '';
            }, 2000);
        }
    }, 7000);
}

// 데이터베이스 연결 상태 표시
function initDatabaseConnection() {
    const header = document.querySelector('header');
    if (header) {
        const connectionStatus = document.createElement('div');
        connectionStatus.className = 'connection-status';
        connectionStatus.innerHTML = `
            <div class="connection-dot"></div>
            <span>MySQL 8.0 Connected</span>
        `;
        
        header.appendChild(connectionStatus);
        
        // 연결 상태 시뮬레이션
        simulateConnectionStatus(connectionStatus);
    }
}

// 연결 상태 시뮬레이션
function simulateConnectionStatus(statusElement) {
    const statuses = [
        { text: 'MySQL 8.0 Connected', color: '#28a745', delay: 5000 },
        { text: 'Optimizing Queries...', color: '#ffc107', delay: 2000 },
        { text: 'Cache Warming...', color: '#17a2b8', delay: 1500 },
        { text: 'MySQL 8.0 Ready', color: '#28a745', delay: 8000 }
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        const status = statuses[currentIndex];
        const dot = statusElement.querySelector('.connection-dot');
        const text = statusElement.querySelector('span');
        
        if (dot && text) {
            dot.style.background = status.color;
            text.textContent = status.text;
        }
        
        currentIndex = (currentIndex + 1) % statuses.length;
    }, statuses[currentIndex]?.delay || 5000);
}

// MySQL 성능 모니터링 시뮬레이션
function initPerformanceMonitor() {
    // 콘솔에 MySQL 성능 로그 출력
    setInterval(() => {
        const metrics = {
            queries_per_second: Math.floor(Math.random() * 1000) + 500,
            connections: Math.floor(Math.random() * 100) + 50,
            buffer_pool_hit_ratio: (Math.random() * 5 + 95).toFixed(2) + '%',
            innodb_buffer_pool_size: '128MB'
        };
        
        if (Math.random() > 0.8) {
            console.log('📊 MySQL Performance Metrics:', metrics);
        }
    }, 10000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes mysqlRipple {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes mysqlSpecialSpin {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.3) rotate(90deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        75% { transform: scale(1.4) rotate(270deg); }
    }
    
    .animate-in {
        animation: mysqlSlideIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes mysqlSlideIn {
        from {
            opacity: 0;
            transform: translateY(50px) rotateX(15deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
    
    .document-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .page-btn i {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .mysql-logo {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }
    
    .mysql-logo:hover {
        transform: scale(1.2) rotate(10deg);
        filter: brightness(1.3) saturate(1.2);
    }
    
    .connection-status {
        animation: slideInRight 1.2s ease-out 2.5s both;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style);

// 유틸리티 함수들
const MySQLUtils = {
    // MySQL 쿼리 로그
    logQuery: function(query) {
        const timestamp = new Date().toISOString();
        console.log(`🐬 [${timestamp}] MySQL Query: ${query}`);
    },
    
    // 랜덤 MySQL 색상 생성
    getRandomMySQLColor: function() {
        const colors = ['#E48E00', '#F29111', '#00758F', '#0085A3'];
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
    
    // MySQL 연결 시뮬레이션
    simulateConnection: function(callback) {
        const steps = [
            { message: 'MySQL 서버 연결 중...', delay: 400 },
            { message: '사용자 인증 중...', delay: 300 },
            { message: '데이터베이스 선택 중...', delay: 250 },
            { message: 'InnoDB 엔진 초기화...', delay: 350 },
            { message: '연결 완료!', delay: 200 }
        ];
        
        let currentStep = 0;
        const executeStep = () => {
            if (currentStep < steps.length) {
                this.logQuery(steps[currentStep].message);
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
window.MySQLUtils = MySQLUtils;

// 성능 최적화를 위한 디바운스 적용
window.addEventListener('resize', MySQLUtils.debounce(() => {
    console.log('🐬 MySQL 페이지 리사이즈 감지');
    MySQLUtils.logQuery('UPDATE page_metrics SET viewport_resized = NOW()');
}, 300));

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    MySQLUtils.logQuery('DISCONNECT FROM mysql_session');
    console.log('�� MySQL 세션 종료');
}); 