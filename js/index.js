// Vue 앱 초기화
const { createApp } = Vue;

createApp({
  data() {
    return {
      searchQuery: '',
      categories: ['비즈니스', '교육', '기술', '건강', '라이프스타일', '예술', '과학'],
      popularPDFs: [
        {
          id: 1,
          title: '디지털 마케팅 완벽 가이드',
          description: '현대 디지털 마케팅의 모든 측면을 다루는 종합 가이드',
          category: '비즈니스',
          categoryColor: 'var(--primary-color)',
          downloads: '25,421',
          rating: '4.8',
          fileSize: '8.2 MB',
          image: '/api/placeholder/400/200',
          date: '2025-01-15'
        },
        {
          id: 2,
          title: '데이터 사이언스 입문',
          description: '데이터 분석 및 머신러닝의 기초를 배울 수 있는 초보자 가이드',
          category: '기술',
          categoryColor: 'var(--secondary-color)',
          downloads: '18,974',
          rating: '4.7',
          fileSize: '6.5 MB',
          image: '/api/placeholder/400/200',
          date: '2025-02-03'
        },
        {
          id: 3,
          title: '건강한 생활 습관 형성하기',
          description: '일상에서 건강한 습관을 만들고 유지하는 방법',
          category: '건강',
          categoryColor: 'var(--accent-color)',
          downloads: '15,632',
          rating: '4.9',
          fileSize: '5.1 MB',
          image: '/api/placeholder/400/200',
          date: '2025-02-18'
        },
        {
          id: 4,
          title: '효과적인 시간 관리 전략',
          description: '생산성을 높이고 시간을 효율적으로 사용하는 방법',
          category: '비즈니스',
          categoryColor: 'var(--primary-color)',
          downloads: '12,845',
          rating: '4.6',
          fileSize: '4.3 MB',
          image: '/api/placeholder/400/200',
          date: '2025-03-01'
        },
        {
          id: 5,
          title: '현대 웹 개발 트렌드',
          description: '최신 웹 개발 기술과 프레임워크에 대한 심층 분석',
          category: '기술',
          categoryColor: 'var(--secondary-color)',
          downloads: '10,753',
          rating: '4.7',
          fileSize: '7.8 MB',
          image: '/api/placeholder/400/200',
          date: '2025-03-10'
        },
        {
          id: 6,
          title: '미술 역사의 이해',
          description: '고대부터 현대까지 미술의 발전과 주요 예술 사조',
          category: '예술',
          categoryColor: 'var(--success-color)',
          downloads: '9,421',
          rating: '4.8',
          fileSize: '10.5 MB',
          image: '/api/placeholder/400/200',
          date: '2025-03-12'
        }
      ],
      recentDocuments: [
        {
          id: 1,
          title: '인공지능과 미래 산업',
          description: 'AI가 다양한 산업 분야에 미치는 영향과 미래 전망',
          category: '기술',
          iconColor: 'var(--secondary-color)',
          date: '2025-03-15',
          fileSize: '7.3 MB'
        },
        {
          id: 2,
          title: '지속 가능한 비즈니스 모델',
          description: '환경 친화적이고 지속 가능한 비즈니스 모델 구축 방법',
          category: '비즈니스',
          iconColor: 'var(--primary-color)',
          date: '2025-03-14',
          fileSize: '5.8 MB'
        },
        {
          id: 3,
          title: '현대 심리학의 이해',
          description: '심리학의 주요 이론과 응용 분야에 대한 개요',
          category: '교육',
          iconColor: 'var(--warning-color)',
          date: '2025-03-13',
          fileSize: '6.2 MB'
        },
        {
          id: 4,
          title: '스트레스 관리와 명상 가이드',
          description: '일상에서 스트레스를 효과적으로 관리하는 명상 기법',
          category: '건강',
          iconColor: 'var(--accent-color)',
          date: '2025-03-12',
          fileSize: '4.7 MB'
        },
        {
          id: 5,
          title: '디지털 트랜스포메이션 전략',
          description: '기업의 디지털 전환을 위한 포괄적인 가이드',
          category: '비즈니스',
          iconColor: 'var(--primary-color)',
          date: '2025-03-11',
          fileSize: '8.5 MB'
        }
      ],
      testimonials: [
        {
          name: '김민수',
          role: '마케팅 전문가',
          image: '/api/placeholder/150/150',
          comment: '필요한 자료를 빠르게 찾을 수 있어서 정말 좋습니다. 디지털 마케팅 관련 문서들은 제 업무에 큰 도움이 되었습니다.'
        },
        {
          name: '이지연',
          role: '소프트웨어 개발자',
          image: '/api/placeholder/150/150',
          comment: '기술 문서의 퀄리티가 정말 훌륭합니다. 최신 기술 트렌드를 파악하는 데 큰 도움이 됩니다.'
        },
        {
          name: '박준호',
          role: '대학생',
          image: '/api/placeholder/150/150',
          comment: '학업에 필요한 자료를 쉽게 찾을 수 있어 시간을 많이 절약했습니다. 무료로 이용할 수 있는 것도 큰 장점입니다.'
        }
      ]
    }
  },
  mounted() {
    // AOS 애니메이션 초기화
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', this.handleScroll);
    
    // 페이드인 요소 애니메이션
    this.animateFadeElements();
  },
  beforeUnmount() {
    // 스크롤 이벤트 리스너 제거
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 스크롤 시 네비게이션 바 스타일 변경
    handleScroll() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // 요소들이 화면에 나타날 때 애니메이션 적용
      this.animateFadeElements();
    },
    
    // 페이드인 애니메이션 적용
    animateFadeElements() {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
      
      // 순차적으로 나타나는 요소들 애니메이션
      const staggeredContainers = document.querySelectorAll('.staggered-fade-in');
      staggeredContainers.forEach(container => {
        const containerTop = container.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (containerTop < windowHeight - 100) {
          const children = container.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    },
    
    // PDF 다운로드 처리
    downloadPDF(pdfId) {
      console.log(`Downloading PDF with ID: ${pdfId}`);
      // 실제 다운로드 로직 구현 예정
      alert(`${pdfId} PDF 다운로드가 시작됩니다.`);
    },
    
    // 검색 기능
    searchDocuments() {
      console.log(`Searching for: ${this.searchQuery}`);
      // 실제 검색 로직 구현 예정
      alert(`"${this.searchQuery}" 검색 결과를 표시합니다.`);
    },
    
    // 카테고리 필터링
    filterByCategory(category) {
      console.log(`Filtering by category: ${category}`);
      // 실제 필터링 로직 구현 예정
      alert(`${category} 카테고리 문서를 표시합니다.`);
    },
    
    // 뉴스레터 구독
    subscribeNewsletter(email) {
      console.log(`Subscribing email: ${email}`);
      // 실제 구독 로직 구현 예정
      alert('뉴스레터 구독이 완료되었습니다. 감사합니다!');
    },
    
    // 애니메이션 효과 추가 함수
    addAnimationEffect(element, effect) {
      element.classList.add(effect);
      
      // 일정 시간 후 애니메이션 효과 제거
      setTimeout(() => {
        element.classList.remove(effect);
      }, 1000);
    }
  }
}).mount('#app');