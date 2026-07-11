// ========================================
// Theme Toggle (Dark / Light) & Particles
// ========================================
function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing
    
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isDark = theme === 'dark';
    const particleCount = isDark ? 20 : 12; // 20 stars or 12 fireballs
    
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = `particle ${isDark ? 'star' : 'fireball'}`;
        
        // Random placement offsets
        p.style.left = `${Math.random() * 100}vw`;
        
        // Stars & fireballs both start randomly spread vertically for diagonal flight
        p.style.top = `${Math.random() * 100}vh`;
        
        const delay = Math.random() * 8;
        const duration = isDark ? (6 + Math.random() * 6) : (8 + Math.random() * 6);
        const scale = 0.5 + Math.random() * 0.8;
        
        p.style.animationDelay = `-${delay}s`; // Start in middle of animation
        p.style.animationDuration = `${duration}s`;
        p.style.transform = `scale(${scale})`;
        
        container.appendChild(p);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
    initParticles();
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.innerHTML = theme === 'light' 
            ? '<span>☀️</span><span>Light Mode</span>' 
    }
}

// Load saved theme immediately
(function () {
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
})();

// ========================================
// Auto-set active nav link & Init particles
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles(); // Rebuild particles on load

    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if (href === currentFile) {
            link.classList.add('active');
        }
        // Bài 1-6 detail pages → highlight "My Projects"
        if (currentFile.startsWith('bai') && href === 'projects.html') {
            link.classList.add('active');
        }
    });
});

// ========================================
// Navbar scroll effect
// ========================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ========================================
// Mobile menu toggle
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('navToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.getElementById('navLinks').classList.toggle('open');
        });
    }
});

// ========================================
// Scroll animations (Intersection Observer)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// Parallax particles on mouse move
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        particles.forEach((particle, i) => {
            const speed = (i + 1) * 0.3;
            particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});
