(function() {
  const html = document.documentElement;

  // Theme toggle. The initial theme is applied by the inline script in <head>
  // to avoid a flash; here we just sync the switch and persist user choices.
  const input = document.getElementById('switch');
  if (input) {
    input.checked = html.classList.contains('night');
    input.addEventListener('change', function() {
      const night = input.checked;
      html.classList.toggle('night', night);
      try {
        localStorage.setItem('theme', night ? 'night' : 'day');
      } catch (e) {
        // localStorage may be unavailable (private mode); ignore.
      }
    });
  }

  // Back-to-top button: show past the hero, smooth-scroll to top on click.
  const intro = document.querySelector('.intro');
  const topButton = document.getElementById('top-button');
  if (intro && topButton) {
    const introHeight = intro.offsetHeight;
    window.addEventListener(
      'scroll',
      function() {
        topButton.classList.toggle('visible', window.scrollY > introHeight);
      },
      { passive: true }
    );
    topButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Waving hand: once on load, and on hover.
  const hand = document.querySelector('.emoji.wave-hand');
  if (hand) {
    const startWave = function() {
      hand.classList.add('wave');
    };
    const stopWave = function() {
      hand.classList.remove('wave');
    };
    setTimeout(function() {
      startWave();
      setTimeout(stopWave, 2000);
    }, 1000);
    hand.addEventListener('mouseover', startWave);
    hand.addEventListener('mouseout', stopWave);
  }

  // Reveal sections on scroll (progressive enhancement: without JS or
  // IntersectionObserver support, sections simply render visible).
  const revealEls = document.querySelectorAll(
    '.background, .focus_areas, .research-interests, .skills, .experience, .other-projects'
  );
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(function(el) {
      el.classList.add('waypoint');
    });
    const observer = new IntersectionObserver(
      function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 }
    );
    revealEls.forEach(function(el) {
      observer.observe(el);
    });
  }

  // Sidebar nav: highlight the section currently in view.
  const navLinks = document.querySelectorAll('.sidebar__nav a');
  if ('IntersectionObserver' in window && navLinks.length) {
    const linkFor = {};
    navLinks.forEach(function(link) {
      linkFor[link.getAttribute('href')] = link;
    });
    const spy = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          const link = linkFor['#' + entry.target.id];
          if (link && entry.isIntersecting) {
            navLinks.forEach(function(l) {
              l.classList.remove('active');
            });
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    Object.keys(linkFor).forEach(function(hash) {
      const section = document.querySelector(hash);
      if (section) {
        spy.observe(section);
      }
    });
  }
})();
