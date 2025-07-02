// API Page JavaScript - Enhanced with API-specific animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🔗 API Documentation System Initialized', 'color: #6C5CE7; font-size: 16px; font-weight: bold;');
    
    initializeAPISystem();
    initializePageAnimations();
    initializeAPIStatus();
    initializeEndpointSimulation();
    initializeDownloadSystem();
    initializeInteractiveElements();
    initializeAPIMetrics();
});

// API System Initialization
function initializeAPISystem() {
    // Create API status indicator
    const header = document.querySelector('header');
    if (header && !header.querySelector('.api-status')) {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'api-status';
        statusDiv.innerHTML = `
            <div class="status-indicator"></div>
            <span>API Online</span>
        `;
        header.appendChild(statusDiv);
    }
    
    // Initialize API connection simulation
    simulateAPIConnection();
    
    // Add API version info
    addAPIVersionInfo();
}

// Page Load Animations
function initializePageAnimations() {
    // Animate header elements
    const header = document.querySelector('header');
    const title = document.querySelector('h1');
    const description = document.querySelector('.description');
    const navButtons = document.querySelectorAll('.page-btn');
    const documentCards = document.querySelectorAll('.document-card');
    
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            header.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate title with typewriter effect
    if (title) {
        const titleText = title.textContent;
        const logo = title.querySelector('.api-logo');
        const logoText = logo ? logo.textContent : '';
        
        title.innerHTML = logo ? `<span class="api-logo">${logoText}</span><span class="title-text"></span>` : '<span class="title-text"></span>';
        
        const titleSpan = title.querySelector('.title-text');
        const textToType = titleText.replace(logoText, '').trim();
        
        setTimeout(() => {
            typeWriter(titleSpan, textToType, 80);
        }, 500);
    }
    
    // Animate navigation buttons with stagger
    navButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0) scale(1)';
        }, 1000 + (index * 150));
    });
    
    // Animate document cards with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    documentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });
}

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    
    element.style.borderRight = '2px solid white';
    element.style.animation = 'blink 1s infinite';
    type();
}

// API Status Monitoring
function initializeAPIStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.api-status span');
    
    if (!statusIndicator || !statusText) return;
    
    const statuses = [
        { text: 'API Online', color: '#00B894', pulse: true },
        { text: 'Processing', color: '#FDCB6E', pulse: true },
        { text: 'Optimizing', color: '#0984E3', pulse: true },
        { text: 'Ready', color: '#00B894', pulse: true }
    ];
    
    let currentStatus = 0;
    
    setInterval(() => {
        const status = statuses[currentStatus];
        statusText.textContent = status.text;
        statusIndicator.style.background = status.color;
        statusIndicator.style.boxShadow = `0 0 10px ${status.color}80`;
        
        currentStatus = (currentStatus + 1) % statuses.length;
    }, 3000);
}

