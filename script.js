let menuOpened = false;
let menuItems = document.querySelector('.menu-items');

document.getElementById('menuButton').addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent the click from closing the menu immediately

  if (!menuOpened) {
    // Adjust the menu position before showing it
    calculateMenuPosition();

    menuItems.style.display = 'block'; // Ensure display is set immediately for transition

    setTimeout(() => {
      menuItems.classList.add('show'); // Add the 'show' class for the animation
      menuItems.style.opacity = 1; // Ensure immediate opacity change for transition when showing
    }, 10); // Adjust the delay to ensure display change occurs before the transition

    menuOpened = true;
  } else {
    menuItems.classList.remove('show'); // Remove the 'show' class to hide the menu smoothly
    menuItems.style.opacity = 0; // Ensure immediate opacity change for transition when hiding

    // Hide the menu after the transition
    setTimeout(() => {
      menuItems.style.display = 'none';
    }, 300); // Adjust the timeout to match the transition duration
    menuOpened = false;
  }
});

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
  var menuButton = document.getElementById('menuButton');

  if (event.target !== menuItems && event.target !== menuButton) {
    menuItems.classList.remove('show'); // Remove the 'show' class to hide the menu smoothly
    menuItems.style.opacity = 0; // Ensure immediate opacity change for transition when hiding

    // Hide the menu after the transition
    setTimeout(() => {
      menuItems.style.display = 'none';
    }, 300); // Adjust the timeout to match the transition duration
    menuOpened = false;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const workButton = document.querySelector('.work');
  const workSection = document.querySelector('#workSection');

  workButton.addEventListener('click', function(event) {
    event.preventDefault();
    workSection.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const aboutButton = document.querySelector('.about-me');
  const aboutSection = document.querySelector('#aboutSection');

  aboutButton.addEventListener('click', function(event) {
    event.preventDefault();
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const aboutButton = document.querySelector('.about-me-menu');
  const aboutSection = document.querySelector('#aboutSection');

  aboutButton.addEventListener('click', function(event) {
    event.preventDefault();
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
});