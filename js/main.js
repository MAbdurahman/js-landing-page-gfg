'use strict';
/*===============================================================
          preloader scripts
 ==================================================================*/
document.addEventListener('DOMContentLoaded', function () {
   // makes sure that whole site is loaded, so the 3000ms preloader coincides with
   // the delay of 3000ms for the header content animation
   console.log('DOMContentLoaded for the preloader');

   const preloader = document.getElementById('preloader');
   const preloader_gif = document.getElementById('preloader-gif');


   if (preloader_gif) {
      preloader_gif.style.transition = 'opacity 3000ms ease-in-out';
      preloader_gif.style.opacity = '0';

   }
   if (preloader) {
      preloader.style.transition = 'opacity 3000ms ease-in-out';
      preloader.style.opacity = '0';
   }

   setTimeout(function () {
      preloader_gif.style.display = 'none';
      preloader.style.display = 'none';
   }, 3000);
});

/*===============================================================
          navigation and about section scripts
==================================================================*/
document.addEventListener('DOMContentLoaded', function () {

   console.log('DOMContentLoaded has loaded!');

   const lightDarkButton = document.getElementById('lightDarkButton');
   const icon = document.getElementById('lightDarkIcon');
   const menuButton = document.getElementById('menuButton');
   const navbarList = document.getElementById('navbarList');
   const navbar = document.getElementById('navbar');
   const navbarLogo = document.getElementById('navbar-logo-brand');
   const homeLink = document.getElementById('navbar-home-link');
   const aboutLink = document.getElementById('navbar-about-link');
   const learnMoreLink = document.getElementById('learn-more-link');
   const ctaButton = document.getElementById('ctaButton');
   const ctaButtonTwo = document.getElementById('ctaButtonTwo');
   const servicesLink = document.getElementById('navbar-services-link');
   const aboutButtonLink = document.getElementById('about-button');
   const menuToggleBreakPoint = 821;

   const navLinks = document.querySelectorAll('.navbar-list-link, .footer-navigation-link');
   const sections = [...document.querySelectorAll('.section[id]')];
   const navbarHeight = navbar.offsetHeight;

   function setActiveLink(sectionId) {
      navLinks.forEach(link => {
         const isCurrentSection = link.hash === `#${sectionId}`;
         link.classList.toggle('active', isCurrentSection);
      });
   }

   /*************************** initial state ***************************/
   setActiveLink('home');

   /*** keep both navbar and footer synchronized immediately on click ***/
   navLinks.forEach(link => {
      link.addEventListener('click', () => {
         const sectionId = link.hash.slice(1);

         if (sectionId) {
            setActiveLink(sectionId);
         }
      });
   });

   function getNavbarHeight() {
      return navbar.offsetHeight;
   }
   /**************** update active links while scrolling ****************/
   const observer = new IntersectionObserver(() => {
         const visibleSections = sections.filter(section => {
            const rect = section.getBoundingClientRect();

            return (
               rect.top <= window.innerHeight * 0.45 && rect.bottom > navbarHeight
            );
         })
            .sort((a, b) => {
               const aDistance = Math.abs(a.getBoundingClientRect().top - navbarHeight);
               const bDistance = Math.abs(b.getBoundingClientRect().top - navbarHeight);

               return aDistance - bDistance;
            });
         if (visibleSections[0]) {
            setActiveLink(visibleSections[0].id);
         }
      },
      {
         root: null,
         threshold: 0,
         rootMargin: `-${getNavbarHeight()}px 0px -50% 0px`
      });

   sections.forEach((section) => {
      observer.observe(section)
   });


   const pauseButton = document.getElementById('pause-button');
   const marqueeSliderLeft = document.getElementById('marquee-slider-left');
   const marqueeSliderRight = document.getElementById('marquee-slider-right');

   let isPaused = false;


   lightDarkButton.addEventListener('click', function () {
      icon.src = icon.src.includes('moon') ? './assets/img/theme/sun.png' : './assets/img/theme/moon.png';
   });

   /*   ctaButton.addEventListener('click', function () {
         navLinks.forEach((item) => item.classList.remove('active'));
         servicesLink.classList.add('active');
      });

      ctaButtonTwo.addEventListener('click', function () {
         navLinks.forEach((item) => item.classList.remove('active'));
         servicesLink.classList.add('active');
      });

      aboutButtonLink.addEventListener('click', function () {
         navLinks.forEach((item) => item.classList.remove('active'));
         servicesLink.classList.add('active');
      });*/

   if (window.innerWidth <= menuToggleBreakPoint) {

      menuButton.addEventListener('click', function () {
         this.classList.toggle('is-open');
         navbarList.classList.toggle('is-open');

      });

      navbarList.addEventListener('click', function () {
         this.classList.toggle('is-open');
         menuButton.classList.toggle('is-open');

      });

   }


   /*   navLinks.forEach(link => {
         link.addEventListener('click', function () {
            navLinks.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
         });
      });

      footerLinks.forEach(link => {
         link.addEventListener('click', function () {
            footerLinks.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
         })
      })*/

   navbarLogo.addEventListener('click', function () {
      navLinks.forEach((item) => item.classList.remove('active'));
      homeLink.classList.add('active');

      const isMobile = window.innerWidth <= menuToggleBreakPoint;

      if (isMobile) {
         navbarList.classList.toggle('is-open');
         menuButton.classList.toggle('is-open');
      } else {
         // on desktop: don't toggle; ensure closed
         navbarList.classList.remove('is-open');
         menuButton.classList.remove('is-open');
      }
   });



   /*learnMoreLink.addEventListener('click', function () {
      navLinks.forEach((item) => item.classList.remove('active'));
      aboutLink.classList.add('active');

   });*/


   /*===============================================================
             logo-marquee section
   ==================================================================*/
   function applyMarqueeSliderState() {
      marqueeSliderLeft.classList.toggle('is-paused', isPaused);
      marqueeSliderRight.classList.toggle('is-paused', isPaused);
      pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
      pauseButton.setAttribute('aria-pressed', String(isPaused));
   }

   pauseButton.addEventListener('click', function () {
      isPaused = !isPaused;
      applyMarqueeSliderState();
   });

   // by default, marquee slider is not paused
   applyMarqueeSliderState();

   /*===============================================================
          elements with reveal class
   ==================================================================*/

   const reveals = document.querySelectorAll('.reveal');
   const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
         }
      });
   }, {
      threshold: 0.15
   });

   reveals.forEach((el) => revealObserver.observe(el));

   /*===============================================================
             faq accordion script
    ==================================================================*/

   document.querySelectorAll('.faq-question').forEach((button) => {
      button.addEventListener('click', () => {
         const item = button.parentElement;
         item.classList.toggle('active');
      });
   });

});

