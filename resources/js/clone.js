import Lenis from 'lenis';

/* LAVA dental clone — interaction layer (vanilla JS). */
(function () {
  'use strict';

  document.documentElement.classList.add('js-ready');

  var body = document.body;
  var LANG = body.getAttribute('data-clone-lang') || 'en';
  var PAGE = body.getAttribute('data-clone-page') || 'index';
  var lenis = new Lenis({ autoRaf: true });
  var serviceModalLenis = null;
  var wheelSnapStuck = false;
  function setWheelSnapStuck(stuck) {
    if (stuck === wheelSnapStuck) return;
    wheelSnapStuck = stuck;
    document.documentElement.style.scrollSnapType = stuck ? 'none' : 'y proximity';
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle-button');
    var nav = document.querySelector('.site-navigation');
    var header = document.querySelector('.header');
    if (!toggle || !nav || !header) return;
    function setMenu(open) {
      header.classList.toggle('header--navigation-open', open);
      toggle.classList.toggle('menu-toggle-button--active', open);
      body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    setMenu(false);
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('header--navigation-open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setMenu(false);
      });
    });
  }

  /* ---------- Header scroll state ---------- */
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    var last = window.scrollY;
    var ticking = false;
    function update() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      if (y > last + 6 && y > 300) header.classList.add('is-hidden');
      else if (y < last - 6) header.classList.remove('is-hidden');
      last = y;
      ticking = false;
    }
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    update();
  }

  /* ---------- Nav progress bars ---------- */
  function initNavProgress() {
    var items = document.querySelectorAll('[data-clone-nav-progress]');
    items.forEach(function (item) {
      var fill = item.querySelector('.progress__fill');
      var target = document.querySelector(item.getAttribute('href') || '');
      if (!fill || !target) return;
      function onScroll() {
        var rect = target.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height + vh;
        var passed = vh - rect.top;
        var p = Math.max(0, Math.min(1, passed / total));
        fill.style.transform = 'scaleX(' + p + ')';
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    var els = document.querySelectorAll('[data-clone-reveal]');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) {
        e.classList.add('is-visible');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach(function (e) {
      io.observe(e);
    });
  }

  /* ---------- Tabs (generic) ---------- */
  function initTabs() {
    document.querySelectorAll('[data-clone-tabs]').forEach(function (root) {
      var tabs = root.querySelectorAll('[role="tab"]');
      var panels = root.querySelectorAll('[role="tabpanel"]');
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            t.setAttribute('aria-selected', 'false');
            t.classList.remove('is-active');
            t.classList.remove('tabs__label--active');
          });
          panels.forEach(function (p) {
            p.hidden = true;
            p.classList.remove('is-active');
          });
          tab.setAttribute('aria-selected', 'true');
          tab.classList.add('is-active');
          tab.classList.add('tabs__label--active');
          if (panels[i]) {
            panels[i].hidden = false;
            panels[i].classList.add('is-active');
          }
        });
      });
    });
  }

  /* ---------- Video dialogs ---------- */
  function initVideoDialogs() {
    document.querySelectorAll('[data-clone-video]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-clone-video');
        var dlg = document.getElementById(id) || document.querySelector('dialog.dialog');
        if (!dlg) return;
        var v = dlg.querySelector('video');
        if (v && btn.getAttribute('data-clone-src')) {
          v.src = btn.getAttribute('data-clone-src');
        }
        if (typeof dlg.showModal === 'function') dlg.showModal();
        else dlg.setAttribute('open', '');
        if (v) v.play().catch(function () {});
      });
    });

    function fullCandidate(teaser) {
      return teaser.replace(/-(tease|preview)\.webm$/i, '.webm');
    }

    /* Wire inline/cover previews (.video-dialog__button) to their dialog by document order */
    var inlinePreviews = document.querySelectorAll('.video-dialog .video-dialog__button');
    var dialogs = document.querySelectorAll('dialog.dialog');
    inlinePreviews.forEach(function (btn, i) {
      var dlg = dialogs[i] || dialogs[dialogs.length - 1] || null;
      if (!dlg) return;
      btn.addEventListener('click', function () {
        var scope = btn.closest('.video-dialog');
        var preview = scope ? scope.querySelector('video.video-dialog__preview') : null;
        var full = dlg.querySelector('video.video-dialog__full');
        if (full) {
          var teaser = '';
          if (preview) {
            teaser = preview.getAttribute('src') || '';
            if (!teaser) {
              var srcEl = preview.querySelector('source[src]');
              teaser = srcEl ? (srcEl.getAttribute('src') || '') : '';
            }
          }
          var derive = teaser;
          if (teaser) {
            var webmCandidate = teaser.replace(/-(tease|preview)\.(webm|mp4)$/i, '.webm');
            if (webmCandidate !== teaser) derive = webmCandidate;
          }
          if (derive && full.getAttribute('src') !== derive) {
            full.addEventListener('error', function onErr() {
              full.removeEventListener('error', onErr);
              if (teaser && full.getAttribute('src') !== teaser) full.src = teaser;
            });
            full.src = derive;
          }
        }
        if (typeof dlg.showModal === 'function') dlg.showModal();
        else dlg.setAttribute('open', '');
        if (full) full.play().catch(function () {});
      });
    });

    document.querySelectorAll('dialog.dialog').forEach(function (dlg) {
      dlg.querySelectorAll('.dialog__close-button, [data-clone-close]').forEach(function (c) {
        c.addEventListener('click', function () {
          var v = dlg.querySelector('video');
          if (v) v.pause();
          dlg.close ? dlg.close() : dlg.removeAttribute('open');
        });
      });
      dlg.addEventListener('click', function (e) {
        if (e.target === dlg) {
          var v = dlg.querySelector('video');
          if (v) v.pause();
          dlg.close ? dlg.close() : dlg.removeAttribute('open');
        }
      });
    });
  }

  /* ---------- Cookie consent ---------- */
  function initCookie() {
    var KEY = 'lava-clone-consent';
    var existing = null;
    try {
      existing = localStorage.getItem(KEY);
    } catch (e) {}
    if (existing) return;
    var el = document.createElement('div');
    el.className = 'lava-cc';
    var text =
      LANG === 'en'
        ? 'We use cookies to ensure the website works properly and to analyse traffic. Choose which cookies you allow.'
        : LANG === 'ru'
          ? 'ÐœÑ‹ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼ Ñ„Ð°Ð¹Ð»Ñ‹ cookie Ð´Ð»Ñ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½Ð¾Ð¹ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ ÑÐ°Ð¹Ñ‚Ð° Ð¸ Ð°Ð½Ð°Ð»Ð¸Ð·Ð° Ñ‚Ñ€Ð°Ñ„Ð¸ÐºÐ°. Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ, ÐºÐ°ÐºÐ¸Ðµ cookie Ñ€Ð°Ð·Ñ€ÐµÑˆÐ¸Ñ‚ÑŒ.'
          : 'We use cookies to ensure the website works properly and to improve your experience.';
    var accept = LANG === 'en' ? 'Accept all' : LANG === 'ru' ? 'ÐŸÑ€Ð¸Ð½ÑÑ‚ÑŒ Ð²ÑÐµ' : 'Accept All';
    var necessary = LANG === 'en' ? 'Necessary only' : LANG === 'ru' ? 'Ð¢Ð¾Ð»ÑŒÐºÐ¾ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ñ‹Ðµ' : 'Necessary Only';
    el.innerHTML =
      '<div class="lava-cc__inner"><p class="lava-cc__text">' +
      text +
      '</p><div class="lava-cc__actions"><button class="is-primary" data-c="all">' +
      accept +
      '</button><button data-c="necessary">' +
      necessary +
      '</button></div></div>';
    document.body.appendChild(el);
    el.classList.add('is-open');
    function save(v) {
      try {
        localStorage.setItem(KEY, v);
      } catch (e) {}
      el.classList.remove('is-open');
      setTimeout(function () {
        el.remove();
      }, 300);
    }
    el.querySelector('[data-c="all"]').addEventListener('click', function () {
      save('all');
    });
    el.querySelector('[data-c="necessary"]').addEventListener('click', function () {
      save('necessary');
    });
  }

  /* ---------- Vacancy form ---------- */
  function initVacancyForm() {
    document.querySelectorAll('[data-clone-vacancy-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll('[required]').forEach(function (input) {
          var err = input.parentElement.querySelector('.error');
          var ok = input.value && input.value.trim();
          if (input.type === 'email') ok = ok && /.+@.+\..+/.test(input.value);
          if (!ok) {
            valid = false;
            if (err) err.textContent = 'Required';
            input.setAttribute('aria-invalid', 'true');
          } else {
            if (err) err.textContent = '';
            input.removeAttribute('aria-invalid');
          }
        });
        if (valid) {
          form.innerHTML =
            '<p style="padding:12px 0">' +
            (LANG === 'en'
              ? 'Thank you! Your application has been received.'
              : LANG === 'ru'
                ? 'Ð¡Ð¿Ð°ÑÐ¸Ð±Ð¾! Ð’Ð°ÑˆÐ° Ð·Ð°ÑÐ²ÐºÐ° Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð°.'
                : 'Thank you! Your appointment request has been received.') +
            '</p>';
        }
      });
    });
  }

  function initSnapStuckGuard() {
    function sync() {
      setWheelSnapStuck(
        !!document.querySelector('dialog[open], .modal--stuck, .open-service-modal:not([hidden])'),
      );
    }
    if (!('MutationObserver' in window)) {
      sync();
      return;
    }
    var observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ['open', 'class', 'hidden'],
    });
    sync();
  }

  /* ---------- Wheel blocks (about-experience steps) ---------- */
  function initWheelBlocks() {
    document.querySelectorAll('.wheel-block').forEach(function (block) {
      var triggers = Array.prototype.slice.call(block.querySelectorAll('.wheel-block__trigger'));
      var items = Array.prototype.slice.call(block.querySelectorAll('.wheel-block-wheel__item'));
      var steps = Array.prototype.slice.call(block.querySelectorAll('.wheel-step'));
      if (!triggers.length || !items.length) return;
      var active = 0;
      var currentStop = -1;
      var targets = [];
      var snapTimer = null;
      var snapping = false;
      var svg = block.querySelector('.wheel-block-wheel__svg');
      if (svg) {
        svg.style.animationRange = 'cover contain';
        svg.style.setProperty('--wheel-rotation-degrees-start', 360 / items.length + 'deg');
      }
      function render() {
        items.forEach(function (it, i) {
          it.classList.toggle('wheel-block-wheel__item--active', active === i + 1);
        });
        steps.forEach(function (s, i) {
          s.classList.toggle('wheel-step--active', active === i + 1);
        });
      }
      function measure() {
        targets = triggers.map(function (trigger) {
          var rect = trigger.getBoundingClientRect();
          return Math.ceil(rect.top + window.scrollY + rect.height - window.innerHeight);
        });
      }
      function syncActive(scroll) {
        if (!targets.length) return;
        var threshold = window.innerHeight * 0.25;
        var index = -1;
        for (var i = 0; i < targets.length; i++) {
          if (scroll >= targets[i] - threshold) {
            index = i;
          } else {
            break;
          }
        }
        if (active !== index + 1) {
          active = index + 1;
          render();
        }
      }
      function syncStop(scroll) {
        if (!targets.length) return;
        for (var i = 0; i < targets.length; i++) {
          if (Math.abs(scroll - targets[i]) <= 2) {
            currentStop = i;
            return;
          }
        }
      }
      function step(delta) {
        if (wheelSnapStuck || snapping || !targets.length) return;
        measure();
        var threshold = window.innerHeight * 0.25;
        var scroll = lenis.scroll;
        if (scroll < targets[0] - window.innerHeight || scroll > targets[targets.length - 1] + window.innerHeight) return;
        var current;
        if (scroll < targets[0] - threshold || currentStop < 0) {
          current = -1;
        } else if (scroll > targets[targets.length - 1] + threshold) {
          current = targets.length;
        } else {
          current = currentStop;
        }
        var next = current + (delta > 0 ? 1 : -1);
        if (next < 0 || next >= targets.length) return;
        currentStop = next;
        if (Math.abs(scroll - targets[next]) <= 2) return;
        snapping = true;
        lenis.scrollTo(targets[next], {
          duration: 0.8,
          easing: function (t) {
            return 1 - Math.pow(1 - t, 3);
          },
          userData: { initiator: 'wheel-snap' },
          onComplete: function () {
            snapping = false;
            syncStop(lenis.scroll);
            syncActive(lenis.scroll);
          },
        });
      }
      measure();
      syncStop(lenis.scroll);
      render();
      requestAnimationFrame(measure);
      window.addEventListener('resize', measure);
      lenis.on('scroll', function (e) {
        var scroll = typeof e.scroll === 'number' ? e.scroll : lenis.scroll;
        syncActive(scroll);
        if (!snapping && !snapTimer) syncStop(scroll);
      });
      lenis.on('virtual-scroll', function (e) {
        if (e.event.type === 'touchmove') return;
        if (lenis.userData && lenis.userData.initiator === 'wheel-snap') return;
        snapping = false;
        var delta = e.deltaY || 0;
        if (!delta) return;
        clearTimeout(snapTimer);
        snapTimer = setTimeout(function () {
          snapTimer = null;
          step(delta);
        }, 220);
      });
    });
  }

  /* ---------- vci comparison sliders ---------- */
  function initCompareSliders() {
    var HANDLE_SIZE = 40;
    var LINE_WIDTH = 2;
    var LINE_COLOR = '#1A1A1A';

    document.querySelectorAll('.vci--container').forEach(function (root) {
      if (root.getAttribute('data-vci-ready') === '1') return;
      var left = root.querySelector('.vci--left-image');
      var right = root.querySelector('.vci--right-image');
      var slider = root.querySelector('.vci--slider');
      var lines = root.querySelectorAll('.vci--slider-line');
      var handle = root.querySelector('.vci--custom-handle');
      var handleSize = Math.max(HANDLE_SIZE, handle ? handle.getBoundingClientRect().width || HANDLE_SIZE : HANDLE_SIZE);
      if (!left || !right) return;
      root.setAttribute('data-vci-ready', '1');

      function width() {
        return root.getBoundingClientRect().width || 680;
      }

      function clampSeam(x, w) {
        var half = handleSize / 2;
        var min = Math.min(half, w / 2);
        var max = Math.max(min, w - half);
        return Math.max(min, Math.min(max, x));
      }

      var leftMatch = (left.style.clipPath || '').match(/inset\(\s*0px\s+([0-9.]+)px\s+0px\s+0px\s*\)/);
      var rightMatch = (right.style.clipPath || '').match(/inset\(\s*0px\s+0px\s+0px\s+([0-9.]+)px\s*\)/);
      var leftInset = leftMatch ? parseFloat(leftMatch[1]) : 0;
      var rightInset = rightMatch ? parseFloat(rightMatch[1]) : 0;
      var referenceWidth = leftInset + rightInset;
      var position = referenceWidth ? rightInset / referenceWidth : 0.5;
      position = Math.max(0, Math.min(1, position));

      function applyPosition() {
        var w = width();
        var seam = clampSeam(position * w, w);
        position = seam / w;
        left.style.clipPath = 'inset(0px ' + (w - seam) + 'px 0px 0px)';
        right.style.clipPath = 'inset(0px 0px 0px ' + seam + 'px)';
        if (slider) {
          slider.style.left = seam - HANDLE_SIZE / 2 + 'px';
          slider.style.top = '0px';
          slider.style.width = HANDLE_SIZE + 'px';
          slider.style.height = '100%';
          slider.style.flexDirection = 'column';
          slider.style.cursor = 'ew-resize';
          slider.style.marginLeft = '0px';
        }
        lines.forEach(function (line) {
          line.style.background = LINE_COLOR;
          line.style.width = LINE_WIDTH + 'px';
          line.style.height = 'calc(50% - 30px)';
        });
        root.setAttribute('aria-valuenow', String(Math.round(position * 100)));
      }

      function setFromPageX(e) {
        var rect = root.getBoundingClientRect();
        var w = rect.width || 680;
        var pageX = e.touches && e.touches.length ? e.touches[0].pageX : e.pageX;
        var x = pageX - window.pageXOffset - rect.left;
        position = clampSeam(x, w) / w;
        applyPosition();
      }

      var dragging = false;
      function moveDrag(e) {
        if (!dragging) return;
        setFromPageX(e);
      }
      function endDrag() {
        dragging = false;
        window.removeEventListener('mousemove', moveDrag);
        window.removeEventListener('touchmove', moveDrag);
        window.removeEventListener('mouseup', endDrag);
        window.removeEventListener('touchend', endDrag);
      }
      function startDrag(e) {
        dragging = true;
        if (e.cancelable && !('touches' in e)) e.preventDefault();
        setFromPageX(e);
        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('touchmove', moveDrag, { passive: false });
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
      }

      root.addEventListener('mousedown', startDrag);
      root.addEventListener('touchstart', startDrag, { passive: false });

      if (!root.getAttribute('tabindex')) {
        root.setAttribute('tabindex', '0');
      }
      root.setAttribute('role', 'slider');
      root.setAttribute('aria-label', 'Compare before and after');
      root.setAttribute('aria-valuemin', '0');
      root.setAttribute('aria-valuemax', '100');

      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          position = Math.max(0, position - 0.01);
          applyPosition();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          position = Math.min(1, position + 0.01);
          applyPosition();
          e.preventDefault();
        }
      });

      if ('ResizeObserver' in window) {
        new ResizeObserver(applyPosition).observe(root);
      } else {
        window.addEventListener('resize', applyPosition);
      }

      applyPosition();
    });
  }

  /* ---------- Service modal ---------- */
  function ensureServiceModal() {
    var existing = document.querySelector('.open-service-modal');
    if (existing) return existing;
    var overlay = document.createElement('div');
    overlay.className = 'open-service-modal';
    overlay.hidden = true;
    overlay.setAttribute('data-lenis-prevent', '');
    overlay.innerHTML =
      '<div class="open-service-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="open-service-modal-title">' +
        '<button class="open-service-modal__close" aria-label="Close" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none"><path stroke="currentColor" stroke-width="2" d="m30 46 2.104-2.103 2.977-2.978L46 30.001"></path><path stroke="currentColor" stroke-width="2" d="M46.004 46 43.9 43.898l-2.977-2.978L30.005 30"></path></svg></button>' +
        '<div class="open-service">' +
          '<div class="open-service__header"><h2 id="open-service-modal-title" class="open-service__title"></h2></div>' +
          '<div class="open-service__body u-wysiwyg"></div>' +
          '<div class="open-service__actions"></div>' +
          '<div class="open-service__media" hidden></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('.open-service-modal__close')) {
        closeServiceModal();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeServiceModal();
    });
    return overlay;
  }

  function closeServiceModal() {
    var overlay = document.querySelector('.open-service-modal');
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (serviceModalLenis) {
      serviceModalLenis.destroy();
      serviceModalLenis = null;
    }
    lenis.start();
    var trigger = document.querySelector('[data-active="1"][data-service-trigger]');
    if (trigger) {
      trigger.removeAttribute('data-active');
      trigger.focus();
    }
  }

  function renderServiceList() {
    var lang = 'en';
    var data = window.LAVA_SERVICES && window.LAVA_SERVICES.services && window.LAVA_SERVICES.services[lang];
    if (!data || !data.length) return;
    var cardGrid = document.querySelector('.services-card-grid');
    var cardTemplate = cardGrid && cardGrid.querySelector('.service-card');
    var listTemplate = document.querySelector('.service-list-item');
    if (!cardTemplate || !listTemplate) return;
    var cardParent = cardTemplate.parentNode;
    var listParent = listTemplate.parentNode;
    var cardImages = Array.prototype.slice
      .call(cardGrid.querySelectorAll('.service-card__image'))
      .map(function (image) {
        return image.getAttribute('src');
      });
    var listTitleSelectors = '.service-list-item__title, .service-list-item__name, h2, h3, h4';

    function replaceTwoDigitNumbers(root, number) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) {
        if (/^\d{2}$/.test(node.nodeValue.trim())) node.nodeValue = number;
      }
    }

    function replaceTitleText(root, newText) {
      var title = root.querySelector(listTitleSelectors);
      if (title) {
        title.textContent = newText;
        return;
      }
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      var node;
      var strongest = null;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim() && (!strongest || node.nodeValue.trim().length > strongest.nodeValue.trim().length)) {
          strongest = node;
        }
      }
      if (strongest) strongest.nodeValue = newText;
    }

    cardParent.textContent = '';
    listParent.textContent = '';

    data.forEach(function (entry, index) {
      var number = String(index + 1).padStart(2, '0');
      var trigger = (index < 5 ? cardTemplate : listTemplate).cloneNode(true);
      trigger.setAttribute('data-service-key', entry.key || '');
      replaceTwoDigitNumbers(trigger, number);
      if (index < 5) {
        var title = trigger.querySelector('.service-card__title');
        if (title) title.textContent = entry.title;
        var image = trigger.querySelector('.service-card__image');
        if (image && cardImages[index]) {
          image.setAttribute('src', cardImages[index]);
          image.setAttribute('alt', entry.title);
          image.removeAttribute('srcset');
        }
        trigger.style.setProperty('--delay', index * 0.1 + 's');
        cardParent.appendChild(trigger);
      } else {
        replaceTitleText(trigger, entry.title);
        listParent.appendChild(trigger);
      }
    });
  }

  function openServiceModal(trigger) {
    var lang = 'en';
    var data = window.LAVA_SERVICES && window.LAVA_SERVICES.services && window.LAVA_SERVICES.services[lang];
    if (!data) return;
    var entry = null;
    var serviceKey = trigger.getAttribute('data-service-key');
    if (serviceKey) {
      for (var i = 0; i < data.length; i += 1) {
        if (data[i].key === serviceKey) {
          entry = data[i];
          break;
        }
      }
    }
    if (!entry) {
      var items = Array.prototype.slice.call(
        document.querySelectorAll('.service-card, .service-list-item')
      );
      var index = items.indexOf(trigger);
      if (index >= 0) entry = data[index];
    }
    if (!entry) return;

    var overlay = ensureServiceModal();
    var title = overlay.querySelector('.open-service__title');
    title.textContent = (entry.title || '').trim();
    var body = overlay.querySelector('.open-service__body');
    body.innerHTML = entry.body || '';

    var media = overlay.querySelector('.open-service__media');
    var mediaHtml = '';
    var hasVideo = !!(entry.media && entry.media.video);
    if (hasVideo) {
      mediaHtml += '<video class="open-service__video" src="' + entry.media.video + '" autoplay muted loop playsinline controls preload="metadata"></video>';
    } else if (entry.media && Array.isArray(entry.media.vcis) && entry.media.vcis.length) {
      entry.media.vcis.forEach(function (pair) {
        var srcA = pair[0]; /* after (pec) */
        var srcB = pair[1]; /* before (pirms) */
        var alt = (entry.title || 'Treatment').trim();
        mediaHtml += '<div class="open-service__media-item">' +
          '<div class="vci--container" tabindex="0" role="slider" aria-label="Compare before and after">' +
            '<img class="vci--right-image" alt="' + alt + '" src="' + srcA + '" width="680" height="450" loading="lazy" style="clip-path:inset(0px 0px 0px 340px)">' +
            '<img class="vci--left-image" alt="' + alt + '" src="' + srcB + '" width="680" height="450" loading="lazy" style="clip-path:inset(0px 340px 0px 0px)">' +
            '<div class="vci--slider" style="left:340px">' +
              '<div class="vci--slider-line"></div>' +
              '<div class="vci--custom-handle"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="29.5" fill="currentColor" stroke="#DDEFDE" stroke-width="1"></circle><path fill="none" stroke="#DDEFDE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17 30.5h26m-26 0 4.645-4.5M17 30.5l4.645 4.5M43 30.5 38.355 26M43 30.5 38.355 35"></path></svg></div>' +
              '<div class="vci--slider-line"></div>' +
            '</div>' +
          '</div>' +
        '</div>';
      });
    }
    media.innerHTML = mediaHtml;
    media.hidden = !mediaHtml;

    var actions = overlay.querySelector('.open-service__actions');
    var actionHtml = '';
    actionHtml += '<a class="button button--type-secondary button--icon-end" href="' + entry.bookingUrl + '" target="_blank" rel="noopener"><div class="button__text u-text-body-button">' + entry.cta.apply + '</div></a>';
    if (entry.page) {
      var pagePath = '/' + entry.page;
      actionHtml += '<a class="button button--type-outline button--icon-end" href="' + pagePath + '"><div class="button__text u-text-body-button">' + entry.cta.learn + '</div></a>';
    }
    actions.innerHTML = actionHtml;

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    lenis.stop();
    if (serviceModalLenis) serviceModalLenis.destroy();
    serviceModalLenis = new Lenis({
      wrapper: overlay,
      content: overlay.querySelector('.open-service-modal__dialog'),
      lerp: 0.12,
      autoRaf: true,
    });
    overlay.scrollTop = 0;
    trigger.setAttribute('data-active', '1');
    overlay.querySelector('.open-service-modal__close').focus();

    initCompareSliders();
  }

  function initServiceModal() {
    var triggers = document.querySelectorAll('.service-card, .service-list-item');
    if (!triggers.length) return;
    triggers.forEach(function (el) {
      el.setAttribute('data-service-trigger', '');
      if (!el.getAttribute('tabindex')) el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.addEventListener('click', function () {
        openServiceModal(el);
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openServiceModal(el);
        }
      });
    });
  }

    /* ---------- Reveal gates (replace stripped Nuxt --visible toggles) ---------- */

  
  /* ---------- Lava Background Illustration (Marching Squares Iso-curves) ---------- */
  function initLavaBgIllustration() {
    var canvas = document.querySelector('.lava-bg-illustration');
    if (!canvas) return;

    var v = 1920, y = 1230, b = 200, x = 1.2;
    var n = Math.round((y / v) * b);
    var r = v / b;
    var a = y / n;
    var s = [-1.8, -0.9, 0, 0.9, 1.8];
    var u = [s[0], s[2]];
    var f = [s[1], s[3], s[4]];
    var p = [
      [], [0, 3], [0, 1], [1, 3], [1, 2], [0, 3, 1, 2], [0, 2], [3, 2],
      [3, 2], [0, 2], [0, 1, 3, 2], [1, 2], [1, 3], [0, 1], [0, 3], []
    ];
    var ctx = null;
    var animFrame = null;
    var S = 126;

    function C(minVal, maxVal) {
      var nVal = Math.sin(S++) * 43758.5453;
      return (nVal - Math.floor(nVal)) * (maxVal - minVal) + minVal;
    }

    var w = [];
    function T(e, t, nP, rP) {
      var i = C(e, t);
      var aP = C(nP, rP);
      w.push({
        x: i,
        y: aP,
        freqBase: C(55e-7, 75e-7),
        scaleX: C(0.55, 1.2),
        scaleY: C(0.65, 1.2),
        angle: C(-0.5, 0.5),
        speed: C(-0.2, 0.5),
        amp: C(0.55, 1.1)
      });
    }

    [
      [0.1, 0.25, 0.18, 0.38],
      [0.3, 0.45, 0.18, 0.38],
      [0.55, 0.7, 0.18, 0.38],
      [0.3, 0.45, 0.55, 0.75],
      [0.55, 0.7, 0.55, 0.75],
      [0.75, 0.9, 0.55, 0.75]
    ].forEach(function (e) {
      T(e[0], e[1], e[2], e[3]);
    });

    var E = [];
    var D = new Float64Array(25929);
    var O = new Float64Array(201);

    function k() {
      E = w.map(function (e) {
        var t = Math.cos(e.angle);
        var rVal = Math.sin(e.angle);
        var i = new Float64Array(D.length);
        var aArr = new Float64Array(D.length);
        for (var o = 0; o <= n; o++) {
          var sVal = (o / n) * y - e.y * y;
          for (var nIdx = 0; nIdx <= b; nIdx++) {
            var cVal = (nIdx / b) * v - e.x * v;
            var l = (t * cVal - rVal * sVal) / e.scaleX;
            var uVal = (rVal * cVal + t * sVal) / e.scaleY;
            var d = (l * l + uVal * uVal) * e.freqBase * x;
            i[o * 201 + nIdx] = e.amp * Math.sin(d);
            aArr[o * 201 + nIdx] = e.amp * Math.cos(d);
          }
        }
        return { sin: i, cos: aArr, speed: e.speed };
      });
    }

    function A(timeSec) {
      for (var t = 0; t <= b; t++) {
        O[t] = Math.sin((t / b) * v * 5e-4 + timeSec * 0.04);
      }
      for (var t2 = 0; t2 <= n; t2++) {
        var rVal = 0.15 * Math.cos((t2 / n) * y * 5e-4 - timeSec * 0.03);
        for (var e = 0; e <= b; e++) {
          D[t2 * 201 + e] = O[e] * rVal;
        }
      }
      for (var idx = 0; idx < E.length; idx++) {
        var item = E[idx];
        var i = Math.cos(timeSec * item.speed);
        var aVal = Math.sin(timeSec * item.speed);
        for (var eIdx = 0; eIdx < D.length; eIdx++) {
          D[eIdx] += item.sin[eIdx] * i + item.cos[eIdx] * aVal;
        }
      }
    }

    function j(ctxRef, isoval) {
      var i = 0, o = 0, sVal = 0, cVal = 0, l = 0, uVal = 0;
      function d(edgeIdx, moveTo) {
        var f = i, pt = o;
        switch (edgeIdx) {
          case 0:
            f += (r * (isoval - sVal)) / (cVal - sVal);
            break;
          case 1:
            f += r;
            pt += (a * (isoval - cVal)) / (l - cVal);
            break;
          case 2:
            f += r - (r * (isoval - l)) / (uVal - l);
            pt += a;
            break;
          default:
            pt += (a * (isoval - sVal)) / (uVal - sVal);
        }
        moveTo ? ctxRef.moveTo(f, pt) : ctxRef.lineTo(f, pt);
      }

      for (var row = 0; row < n; row++) {
        for (var col = 0; col < b; col++) {
          var fIdx = row * 201 + col;
          sVal = D[fIdx];
          cVal = D[fIdx + 1];
          l = D[fIdx + 201 + 1];
          uVal = D[fIdx + 201];
          var m = 0;
          sVal >= isoval && (m |= 1);
          cVal >= isoval && (m |= 2);
          l >= isoval && (m |= 4);
          uVal >= isoval && (m |= 8);
          var h = p[m];
          if (h.length) {
            i = col * r;
            o = row * a;
            for (var kIdx = 0; kIdx < h.length; kIdx += 2) {
              d(h[kIdx], true);
              d(h[kIdx + 1], false);
            }
          }
        }
      }
    }

    function M(ctxRef, thresholds, strokeW) {
      ctxRef.beginPath();
      for (var idx = 0; idx < thresholds.length; idx++) {
        j(ctxRef, thresholds[idx]);
      }
      ctxRef.lineWidth = strokeW;
      ctxRef.stroke();
    }

    ctx = canvas.getContext('2d');
    if (!ctx) return;
    k();

    function renderLoop() {
      A(performance.now() * 0.001);
      ctx.clearRect(0, 0, v, y);
      ctx.strokeStyle = '#2b4642';
      M(ctx, u, 4);
      M(ctx, f, 2);
      animFrame = requestAnimationFrame(renderLoop);
    }

    function start() {
      if (!animFrame) {
        renderLoop();
      }
    }

    function stop() {
      if (animFrame) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    }

    if ('IntersectionObserver' in window) {
      var canvasIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
          }
        });
      }, { threshold: 0 });
      canvasIO.observe(canvas);
    } else {
      start();
    }
  }


  function initCloneGates() {
    var pairs = [
      ['.services-card-grid', 'services-card-grid--visible'],
      ['.services-list-item-grid', 'services-list-item-grid--visible'],
      ['.faq-categories', 'faq-categories--visible'],
      ['.image-info-box__image', 'image-info-box__image--visible'],
      ['.reveal-block__header', 'reveal-block__header--visible'],
      // ['.reveal-block__body', 'reveal-block__body--visible'],
      ['.about-process__header', 'about-process__header--visible'],
    ];
    var targets = [];
    pairs.forEach(function (p) {
      document.querySelectorAll(p[0]).forEach(function (el) {
        targets.push({ el: el, cls: p[1] });
      });
    });
    /* Images captured before they loaded carry no image--loaded; reveal all on ready */
    document.querySelectorAll('.image:not(.image--loaded)').forEach(function (img) {
      img.classList.add('image--loaded');
    });
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) {
        t.el.classList.add(t.cls);
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add(en.target.getAttribute('data-clone-gate'));
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(function (t) {
      t.el.setAttribute('data-clone-gate', t.cls);
      io.observe(t.el);
    });

        /* Reveal-block observers matching original Nuxt implementation:
       revealBlockHeader: { threshold: 0, rootMargin: '0px 0px 25% 0px' }
       revealBlockBody:   { threshold: 0, rootMargin: '0px 0px -75% 0px' }
    */
    (function () {
      var revealHeader = document.querySelector('.reveal-block__header');
      var revealBody = document.querySelector('.reveal-block__body');
      
      if (revealHeader && 'IntersectionObserver' in window) {
        var headerIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('reveal-block__header--visible');
            } else {
              en.target.classList.remove('reveal-block__header--visible');
            }
          });
        }, { threshold: 0, rootMargin: '0px 0px 25% 0px' });
        headerIO.observe(revealHeader);
      }

      if (revealBody && 'IntersectionObserver' in window) {
        var bodyIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('reveal-block__body--visible');
            } else {
              en.target.classList.remove('reveal-block__body--visible');
            }
          });
        }, { threshold: 0, rootMargin: '0px 0px -75% 0px' });
        bodyIO.observe(revealBody);
      } else if (revealBody) {
        revealBody.classList.add('reveal-block__body--visible');
      }
    }());
  }

  /* ---------- Image carousels (autoplay + progress + swipe) ---------- */
  function initImageCarousels() {
    var PLAY_ICON =
      '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="currentColor" d="M16 14.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 16 25.259z"></path></g></svg>';
    var PAUSE_ICON =
      '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="currentColor" d="M16 14h3v12h-3zM23 14h3v12h-3z"></path></g></svg>';
    var reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.image-carousel').forEach(function (root) {
      var track = root.querySelector('.image-carousel__container');
      if (!track) return;
      var items = Array.prototype.slice.call(
        track.querySelectorAll('.image-carousel__image'),
      );
      if (items.length < 2) return;
      var controls = root.querySelector('.carousel-autoplay');
      var btn = controls ? controls.querySelector('.carousel-autoplay__button') : null;
      var dots = controls
        ? Array.prototype.slice.call(controls.querySelectorAll('.carousel-autoplay__dot'))
        : [];
      var duration = 5000;
      if (controls) {
        var raw = getComputedStyle(controls).getPropertyValue('--autoplay-item-duration');
        var parsed = parseFloat(raw);
        if (!isNaN(parsed) && parsed > 0) duration = parsed;
      }
      var index = 0;
      var timer = null;

      function render() {
        items.forEach(function (img, i) {
          img.style.display = i === index ? '' : 'none';
        });
        dots.forEach(function (d, i) {
          d.classList.toggle('carousel-autoplay__dot--active', i === index);
        });
      }

      function schedule() {
        clearTimeout(timer);
        timer = setTimeout(function () {
          index = (index + 1) % items.length;
          render();
          schedule();
        }, duration);
      }

      function play() {
        if (controls) controls.classList.remove('carousel-autoplay--paused');
        if (btn) {
          btn.setAttribute('aria-label', 'Pause carousel');
          btn.innerHTML = PAUSE_ICON;
        }
        schedule();
      }

      function pause() {
        if (controls) controls.classList.add('carousel-autoplay--paused');
        if (btn) {
          btn.setAttribute('aria-label', 'Play carousel');
          btn.innerHTML = PLAY_ICON;
        }
        clearTimeout(timer);
      }

      if (btn) {
        btn.addEventListener('click', function () {
          if (controls && controls.classList.contains('carousel-autoplay--paused')) play();
          else pause();
        });
      }
      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
          index = i;
          render();
          if (controls && !controls.classList.contains('carousel-autoplay--paused')) {
            schedule();
          }
        });
      });

      var startX = 0;
      var startY = 0;
      var dragging = false;
      track.style.touchAction = 'pan-y';
      track.addEventListener('pointerdown', function (e) {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
      });
      track.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging = false;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          index =
            dx < 0
              ? (index + 1) % items.length
              : (index - 1 + items.length) % items.length;
          render();
          if (controls && !controls.classList.contains('carousel-autoplay--paused')) {
            schedule();
          }
        }
      });
      track.addEventListener('pointercancel', function () {
        dragging = false;
      });
      track.addEventListener('pointerleave', function () {
        dragging = false;
      });

      render();
      if (reduceMotion) {
        pause();
      } else if (controls) {
        if ('IntersectionObserver' in window) {
          var io = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (en) {
                if (en.isIntersecting) {
                  controls.classList.add('carousel-autoplay--visible');
                  io.unobserve(root);
                  play();
                }
              });
            },
            { threshold: 0.3 },
          );
          io.observe(root);
        } else {
          controls.classList.add('carousel-autoplay--visible');
          play();
        }
      }
    });
  }

  function init() {
    initMobileMenu();
    initLavaBgIllustration();
    initCloneGates();
    initImageCarousels();
    initCompareSliders();
    renderServiceList();
    initServiceModal();
    initWheelBlocks();
    initSnapStuckGuard();
    initHeader();
    initNavProgress();
    initReveals();
    initTabs();
    initVideoDialogs();
    initCookie();
    initVacancyForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ---------- Footer Logo Visibility & Scroll Guard ---------- */
(function() {
  function initFooterLogo() {
    var footer = document.querySelector('.footer');
    var logo = document.querySelector('.footer__logo');
    if (!footer || !logo) return;

    function checkFooterVisibility() {
      var rect = footer.getBoundingClientRect();
      var vh = window.innerHeight;
      
      // If the top of the footer has not entered the viewport, logo MUST be hidden
      // so it never renders over the location image above
      if (rect.top >= vh) {
        logo.style.opacity = '0';
        logo.style.visibility = 'hidden';
      } else {
        logo.style.opacity = '1';
        logo.style.visibility = 'visible';
      }

      // Fallback transform calculation for browsers without CSS scroll-timeline
      if (!(CSS.supports && CSS.supports('animation-timeline', 'scroll()'))) {
        if (rect.top < vh) {
          var total = footer.offsetHeight;
          var progress = Math.max(0, Math.min(1, (vh - rect.top) / (total * 0.5)));
          var scale = 1.75 - 0.75 * progress;
          var translateY = -50 * (1 - progress);
          logo.style.transform = 'translate3d(0,' + translateY + 'px,0) scale(' + scale + ')';
          logo.style.transformOrigin = '0 0';
        }
      }
    }

    window.addEventListener('scroll', checkFooterVisibility, { passive: true });
    window.addEventListener('resize', checkFooterVisibility, { passive: true });
    checkFooterVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterLogo);
  } else {
    initFooterLogo();
  }
})();
