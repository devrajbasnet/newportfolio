'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
'use strict';

/* ============================================================
   1. INTENSE LIGHTING — ORBS + AURORA + RAYS + FLARES
   ============================================================ */
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'animated-bg';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initAll();
  }

  let orbs = [], rays = [], flares = [], sparks = [];

  const orbDefs = [
    { r:100, g:80,  b:255, sz:0.55, px:0.15, py:0.25, vx: 0.22, vy: 0.14 },
    { r:0,   g:200, b:160, sz:0.50, px:0.75, py:0.60, vx:-0.18, vy: 0.20 },
    { r:60,  g:160, b:255, sz:0.45, px:0.50, py:0.80, vx: 0.15, vy:-0.18 },
    { r:255, g:100, b:60,  sz:0.40, px:0.85, py:0.20, vx:-0.24, vy:-0.12 },
    { r:180, g:60,  b:255, sz:0.48, px:0.25, py:0.70, vx: 0.19, vy: 0.16 },
    { r:0,   g:220, b:200, sz:0.42, px:0.60, py:0.30, vx:-0.14, vy: 0.22 },
    { r:80,  g:120, b:255, sz:0.38, px:0.10, py:0.50, vx: 0.21, vy:-0.15 },
    { r:255, g:80,  b:160, sz:0.35, px:0.90, py:0.75, vx:-0.17, vy:-0.19 },
    { r:100, g:220, b:255, sz:0.44, px:0.40, py:0.10, vx: 0.13, vy: 0.25 },
  ];

  function initAll() {
    const w = canvas.width, h = canvas.height;
    const m = Math.min(w, h);

    orbs = orbDefs.map(d => ({
      x:     d.px * w,
      y:     d.py * h,
      r:     d.sz * m,
      vx:    d.vx,
      vy:    d.vy,
      color: { r: d.r, g: d.g, b: d.b },
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.0003 + Math.random() * 0.0004,
    }));

    rays = Array.from({ length: 8 }, (_, i) => ({
      angle:  (i / 8) * Math.PI * 2,
      speed:  0.00015 + Math.random() * 0.0002,
      phase:  Math.random() * Math.PI * 2,
      color:  orbDefs[i % orbDefs.length],
      length: 0.6 + Math.random() * 0.35,
    }));

    flares = Array.from({ length: 5 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.0003 + Math.random() * 0.0005,
      size:  0.04 + Math.random() * 0.06,
      color: orbDefs[Math.floor(Math.random() * orbDefs.length)],
    }));

    sparks = Array.from({ length: 90 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     0.6 + Math.random() * 2.0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.001 + Math.random() * 0.003,
      color: Math.random() < 0.5
        ? { r: 255, g: 255, b: 255 }
        : orbDefs[Math.floor(Math.random() * orbDefs.length)],
    }));
  }

  function drawOrb(orb, t) {
    const pulse  = 0.78 + 0.22 * Math.sin(t * orb.pulseSpeed * 5000 + orb.phase);
    const radius = orb.r * pulse;
    const { r, g, b } = orb.color;

    const halo = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius * 1.7);
    halo.addColorStop(0,   `rgba(${r},${g},${b},0)`);
    halo.addColorStop(0.4, `rgba(${r},${g},${b},0.07)`);
    halo.addColorStop(0.75,`rgba(${r},${g},${b},0.14)`);
    halo.addColorStop(1,   `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, radius * 1.7, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    const core = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius);
    core.addColorStop(0,    `rgba(255,255,255,0.92)`);
    core.addColorStop(0.08, `rgba(${r},${g},${b},0.88)`);
    core.addColorStop(0.28, `rgba(${r},${g},${b},0.58)`);
    core.addColorStop(0.58, `rgba(${r},${g},${b},0.24)`);
    core.addColorStop(0.82, `rgba(${r},${g},${b},0.08)`);
    core.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();

    const spot = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius * 0.14);
    spot.addColorStop(0, `rgba(255,255,255,0.98)`);
    spot.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, radius * 0.14, 0, Math.PI * 2);
    ctx.fillStyle = spot;
    ctx.fill();
  }

  function moveOrb(orb) {
    orb.x += orb.vx;
    orb.y += orb.vy;
    const w = canvas.width, h = canvas.height, pad = orb.r * 1.7;
    if (orb.x < -pad)     orb.x = w + pad;
    if (orb.x > w + pad)  orb.x = -pad;
    if (orb.y < -pad)     orb.y = h + pad;
    if (orb.y > h + pad)  orb.y = -pad;
  }

  function drawRays(t) {
    const w = canvas.width, h = canvas.height;
    const cx = w * 0.5, cy = h * 0.5;
    rays.forEach(ray => {
      const angle = ray.angle + t * ray.speed * 1000;
      const len   = Math.min(w, h) * ray.length;
      const alpha = 0.04 + 0.07 * ((1 + Math.sin(t * ray.speed * 3000 + ray.phase)) / 2);
      const { r, g, b } = ray.color;
      const ex = cx + Math.cos(angle) * len;
      const ey = cy + Math.sin(angle) * len;
      const grad = ctx.createLinearGradient(cx, cy, ex, ey);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${(alpha * 2.2).toFixed(3)})`);
      grad.addColorStop(0.3, `rgba(${r},${g},${b},${alpha.toFixed(3)})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 65 + 45 * Math.sin(t * ray.speed * 2000 + ray.phase);
      ctx.stroke();
    });
  }

  const auroraList = [
    { r:100, g:80,  b:255, yR:0.15, hR:0.22, spd:0.00038 },
    { r:0,   g:200, b:160, yR:0.40, hR:0.18, spd:0.00042 },
    { r:60,  g:160, b:255, yR:0.65, hR:0.20, spd:0.00035 },
    { r:180, g:60,  b:255, yR:0.85, hR:0.16, spd:0.00045 },
  ];

  function drawAurora(t) {
    const w = canvas.width, h = canvas.height;
    auroraList.forEach((a, i) => {
      const { r, g, b } = a;
      const yC  = h * a.yR + Math.sin(t * a.spd * 1000 + i * 2.1) * h * 0.07;
      const bH  = h * a.hR * (0.85 + 0.15 * Math.sin(t * a.spd * 800 + i));
      const grad = ctx.createLinearGradient(0, yC - bH, 0, yC + bH);
      grad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.30, `rgba(${r},${g},${b},0.16)`);
      grad.addColorStop(0.50, `rgba(${r},${g},${b},0.34)`);
      grad.addColorStop(0.70, `rgba(${r},${g},${b},0.16)`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.moveTo(0, yC + bH);
      for (let x = 0; x <= w; x += 5) {
        const wb = Math.sin(x * 0.006 + t * 0.0009 + i * 1.8) * bH * 0.60
                 + Math.sin(x * 0.013 + t * 0.0006 + i * 0.9) * bH * 0.30;
        ctx.lineTo(x, yC - bH * 0.5 + wb);
      }
      ctx.lineTo(w, yC + bH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= w; x += 5) {
        const wb = Math.sin(x * 0.006 + t * 0.0009 + i * 1.8) * bH * 0.60
                 + Math.sin(x * 0.013 + t * 0.0006 + i * 0.9) * bH * 0.30;
        x === 0 ? ctx.moveTo(x, yC - bH * 0.5 + wb) : ctx.lineTo(x, yC - bH * 0.5 + wb);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},0.50)`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    });
  }

  function drawFlares(t) {
    const w = canvas.width, h = canvas.height;
    flares.forEach(f => {
      const alpha = 0.5 + 0.5 * ((1 + Math.sin(t * f.speed * 5000 + f.phase)) / 2);
      const size  = f.size * Math.min(w, h) * (0.7 + 0.3 * alpha);
      const fx = f.x * w, fy = f.y * h;
      const { r, g, b } = f.color;
      const disc = ctx.createRadialGradient(fx, fy, 0, fx, fy, size);
      disc.addColorStop(0,   `rgba(255,255,255,${(alpha * 0.97).toFixed(2)})`);
      disc.addColorStop(0.1, `rgba(${r},${g},${b},${(alpha * 0.82).toFixed(2)})`);
      disc.addColorStop(0.4, `rgba(${r},${g},${b},${(alpha * 0.38).toFixed(2)})`);
      disc.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(fx, fy, size, 0, Math.PI * 2);
      ctx.fillStyle = disc;
      ctx.fill();
      [0, Math.PI / 2].forEach(angle => {
        const len = size * 4.0;
        const cos = Math.cos(angle), sin = Math.sin(angle);
        const lg  = ctx.createLinearGradient(fx - cos * len, fy - sin * len, fx + cos * len, fy + sin * len);
        lg.addColorStop(0,    `rgba(${r},${g},${b},0)`);
        lg.addColorStop(0.45, `rgba(255,255,255,${(alpha * 0.58).toFixed(2)})`);
        lg.addColorStop(0.5,  `rgba(255,255,255,${(alpha * 0.95).toFixed(2)})`);
        lg.addColorStop(0.55, `rgba(255,255,255,${(alpha * 0.58).toFixed(2)})`);
        lg.addColorStop(1,    `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.moveTo(fx - cos * len, fy - sin * len);
        ctx.lineTo(fx + cos * len, fy + sin * len);
        ctx.strokeStyle = lg;
        ctx.lineWidth   = 3;
        ctx.stroke();
      });
    });
  }

  function drawSparks(t) {
    const w = canvas.width, h = canvas.height;
    sparks.forEach(s => {
      const alpha = 0.1 + 0.9 * ((1 + Math.sin(t * s.speed * 6000 + s.phase)) / 2);
      const { r, g, b } = s.color;
      const glow = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, s.r * 5);
      glow.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.45).toFixed(2)})`);
      glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
      ctx.fill();
    });
  }

  function loop(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'screen';
    drawAurora(t);
    drawRays(t);
    orbs.forEach(o => { moveOrb(o); drawOrb(o, t); });
    drawFlares(t);
    ctx.globalCompositeOperation = 'source-over';
    drawSparks(t);
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(loop);
})();


/* ============================================================
   2. SCROLL REVEAL — fade + slide up
   ============================================================ */
(function () {
  const selectors = [
    '.service-item',
    '.testimonials-item',
    '.timeline-item',
    '.skills-item',
    '.blog-post-item',
    '.clients-item',
    '.contact-form',
    '.mapbox',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal', 'reveal-delay-' + ((i % 4) + 1));
    });
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    }),
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ============================================================
   3. SKILL BAR ANIMATION — animate width when visible
   ============================================================ */
