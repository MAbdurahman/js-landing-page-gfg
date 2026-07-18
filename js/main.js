

'use strict';

document.addEventListener('DOMContentLoaded', function () {

   console.log('DOMContentLoaded has loaded!');

   const icon = document.getElementById('lightDarkIcon');
   
   document.querySelector('#lightDarkButton').addEventListener('click', function () {
      icon.src = icon.src.includes('moon') ? './assets/img/sun.png' : './assets/img/moon.png';
   });

   document.querySelector('#menuButton').addEventListener('click', function () {
      this.classList.toggle('is-open');
   });




});