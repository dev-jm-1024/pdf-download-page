// 🎨 Spring 테마 3D 애니메이션 효과
// 기존 디자인 유지하면서 3D 효과만 추가

// 전역 변수
let scene, camera, renderer, particles = [];
let mouse = new THREE.Vector2();
let mousePosition = { x: 0, y: 0 };
let isGSAPLoaded = false;

// 🎮 Three.js 배경 파티클 초기화
function initThreeJS() {
    // Scene 설정
    scene = new THREE.Scene();
    
    // Camera 설정
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    // Renderer 설정
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('three-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 투명 배경
    
    // 🌟 Spring 테마 색상의 파티클 생성
    createSpringParticles();
    
    // 🎬 애니메이션 루프 시작
    animate();
}

// 🍃 Spring 테마 파티클 생성
function createSpringParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Spring 테마 색상 팔레트
    const springColors = [
        new THREE.Color(0x6db33f), // Spring Green
        new THREE.Color(0x7bc142), // Light Spring Green
        new THREE.Color(0x5a9a35), // Dark Spring Green
        new THREE.Color(0x8ed653), // Bright Spring Green
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // 위치
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        // 색상
        const color = springColors[Math.floor(Math.random() * springColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    // 파티클 참조 저장
    particles.push(particleSystem);
}

// 🎬 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    
    // 파티클 회전
    particles.forEach((particle, index) => {
        particle.rotation.x += 0.001;
        particle.rotation.y += 0.002;
        
        // 마우스 추적 효과
        particle.rotation.x += mousePosition.x * 0.00005;
        particle.rotation.y += mousePosition.y * 0.00005;
    });
    
    renderer.render(scene, camera);
}

// 🖱️ 마우스 이벤트 핸들러
function handleMouseMove(event) {
    mousePosition.x = event.clientX - window.innerWidth / 2;
    mousePosition.y = event.clientY - window.innerHeight / 2;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// 🎯 카드 3D 틸트 효과
function initCardTilt() {
    const cards = document.querySelectorAll('.document-card[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            if (isGSAPLoaded) {
                gsap.to(card, {
                    duration: 0.3,
                    rotationY: 5,
                    rotationX: 5,
                    z: 50,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', (e) => {
            if (isGSAPLoaded) {
                gsap.to(card, {
                    duration: 0.3,
                    rotationY: 0,
                    rotationX: 0,
                    z: 0,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isGSAPLoaded) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            gsap.to(card, {
                duration: 0.1,
                rotationX: rotateX,
                rotationY: rotateY,
                ease: "power2.out"
            });
        });
    });
}

// 🎊 페이지 로드 애니메이션
function initPageLoadAnimation() {
    if (!isGSAPLoaded) return;
    
    // 헤더 애니메이션
    gsap.fromTo('header', 
        { 
            opacity: 0, 
            y: -100,
            rotationX: -90
        }, 
        { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power2.out"
        }
    );
    
    // 카드들 순차적 등장
    gsap.fromTo('.document-card', 
        { 
            opacity: 0, 
            y: 100,
            rotationX: 90,
            scale: 0.8
        }, 
        { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }
    );
    
    // 네비게이션 버튼 애니메이션
    gsap.fromTo('.page-btn', 
        { 
            opacity: 0, 
            scale: 0,
            rotation: 180
        }, 
        { 
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }
    );
}

// 🌟 스크롤 애니메이션
function initScrollAnimations() {
    if (!isGSAPLoaded || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // 카드 호버 시 부유 효과
    ScrollTrigger.batch('.document-card', {
        onEnter: (elements) => {
            elements.forEach(el => {
                el.classList.add('floating');
            });
        },
        onLeave: (elements) => {
            elements.forEach(el => {
                el.classList.remove('floating');
            });
        },
        start: "top 80%",
        end: "bottom 20%"
    });
    
    // 스크롤 시 배경 파티클 속도 변화
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress;
            particles.forEach(particle => {
                particle.rotation.z = progress * Math.PI * 2;
            });
        }
    });
}

// 🎨 다운로드 버튼 특수 효과
function initButtonEffects() {
    const buttons = document.querySelectorAll('.download-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 클릭 위치에 파티클 폭발 효과
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            createClickParticles(x, y, button);
            
            // 버튼 펄스 효과
            if (isGSAPLoaded) {
                gsap.to(button, {
                    scale: 1.1,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
            }
        });
    });
}

// 💥 클릭 파티클 생성
function createClickParticles(x, y, element) {
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #6db33f;
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            z-index: 9999;
        `;
        
        element.appendChild(particle);
        
        // 파티클 애니메이션
        if (isGSAPLoaded) {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    particle.remove();
                }
            });
        } else {
            // GSAP 없을 때 CSS 애니메이션
            setTimeout(() => particle.remove(), 600);
        }
    }
}

// 📱 반응형 처리
function handleResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// 🎯 이벤트 리스너 설정
function setupEventListeners() {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // 마우스 커서 효과
    document.addEventListener('mousemove', (e) => {
        // 커서 트레일 효과 (선택적)
        if (Math.random() < 0.1) {
            createCursorTrail(e.clientX, e.clientY);
        }
    });
}

// ✨ 커서 트레일 효과
function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(109, 179, 63, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        z-index: 9998;
        animation: trailFade 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    // 자동 제거
    setTimeout(() => {
        trail.remove();
    }, 800);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    .click-particle {
        animation: particleExplode 0.6s ease-out forwards;
    }
    
    @keyframes particleExplode {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0) translate(var(--random-x, 20px), var(--random-y, 20px)); }
    }
`;
document.head.appendChild(style);

// 🚀 초기화 함수
function init() {
    // Three.js 초기화
    initThreeJS();
    
    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 카드 틸트 효과 초기화
    initCardTilt();
    
    // 버튼 효과 초기화
    initButtonEffects();
    
    // GSAP 로드 확인 후 애니메이션 초기화
    if (typeof gsap !== 'undefined') {
        isGSAPLoaded = true;
        
        // 페이지 로드 애니메이션
        initPageLoadAnimation();
        
        // 스크롤 애니메이션
        initScrollAnimations();
        
        console.log('✅ Spring 3D 애니메이션 시스템 로드 완료');
    } else {
        console.log('⚠️ GSAP 없이 기본 애니메이션 실행');
    }
}

// 🎊 페이지 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // GSAP 로딩 확인
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        isGSAPLoaded = true;
        console.log('✅ GSAP 로드 완료');
    }
    
    // 페이지 로드 완료 후 초기화
    window.addEventListener('load', () => {
        init();
    });
});