(function () {
  const fills = document.querySelectorAll('.skill-progress-fill');
  fills.forEach(fill => {
    const target = fill.style.width || fill.getAttribute('style').match(/width:\s*([\d.]+%)/)?.[1] || '0%';
    fill.style.setProperty('--target-width', target);
  });

  const skillSection = document.querySelector('.skills-list');
  if (!skillSection) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fills.forEach((fill, i) => {
            setTimeout(() => fill.classList.add('animated'), 400 + i * 220);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillSection);
})();


/* ============================================================
   4. ARTICLE TITLE UNDERLINE — slide in on visible
   ============================================================ */
(function () {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-animated');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.5 }
  );

  document.querySelectorAll('.article-title').forEach(el => observer.observe(el));
})();


/* ============================================================
   5. TYPING EFFECT — name in sidebar
   ============================================================ */
(function () {
  const nameEl = document.querySelector('.info-content .name');
  if (!nameEl) return;

  const fullText = nameEl.textContent.trim();
  nameEl.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  nameEl.appendChild(cursor);

  let idx = 0;

  function typeNext() {
    if (idx < fullText.length) {
      nameEl.insertBefore(document.createTextNode(fullText[idx]), cursor);
      idx++;
      setTimeout(typeNext, 75 + Math.random() * 40);
    } else {
      // remove cursor after a short pause once done
      setTimeout(() => {
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      }, 1800);
    }
  }

  setTimeout(typeNext, 700);
})();


