(function() {
  // Check if user already accepted cookies
  if (localStorage.getItem('cookieConsent') === 'accepted') {
    return; // Do nothing
  }

  // Create CSS for the cookie banner
  const style = document.createElement('style');
  style.textContent = `
    .cookie-banner {
      position: fixed;
      bottom: 24px;
      left: 24px;
      width: calc(100% - 48px);
      max-width: 360px;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 100000;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: auto !important; /* Restore native cursor over banner */
    }
    /* Hide custom cursor when hovering banner */
    .cookie-banner:hover ~ .cursor,
    .cookie-banner:hover ~ .cursor-ring {
      display: none !important;
      opacity: 0 !important;
    }
    .cookie-banner.show {
      transform: translateY(0);
      opacity: 1;
    }
    .cookie-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-right: 24px;
    }
    .cookie-icon {
      color: #b8d9f0;
    }
    .cookie-title {
      font-family: 'Playfair Display', sans-serif;
      font-weight: 600;
      font-size: 16px;
      color: #f5f4f0;
      letter-spacing: 0.02em;
      margin: 0;
    }
    .cookie-close-x {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      color: #888;
      font-size: 20px;
      line-height: 1;
      cursor: pointer !important;
      padding: 4px;
      transition: color 0.2s;
    }
    .cookie-close-x:hover {
      color: #f5f4f0;
    }
    .cookie-text {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      line-height: 1.6;
      color: #888;
      margin: 0;
    }
    .cookie-actions {
      display: flex;
      margin-top: 4px;
    }
    .cookie-btn-accept {
      background: #b8d9f0;
      color: #080808;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer !important;
      width: 100%;
      transition: background 0.2s, transform 0.2s;
    }
    .cookie-btn-accept:hover {
      background: #f5f4f0;
      transform: translateY(-2px);
    }
    
    @media (max-width: 480px) {
      .cookie-banner {
        bottom: 16px;
        left: 16px;
        width: calc(100% - 32px);
        padding: 20px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create HTML for the cookie banner
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <button class="cookie-close-x" id="btn-close-x" aria-label="Close">✕</button>
    <div class="cookie-header">
      <svg class="cookie-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="12.5" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="17" r="2" fill="currentColor"/>
      </svg>
      <p class="cookie-title">We use cookies</p>
    </div>
    <p class="cookie-text">
      We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.
    </p>
    <div class="cookie-actions">
      <button class="cookie-btn-accept" id="btn-accept-cookies">Got it</button>
    </div>
  `;

  document.body.appendChild(banner);

  // Animate in after a small delay
  setTimeout(() => {
    banner.classList.add('show');
  }, 2000);

  const hideBanner = () => {
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 600);
  };

  // Handle Accept
  document.getElementById('btn-accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    hideBanner();
  });

  // Handle Close X (Decline)
  document.getElementById('btn-close-x').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    hideBanner();
  });
})();

// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.hamburger-btn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    if (navLinks) {
      const links = navLinks.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('menu-open');
        });
      });
    }
  }
});
