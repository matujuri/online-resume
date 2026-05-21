// 縦フローティング section index: 現在地ハイライト

(function () {
  const sectionIds = ['introduction', 'showcase', 'about', 'contact'];
  const sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  const links = document.querySelectorAll('.section-index-link[data-section]');
  const nav = document.querySelector('.section-index');
  const header = document.getElementById('header');
  const orangeSections = ['showcase', 'contact'];
  var headerVisibleRatio = 1;

  if (!sections.length || !links.length || !nav) {
    return;
  }

  function setNavVisible(visible) {
    nav.classList.toggle('section-index--hidden', !visible);
    nav.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  function updateNavVisibility() {
    var headerInView = headerVisibleRatio >= 0.35;
    document.body.classList.toggle('header-in-view', headerInView);
    setNavVisible(!headerInView);
  }

  function setActiveSection(sectionId) {
    links.forEach(function (link) {
      var match = link.getAttribute('data-section') === sectionId;
      if (match) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });

    nav.classList.toggle(
      'section-index--on-orange',
      orangeSections.indexOf(sectionId) !== -1
    );
  }

  var visibleRatios = new Map();

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        visibleRatios.set(entry.target.id, entry.intersectionRatio);
      });

      var bestId = null;
      var bestRatio = 0;
      visibleRatios.forEach(function (ratio, id) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId && bestRatio > 0) {
        setActiveSection(bestId);
      }
    },
    {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  if (header) {
    var headerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.target.id === 'header') {
            headerVisibleRatio = entry.intersectionRatio;
          }
        });
        updateNavVisibility();
      },
      {
        root: null,
        threshold: [0, 0.1, 0.25, 0.35, 0.5, 0.75, 1],
      }
    );
    headerObserver.observe(header);
  } else {
    headerVisibleRatio = 0;
    updateNavVisibility();
  }

  function init() {
    sections.forEach(function (section) {
      observer.observe(section);
    });

    if (window.location.hash) {
      var hashId = window.location.hash.replace('#', '');
      if (sectionIds.indexOf(hashId) !== -1) {
        setActiveSection(hashId);
        setNavVisible(true);
      }
    } else {
      setActiveSection(sectionIds[0]);
    }
    updateNavVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
