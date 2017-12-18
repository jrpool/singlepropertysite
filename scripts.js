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

var hResize = function() {
  ['1', '2', '4'].forEach(function(tagNum) {
    var targetElements = document.querySelectorAll('.h' + tagNum);
    if (window.innerWidth > 500) {
      targetElements.forEach(function(element) {
        element.classList.remove('h' + tagNum + '-minimum');
        element.classList.add('h' + tagNum + '-proportional');
      });
    }
    else {
      targetElements.forEach(function(element) {
        element.classList.remove('h' + tagNum + '-proportional');
        element.classList.add('h' + tagNum + '-minimum');
      });
    }
  });
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
    }, 50);
    replacee.style.opacity = 0;
    window.setTimeout(function() {
      replacee.style.display = 'none';
    }, 2000);
  };
};

window.onload = function() {
  var overtSectionIDs = ['#question'];
  var latentSectionIDs = ['#answer', '#details', '#join'];
  var latentSectionClasses = ['.detail-list'];
  latentSectionClasses.forEach(function(sectionClass) {
    var sections = document.querySelectorAll(sectionClass);
    sections.forEach(function(section) {
      section.style.display = 'none';
      section.style.opacity = 0;
    });
  });
  latentSectionIDs.forEach(function(sectionID) {
    document.querySelector(sectionID).style.display = 'none';
    document.querySelector(sectionID).style.opacity = 0;
  });
  overtSectionIDs.forEach(function(sectionID) {
    document.querySelector(sectionID).style.display = 'block';
    document.querySelector(sectionID).style.opacity = 1;
  });
  hResize();
  creditResize();
  replaceSection('#question .btn-lg', '#answer', '#question');
  replaceSection('#answer .back', '#question', '#answer');
  replaceSection('#answer .btn-lg', '#details', '#answer');
  replaceSection('#details .back', '#answer', '#details');
  replaceSection('#details .btn-lg', '#join', '#details');
  replaceSection('#join .back', '#details', '#join');
};

window.onresize = function() {
  hResize();
  creditResize();
};