/* ============================================================
   6. RIPPLE CLICK EFFECT — on nav links & buttons
   ============================================================ */
(function () {
  function addRipple(e) {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement('span');
    Object.assign(ripple.style, {
      position:      'absolute',
      width:         size + 'px',
      height:        size + 'px',
      left:          (e.clientX - rect.left - size / 2) + 'px',
      top:           (e.clientY - rect.top  - size / 2) + 'px',
      background:    'hsla(45, 100%, 72%, 0.28)',
      borderRadius:  '50%',
      transform:     'scale(0)',
      animation:     'ripple-anim 0.6s ease-out forwards',
      pointerEvents: 'none',
      zIndex:        '0',
    });

    const prev = btn.style.position;
    if (!prev || prev === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }

  document.querySelectorAll('.navbar-link, .form-btn, .info_more-btn, .filter-item button')
    .forEach(el => el.addEventListener('click', addRipple));
})();


/* ============================================================
   7. COUNTER ANIMATION — if any numeric data values exist
   ============================================================ */
(function () {
  const dataEls = document.querySelectorAll('.skill .title-wrapper data');
  if (!dataEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseInt(el.getAttribute('value'), 10);
        let current = 0;
        const step = Math.ceil(end / 40);

        const tick = setInterval(() => {
          current = Math.min(current + step, end);
          el.textContent = current + '%';
          if (current >= end) clearInterval(tick);
        }, 25);

        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  dataEls.forEach(el => observer.observe(el));
})();


/* ============================================================
   8. MOUSE PARALLAX on sidebar avatar
   ============================================================ */
(function () {
  const avatarBox = document.querySelector('.avatar-box');
  if (!avatarBox) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    avatarBox.style.transform = `translateY(-9px) rotate(${dx * 4}deg) scale(1.03)`;
  });

  document.addEventListener('mouseleave', () => {
    avatarBox.style.transform = '';
  });
})();


/* ============================================================
   9. SMOOTH PAGE TRANSITION — re-trigger reveal on tab switch
   ============================================================ */
(function () {
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // small delay so new page's elements are in the DOM
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 1.1) {
            el.classList.add('visible');
          }
        });
      }, 80);
    });
  });
})();
