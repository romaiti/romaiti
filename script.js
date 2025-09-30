document.addEventListener("DOMContentLoaded", function() {
  // --- menu variables ---
  let menuOpened = false;
  let menuItems = document.querySelector('.menu-items');

  // Safety: ensure menuItems exists
  if (!menuItems) {
    // create a fallback empty container to avoid further errors
    menuItems = document.createElement('div');
    menuItems.className = 'menu-items';
    document.body.appendChild(menuItems);
  }

  const menuButton = document.getElementById('menuButton');
  if (menuButton) {
    menuButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click from closing the menu immediately

      if (!menuOpened) {
        // Adjust the menu position before showing it
        calculateMenuPosition();

        menuItems.style.display = 'block'; // Ensure display is set immediately for transition

        setTimeout(() => {
          menuItems.classList.add('show'); // Add the 'show' class for the animation
          menuItems.style.opacity = 1; // Ensure immediate opacity change for transition when showing
          menuItems.setAttribute('aria-hidden', 'false');
        }, 10); // Adjust the delay to ensure display change occurs before the transition

        menuOpened = true;
      } else {
        menuItems.classList.remove('show'); // Remove the 'show' class to hide the menu smoothly
        menuItems.style.opacity = 0; // Ensure immediate opacity change for transition when hiding
        menuItems.setAttribute('aria-hidden', 'true');

        // Hide the menu after the transition
        setTimeout(() => {
          menuItems.style.display = 'none';
        }, 300); // Adjust the timeout to match the transition duration
        menuOpened = false;
      }
    });
  }

  // Function to calculate and adjust the menu position
  function calculateMenuPosition() {
    var menuRect = menuItems.getBoundingClientRect();
    var menuLeft = menuRect.left;

    if (menuLeft < 10) { // Set a minimum distance from the left side
      menuItems.style.left = '-70px';
    } else {
      menuItems.style.left = '';
    }
  }

  // Close the menu when clicking outside of it
  document.body.addEventListener('click', function(event) {
    if (!menuItems || !menuButton) return;
    if (event.target !== menuItems && event.target !== menuButton && !menuItems.contains(event.target) && !menuButton.contains(event.target)) {
      menuItems.classList.remove('show'); // Remove the 'show' class to hide the menu smoothly
      menuItems.style.opacity = 0; // Ensure immediate opacity change for transition when hiding
      menuItems.setAttribute('aria-hidden', 'true');

      // Hide the menu after the transition
      setTimeout(() => {
        menuItems.style.display = 'none';
      }, 300); // Adjust the timeout to match the transition duration
      menuOpened = false;
    }
  });

  // --- scroll buttons ---
  const workButton = document.querySelector('.work');
  const workSection = document.querySelector('#workSection');

  if (workButton && workSection) {
    workButton.addEventListener('click', function(event) {
      event.preventDefault();
      workSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const aboutButton = document.querySelector('.about-me');
  const aboutSection = document.querySelector('#aboutSection');

  if (aboutButton && aboutSection) {
    aboutButton.addEventListener('click', function(event) {
      event.preventDefault();
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const aboutMenuButton = document.querySelector('.about-me-menu');
  if (aboutMenuButton && aboutSection) {
    aboutMenuButton.addEventListener('click', function(event) {
      event.preventDefault();
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Intro GIF handling ---------- */
  const introGif = document.getElementById('introGif');
  const mainGif = document.getElementById('mainGif');

  // safety: if elements missing, do nothing
  if (!introGif || !mainGif) {
    return;
  }

  // helper to show main gif and permanently hide intro on this session
  function showMainGif() {
    try {
      // Ensure no CSS transition interferes (extra safety)
      mainGif.style.transition = 'none';
      introGif.style.transition = 'none';

      // hide intro gif immediately (remove from flow)
      introGif.classList.add('hidden');
      introGif.style.display = 'none';

      // show main gif immediately (no fade)
      mainGif.style.visibility = 'visible';
      mainGif.style.opacity = '1';

      // Mark as played for session
      sessionStorage.setItem('introPlayed', 'true');
    } catch (e) {
      // Fallback: set plainly
      introGif.style.display = 'none';
      mainGif.style.visibility = 'visible';
      mainGif.style.opacity = '1';
      sessionStorage.setItem('introPlayed', 'true');
    }
  }

  // If user set an explicit duration in ms on the element, respect it
  const explicitDuration = parseInt(introGif.dataset.durationMs || introGif.dataset.durationMs || introGif.getAttribute('data-duration-ms') || 0, 10);

  if (sessionStorage.getItem('introPlayed') === 'true') {
    // If we've already shown the intro in this session, show the main gif immediately
    showMainGif();
    return;
  }

  // compute estimated duration using frames/fps if explicit wasn't provided
  let estimatedMs = 0;
  if (explicitDuration && explicitDuration > 100) {
    estimatedMs = explicitDuration;
  } else {
    const frames = parseInt(introGif.dataset.frames || 0, 10) || 87; // default to 87 per your note
    const fps = parseFloat(introGif.dataset.fps || 24) || 24; // default 24 fps
    estimatedMs = Math.round((frames / fps) * 1000);
    // add a small buffer to ensure the gif finishes before switching
    estimatedMs += 400;
  }

  // If intro gif fails to load or is already complete, we still wait the estimated time then switch
  if (introGif.complete) {
    setTimeout(showMainGif, estimatedMs);
  } else {
    // Wait for it to load, then start the timer
    let started = false;

    function startTimerOnce() {
      if (started) return;
      started = true;
      setTimeout(showMainGif, estimatedMs);
    }

    introGif.addEventListener('load', startTimerOnce);
    introGif.addEventListener('error', function() {
      // If it errors, immediately show main gif
      showMainGif();
    });

    // Safety timeout: if load event never fires for some reason, fallback after 5s
    setTimeout(function() {
      if (!started) {
        showMainGif();
      }
    }, 5000);
  }
});
