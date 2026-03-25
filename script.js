/* ==================== ADVANCED FUTURISTIC PORTFOLIO ==================== */

// ===== THREE.JS 3D SCENE =====
let scene, camera, renderer, cube, particles;

function initThreeJS() {
    const canvas = document.getElementById('threeDCanvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050812);
    scene.fog = new THREE.Fog(0x050812, 200, 1000);

    // Camera
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x00f0ff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff006e, 1);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Create Cosmic Star/Galaxy Effect
    createGalaxy();
    
    // Create central glowing sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(0.7, 4);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        shininess: 100,
        wireframe: true
    });
    cube = new THREE.Mesh(sphereGeometry, sphereMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Particle system
    createParticleField();

    // Handle resize
    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        const newWidth = canvas.parentElement.clientWidth;
        const newHeight = canvas.parentElement.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    // Animation loop
    animate();
}

function createGalaxy() {
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20;
        const height = (Math.random() - 0.5) * 5;
        
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = height;
        positions[i + 2] = Math.sin(angle) * radius;
        
        // Color gradient: blue to cyan to purple
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            colors[i] = 0.0; colors[i + 1] = 0.94; colors[i + 2] = 1.0; // Cyan
        } else if (colorChoice < 0.66) {
            colors[i] = 0.3; colors[i + 1] = 0.0; colors[i + 2] = 1.0; // Blue-Purple
        } else {
            colors[i] = 1.0; colors[i + 1] = 0.3; colors[i + 2] = 0.8; // Pink-Purple
        }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.15,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        vertexColors: true
    });
    
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    
    // Rotate galaxy slowly
    stars.rotation.x = Math.random() * Math.PI;
    stars.userData.rotationX = 0.0001;
    stars.userData.rotationY = 0.0003;
}

function createParticleField() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 30;
        posArray[i + 1] = (Math.random() - 0.5) * 30;
        posArray[i + 2] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xffffff,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.3
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate central wireframe sphere
    if (cube) {
        cube.rotation.x += 0.004;
        cube.rotation.y += 0.006;
        cube.rotation.z += 0.002;
    }

    // Animate galaxy
    scene.children.forEach(child => {
        if (child.userData.rotationX !== undefined) {
            child.rotation.x += child.userData.rotationX;
            child.rotation.y += child.userData.rotationY;
        }
    });

    // Animate particles
    if (particles) {
        particles.rotation.x += 0.00005;
        particles.rotation.y += 0.0001;
    }

    renderer.render(scene, camera);
}

// ===== GITHUB API INTEGRATION =====
const GITHUB_USERNAME = 'FlamingSlayer';
const GITHUB_API = 'https://api.github.com/users/FlamingSlayer/repos';

async function fetchGitHubProjects() {
    try {
        const response = await fetch(GITHUB_API + '?sort=stars&per_page=12');
        const repos = await response.json();
        
        if (Array.isArray(repos)) {
            displayProjects(repos);
        }
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        showFallbackProjects();
    }
}

