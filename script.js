/**
 * Portfolio Interactive Scripts & Micro-interactions
 * Author: Aniket Sharma
 * Professional, high-performance interactions:
 *  - 3D Tilt Card Physics & Spotlight Follow
 *  - Dynamic Typewriter Taglines
 *  - Project Filtering System
 *  - Live Fully Functional Interactive Calculator Widget
 *  - Modal Management (Calculator, Zerodha Showcase, Digital Resume)
 *  - Magnetic Buttons, Scroll Spy, Back-to-Top, and Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------------- 1. Dynamic Typewriter Effect ----------------
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const roles = [
      'Computer Science Undergraduate',
      'Frontend Web Developer',
      'C / C++ & Python Programmer',
      'UI/UX & Logic Builder',
      'Tech Enthusiast & Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 450; // Pause before new word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // ---------------- 3. 3D Tilt Card Physics & Spotlight Follow ----------------
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ---------------- 4. Magnetic Button Hover Effect ----------------
  const magneticButtons = document.querySelectorAll('.magnetic-btn');

  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ---------------- 5. Navbar Sticky & Scroll Spy ----------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollPos = window.scrollY;

    // Sticky navbar backdrop
    if (navbar) {
      if (scrollPos > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy for active navigation item
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------- 6. Mobile Hamburger Navigation ----------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
      }
    });
  }

  // ---------------- 7. Project Category Filtering ----------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ---------------- 8. Modal Management Helper ----------------
  function setupModal(openTrigger, modalElement, closeTriggers) {
    if (!modalElement) return;

    const openModal = () => {
      modalElement.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modalElement.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (openTrigger) {
      if (Array.isArray(openTrigger) || openTrigger instanceof NodeList) {
        openTrigger.forEach((btn) => btn.addEventListener('click', openModal));
      } else {
        openTrigger.addEventListener('click', openModal);
      }
    }

    if (closeTriggers) {
      closeTriggers.forEach((trigger) => {
        if (trigger) trigger.addEventListener('click', closeModal);
      });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalElement.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Calculator Modal
  const openCalcModalBtn = document.getElementById('openCalcModalBtn');
  const calcModal = document.getElementById('calcModal');
  const closeCalcBtn = document.getElementById('closeCalcBtn');
  const calcBackdrop = document.getElementById('calcBackdrop');
  setupModal(openCalcModalBtn, calcModal, [closeCalcBtn, calcBackdrop]);

  // Zerodha Showcase Modal
  const openZerodhaModalBtn = document.getElementById('openZerodhaModalBtn');
  const zerodhaModal = document.getElementById('zerodhaModal');
  const closeZerodhaBtn = document.getElementById('closeZerodhaBtn');
  const zerodhaBackdrop = document.getElementById('zerodhaBackdrop');
  setupModal(openZerodhaModalBtn, zerodhaModal, [closeZerodhaBtn, zerodhaBackdrop]);

  // Digital Resume Preview Modal
  const openResumeBtn = document.getElementById('openResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const resumeBackdrop = document.getElementById('resumeBackdrop');
  setupModal(openResumeBtn, resumeModal, [closeResumeBtn, resumeBackdrop]);

  // CodSoft Cert Button opens resume modal focused on internship
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');
  viewCertBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // ---------------- 9. Live Interactive Calculator Logic ----------------
  const calcScreen = document.getElementById('calcScreen');
  const calcHistory = document.getElementById('calcHistory');
  const calcButtons = document.querySelectorAll('.c-btn');

  let currentInput = '0';
  let historyExpression = '';
  let pendingReset = false;

  function updateCalcDisplay() {
    if (calcScreen) calcScreen.textContent = currentInput;
    if (calcHistory) calcHistory.textContent = historyExpression;
  }

  function handleCalcInput(action, val) {
    if (action === 'clear') {
      currentInput = '0';
      historyExpression = '';
      pendingReset = false;
      updateCalcDisplay();
      return;
    }

    if (action === 'delete') {
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
      } else {
        currentInput = '0';
      }
      updateCalcDisplay();
      return;
    }

    if (action === 'percent') {
      try {
        const num = parseFloat(currentInput);
        if (!isNaN(num)) {
          currentInput = String(num / 100);
          updateCalcDisplay();
        }
      } catch (err) {
        currentInput = 'Error';
        updateCalcDisplay();
      }
      return;
    }

    if (action === 'operator') {
      if (historyExpression && !pendingReset) {
        // If an operator is pressed again, replace trailing operator
        if (/[\+\-\*\/]$/.test(historyExpression) && currentInput === '0') {
          historyExpression = historyExpression.slice(0, -1) + val;
          updateCalcDisplay();
          return;
        }
      }
      historyExpression = `${currentInput} ${val}`;
      pendingReset = true;
      updateCalcDisplay();
      return;
    }

    if (action === 'calculate') {
      if (!historyExpression) return;
      const fullExp = `${historyExpression} ${currentInput}`;
      try {
        // Sanitize and evaluate arithmetic safely
        const sanitizedExp = fullExp.replace(/[^0-9\+\-\*\/\.\s]/g, '');
        // Evaluate expression using Function constructor with no global scope leakage
        const result = Function(`'use strict'; return (${sanitizedExp})`)();
        
        if (!isFinite(result)) {
          currentInput = 'Error (Div by 0)';
        } else {
          // Round to prevent floating point weirdness (e.g. 0.1 + 0.2)
          currentInput = String(Math.round(result * 100000000) / 100000000);
        }
        historyExpression = `${fullExp} =`;
        pendingReset = true;
      } catch (err) {
        currentInput = 'Error';
      }
      updateCalcDisplay();
      return;
    }

    // Number or decimal input
    if (val) {
      if (pendingReset) {
        currentInput = val === '.' ? '0.' : val;
        pendingReset = false;
      } else {
        if (val === '.') {
          if (!currentInput.includes('.')) {
            currentInput += '.';
          }
        } else {
          if (currentInput === '0') {
            currentInput = val;
          } else {
            currentInput += val;
          }
        }
      }
      updateCalcDisplay();
    }
  }

  calcButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const val = btn.getAttribute('data-val');
      handleCalcInput(action, val);
    });
  });

  // Keyboard support when calculator modal is open
  window.addEventListener('keydown', (e) => {
    if (!calcModal || !calcModal.classList.contains('active')) return;

    if (e.key >= '0' && e.key <= '9') {
      handleCalcInput(null, e.key);
    } else if (e.key === '.') {
      handleCalcInput(null, '.');
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      handleCalcInput('operator', e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      handleCalcInput('calculate', null);
    } else if (e.key === 'Backspace') {
      handleCalcInput('delete', null);
    } else if (e.key === 'Escape') {
      handleCalcInput('clear', null);
    }
  });

  // ---------------- 10. Contact Form & Toast Notification ----------------
  const contactForm = document.getElementById('contactForm');
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        showToast('Thank you! Your message has been prepared and sent.', 'success');
      }, 1200);
    });
  }

  // Console Welcome Greeting
  console.log(
    '%c🚀 Welcome to Aniket Sharma\'s 3D Portfolio!',
    'color: #06b6d4; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(6,182,212,0.5);'
  );
  console.log(
    '%cInterested in collaborating or hiring? Reach out at csjmu24001390024@csjmu.ac.in',
    'color: #a5b4fc; font-size: 12px;'
  );
});
