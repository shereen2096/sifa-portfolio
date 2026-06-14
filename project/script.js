/* ============================================================
   Sifa Shereen M — Portfolio Script
   ============================================================ */

'use strict';

// ── Loader ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

// ── Footer year ─────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll behaviour ─────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Scroll-to-top visibility
  const btn = document.getElementById('scrollTop');
  btn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  updateActiveLink();
}, { passive: true });

// ── Mobile menu ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ── Active nav link on scroll ────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

// ── Smooth scroll for all anchor links ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Scroll to top ────────────────────────────────────────────
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Typing effect ────────────────────────────────────────────
const typingWords = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'React.js Developer',
  'Problem Solver',
  'CSE Student',
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl  = document.getElementById('typing-text');
const typeSpeed = 90;
const deleteSpeed = 50;
const pauseTime = 1800;

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    charIndex--;
    typingEl.textContent = currentWord.substring(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = currentWord.substring(0, charIndex);
  }

  let delay = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % typingWords.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

// Start after loader hides
setTimeout(typeEffect, 1000);

// ── Scroll Reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Animated Counters ────────────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1500;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObserver.observe(statsEl);

// ── Proficiency bar fill on scroll ──────────────────────────
const profObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.prof-fill').forEach(bar => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = width + '%'; }, 200);
        });
        profObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const profWrap = document.querySelector('.proficiency-wrap');
if (profWrap) profObserver.observe(profWrap);

// ── Contact form ──────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = this.name.value.trim();
  const email   = this.email.value.trim();
  const subject = this.subject.value.trim();
  const message = this.message.value.trim();
  const status  = document.getElementById('formStatus');

  // Basic validation
  if (!name || !email || !subject || !message) {
    showStatus(status, 'error', 'Please fill in all fields.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus(status, 'error', 'Please enter a valid email address.');
    return;
  }

  const btn  = this.querySelector('button[type="submit"]');
  const icon = btn.querySelector('i');
  const text = btn.querySelector('span');

  btn.disabled      = true;
  icon.className    = 'fas fa-spinner fa-spin';
  text.textContent  = 'Sending…';

  // Simulate send (mailto fallback)
  setTimeout(() => {
    const mailtoUrl = `mailto:sifashereen12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoUrl;

    showStatus(status, 'success', 'Message sent! Your email client should open.');
    this.reset();
    btn.disabled     = false;
    icon.className   = 'fas fa-paper-plane';
    text.textContent = 'Send Message';
  }, 1200);
});

function showStatus(el, type, msg) {
  el.textContent  = msg;
  el.className    = 'form-status ' + type;
  setTimeout(() => {
    el.textContent = '';
    el.className   = 'form-status';
  }, 5000);
}

// ── Skill tag hover sparkle ──────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.3)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.boxShadow = '';
  });
});

// ── Stagger project cards on reveal ─────────────────────────
const projectGrid = document.querySelector('.projects-grid');
if (projectGrid) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.project-card').forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0)';
            }, i * 120);
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  projectGrid.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  cardObserver.observe(projectGrid);
}
