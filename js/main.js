

'use strict';

document.addEventListener('DOMContentLoaded', function () {

   console.log('DOMContentLoaded has loaded!');

   const lightDarkButton = document.getElementById('lightDarkButton');
   const icon = document.getElementById('lightDarkIcon');
   const menuButton = document.getElementById('menuButton');
   const navbarList = document.getElementById('navbarList');


   lightDarkButton.addEventListener('click', function () {
      icon.src = icon.src.includes('moon') ? './assets/img/sun.png' : './assets/img/moon.png';
   });

   menuButton.addEventListener('click', function () {
      this.classList.toggle('is-open');
      navbarList.classList.toggle('is-open');

   });




});