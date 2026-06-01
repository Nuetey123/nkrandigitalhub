// contact.js - NKRAN DIGITAL HUB
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

  // ===== FORM HANDLING & VALIDATION =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation check
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Show loading state
      btnText.style.display = 'none';
      btnLoader.style.display = 'inline-block';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Simulate API call / form submission (Replace with actual fetch/axios call)
      setTimeout(() => {
        // Hide form, show success
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Reset form for future use
        contactForm.reset();

        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // Optional: Auto-hide success message and show form again after 8 seconds
        setTimeout(() => {
          formSuccess.classList.remove('show');
          contactForm.style.display = 'block';
          // Re-trigger animation
          formSuccess.style.animation = 'none';
          void formSuccess.offsetWidth; // trigger reflow
          formSuccess.style.animation = 'successPop 0.5s ease-out forwards';
        }, 8000);

      }, 1500);
    });
  }
});