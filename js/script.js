/* =============================================================
   Mohammed Usama & Afifa Mariyam — Wedding Invitation
   Vanilla JavaScript — No frameworks, no dependencies
   ============================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     CONFIGURATION
     ----------------------------------------------------------- */

  /**
   * WhatsApp number for RSVP submission.
   * Set this to the organiser's full international number
   * WITHOUT the "+" sign (e.g. "919876543210").
   * Leave empty until a real number is provided.
   */
  const WHATSAPP_NUMBER = '';

  /**
   * Wedding target date — 22 November 2026, 12:15 PM IST (UTC+5:30).
   * Month is 0-indexed in the Date constructor.
   */
  const WEDDING_DATE = new Date('2026-11-22T12:15:00+05:30');


  /* -----------------------------------------------------------
     UTILITY HELPERS
     ----------------------------------------------------------- */

  /** Shorthand for querySelector. */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  /** Shorthand for querySelectorAll (returns real array). */
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /** Check for reduced-motion preference. */
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* -----------------------------------------------------------
     1. SCROLL-TRIGGERED REVEALS (IntersectionObserver)
     ----------------------------------------------------------- */

  function initScrollReveals() {
    const elements = $$('.reveal-up');
    if (!elements.length) return;

    if (prefersReducedMotion()) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }


  /* -----------------------------------------------------------
     2. COUNTDOWN TIMER
     ----------------------------------------------------------- */

  function initCountdown() {
    const display = $('#countdown-display');
    const complete = $('#countdown-complete');
    if (!display || !complete) return;

    const daysEl   = $('#cd-days');
    const hoursEl  = $('#cd-hours');
    const minsEl   = $('#cd-minutes');
    const secsEl   = $('#cd-seconds');

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function update() {
      const now  = Date.now();
      const diff = WEDDING_DATE.getTime() - now;

      if (diff <= 0) {
        display.style.display = 'none';
        complete.style.display = 'block';
        return; // stop updating
      }

      const totalSec = Math.floor(diff / 1000);
      const days     = Math.floor(totalSec / 86400);
      const hours    = Math.floor((totalSec % 86400) / 3600);
      const minutes  = Math.floor((totalSec % 3600) / 60);
      const seconds  = totalSec % 60;

      daysEl.textContent  = days;
      hoursEl.textContent = pad(hours);
      minsEl.textContent  = pad(minutes);
      secsEl.textContent  = pad(seconds);

      requestAnimationFrame(() => setTimeout(update, 1000));
    }

    update();
  }


  /* -----------------------------------------------------------
     3. FLOATING FLORAL BACKGROUND ANIMATION
     ----------------------------------------------------------- */

  function initFloralAnimation() {
    if (prefersReducedMotion()) return;

    const container = $('#flora-container') || $('#petals-container');
    if (!container) return;

    // Palette of delicate wedding floral colours
    const colours = [
      '#e8c4b8', // soft blush rose
      '#fbf5eb', // warm cream ivory
      '#c6a66b', // champagne gold
      '#7c8f6e', // delicate sage olive
      '#dfb4aa', // dusty rose
      '#d4ba8a', // soft gold
    ];

    // Five SVG floral templates
    const templates = [
      // 1. Five-Petal Blossom (Jasmine / Cherry / Plum Blossom)
      (color) => `
        <svg viewBox="0 0 40 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g fill="${color}" opacity="0.9">
            <circle cx="20" cy="9" r="6.8"/>
            <circle cx="30.5" cy="16.5" r="6.8"/>
            <circle cx="26.5" cy="28.5" r="6.8"/>
            <circle cx="13.5" cy="28.5" r="6.8"/>
            <circle cx="9.5" cy="16.5" r="6.8"/>
          </g>
          <circle cx="20" cy="20" r="3.4" fill="#C6A66B"/>
        </svg>
      `,
      // 2. Starry Four-Petal Jasmine Floret
      (color) => `
        <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2 C16 9, 23 16, 30 16 C23 16, 16 23, 16 30 C16 23, 9 16, 2 16 C9 16, 16 9, 16 2 Z" fill="${color}" opacity="0.9"/>
          <circle cx="16" cy="16" r="2.8" fill="#C6A66B"/>
        </svg>
      `,
      // 3. Delicate Curved Floral Petal
      (color) => `
        <svg viewBox="0 0 24 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2 C18 6, 23 14, 21 23 C19 29, 12 31, 7 28 C3 25, 1 18, 5 11 C8 6, 10 3, 12 2 Z" fill="${color}" opacity="0.85"/>
        </svg>
      `,
      // 4. Olive / Botanical Leaf Pair
      (color) => `
        <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 26 Q16 16 26 6" stroke="${color}" stroke-width="1.4" fill="none" opacity="0.8"/>
          <path d="M16 16 C20 12, 24 13, 26 6 C19 8, 16 12, 16 16 Z" fill="${color}" opacity="0.85"/>
          <path d="M12 20 C10 14, 6 12, 2 15 C6 18, 9 20, 12 20 Z" fill="${color}" opacity="0.85"/>
        </svg>
      `,
      // 5. Golden Starlight / Shimmer Sparkle
      (color) => `
        <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" fill="#D4BA8A" opacity="0.95"/>
        </svg>
      `,
    ];

    const MAX_ITEMS = 28;
    let activeItems = 0;

    function createFloraItem(initialDelay = 0) {
      if (activeItems >= MAX_ITEMS) return;

      const item = document.createElement('div');
      item.className = 'flora-item';
      item.setAttribute('aria-hidden', 'true');

      // Randomize parameters
      const templateIdx = Math.floor(Math.random() * templates.length);
      const color = colours[Math.floor(Math.random() * colours.length)];
      const baseSize = templateIdx === 4 ? (10 + Math.random() * 8) : (18 + Math.random() * 14);
      const itemW = baseSize;
      const itemH = templateIdx === 2 ? baseSize * 1.3 : (templateIdx === 4 ? baseSize * 0.9 : baseSize);
      const left = Math.random() * 96; // 0% to 96%
      const duration = 12 + Math.random() * 14; // 12s to 26s slow graceful drift
      const driftMid = -35 + Math.random() * 70;
      const driftEnd = -50 + Math.random() * 100;
      const rotEnd = 120 + Math.random() * 420;
      const opacity = 0.5 + Math.random() * 0.35;

      item.style.width = `${itemW}px`;
      item.style.height = `${itemH}px`;
      item.style.left = `${left}%`;
      item.style.top = `-45px`;
      item.style.animationDuration = `${duration}s`;
      if (initialDelay < 0) {
        item.style.animationDelay = `${initialDelay}s`;
      }
      item.style.setProperty('--drift-mid', `${driftMid}px`);
      item.style.setProperty('--drift-end', `${driftEnd}px`);
      item.style.setProperty('--rot-end', `${rotEnd}deg`);
      item.style.setProperty('--flora-opacity', opacity.toFixed(2));

      item.innerHTML = templates[templateIdx](color);

      container.appendChild(item);
      activeItems++;

      item.addEventListener('animationend', () => {
        item.remove();
        activeItems--;
      });
    }

    // Pre-populate with staggered initial negative delays so the screen has flowers floating right away
    for (let i = 0; i < 10; i++) {
      createFloraItem(-Math.random() * 16);
    }

    // Spawn new floral elements continuously
    setInterval(() => {
      createFloraItem();
    }, 1400);
  }




  /* -----------------------------------------------------------
     4. AUTOMATIC BACKGROUND MUSIC (BGM)
     ----------------------------------------------------------- */

  let playWeddingMusic = null;

  function initBGM() {
    const audio = $('#bgm-audio');
    if (!audio) return;

    let isPlaying = false;
    let fadeInterval = null;

    function smoothVolume(target, durationMs, onDone) {
      clearInterval(fadeInterval);
      const stepTime = 50;
      const steps = Math.max(1, Math.floor(durationMs / stepTime));
      const delta = (target - audio.volume) / steps;

      fadeInterval = setInterval(() => {
        const next = audio.volume + delta;
        if ((delta > 0 && next >= target) || (delta < 0 && next <= target)) {
          audio.volume = target;
          clearInterval(fadeInterval);
          if (typeof onDone === 'function') onDone();
        } else {
          audio.volume = Math.max(0, Math.min(1, next));
        }
      }, stepTime);
    }

    function play() {
      if (isPlaying) return;

      audio.volume = 0;
      const promise = audio.play();

      if (promise !== undefined) {
        promise
          .then(() => {
            isPlaying = true;
            smoothVolume(0.55, 1500);
            removeGestureListeners();
          })
          .catch((err) => {
            console.info('Autoplay waiting for initial user interaction:', err.message);
          });
      }
    }

    // Lower volume when user switches tabs, restore when returning
    document.addEventListener('visibilitychange', () => {
      if (!isPlaying) return;
      if (document.hidden) {
        smoothVolume(0.12, 600);
      } else {
        smoothVolume(0.55, 600);
      }
    });

    // Expose play function to trigger from Hero buttons or other events
    playWeddingMusic = play;

    // Helper to start playback on first user gesture if browser blocks immediate/delayed autoplay
    function tryPlayOnFirstGesture() {
      if (!isPlaying) {
        play();
      }
      removeGestureListeners();
    }

    function removeGestureListeners() {
      ['click', 'pointerdown', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
        window.removeEventListener(evt, tryPlayOnFirstGesture, { capture: true });
      });
    }

    ['click', 'pointerdown', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, tryPlayOnFirstGesture, { capture: true, once: true, passive: true });
    });

    // Try playing immediately
    play();

    // Automatically try again 2 seconds after website opening
    setTimeout(() => {
      if (!isPlaying) {
        play();
      }
    }, 2000);
  }


  /* -----------------------------------------------------------
     5. HERO BUTTON NAVIGATION & BGM TRIGGER
     ----------------------------------------------------------- */

  function initHeroButtons() {
    const openBtn   = $('#btn-open-invitation');
    const scrollBtn = $('#btn-scroll-discover');

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        // Start background music automatically on invitation open
        if (typeof playWeddingMusic === 'function') {
          playWeddingMusic();
        }

        const target = $('#introduction') || $('#couple');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        if (typeof playWeddingMusic === 'function') {
          playWeddingMusic();
        }

        const target = $('#introduction') || $('#couple');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }


  /* -----------------------------------------------------------
     5. RSVP FORM
     ----------------------------------------------------------- */

  function initRSVP() {
    const form = $('#rsvp-form');
    if (!form) return;

    const nameInput     = $('#rsvp-name');
    const guestsInput   = $('#rsvp-guests');
    const messageInput  = $('#rsvp-message');
    const nameError     = $('#rsvp-name-error');
    const guestsError   = $('#rsvp-guests-error');
    const attendError   = $('#rsvp-attendance-error');
    const confirmation  = $('#rsvp-confirmation');
    const confTitle     = $('#rsvp-confirmation-title');
    const confText      = $('#rsvp-confirmation-text');

    function clearErrors() {
      $$('.form-error', form).forEach(el => (el.textContent = ''));
      $$('.form-input', form).forEach(el => el.classList.remove('is-error'));
    }

    function validate() {
      clearErrors();
      let valid = true;

      // Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameInput.classList.add('is-error');
        valid = false;
      }

      // Guests
      const guests = parseInt(guestsInput.value, 10);
      if (!guestsInput.value.trim() || isNaN(guests) || guests < 1) {
        guestsError.textContent = 'Please enter at least 1 guest.';
        guestsInput.classList.add('is-error');
        valid = false;
      } else if (guests > 20) {
        guestsError.textContent = 'Maximum 20 guests allowed.';
        guestsInput.classList.add('is-error');
        valid = false;
      }

      // Attendance
      const attendance = form.querySelector('input[name="attendance"]:checked');
      if (!attendance) {
        attendError.textContent = 'Please select your response.';
        valid = false;
      }

      return valid;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      const name       = nameInput.value.trim();
      const guests     = guestsInput.value.trim();
      const attendance = form.querySelector('input[name="attendance"]:checked').value;
      const message    = messageInput ? messageInput.value.trim() : '';
      const accepted   = attendance === 'accept';

      // Show confirmation
      form.style.display = 'none';
      confirmation.style.display = 'block';

      if (accepted) {
        confTitle.textContent = 'We Look Forward to Seeing You!';
        confText.textContent = `Thank you, ${name}! We are delighted that you will be joining us with ${guests} guest${parseInt(guests) > 1 ? 's' : ''}.`;
      } else {
        confTitle.textContent = 'We Will Miss You';
        confText.textContent = `Thank you for letting us know, ${name}. You will be in our thoughts and prayers on our special day.`;
      }

      // WhatsApp submission (optional)
      if (WHATSAPP_NUMBER) {
        const responseText = accepted ? 'Joyfully Accept' : 'Regretfully Decline';
        let waMessage = `*Wedding RSVP*%0A%0AName: ${encodeURIComponent(name)}%0AGuests: ${encodeURIComponent(guests)}%0AResponse: ${encodeURIComponent(responseText)}`;
        if (message) {
          waMessage += `%0AMessage: ${encodeURIComponent(message)}`;
        }
        const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

        // Small delay before opening WhatsApp
        setTimeout(() => {
          window.open(waURL, '_blank', 'noopener,noreferrer');
        }, 600);
      }
    });
  }


  /* -----------------------------------------------------------
     6. SHARE & COPY LINK
     ----------------------------------------------------------- */

  function initShare() {
    const shareBtn    = $('#btn-share');
    const copyBtn     = $('#btn-copy-link');
    const feedback    = $('#copy-feedback');

    const shareData = {
      title: 'Afifa Mariyam & Mohammed Usama — Wedding Invitation',
      text: 'You are cordially invited to the Nikah and Walima of Afifa Mariyam & Mohammed Usama on 22 November 2026.',
      url: window.location.href,
    };

    function showFeedback(msg) {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.style.opacity = '1';
      setTimeout(() => {
        feedback.style.opacity = '0';
      }, 2500);
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            if (err.name !== 'AbortError') {
              fallbackCopy();
            }
          }
        } else {
          fallbackCopy();
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        fallbackCopy();
      });
    }

    async function fallbackCopy() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showFeedback('✓ Invitation link copied to clipboard!');
      } catch {
        // Final fallback: select a temp input
        const tmp = document.createElement('input');
        tmp.value = window.location.href;
        document.body.appendChild(tmp);
        tmp.select();
        try {
          document.execCommand('copy');
          showFeedback('✓ Invitation link copied!');
        } catch {
          showFeedback('Could not copy. Please copy the URL from the address bar.');
        }
        document.body.removeChild(tmp);
      }
    }
  }


  /* -----------------------------------------------------------
     7. ADD TO CALENDAR (.ics)
     ----------------------------------------------------------- */

  function initCalendar() {
    const calButtons = $$('.btn-add-calendar');

    calButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const event = btn.dataset.event;
        let icsContent = '';

        if (event === 'nikah') {
          icsContent = generateICS({
            title: 'Nikah — Afifa Mariyam & Mohammed Usama',
            description: 'Nikah ceremony of Afifa Mariyam & Mohammed Usama at Haji Ismail Sait Mosque, Frazer Town, Bangalore.',
            location: 'Haji Ismail Sait Mosque, Frazer Town, Bangalore 560005',
            startUTC: '20261122T064500Z',  // 12:15 PM IST = 06:45 UTC
            endUTC:   '20261122T080000Z',  // ~1:30 PM IST
          });
        } else if (event === 'walima') {
          icsContent = generateICS({
            title: 'Walima — Afifa Mariyam & Mohammed Usama',
            description: 'Walima lunch of Afifa Mariyam & Mohammed Usama at Adam\'s House, Richards Town, Bangalore.',
            location: 'Adam\'s House, #48 Viviani Road, Richards Town, Bangalore 560005',
            startUTC: '20261122T080000Z',  // 1:30 PM IST = 08:00 UTC
            endUTC:   '20261122T103000Z',  // ~4:00 PM IST
          });
        }

        if (icsContent) {
          downloadICS(icsContent, `${event}-afifa-usama.ics`);
        }
      });
    });
  }

  function generateICS({ title, description, location, startUTC, endUTC }) {
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${startUTC}`,
      `DTEND:${endUTC}`,
      `DTSTAMP:${now}`,
      `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@wedding`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }

  function downloadICS(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


  /* -----------------------------------------------------------
     8. INITIALISE EVERYTHING ON DOM READY
     ----------------------------------------------------------- */

  function init() {
    initScrollReveals();
    initCountdown();
    initFloralAnimation();
    initBGM();
    initHeroButtons();
    initRSVP();
    initShare();
    initCalendar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
