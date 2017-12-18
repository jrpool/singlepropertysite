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
  if (window.innerWidth > 500) {
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

var h4Resize = function() {
  var targetElements = document.querySelectorAll('.h4');
  if (window.innerWidth > 550) {
    targetElements.forEach(function(element) {
      element.classList.remove('h4-minimum');
      element.classList.add('h4-proportional');
    });
  }
  else {
    targetElements.forEach(function(element) {
      element.classList.remove('h4-proportional');
      element.classList.add('h4-minimum');
    });
  }
};

var creditResize = function() {
  var targetElement = document.querySelector('.credit');
  if (window.innerWidth > 625) {
    targetElement.classList.remove('credit-minimum');
    targetElement.classList.add('credit-proportional');
  }
  else {
    targetElement.classList.remove('credit-proportional');
    targetElement.classList.add('credit-minimum');
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
  var overtSectionIDs = ['#question'];
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
  h4Resize();
  creditResize();
  replaceSection('#question .btn', '#answer', '#question');
  replaceSection('#answer .back', '#question', '#answer');
  replaceSection('#answer .btn-lg', '#details', '#answer');
  replaceSection('#details .back', '#answer', '#details');
  replaceSection('#details .btn-lg', '#join', '#details');
  replaceSection('#join .back', '#details', '#join');
};

window.onresize = function() {
  h1Resize();
  h4Resize();
  creditResize();
};
