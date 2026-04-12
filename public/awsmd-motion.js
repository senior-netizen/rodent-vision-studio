(() => {
  const INIT_CLASS = 'awsmd-motion-initialized';
  const STYLE_ID = 'awsmd-motion-styles';
  const TICKER_CLASS = 'awsmd-ticker';

  const EASE_OUT_CUBIC = (t) => 1 - Math.pow(1 - t, 3);
  const HOVER_BEZIER = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .awsmd-marquee {
        overflow: hidden;
        white-space: nowrap;
      }

      .awsmd-marquee-track {
        display: inline-flex;
        min-width: 100%;
        align-items: baseline;
        will-change: transform;
        animation-name: awsmd-marquee-scroll;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: var(--awsmd-marquee-duration, 24s);
      }

      .awsmd-marquee-segment {
        display: inline-block;
        padding-inline-end: 2rem;
      }

      @keyframes awsmd-marquee-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      .awsmd-reveal-pending {
        opacity: 0;
        transform: translateY(10px);
        transition-property: opacity, transform;
        transition-duration: 600ms;
        transition-timing-function: ${HOVER_BEZIER};
        will-change: opacity, transform;
      }

      .awsmd-revealed {
        opacity: 1;
        transform: translateY(0);
      }

      .awsmd-hover-target {
        transition-property: transform;
        transition-duration: 360ms;
        transition-timing-function: ${HOVER_BEZIER};
        will-change: transform;
      }

      .awsmd-hover-target img,
      .awsmd-hover-target picture,
      .awsmd-hover-target [data-awsmd-hover-image] {
        transition-property: transform;
        transition-duration: 420ms;
        transition-timing-function: ${HOVER_BEZIER};
        will-change: transform;
        transform: scale(1);
      }

      .awsmd-hover-target:hover,
      .awsmd-hover-target:focus-within {
        transform: scale(0.98);
      }

      .awsmd-hover-target:hover img,
      .awsmd-hover-target:hover picture,
      .awsmd-hover-target:hover [data-awsmd-hover-image],
      .awsmd-hover-target:focus-within img,
      .awsmd-hover-target:focus-within picture,
      .awsmd-hover-target:focus-within [data-awsmd-hover-image] {
        transform: scale(1.05);
      }
    `;

    document.head.appendChild(style);
  }

  function hasRepetitiveText(text) {
    const clean = (text || '').trim();
    if (clean.length < 24) return false;

    const words = clean
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    if (words.length < 4) return false;

    const seen = new Map();
    words.forEach((word) => seen.set(word, (seen.get(word) || 0) + 1));

    for (const count of seen.values()) {
      if (count >= 2) return true;
    }

    return /(\||•|·|-|\/)/.test(clean);
  }

  function initMarqueeTicker() {
    const candidates = new Set([
      ...document.querySelectorAll('h1, h2'),
      ...document.querySelectorAll(`.${TICKER_CLASS}`),
      ...document.querySelectorAll('[data-awsmd-ticker]'),
    ]);

    candidates.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.dataset.awsmdTickerReady === '1') return;

      const original = (el.textContent || '').trim();
      const explicit = el.classList.contains(TICKER_CLASS) || el.hasAttribute('data-awsmd-ticker');
      if (!original) return;
      if (!explicit && !hasRepetitiveText(original)) return;

      el.dataset.awsmdTickerReady = '1';
      el.classList.add('awsmd-marquee');

      const track = document.createElement('span');
      track.className = 'awsmd-marquee-track';

      const seg1 = document.createElement('span');
      seg1.className = 'awsmd-marquee-segment';
      seg1.textContent = original;

      const seg2 = document.createElement('span');
      seg2.className = 'awsmd-marquee-segment';
      seg2.textContent = original;

      track.append(seg1, seg2);
      el.textContent = '';
      el.appendChild(track);

      const lengthFactor = Math.max(1, original.length / 20);
      const duration = Math.min(30, Math.max(20, Math.round(lengthFactor * 12)));
      el.style.setProperty('--awsmd-marquee-duration', `${duration}s`);
    });
  }

  function parseCounter(rawText) {
    const text = (rawText || '').trim();
    const match = text.match(/^(\+)?\s*(\d+(?:\.\d+)?)\s*([kKmM])?\s*(\+)?$/);
    if (!match) return null;

    const [, prefixPlus, num, suffixScale, suffixPlus] = match;
    const baseValue = Number(num);
    if (Number.isNaN(baseValue)) return null;

    let multiplier = 1;
    if (suffixScale) multiplier = suffixScale.toUpperCase() === 'M' ? 1_000_000 : 1_000;

    const target = baseValue * multiplier;
    return {
      target,
      baseValue,
      prefixPlus: Boolean(prefixPlus),
      suffixScale: suffixScale ? suffixScale.toUpperCase() : '',
      suffixPlus: Boolean(suffixPlus),
      decimals: num.includes('.') ? num.split('.')[1].length : 0,
    };
  }

  function formatCounter(value, model) {
    const scaled = model.suffixScale
      ? value / (model.suffixScale === 'M' ? 1_000_000 : 1_000)
      : value;

    const fixed = model.decimals > 0 ? scaled.toFixed(model.decimals) : Math.round(scaled).toString();

    return `${model.prefixPlus ? '+' : ''}${fixed}${model.suffixScale}${model.suffixPlus ? '+' : ''}`;
  }

  function initNumberCounters() {
    const allEls = Array.from(document.querySelectorAll('body *'));
    const counterElements = allEls.filter((el) => {
      if (!(el instanceof HTMLElement)) return false;
      if (el.children.length > 0) return false;
      const parsed = parseCounter(el.textContent);
      if (!parsed) return false;
      el.dataset.awsmdCounterTarget = String(parsed.target);
      el.dataset.awsmdCounterModel = JSON.stringify(parsed);
      return true;
    });

    if (!counterElements.length) return;

    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          if (!(el instanceof HTMLElement)) return;
          if (el.dataset.awsmdCounterDone === '1') {
            io.unobserve(el);
            return;
          }

          const modelRaw = el.dataset.awsmdCounterModel;
          if (!modelRaw) return;

          let model;
          try {
            model = JSON.parse(modelRaw);
          } catch {
            io.unobserve(el);
            return;
          }

          const durationMs = 1800;
          const startedAt = performance.now();

          const tick = (now) => {
            const elapsed = now - startedAt;
            const progress = Math.min(1, elapsed / durationMs);
            const eased = EASE_OUT_CUBIC(progress);
            const currentValue = model.target * eased;

            el.innerText = formatCounter(currentValue, model);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.dataset.awsmdCounterDone = '1';
              io.unobserve(el);
            }
          };

          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
    );

    counterElements.forEach((el) => observer.observe(el));
  }

  function initStaggeredReveal() {
    const targets = Array.from(document.querySelectorAll('section, .grid-item, .card, li'));
    if (!targets.length) return;

    const groupedByParent = new Map();
    targets.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.dataset.awsmdRevealReady === '1') return;

      const parent = el.parentElement;
      const key = parent || document.body;
      if (!groupedByParent.has(key)) groupedByParent.set(key, []);
      groupedByParent.get(key).push(el);
    });

    groupedByParent.forEach((group) => {
      group.forEach((el, index) => {
        el.dataset.awsmdRevealReady = '1';
        el.classList.add('awsmd-reveal-pending');
        el.style.transitionDelay = `${index * 50}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (!(el instanceof HTMLElement)) return;

          el.classList.add('awsmd-revealed');
          io.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );

    targets.forEach((el) => observer.observe(el));
  }

  function initHoverPrecision() {
    const targets = new Set([
      ...document.querySelectorAll('.project, .portfolio-item'),
      ...Array.from(document.querySelectorAll('a')).filter((a) => a.querySelector('img')),
    ]);

    targets.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.classList.add('awsmd-hover-target');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains(INIT_CLASS)) return;

    document.body.classList.add(INIT_CLASS);

    injectStyles();
    initMarqueeTicker();
    initNumberCounters();
    initStaggeredReveal();
    initHoverPrecision();
  });
})();
