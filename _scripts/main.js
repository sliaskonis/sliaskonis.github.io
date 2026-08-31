(function() {
  const html = document.documentElement;
  // Readers who ask for less motion get no reveals, no waving and no smooth
  // scrolling; the stylesheet checks the same query.
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

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

  // Back-to-top button: show once the page has scrolled past the first
  // screenful, smooth-scroll to top on click.
  const topButton = document.getElementById('top-button');
  if (topButton) {
    window.addEventListener(
      'scroll',
      function() {
        const scrolled = window.scrollY > window.innerHeight * 0.6;
        topButton.classList.toggle('visible', scrolled);
      },
      { passive: true }
    );
    topButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: calm.matches ? 'auto' : 'smooth' });
    });
  }

  // Waving hand: once on load, and on hover.
  const hand = document.querySelector('.emoji.wave-hand');
  if (hand && !calm.matches) {
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
  if ('IntersectionObserver' in window && revealEls.length && !calm.matches) {
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

  // Sidebar nav: highlight the section currently in view. A section becomes
  // current once its top edge passes a line near the top of the viewport;
  // keeping that line high (rather than watching a band across the middle) is
  // what lets the first section be current while the page sits at the top.
  const spied = [];
  // The section a nav link was clicked for, while the page still owes it a
  // scroll. Near the end of the page there may not be enough scroll left to
  // bring a short section up to the line, and then only the click says which
  // one the reader asked for.
  let pending = null;

  document.querySelectorAll('.sidebar__nav a').forEach(function(link) {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) {
      spied.push({ link: link, section: section });
    }
  });

  if (spied.length) {
    let activeLink = null;
    const activate = function(link) {
      if (link === activeLink) {
        return;
      }
      if (activeLink) {
        activeLink.classList.remove('active');
      }
      link.classList.add('active');
      activeLink = link;
    };

    const update = function() {
      const line = Math.min(window.innerHeight * 0.25, 160);
      const atEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      if (pending) {
        if (pending.section.getBoundingClientRect().top <= line) {
          pending = null; // The page got there; the scroll position rules again.
        } else if (atEnd) {
          activate(pending.link); // It ran out of scroll trying.
          return;
        }
      }

      let current = spied[0];
      if (atEnd) {
        current = spied[spied.length - 1];
      } else {
        let closest = -Infinity;
        spied.forEach(function(entry) {
          const top = entry.section.getBoundingClientRect().top;
          if (top <= line && top > closest) {
            closest = top;
            current = entry;
          }
        });
      }
      activate(current.link);
    };

    let ticking = false;
    const onScroll = function() {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function() {
        ticking = false;
        update();
      });
    };

    spied.forEach(function(entry) {
      entry.link.addEventListener('click', function() {
        pending = entry;
        onScroll();
      });
    });
    // Scrolling by hand overrides a click that could not be honoured.
    ['wheel', 'touchmove', 'keydown'].forEach(function(type) {
      window.addEventListener(
        type,
        function() {
          pending = null;
        },
        { passive: true }
      );
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }
})();
