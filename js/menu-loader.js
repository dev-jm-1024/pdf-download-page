// 공통 메뉴 로더 스크립트
(function() {
    'use strict';
    
    // 메뉴 HTML 템플릿
    const menuTemplate = `
        <div class="nav-buttons">
            <a href="https://plusb3b.kr/pdf-download-page/download.html" class="page-btn">
                <i class="fas fa-leaf"></i> Spring Boot 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-mongodb.html" class="page-btn">
                <i class="fas fa-database"></i> MongoDB 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-api.html" class="page-btn">
                <i class="fas fa-code"></i> API 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-modern-java.html" class="page-btn">
                <i class="fab fa-java"></i> Modern Java 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-mysql.html" class="page-btn">
                <i class="fas fa-server"></i> MySQL 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-oop.html" class="page-btn">
                <i class="fas fa-cube"></i> OOP 설계 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-jsp.html" class="page-btn">
                <i class="fas fa-globe"></i> JSP 페이지
            </a>
            <a href="https://plusb3b.kr/pdf-download-page/download-linux.html" class="page-btn">
                <i class="fas fa-terminal"></i> Linux 페이지
            </a>
        </div>
    `;
    
    // 메뉴 CSS 스타일
    const menuStyles = `
        <style>
                 /* 공통 메뉴 스타일 */
         .nav-buttons {
             display: grid;
             grid-template-columns: repeat(4, 1fr);
             gap: 15px;
             margin-top: 30px;
             max-width: 1000px;
             margin-left: auto;
             margin-right: auto;
             padding: 0 20px;
         }
         
         /* 5,6,7번째 메뉴는 두 번째 줄에 순서대로 배치 */
         .nav-buttons .page-btn:nth-child(5) {
             grid-column: 1;
             grid-row: 2;
         }
         
         .nav-buttons .page-btn:nth-child(6) {
             grid-column: 2;
             grid-row: 2;
         }
         
         .nav-buttons          .page-btn:nth-child(7) {
             grid-column: 3;
             grid-row: 2;
         }
         
         .nav-buttons .page-btn:nth-child(8) {
             grid-column: 4;
             grid-row: 2;
         }

                 .page-btn {
             display: flex;
             align-items: center;
             justify-content: center;
             background: rgba(255, 255, 255, 0.2);
             color: white;
             padding: 14px 20px;
             border-radius: 50px;
             text-decoration: none;
             font-weight: 500;
             transition: all 0.3s ease;
             backdrop-filter: blur(10px);
             border: 1px solid rgba(255, 255, 255, 0.3);
             font-size: 0.9rem;
             position: relative;
             overflow: hidden;
             min-height: 50px;
             text-align: center;
         }

        .page-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .page-btn.active {
            background: rgba(255, 255, 255, 0.4) !important;
            font-weight: 600 !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .page-btn i {
            margin-right: 8px;
            transition: transform 0.3s ease;
        }

        .page-btn:hover i {
            transform: translateX(3px);
        }

        .page-btn:focus {
            outline: 2px solid rgba(255, 255, 255, 0.8);
            outline-offset: 2px;
        }

                 /* 반응형 메뉴 */
         @media (max-width: 1024px) {
             .nav-buttons {
                 grid-template-columns: repeat(3, 1fr);
                 max-width: 800px;
             }
             
             /* 태블릿에서는 자동 배치 */
             .nav-buttons .page-btn:nth-child(5),
             .nav-buttons .page-btn:nth-child(6),
             .nav-buttons .page-btn:nth-child(7) {
                 grid-column: auto;
                 grid-row: auto;
             }
         }
         
         @media (max-width: 768px) {
             .nav-buttons {
                 grid-template-columns: repeat(2, 1fr);
                 gap: 12px;
                 padding: 0 15px;
             }
             
             .nav-buttons .page-btn:nth-child(7) {
                 grid-column: 1;
             }
             
             .nav-buttons .page-btn:nth-child(8) {
                 grid-column: 2;
             }
             
             .page-btn {
                 padding: 12px 16px;
                 font-size: 0.85rem;
             }
         }
         
         @media (max-width: 480px) {
             .nav-buttons {
                 grid-template-columns: 1fr;
                 gap: 10px;
             }
             
             .nav-buttons .page-btn:nth-child(7),
             .nav-buttons .page-btn:nth-child(8) {
                 grid-column: 1;
             }
             
             .page-btn {
                 padding: 14px 20px;
                 font-size: 0.9rem;
             }
         }

        /* 메뉴 로딩 애니메이션 */
        .page-btn {
            opacity: 0;
            animation: menuFadeIn 0.6s ease forwards;
        }

        .page-btn:nth-child(1) { animation-delay: 0.1s; }
        .page-btn:nth-child(2) { animation-delay: 0.2s; }
        .page-btn:nth-child(3) { animation-delay: 0.3s; }
        .page-btn:nth-child(4) { animation-delay: 0.4s; }
        .page-btn:nth-child(5) { animation-delay: 0.5s; }
        .page-btn:nth-child(6) { animation-delay: 0.6s; }
        .page-btn:nth-child(7) { animation-delay: 0.7s; }
        .page-btn:nth-child(8) { animation-delay: 0.8s; }

        @keyframes menuFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* 접근성 개선 */
        .page-btn:focus-visible {
            outline: 3px solid #fff;
            outline-offset: 2px;
        }

        /* 다크모드 지원 */
        @media (prefers-color-scheme: dark) {
            .page-btn {
                background: rgba(0, 0, 0, 0.3);
                border-color: rgba(255, 255, 255, 0.2);
            }
            
            .page-btn:hover {
                background: rgba(0, 0, 0, 0.4);
            }
        }
        </style>
    `;
    
    // 메뉴 로드 함수
    function loadMenu() {
        // 기존 nav-buttons가 있는지 확인
        const existingMenu = document.querySelector('.nav-buttons');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // 헤더 찾기
        const header = document.querySelector('header');
        if (!header) {
            console.warn('Header 요소를 찾을 수 없습니다.');
            return;
        }
        
        // 메뉴 삽입 위치 찾기 (description 다음)
        const description = header.querySelector('.description');
        if (description) {
            description.insertAdjacentHTML('afterend', menuTemplate);
        } else {
            // description이 없으면 헤더 끝에 추가
            header.insertAdjacentHTML('beforeend', menuTemplate);
        }
        
        // 스타일 추가 (한 번만)
        if (!document.querySelector('#menu-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'menu-styles';
            styleElement.innerHTML = menuStyles;
            document.head.appendChild(styleElement);
        }
        
        // 메뉴 초기화
        initializeMenu();
    }
    
    // 메뉴 초기화 함수
    function initializeMenu() {
        // 현재 페이지 감지 및 활성 메뉴 표시
        const currentPage = window.location.pathname.split('/').pop();
        const menuButtons = document.querySelectorAll('.page-btn');
        
        menuButtons.forEach(button => {
            const buttonHref = button.getAttribute('href');
            const buttonPage = buttonHref.split('/').pop();
            
            // 현재 페이지와 일치하는 메뉴 버튼에 활성 클래스 추가
            if (buttonPage === currentPage) {
                button.classList.add('active');
            }
        });
        
        // 메뉴 버튼 호버 효과 강화
        menuButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
        
        // 키보드 네비게이션 지원
        document.addEventListener('keydown', function(e) {
            // Alt + 숫자키로 메뉴 이동
            if (e.altKey && e.key >= '1' && e.key <= '8') {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                if (menuButtons[index]) {
                    menuButtons[index].click();
                }
            }
            
            // Alt + M으로 메뉴 포커스
            if (e.altKey && e.key.toLowerCase() === 'm') {
                e.preventDefault();
                if (menuButtons[0]) {
                    menuButtons[0].focus();
                }
            }
        });
        
        console.log(`📊 공통 메뉴 로드 완료: ${menuButtons.length}개 메뉴`);
        console.log('🔧 키보드 단축키: Alt + 1~8 (메뉴 이동), Alt + M (메뉴 포커스)');
    }
    
    // 메뉴 유틸리티 함수들
    window.MenuUtils = {
        // 메뉴 다시 로드
        reload: function() {
            loadMenu();
        },
        
        // 특정 페이지로 이동
        navigateTo: function(pageName) {
            const pageMap = {
                'spring': 'download.html',
                'mongodb': 'download-mongodb.html',
                'api': 'download-api.html',
                'java': 'download-modern-java.html',
                'mysql': 'download-mysql.html',
                'oop': 'download-oop.html',
                'jsp': 'download-jsp.html',
                'linux': 'download-linux.html'
            };
            
            if (pageMap[pageName]) {
                window.location.href = `https://plusb3b.kr/pdf-download-page/${pageMap[pageName]}`;
            }
        },
        
        // 현재 페이지 정보 반환
        getCurrentPage: function() {
            const currentPage = window.location.pathname.split('/').pop();
            const pageNames = {
                'download.html': 'Spring Boot',
                'download-mongodb.html': 'MongoDB',
                'download-api.html': 'API',
                'download-modern-java.html': 'Modern Java',
                'download-mysql.html': 'MySQL',
                'download-jsp.html': 'JSP',
                'download-linux.html': 'Linux'
            };
            
            return pageNames[currentPage] || '알 수 없음';
        },
        
        // 메뉴 순서 반환
        getMenuOrder: function() {
            return [
                'Spring Boot',
                'MongoDB', 
                'API',
                'Modern Java',
                'MySQL',
                'OOP 설계',
                'JSP',
                'Linux'
            ];
        },
        
        // 메뉴 상태 확인
        getMenuStatus: function() {
            const menuButtons = document.querySelectorAll('.page-btn');
            return {
                total: menuButtons.length,
                active: document.querySelectorAll('.page-btn.active').length,
                currentPage: this.getCurrentPage()
            };
        }
    };
    
    // DOM 로드 완료 시 메뉴 자동 로드
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMenu);
    } else {
        loadMenu();
    }
    
    // 전역 함수로 노출
    window.loadCommonMenu = loadMenu;
    
})();

// 콘솔 환영 메시지
console.log(`
🎯 공통 메뉴 시스템이 로드되었습니다!

사용법:
- MenuUtils.navigateTo('spring') : Spring Boot 페이지로 이동
- MenuUtils.getCurrentPage() : 현재 페이지 이름 반환
- MenuUtils.reload() : 메뉴 다시 로드
- Alt + 1~8 : 키보드로 메뉴 이동
- Alt + M : 메뉴 포커스

모든 페이지에서 일관된 네비게이션을 제공합니다! 🚀
`); 