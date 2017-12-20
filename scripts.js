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

var fontResize = function() {
  ['h1', 'h2', 'h4', 'list'].forEach(function(className) {
    var targetElements = document.querySelectorAll('.' + className);
    if (window.innerWidth > 500) {
      targetElements.forEach(function(element) {
        element.classList.remove(className + '-minimum');
        element.classList.add(className + '-proportional');
      });
    }
    else {
      targetElements.forEach(function(element) {
        element.classList.remove(className + '-proportional');
        element.classList.add(className + '-minimum');
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

var replaceSection = function(trigger, replaceeSelector, replacerSelector) {
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
    }, 1500);
  };
};

window.onload = function() {
  document.querySelectorAll('.later').forEach(function(section) {
    section.style.display = 'none';
    section.style.opacity = 0;
  });
  document.querySelectorAll('.initial').forEach(function(section) {
    section.style.display = 'block';
    section.style.opacity = 1;
  });
  fontResize();
  creditResize();
  var replacements = [
    ['#question .btn-lg', '#question', '#answer'],
    ['#answer .back', '#answer', '#question'],
    ['#answer .btn-lg', '#answer', '#details'],
    ['#details .back', '#details', '#answer'],
    ['#details .btn-lg', '#details', '#join'],
    ['#members-more', '#details', '#members-list'],
    ['#members-list .btn-lg', '#members-list', '#life-list'],
    ['#members-list .back', '#members-list', '#details'],
    ['#life-more', '#details', '#life-list'],
    ['#life-list .btn-lg', '#life-list', '#coop-list'],
    ['#life-list .back', '#life-list', '#details'],
    ['#coop-more', '#details', '#coop-list'],
    ['#coop-list .btn-lg', '#coop-list', '#gov-list'],
    ['#coop-list .back', '#coop-list', '#details'],
    ['#gov-more', '#details', '#gov-list'],
    ['#gov-list .btn-lg', '#gov-list', '#common-list'],
    ['#gov-list .back', '#gov-list', '#details'],
    ['#common-more', '#details', '#common-list'],
    ['#common-list .btn-lg', '#common-list', '#apt-list'],
    ['#common-list .back', '#common-list', '#details'],
    ['#apt-more', '#details', '#apt-list'],
    ['#apt-list .btn-lg', '#apt-list', '#walk-list'],
    ['#apt-list .back', '#apt-list', '#details'],
    ['#walk-more', '#details', '#walk-list'],
    ['#walk-list .btn-lg', '#walk-list', '#join'],
    ['#walk-list .back', '#walk-list', '#details'],
    ['#join .back', '#join', '#details']
  ];
  replacements.forEach(function(agenda) {
    replaceSection(agenda[0], agenda[1], agenda[2]);
  });
};

window.onresize = function() {
  fontResize();
  creditResize();
};