// Endpoint Simulation
function initializeEndpointSimulation() {
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach((card, index) => {
        const endpoints = [
            '/api/v1/authentication',
            '/api/v1/data/query',
            '/api/v1/upload',
            '/api/v1/webhooks',
            '/api/v1/analytics',
            '/api/v1/monitoring'
        ];
        
        // Add endpoint info to card
        const endpointDiv = document.createElement('div');
        endpointDiv.className = 'api-endpoint';
        endpointDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: #2D3436;
            color: #00B894;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease;
            border-left: 3px solid #6C5CE7;
        `;
        endpointDiv.textContent = `GET ${endpoints[index] || '/api/v1/docs'}`;
        
        card.style.position = 'relative';
        card.appendChild(endpointDiv);
        
        // Show endpoint on hover
        card.addEventListener('mouseenter', () => {
            endpointDiv.style.opacity = '1';
            endpointDiv.style.transform = 'translateY(0)';
            
            // Simulate API call
            setTimeout(() => {
                endpointDiv.style.background = '#00B894';
                endpointDiv.style.color = 'white';
                endpointDiv.innerHTML = `<span style="color: #FDCB6E;">200</span> OK - Response time: ${Math.floor(Math.random() * 50 + 10)}ms`;
            }, 800);
        });
        
        card.addEventListener('mouseleave', () => {
            endpointDiv.style.opacity = '0';
            endpointDiv.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                endpointDiv.style.background = '#2D3436';
                endpointDiv.style.color = '#00B894';
                endpointDiv.textContent = `GET ${endpoints[index] || '/api/v1/docs'}`;
            }, 400);
        });
    });
}

// Enhanced Download System
function initializeDownloadSystem() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('downloading')) return;
            
            this.classList.add('downloading');
            const originalText = this.textContent;
            
            // API Download Simulation with stages
            const stages = [
                { text: 'Authenticating...', duration: 800 },
                { text: 'Fetching Metadata...', duration: 600 },
                { text: 'Validating API Keys...', duration: 700 },
                { text: 'Preparing Download...', duration: 500 },
                { text: 'Downloading...', duration: 2000 },
                { text: 'Complete!', duration: 1000 }
            ];
            
            let currentStage = 0;
            
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 0 0 50px 50px;
                width: 0%;
                transition: width 0.3s ease;
            `;
            this.appendChild(progressBar);
            
            const runStage = () => {
                if (currentStage < stages.length) {
                    const stage = stages[currentStage];
                    this.innerHTML = `${stage.text} <div class="loading"></div>`;
                    this.appendChild(progressBar);
                    
                    // Update progress bar
                    const progress = ((currentStage + 1) / stages.length) * 100;
                    progressBar.style.width = `${progress}%`;
                    
                    // API request simulation
                    if (currentStage === 4) { // Download stage
                        let downloadProgress = 0;
                        const downloadInterval = setInterval(() => {
                            downloadProgress += Math.random() * 15;
                            if (downloadProgress >= 100) {
                                downloadProgress = 100;
                                clearInterval(downloadInterval);
                            }
                            this.innerHTML = `Downloading ${Math.floor(downloadProgress)}% <div class="loading"></div>`;
                            this.appendChild(progressBar);
                        }, 100);
                    }
                    
                    setTimeout(() => {
                        currentStage++;
                        runStage();
                    }, stage.duration);
                } else {
                    // Download complete
                    this.classList.remove('downloading');
                    this.classList.add('success');
                    this.innerHTML = '✓ Downloaded Successfully!';
                    
                    setTimeout(() => {
                        this.classList.remove('success');
                        this.innerHTML = originalText;
                        progressBar.remove();
                    }, 3000);
                }
            };
            
            runStage();
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Enhanced card interactions
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach(card => {
        // Add data attributes for API simulation
        const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        const statusCodes = [200, 201, 202, 204];
        
        card.dataset.method = methods[Math.floor(Math.random() * methods.length)];
        card.dataset.status = statusCodes[Math.floor(Math.random() * statusCodes.length)];
        
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Navigation button enhancements
    const navButtons = document.querySelectorAll('.page-btn');
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = rect.width / 2 - size / 2 + 'px';
            ripple.style.top = rect.height / 2 - size / 2 + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// API Metrics Dashboard
function initializeAPIMetrics() {
    // Create floating metrics panel
    const metricsPanel = document.createElement('div');
    metricsPanel.className = 'api-metrics';
    metricsPanel.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(45, 52, 54, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(108, 92, 231, 0.3);
        z-index: 1000;
        opacity: 0;
        transform: translateX(-100%);
        transition: all 0.5s ease;
        min-width: 200px;
    `;
    
    // Add metrics content
    metricsPanel.innerHTML = `
        <div style="color: #6C5CE7; font-weight: bold; margin-bottom: 10px;">📊 API Metrics</div>
        <div>Uptime: <span id="uptime" style="color: #00B894;">99.9%</span></div>
        <div>Requests: <span id="requests" style="color: #0984E3;">0</span></div>
        <div>Latency: <span id="latency" style="color: #FDCB6E;">0ms</span></div>
        <div>Status: <span id="status" style="color: #00B894;">Online</span></div>
    `;
    
    document.body.appendChild(metricsPanel);
    
    // Show metrics panel after delay
    setTimeout(() => {
        metricsPanel.style.opacity = '1';
        metricsPanel.style.transform = 'translateX(0)';
    }, 2000);
    
    // Update metrics periodically
    let requestCount = 0;
    setInterval(() => {
        requestCount += Math.floor(Math.random() * 5) + 1;
        const latency = Math.floor(Math.random() * 50) + 10;
        const uptime = (99.8 + Math.random() * 0.2).toFixed(1);
        
        document.getElementById('requests').textContent = requestCount.toLocaleString();
        document.getElementById('latency').textContent = latency + 'ms';
        document.getElementById('uptime').textContent = uptime + '%';
    }, 2000);
    
    // Hide panel on click
    metricsPanel.addEventListener('click', () => {
        metricsPanel.style.opacity = '0';
        metricsPanel.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            metricsPanel.style.opacity = '1';
            metricsPanel.style.transform = 'translateX(0)';
        }, 5000);
    });
}

// API Connection Simulation
function simulateAPIConnection() {
    const connectionStates = [
        'Establishing connection...',
        'Authenticating...',
        'Loading API schema...',
        'Connection established'
    ];
    
    let currentState = 0;
    
    const showConnectionState = () => {
        if (currentState < connectionStates.length) {
            console.log(`%c🔗 ${connectionStates[currentState]}`, 'color: #0984E3; font-weight: bold;');
            currentState++;
            setTimeout(showConnectionState, 800);
        } else {
            console.log('%c✅ API System Ready', 'color: #00B894; font-size: 14px; font-weight: bold;');
        }
    };
    
    setTimeout(showConnectionState, 1000);
}

// Add API Version Info
function addAPIVersionInfo() {
    const footer = document.querySelector('footer');
    if (footer) {
        const versionInfo = document.createElement('div');
        versionInfo.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            background: rgba(108, 92, 231, 0.1);
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: #6C5CE7;
        `;
        versionInfo.innerHTML = `
            <strong>API Version:</strong> v2.1.0 | 
            <strong>Last Updated:</strong> ${new Date().toLocaleDateString()} | 
            <strong>Endpoints:</strong> 47 Active
        `;
        footer.appendChild(versionInfo);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .api-metrics:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 10px 30px rgba(108, 92, 231, 0.3);
    }
`;
document.head.appendChild(style);

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log(`%c⚡ Page Load Time: ${Math.round(entry.loadEventEnd - entry.loadEventStart)}ms`, 'color: #FDCB6E; font-weight: bold;');
        }
    });
});

performanceObserver.observe({ entryTypes: ['navigation'] });

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Focus on search (if implemented)
                console.log('🔍 Search shortcut activated');
                break;
            case 'm':
                e.preventDefault();
                // Toggle metrics panel
                const metricsPanel = document.querySelector('.api-metrics');
                if (metricsPanel) {
                    metricsPanel.style.opacity = metricsPanel.style.opacity === '0' ? '1' : '0';
                }
                break;
        }
    }
});

// Export functions for external use
window.APISystem = {
    simulateAPICall: (endpoint, method = 'GET') => {
        return new Promise((resolve) => {
            const latency = Math.random() * 100 + 50;
            setTimeout(() => {
                resolve({
                    status: 200,
                    endpoint,
                    method,
                    latency: Math.round(latency),
                    timestamp: new Date().toISOString()
                });
            }, latency);
        });
    },
    
    getMetrics: () => {
        return {
            uptime: '99.9%',
            requests: document.getElementById('requests')?.textContent || '0',
            latency: document.getElementById('latency')?.textContent || '0ms',
            status: 'Online'
        };
    }
}; 