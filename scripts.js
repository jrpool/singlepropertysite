'use strict';

// $(window).on('load', function () {
//   $('.carousel-image').each(function() {
//     if (this.naturalWidth > this.naturalHeight) {
//       $(this).removeClass('w-100').addClass('h-100');
//     }
//     else {
//       $(this).removeClass('h-100').addClass('w-100');
//     }
//   });
// });

var h1Resize = function() {
  var targetElements = document.querySelectorAll('section .prompt');
  if (window.innerWidth > 750) {
    targetElements.forEach(function(element) {
      element.classList.remove('h1-minimum');
      element.classList.add('h1-proportional');
    });
  }
  else {
    targetElements.forEach(function(element) {
      element.classList.remove('h1-proportional');
      element.classList.add('h1-minimum');
    });
  }
};

var replaceSection = function(trigger, replacerSelector, replaceeSelector) {
  document.querySelector(trigger).onclick = function() {
    var replacer = document.querySelector(replacerSelector);
    var replacee = document.querySelector(replaceeSelector);
    replacer.style.display = 'block';
    window.setTimeout(function() {
      replacer.style.opacity = 1;
    }, 20);
    replacee.style.opacity = 0;
    window.setTimeout(function() {
      replacee.style.display = 'none';
    }, 2000);
  };
};

window.onload = function() {
  // document.querySelector('#question').style.display = 'block';
  // document.querySelector('#question').style.opacity = 1;
  // var latentSectionIDs = ['#answer', '#details', '#join'];
  // latentSectionIDs.forEach(function(sectionID) {
  //   document.querySelector(sectionID).style.display = 'none';
  //   document.querySelector(sectionID).style.opacity = 0;
  // });
  var overtSectionIDs = ['#question', '#credits'];
  var latentSectionIDs = ['#answer', '#details', '#join'];
  latentSectionIDs.forEach(function(sectionID) {
    document.querySelector(sectionID).style.display = 'none';
    document.querySelector(sectionID).style.opacity = 0;
  });
  overtSectionIDs.forEach(function(sectionID) {
    document.querySelector(sectionID).style.display = 'block';
    document.querySelector(sectionID).style.opacity = 1;
  });
  h1Resize();
  replaceSection('#question .btn', '#answer', '#question');
  replaceSection('#answer .btn-reminder', '#question', '#answer');
  replaceSection('#answer .btn-lg', '#details', '#answer');
  replaceSection('#details .btn-reminder', '#answer', '#details');
};

window.onresize = function() {
  h1Resize();
};
