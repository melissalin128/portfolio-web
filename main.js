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