function displayProjects(repos) {
    const projectsGrid = document.getElementById('projectsGrid');
    const loadingDiv = document.getElementById('projectsLoading');
    
    if (loadingDiv) loadingDiv.remove();
    
    projectsGrid.innerHTML = '';

    repos.forEach((repo, index) => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
        
        // Staggered animation
        setTimeout(() => {
            gsap.from(projectCard, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power2.out'
            });
        }, index * 50);
    });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-stars', repo.stargazers_count);
    card.setAttribute('data-date', new Date(repo.updated_at).getTime());
    
    const language = repo.language || 'Code';
    const icon = getLanguageIcon(language);
    const stars = repo.stargazers_count || 0;
    const topics = repo.topics ? repo.topics.slice(0, 3) : [];

    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon"><i class="${icon}"></i></div>
            <h3>${repo.name}</h3>
            <span class="star-badge" title="Stars">⭐ ${stars}</span>
        </div>
        <p class="project-desc">${repo.description || 'No description provided'}</p>
        <div class="project-meta">
            <span class="meta-tag">${language}</span>
            ${topics.map(t => `<span class="meta-tag">${t}</span>`).join('')}
        </div>
        <div class="project-stats">
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count || 0}</span>
            <span><i class="fas fa-eye"></i> ${repo.watchers_count || 0}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="btn btn-small" data-ripple>View on GitHub →</a>
    `;

    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    return card;
}

function getLanguageIcon(language) {
    const icons = {
        'JavaScript': 'fab fa-js-square',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'React': 'fab fa-react',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3',
        'TypeScript': 'fab fa-js-square',
        'PHP': 'fab fa-php',
        'Ruby': 'fas fa-gem',
        'Go': 'fas fa-code',
        'C++': 'fas fa-code',
        'C#': 'fas fa-code',
        'Code': 'fas fa-code'
    };
    return icons[language] || 'fas fa-code';
}

function showFallbackProjects() {
    // Show sample projects if GitHub API fails
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #00f0ff;">Unable to load projects. Please visit <a href="https://github.com/FlamingSlayer" target="_blank" style="color: #00f0ff; text-decoration: underline;">GitHub</a></p>';
}

// ===== PROJECT FILTERING =====
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            let visibleCount = 0;

            projectCards.forEach((card, index) => {
                let show = false;

                if (filter === 'all') {
                    show = true;
                } else if (filter === 'starred') {
                    const stars = parseInt(card.getAttribute('data-stars') || '0');
                    show = stars > 0;
                } else if (filter === 'recent') {
                    const date = parseInt(card.getAttribute('data-date') || '0');
                    const now = Date.now();
                    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
                    show = (now - date) < thirtyDaysMs;
                }

                if (show) {
                    card.style.display = 'flex';
                    visibleCount++;
                    setTimeout(() => {
                        gsap.from(card, {
                            opacity: 0,
                            y: 10,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }, 50);
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Three.js 3D
    initThreeJS();

    // Fetch GitHub projects
    fetchGitHubProjects();
    setupProjectFilters();

    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const themeBtn = document.getElementById('themeBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const floatingBtn = document.getElementById('floatingBtn');
    const contactForm = document.querySelector('.contact-form');
    const letWorkBtn = document.getElementById('letWorkBtn');
    const viewWorkBtn = document.getElementById('viewWorkBtn');

    // ===== CTA BUTTONS =====
    letWorkBtn?.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            gsap.to(window, {
                scrollTo: contactSection.offsetTop - 80,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    });

    viewWorkBtn?.addEventListener('click', () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            gsap.to(window, {
                scrollTo: projectsSection.offsetTop - 80,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    });

    // ===== MOBILE MENU =====
    menuBtn?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            mobileNav.classList.remove('active');
            updateActiveNav(link);
        });
    });

    // ===== THEME TOGGLE =====
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon();

    themeBtn?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const theme = html.getAttribute('data-theme');
        themeBtn.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }

    // ===== SCROLL EFFECTS =====
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(handleScroll);
        }
    });

    function handleScroll() {
        const scrollPos = window.scrollY;

        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (floatingBtn) {
            if (scrollPos > 300) {
                floatingBtn.classList.add('show');
            } else {
                floatingBtn.classList.remove('show');
            }
        }

        updateActiveNavFromScroll();
        ticking = false;
    }

    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    function updateActiveNav(element) {
        navLinks.forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }

    // ===== SMOOTH SCROLL =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const element = document.querySelector(target);
            
            if (element) {
                const offsetTop = element.offsetTop - 80;
                gsap.to(window, {
                    scrollTo: offsetTop,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // ===== FLOATING BUTTON =====
    floatingBtn?.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
    });

    // ===== RIPPLE EFFECT =====
    document.querySelectorAll('[data-ripple]').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===== INTERSECTION OBSERVER =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card, .service-card, .skill-column').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // ===== CONTACT FORM =====
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name') ? formData.get('name').trim() : '';
        const email = formData.get('email') ? formData.get('email').trim() : '';
        const message = formData.get('message') ? formData.get('message').trim() : '';

        if (!name || !email || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        console.log('Form data:', { name, email, message });
        showNotification('Message sent successfully! 🚀', 'success');
        contactForm.reset();
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ff0066' : '#00f0ff'};
            color: ${type === 'error' ? '#fff' : '#000'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 2000;
            box-shadow: 0 10px 40px 0 rgba(0, 240, 255, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        gsap.from(notification, {
            x: 400,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        setTimeout(() => {
            gsap.to(notification, {
                x: 400,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }, 3000);
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            gsap.to(window, {
                scrollTo: 0,
                duration: 0.5
            });
        }
        if (e.key === 't' || e.key === 'T') {
            themeBtn?.click();
        }
    });

    // ===== ANIMATIONS STYLE =====
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .btn:active {
            transform: scale(0.98);
        }

        .loading-animation {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
        }

        .loader {
            border: 4px solid rgba(0, 240, 255, 0.1);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .star-badge {
            background: rgba(255, 0, 110, 0.2);
            color: #ff006e;
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: auto;
        }

        .project-stats {
            display: flex;
            gap: 1rem;
            margin: 1rem 0;
            font-size: 0.85rem;
            color: rgba(224, 224, 224, 0.6);
        }

        .project-card:hover .star-badge {
            background: rgba(255, 0, 110, 0.3);
        }
    `;
    document.head.appendChild(animationStyle);

    // Load GSAP scrollTo plugin if needed
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
    }

    console.log('✨ Advanced Futuristic Portfolio Loaded with 3D & GitHub Integration!');
    console.log('🚀 Keyboard shortcuts: ESC to scroll top, T to toggle theme');
});

// Smooth scrolling helper
let ScrollToPlugin = gsap.plugins.scrollTo;
if (!ScrollToPlugin) {
    // Fallback for basic scroll
    window.scrollTo = (function() {
        const originalScrollTo = window.scrollTo;
        return function(options) {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                document.documentElement.scrollTop = options.top || 0;
            } else {
                originalScrollTo.call(window, options);
            }
        };
    })();
}
