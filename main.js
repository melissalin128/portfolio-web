const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for contacting me! 📬");
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

