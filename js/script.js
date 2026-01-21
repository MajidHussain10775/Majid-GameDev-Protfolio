// Small glowing effect on cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  const originalBackground = card.style.background; // store original

  card.addEventListener("mousemove", e => {
    let x = e.offsetX;
    let y = e.offsetY;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, #222, #1a1a2e)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = originalBackground || "#1a1a2e";
  });
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll(".progress-bar");

function animateBars() {
  progressBars.forEach(bar => {
    const finalWidth = bar.getAttribute("data-width"); // store width in HTML
    bar.style.width = "0"; // reset
    setTimeout(() => {
      bar.style.width = finalWidth;
    }, 300);
  });
}

// IntersectionObserver to trigger on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateBars();
      observer.disconnect(); // run only once
    }
  });
}, { threshold: 0.3 });

if (progressBars.length) {
  observer.observe(progressBars[0].parentElement);
}
// Handle responsive image loading
document.addEventListener('DOMContentLoaded', function() {
  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Handle mobile menu if you add one later
  function handleMobileMenu() {
    // Add mobile menu functionality here
  }
  
  // Check device type
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Adjust animations for mobile
  if (isMobile()) {
    // Reduce intensive animations on mobile
    document.documentElement.style.setProperty('--animation-speed', '0.5s');
  }
  
  // Handle orientation changes
  window.addEventListener('orientationchange', function() {
    window.location.reload();
  });
  
  // Prevent zoom on double-tap (iOS)
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
});