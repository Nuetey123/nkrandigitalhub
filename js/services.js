// services.js - NKRAN DIGITAL HUB
document.addEventListener('DOMContentLoaded', () => {

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    });
  }

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animateOnScroll.forEach(el => observer.observe(el));
  } else {
    animateOnScroll.forEach(el => el.classList.add('is-visible'));
  }

  // ===== SERVICE FILTER FUNCTIONALITY =====
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

  // ===== NAVBAR SCROLL EFFECT =====
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

  // ===== PARTICLE BACKGROUND =====
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-canvas', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#00D4FF' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true, distance: 150, color: '#00D4FF', opacity: 0.2, width: 1
        },
        move: {
          enable: true, speed: 2, direction: 'none', random: true,
          straight: false, out_mode: 'out', bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.6 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});