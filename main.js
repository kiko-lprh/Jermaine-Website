// ============================================================
//  SAZON STREET — main.js
//  All interactive behavior for the website.
// ============================================================


// ------------------------------------------------------------
//  1. WAIT FOR DOM
//     Everything runs after the HTML is fully loaded.
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {


  // ----------------------------------------------------------
  //  2. STICKY NAV SHADOW
  //     Adds a shadow to the nav once the user scrolls down.
  // ----------------------------------------------------------
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ----------------------------------------------------------
  //  3. MOBILE HAMBURGER MENU
  //     Opens and closes the slide-in drawer on small screens.
  // ----------------------------------------------------------
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileClose  = document.getElementById('mobileNavClose');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-link');

  // Open drawer
  hamburger.addEventListener('click', function () {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });

  // Close drawer via X button
  mobileClose.addEventListener('click', closeMobileNav);

  // Close drawer when a link is tapped
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = ''; // restore scrolling
  }


  // ----------------------------------------------------------
  //  4. SMOOTH SCROLL FOR NAV LINKS
  //     Scrolls to the section with a small offset so the
  //     sticky nav doesn't cover the section heading.
  // ----------------------------------------------------------
  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target   = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });


  // ----------------------------------------------------------
  //  5. CONTACT FORM SUBMISSION
  //     Prevents the default page reload and shows a success
  //     message instead. Replace this with a real backend
  //     (e.g. Formspree, EmailJS) when going live.
  // ----------------------------------------------------------
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // stop page from reloading

      // Basic validation: check both fields have content
      const name    = contactForm.querySelector('input[name="name"]').value.trim();
      const contact = contactForm.querySelector('input[name="contact"]').value.trim();

      if (!name || !contact) {
        alert('Please fill in both fields before sending.');
        return;
      }

      // Hide the form and show success message
      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');

      // --- TO CONNECT A REAL EMAIL SERVICE ---
      // Option A — Formspree (free, no backend needed):
      //   1. Go to https://formspree.io and create a form.
      //   2. Change the <form> action to your Formspree URL:
      //      <form action="https://formspree.io/f/YOUR_ID" method="POST">
      //   3. Remove the e.preventDefault() and JS handler above.
      //
      // Option B — EmailJS (send email directly from JS):
      //   1. Sign up at https://emailjs.com
      //   2. npm install @emailjs/browser  or use their CDN script
      //   3. Call emailjs.send(serviceId, templateId, { name, contact })
    });
  }


  // ----------------------------------------------------------
  //  6. SCROLL REVEAL ANIMATION
  //     Fades in cards and sections as they enter the viewport.
  //     Uses the IntersectionObserver API — no libraries needed.
  // ----------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.menu-card, .catering-card, .stat-box, .section-title'
  );

  // Start all elements as invisible and slightly shifted down
  revealElements.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Watch when elements enter the viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // stop watching once revealed
        }
      });
    },
    { threshold: 0.15 } // trigger when 15% of the element is visible
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });


  // ----------------------------------------------------------
  //  7. ACTIVE NAV LINK HIGHLIGHT
  //     Highlights the nav link for the section currently
  //     in view as the user scrolls down the page.
  // ----------------------------------------------------------
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 40;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.style.color = '';            // reset all to default
      if (anchor.getAttribute('href') === '#' + currentSection) {
        anchor.style.color = '#6B3D2E';  // highlight active link (--brown)
      }
    });
  });

}); // end DOMContentLoaded