/*===============================================================
             testimonial section scripts
==================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded and ready for use!');

   const slider = document.getElementById('testimonial-slider');
   const carousel = document.getElementById('testimonial-carousel');
   const cards = Array.from(carousel.querySelectorAll('.testimonial-card'));
   const prevButton = document.getElementById('prev-button');
   const nextButton = document.getElementById('next-button');

   if (!slider || !carousel || !cards.length || !prevButton || !nextButton) return;

   let isDragging = false;
   let startX = 0;
   let startScrollLeft = 0;
   let autoplayId = null;
   let dragMoved = false;

   function getPointerX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
   }

   function getCardsPerView() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
   }

   function getCardPositions() {
      return cards.map((card) => card.offsetLeft);
   }

   function getClosestCardIndex() {
      const positions = getCardPositions();
      const current = carousel.scrollLeft;

      let closestIndex = 0;
      let minDiff = Math.abs(positions[0] - current);

      for (let i = 1; i < positions.length; i++) {
         const diff = Math.abs(positions[i] - current);
         if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
         }
      }

      return closestIndex;
   }

   function getLastStartIndex() {
      return Math.max(0, cards.length - getCardsPerView());
   }

   function scrollToCard(index, smooth = true) {
      const positions = getCardPositions();
      const safeIndex = Math.max(0, Math.min(index, getLastStartIndex()));

      carousel.scrollTo({
         left: positions[safeIndex],
         behavior: smooth ? 'smooth' : 'auto'
      });
   }

   function nextSlide() {
      const currentIndex = getClosestCardIndex();
      const nextIndex = currentIndex + 1;

      if (nextIndex > getLastStartIndex()) {
         scrollToCard(0);
      } else {
         scrollToCard(nextIndex);
      }
   }

   function prevSlide() {
      const currentIndex = getClosestCardIndex();
      const prevIndex = currentIndex - 1;

      if (prevIndex < 0) {
         scrollToCard(getLastStartIndex());
      } else {
         scrollToCard(prevIndex);
      }
   }

   function startAutoplay() {
      stopAutoplay();

      autoplayId = setInterval(() => {
         if (!isDragging) {
            nextSlide();
         }
      }, 3500);
   }

   function stopAutoplay() {
      if (autoplayId) {
         clearInterval(autoplayId);
         autoplayId = null;
      }
   }

   function handleDragStart(e) {
      isDragging = true;
      dragMoved = false;
      startX = getPointerX(e);
      startScrollLeft = carousel.scrollLeft;
      carousel.classList.add('is-dragging');
      stopAutoplay();
   }

   function handleDragMove(e) {
      if (!isDragging) return;

      const currentX = getPointerX(e);
      const distance = currentX - startX;

      if (Math.abs(distance) > 5) {
         dragMoved = true;
      }

      carousel.scrollLeft = startScrollLeft - distance;

      if (e.cancelable) {
         e.preventDefault();
      }
   }

   function handleDragEnd() {
      if (!isDragging) return;

      isDragging = false;
      carousel.classList.remove('is-dragging');

      if (dragMoved) {
         scrollToCard(getClosestCardIndex());
      }

      startAutoplay();
   }

   prevButton.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
   });

   nextButton.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
   });

   carousel.addEventListener('mousedown', handleDragStart);
   carousel.addEventListener('mousemove', handleDragMove);
   carousel.addEventListener('mouseup', handleDragEnd);
   carousel.addEventListener('mouseleave', handleDragEnd);

   carousel.addEventListener('touchstart', handleDragStart, {passive: true});
   carousel.addEventListener('touchmove', handleDragMove, {passive: false});
   carousel.addEventListener('touchend', handleDragEnd);

   carousel.addEventListener('dragstart', (e) => e.preventDefault());

   slider.addEventListener('mouseenter', stopAutoplay);
   slider.addEventListener('mouseleave', startAutoplay);

   window.addEventListener('resize', () => {
      scrollToCard(getClosestCardIndex(), false);
      startAutoplay();
   });

   scrollToCard(0, false);
   startAutoplay();

});

/*===============================================================
          contact section scripts
==================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded is loaded and ready to use');

   const fullnamePattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const emailPattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const nameInput = document.getElementById('input-01');
   const emailInput = document.getElementById('input-02');
   const messageInput = document.getElementById('textarea-input');

   const requiredMinLength = 10;
   const requiredMaxLength = 280;

   let isNameValid = false;
   let isEmailValid = false;
   let isMessageValid = false;

   let namePrompt = document.getElementById('contact-form-name-prompt');
   let emailPrompt = document.getElementById('contact-form-email-prompt');
   let messagePrompt = document.getElementById('contact-form-message-prompt');
   let message = '';

   const successColor = '#166534';
   const alertColor = '#991B1B';
   const toastContainer = document.querySelector('.toast-container');
   const contactForm = document.getElementById('contact-form');

   if (!toastContainer) {
      console.error('Toast container not found!');
      return;
   }

   const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      warn: 'fa-triangle-exclamation',
      inform: 'fa-circle-info'
   };

   /*************************** effect 07 scripts ***************************/
   const inputs = document.querySelectorAll('.js-effect-07 .utils-effect-07');

   function updateInputState(input) {
      input.classList.toggle('has-content', input.value.trim() !== '');
   }

   inputs.forEach((input) => {
      updateInputState(input); // Handles values already present on load.

      input.addEventListener('input', () => {
         updateInputState(input);
      });

      input.addEventListener('blur', () => {
         updateInputState(input);
      });
   });

   /************************* interactive contact form *************************/
   function getMessagePrompt(message, elementId, color) {
      const prompt = document.getElementById(elementId);
      prompt.textContent = message;
      prompt.style.color = color;
   }

   function validateName() {
      let name = nameInput.value.trim();
      message = '';

      if (name.length === 0) {
         message = 'Your first and last name are required!';
         isNameValid = false;
         getMessagePrompt(message, `${namePrompt.id}`, alertColor);
         return false;
      }
      if (!name.match(fullnamePattern)) {
         message = 'Enter your first and last name!';
         isNameValid = false;
         getMessagePrompt(message, `${namePrompt.id}`, alertColor);
         return false;
      }
      message = 'Welcome ' + name;
      isNameValid = true;
      getMessagePrompt(message, `${namePrompt.id}`, successColor);
      return true;
   }

   function validateEmail() {
      let email = emailInput.value.trim();
      message = '';

      if (email.length === 0) {
         message = 'Your email address is required!';
         isEmailValid = false;
         getMessagePrompt(message, `${emailPrompt.id}`, alertColor);
         return false;
      }
      if (!email.match(emailPattern)) {
         message = 'Enter a valid email address!';
         isEmailValid = false;
         getMessagePrompt(message, `${emailPrompt.id}`, alertColor);
         return false;
      }
      message = 'Valid email address';
      isEmailValid = true;
      getMessagePrompt(message, `${emailPrompt.id}`, successColor);
      return true;
   }

   function validateMessage() {
      let textAreaMessage = messageInput.value.trim();
      message = '';

      if (textAreaMessage.length < requiredMinLength) {
         message = `Minimum ${requiredMinLength} characters required!`;
         isMessageValid = false;
         getMessagePrompt(message, `${messagePrompt.id}`, alertColor);
         return false;
      }
      if (textAreaMessage.length > requiredMaxLength) {
         message = `Maximum ${requiredMaxLength} characters allowed!`;
         isMessageValid = false;
         getMessagePrompt(message, `${messagePrompt.id}`, alertColor);
         return false;
      }
      let maxRequiredCharactersLeft = requiredMaxLength - textAreaMessage.length;
      message = `Maximum ${maxRequiredCharactersLeft} characters left`;
      isMessageValid = true;
      getMessagePrompt(message, `${messagePrompt.id}`, successColor);
      return true;
   }

   function showToast(type, messages) {
      const toast = document.createElement('div');
      const icon = document.createElement('i');
      const content = document.createElement('div');

      toast.className = `toast ${type}`;
      toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

      icon.className = `fa-solid ${icons[type]}`;
      icon.setAttribute('aria-hidden', 'true');

      if (Array.isArray(messages)) {
         const list = document.createElement('ul');

         messages.forEach((message) => {
            const item = document.createElement('li');
            item.textContent = message;
            list.appendChild(item);
         });

         content.appendChild(list);
      } else {
         content.textContent = messages;
      }

      toast.append(icon, content);
      toastContainer.appendChild(toast);

      window.setTimeout(() => {
         toast.classList.add('move-back-to-right');
      }, 5000);

      toast.addEventListener('animationend', (event) => {
         if (event.animationName === 'move-back-to-right') {
            toast.remove();
         }
      });
   }

   function performInvalidForm(errors) {
      showToast('error', errors);
   }

   function performValidForm() {
      showToast('success', 'Your message has been validated!');

      // No email is sent. Reset only after a successful validation.
      document.getElementById('contact-form').reset();

      // Return labels to their original positions.
      inputs.forEach((input) => {
         updateInputState(input);
      });

      // Clear inline prompts.
      namePrompt.textContent = '\u00A0';
      emailPrompt.textContent = '\u00A0';
      messagePrompt.textContent = '\u00A0';
   }

   function validateForm(event) {
      event.preventDefault();

      const errors = [];

      if (!validateName()) {
         errors.push('Enter a valid first and last name!');
      }

      if (!validateEmail()) {
         errors.push('Enter a valid email address!');
      }

      if (!validateMessage()) {
         errors.push(
            `Enter a message between ${requiredMinLength} and ${requiredMaxLength} characters!`
         );
      }

      if (errors.length > 0) {
         performInvalidForm(errors);
         return;
      }

      performValidForm();
   }


   nameInput.addEventListener('keyup', validateName);
   emailInput.addEventListener('keyup', validateEmail);
   messageInput.addEventListener('keyup', validateMessage);
   contactForm.addEventListener('submit', validateForm);
});