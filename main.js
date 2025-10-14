const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const statusEl = document.getElementById("contactStatus");
  const serviceId = contactForm.getAttribute('data-emailjs-service');
  const templateId = contactForm.getAttribute('data-emailjs-template');
  const publicKey = contactForm.getAttribute('data-emailjs-public');

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!window.emailjs) {
      statusEl.textContent = "Email service unavailable. Please try again later.";
      return;
    }
    if (!serviceId || !templateId || !publicKey) {
      statusEl.textContent = "EmailJS not configured. Add your IDs to the form.";
      return;
    }
    statusEl.textContent = "Sending...";
    try {
      const formData = {
        from_name: contactForm.name.value,
        reply_to: contactForm.email.value,
        message: contactForm.message.value
      };
      await window.emailjs.send(serviceId, templateId, formData, { publicKey });
      statusEl.textContent = "Thanks! Your message was sent.";
      contactForm.reset();
    } catch (err) {
      statusEl.textContent = "Sorry, something went wrong. Please try again.";
    }
  });
}

// Mobile drawer navigation toggle
(function(){
  const button = document.getElementById('menuButton');
  const drawer = document.getElementById('siteMenu');
  if (!button || !drawer) return;

  function setOpen(isOpen){
    button.setAttribute('aria-expanded', String(isOpen));
    drawer.classList.toggle('open', isOpen);
    drawer.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) {
      const firstLink = drawer.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  }

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  drawer.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A') {
      setOpen(false);
    }
  });

  // Close with back arrow button inside the drawer
  const backBtn = drawer.querySelector('.drawer-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => setOpen(false));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();




// Typewriter effect with limited cursor blinking
(function(){
  const descEl = document.querySelector('.description');
  if (!descEl) return;

  const fullText = descEl.textContent.trim();
  descEl.textContent = '';
  let index = 0;

  // Start cursor blinking
  descEl.classList.add('blink-cursor');

  function typeChar() {
    if (index < fullText.length) {
      descEl.textContent += fullText.charAt(index);
      index++;
      setTimeout(typeChar, 80); // typing speed
    } else {
      // After typing is done, count blinks and stop
      let blinkCount = 0;
      const maxBlinks = 6;
      const blinkInterval = 800; // must match CSS blink speed (0.8s)

      const interval = setInterval(() => {
        blinkCount++;
        if (blinkCount >= maxBlinks) {
          clearInterval(interval);
          descEl.classList.remove('blink-cursor'); // stop blinking
          descEl.style.borderRight = 'none'; // hide cursor
        }
      }, blinkInterval);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(typeChar, 800);
  });
})();




// motion transition fade in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));


// to add About drawer in navigation pane
const aboutToggle = document.getElementById("aboutToggle");
const aboutSubmenu = document.getElementById("aboutSubmenu");

aboutToggle.addEventListener("click", () => {
  const isExpanded = aboutToggle.getAttribute("aria-expanded") === "true";
  aboutToggle.setAttribute("aria-expanded", !isExpanded);
  aboutSubmenu.style.display = isExpanded ? "none" : "flex";
  aboutSubmenu.setAttribute("aria-hidden", isExpanded);
});



