

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
          navigation scripts
==================================================================*/
document.addEventListener('DOMContentLoaded', function () {

   console.log('DOMContentLoaded has loaded!');

   const lightDarkButton = document.getElementById('lightDarkButton');
   const icon = document.getElementById('lightDarkIcon');
   const menuButton = document.getElementById('menuButton');
   const navbarList = document.getElementById('navbarList');
   const navLinks = document.querySelectorAll('.navbar-list-link');




   lightDarkButton.addEventListener('click', function () {
      icon.src = icon.src.includes('moon') ? './assets/img/sun.png' : './assets/img/moon.png';
   });

   menuButton.addEventListener('click', function () {
      this.classList.toggle('is-open');
      navbarList.classList.toggle('is-open');

   });

   navbarList.addEventListener('click', function () {
      this.classList.toggle('is-open');
      menuButton.classList.toggle('is-open');

   });

   navLinks.forEach(link => {
      link.addEventListener('click', function () {
         navLinks.forEach((item) => item.classList.remove('active'));
         this.classList.add('active');
      });
   });

});