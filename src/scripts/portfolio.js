/* jack.mcpickle/dev — vanilla behaviors: boot screen, clock, window-open anim */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Boot screen (once per session, skippable) ---------- */
  var boot = document.getElementById('boot');
  function dismissBoot() {
    if (boot) boot.classList.add('off');
  }
  try {
    var seen = sessionStorage.getItem('jm_boot_seen');
    if (seen || reducedMotion) {
      dismissBoot();
    } else {
      sessionStorage.setItem('jm_boot_seen', '1');
      setTimeout(function () {
        // Tweaks may have disabled it already
        if (window.__bootEnabled === false) return;
        dismissBoot();
      }, 1600);
    }
  } catch (e) {
    dismissBoot();
  }
  if (boot) boot.addEventListener('click', dismissBoot);

  /* ---------- Menu bar clock ---------- */
  var clock = document.getElementById('menuclock');
  function tick() {
    if (!clock) return;
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    clock.textContent = h + ':' + (m < 10 ? '0' + m : m) + ' ' + ap;
  }
  tick();
  setInterval(tick, 15000);

  /* ---------- Window zoom-open on scroll ---------- */
  var windows = Array.prototype.slice.call(document.querySelectorAll('.window.zoomable'));
  function openAll() {
    windows.forEach(function (w) { w.classList.add('open'); });
  }
  if (reducedMotion || !('IntersectionObserver' in window)) {
    openAll();
  } else {
    // Immediately open anything already in (or near) the viewport, with a
    // slight stagger for the boot-up feel; IO only handles later scroll-ins.
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var delay = 0;
    windows.forEach(function (w) {
      var r = w.getBoundingClientRect();
      if (r.top < vh + 100) {
        setTimeout(function () { w.classList.add('open'); }, delay);
        delay += 120;
      }
    });
    var ioFired = false;
    var io = new IntersectionObserver(function (entries) {
      ioFired = true;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('open');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    windows.forEach(function (w) { io.observe(w); });
    // Safety net: if IO never fires (some embedded contexts), open everything.
    setTimeout(function () {
      if (!ioFired) openAll();
    }, 800);
  }
  /* ---------- WindowShade: click titlebar to collapse ---------- */
  document.querySelectorAll('.window').forEach(function (win) {
    var bar = win.querySelector('.titlebar');
    var body = win.querySelector('.window-body');
    if (!bar || !body) return;
    bar.setAttribute('role', 'button');
    bar.setAttribute('tabindex', '0');
    bar.setAttribute('aria-expanded', 'true');
    bar.title = 'Collapse window';

    function toggle() {
      var collapsing = !win.classList.contains('collapsed');
      if (collapsing) {
        // fix current height so the transition has a start value
        body.style.height = body.scrollHeight + 'px';
        // force reflow, then collapse
        void body.offsetHeight;
        win.classList.add('collapsed');
      } else {
        win.classList.remove('collapsed');
        body.style.height = body.scrollHeight + 'px';
        var clear = function () {
          body.style.height = '';
          body.removeEventListener('transitionend', clear);
        };
        body.addEventListener('transitionend', clear);
        // fallback if transitions are off (reduced motion)
        setTimeout(clear, 320);
      }
      bar.setAttribute('aria-expanded', collapsing ? 'false' : 'true');
      bar.title = collapsing ? 'Expand window' : 'Collapse window';
    }

    bar.addEventListener('click', toggle);
    bar.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- Easter egg: About This Macintosh ---------- */
  var appleBtn = document.getElementById('applebtn');
  var aboutDialog = document.getElementById('aboutdialog');
  var aboutOk = document.getElementById('aboutok');
  function openAbout() {
    if (!aboutDialog) return;
    aboutDialog.hidden = false;
    if (aboutOk) aboutOk.focus();
  }
  function closeAbout() {
    if (!aboutDialog) return;
    aboutDialog.hidden = true;
    if (appleBtn) appleBtn.focus();
  }
  if (appleBtn) appleBtn.addEventListener('click', openAbout);
  if (aboutOk) aboutOk.addEventListener('click', closeAbout);
  if (aboutDialog) {
    aboutDialog.addEventListener('click', function (e) {
      if (e.target === aboutDialog) closeAbout();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && aboutDialog && !aboutDialog.hidden) closeAbout();
  });

  /* ---------- Power: shut down + power button ---------- */
  var mac = document.querySelector('.mac');
  var crtContent = document.querySelector('.crt-content');
  var powerBtn = document.getElementById('powerbtn');
  var shutdownBtn = document.getElementById('shutdownbtn');

  function isOff() { return mac && mac.classList.contains('off'); }

  function setPressed() {
    if (powerBtn) powerBtn.setAttribute('aria-pressed', isOff() ? 'false' : 'true');
  }

  function shutDown() {
    if (!mac || isOff()) return;
    closeAbout();
    if (reducedMotion || !crtContent) {
      mac.classList.add('off');
      setPressed();
      return;
    }
    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      crtContent.removeEventListener('animationend', finish);
      crtContent.classList.remove('shutting');
      mac.classList.add('off');
      setPressed();
    };
    crtContent.addEventListener('animationend', finish);
    crtContent.classList.add('shutting');
    setTimeout(finish, 700); // safety net
  }

  function powerOn() {
    if (!mac || !isOff()) return;
    mac.classList.remove('off');
    setPressed();
    if (!reducedMotion && crtContent) {
      var cleaned = false;
      var clean = function () {
        if (cleaned) return;
        cleaned = true;
        crtContent.removeEventListener('animationend', clean);
        crtContent.classList.remove('powering');
      };
      crtContent.addEventListener('animationend', clean);
      crtContent.classList.add('powering');
      setTimeout(clean, 800); // safety net
    }
    // fresh boot screen on power-on (unless disabled via Tweaks)
    if (boot && window.__bootEnabled !== false) {
      boot.classList.remove('off');
      setTimeout(dismissBoot, 1600);
    }
  }

  if (powerBtn) {
    powerBtn.addEventListener('click', function () {
      if (isOff()) powerOn(); else shutDown();
    });
  }
  if (shutdownBtn) shutdownBtn.addEventListener('click', shutDown);
})();
