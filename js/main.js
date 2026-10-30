/**
 * AHNAF WADUD ARNAB - MAIN SCRIPT
 * High Performance Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Typing animation for Hero
  const typedTarget = document.querySelector('.hero-typed-role');
  if (typedTarget) {
    const roles = [
      'COMPUTER SCIENCE & ENGINEERING \nSTUDENT',
      'FLUTTER CROSS-PLATFORM DEVELOPER',
      'FULL-STACK DEVELOPER',
      'PROBLEM SOLVER'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const eraseSpeed = 45;
    const holdDuration = 1850;

    const tick = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typedTarget.textContent = currentRole.substring(0, charIdx);
      } else {
        charIdx++;
        typedTarget.textContent = currentRole.substring(0, charIdx);
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, holdDuration);
        return;
      }

      if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 350);
        return;
      }

      setTimeout(tick, isDeleting ? eraseSpeed : typeSpeed);
    };

    tick();
  }

    // Resume dropdown click toggle (especially for mobile/touch)
  const resumeBtn = document.getElementById('resumeDropdownBtn');
  const resumeWrap = document.querySelector('.resume-dropdown-wrap');
  if (resumeBtn && resumeWrap) {
    resumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = resumeWrap.classList.toggle('active');
      resumeBtn.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!resumeWrap.contains(e.target)) {
        resumeWrap.classList.remove('active');
        resumeBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. ScrollSpy with IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach((s) => sectionObserver.observe(s));
  }

  // 5. Testimonials Carousel
  const testimonials = [
    {
      quote: "Ahnaf demonstrates an exceptional grasp of software engineering and mobile computing. His technical discipline, problem-solving mindset, and ability to build scalable, high-performance applications with clean architecture are truly impressive. A talented developer who consistently exceeds expectations.",
      name: "Mokter Mahmud Chowdhury",
      role: "Research Scientist & Innovation Lead",
      avatar: "images/avatar_mmc.png"
    },
    {
      quote: "Working with Ahnaf on our mobile application was seamless. His mastery of Flutter, state management, and API integration was instrumental to our success.",
      name: "Tanvir Ahmed",
      role: "Lead Software Architect",
      avatar: "images/avatar_tanvir.png"
    },
    {
      quote: "Great communication, prompt delivery, and impressive technical skills. The UI components were responsive and polished to perfection.",
      name: "Sarah Jenkins",
      role: "Engineering Director",
      avatar: "images/avatar_sarah.png"
    }
  ];

  let currentTestimonial = 0;
  const quoteElem = document.querySelector('.testimonial-text');
  const authorNameElem = document.querySelector('.author-name');
  const authorRoleElem = document.querySelector('.author-role');
  const authorAvatarElem = document.querySelector('.author-avatar');
  const dotsContainer = document.querySelector('.testimonial-dots');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');

  const updateTestimonial = (idx) => {
    if (!quoteElem) return;
    currentTestimonial = (idx + testimonials.length) % testimonials.length;
    const t = testimonials[currentTestimonial];
    quoteElem.textContent = t.quote;
    if (authorNameElem) authorNameElem.textContent = t.name;
    if (authorRoleElem) authorRoleElem.textContent = t.role;
    if (authorAvatarElem) authorAvatarElem.src = t.avatar;

    const dots = document.querySelectorAll('.t-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentTestimonial);
    });
  };

  if (dotsContainer && quoteElem) {
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = `t-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => updateTestimonial(i));
      dotsContainer.appendChild(dot);
    });

    prevBtn?.addEventListener('click', () => updateTestimonial(currentTestimonial - 1));
    nextBtn?.addEventListener('click', () => updateTestimonial(currentTestimonial + 1));
  }

  // 6. Number Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateStats = () => {
    if (animatedStats) return;
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        stat.textContent = `${count}${suffix}`;
      }, 35);
    });
    animatedStats = true;
  };

  const statsSection = document.querySelector('.stats-banner-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.disconnect();
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statsSection);
  }

  // 7. Contact Form Handler (Formspree)
  const contactForm = document.getElementById('contactForm');
  const statusEl = document.getElementById('form-status');

  if (contactForm && statusEl) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;
      statusEl.textContent = '';
      statusEl.className = 'form-feedback-status';

      try {
        const formData = new FormData(contactForm);
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          statusEl.textContent = "✅ Message sent successfully! I'll get back to you soon.";
          statusEl.style.color = '#ff5722';
          contactForm.reset();
        } else {
          statusEl.textContent = '❌ Failed to send message. Please try again or email directly.';
          statusEl.style.color = '#ef4444';
        }
      } catch (err) {
        statusEl.textContent = '❌ An error occurred. Please try again or email directly.';
        statusEl.style.color = '#ef4444';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
