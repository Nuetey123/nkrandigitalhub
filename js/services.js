// ============================================
// NKRAN DIGITAL HUB - Services Page Scripts
// ============================================

// ============================================
// 1. CORE SETUP
// ============================================

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// 2. MOBILE MENU FUNCTIONALITY
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
}

// Close menu when clicking a nav link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});

// ============================================
// 3. LOADER & IMAGE HANDLING
// ============================================

window.addEventListener('load', () => {
  // Hide loader after delay
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);

  // Mark images as loaded for fade-in effect
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

  // Initialize particles after everything is loaded
  initializeParticles();
});

// ============================================
// 4. PARTICLES.JS - ELECTRIFYING BACKGROUND
// ============================================

function initializeParticles() {
  const canvas = document.getElementById('particles-canvas');

  // Check if everything needed exists
  if (!canvas) {
    console.warn('⚠️ Particles canvas not found - skipping initialization');
    return;
  }

  if (typeof particlesJS === 'undefined') {
    console.warn('⚠️ particlesJS library not loaded - skipping initialization');
    return;
  }

  // Set canvas dimensions to match viewport
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particles configuration
  const particlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#00D4FF', '#39FF14', '#0099cc']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00D4FF',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: {
            opacity: 0.8
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  try {
    particlesJS('particles-canvas', particlesConfig);
    console.log('✅ Particles initialized successfully');
  } catch (error) {
    console.error('❌ Particles initialization failed:', error);
  }
}

// ============================================
// 5. SCROLL ANIMATIONS - Intersection Observer
// ============================================

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Initialize scroll observers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Observe all scroll-animated elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });

  // Observe section titles
  document.querySelectorAll('.section-title').forEach(el => {
    scrollObserver.observe(el);
  });

  // Observe service cards for paragraph animations
  document.querySelectorAll('.service-card, .process-card').forEach(el => {
    scrollObserver.observe(el);
  });
});

// ============================================
// 6. SERVICE FILTER FUNCTIONALITY
// ============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    serviceCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.classList.remove('hidden-card');
        // Trigger reflow to restart animation
        card.classList.remove('fade-in');
        void card.offsetWidth;
        card.classList.add('fade-in');
      } else {
        card.classList.add('hidden-card');
      }
    });
  });
});

// ============================================
// 7. NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// 8. SCROLL PROGRESS BAR
// ============================================

window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }
});

// ============================================
// 9. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// 10. WINDOW RESIZE HANDLER
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
  // Debounce resize events for performance
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Update canvas size if particles are active
    const canvas = document.getElementById('particles-canvas');
    if (canvas && window.pJSDom && window.pJSDom.length > 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, 250);
});