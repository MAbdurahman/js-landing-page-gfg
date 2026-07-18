

'use strict';

document.addEventListener('DOMContentLoaded', function () {

   console.log('DOMContentLoaded has loaded!');

   document.querySelector('#menuButton').addEventListener('click', function () {
      this.classList.toggle('is-open');
   });
});