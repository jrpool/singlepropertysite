'use strict';

var fontResize = function() {
  [['.h1', 'h1'], ['.h2', 'h2'], ['.h3', 'h3'], ['.h4', 'h4'], ['.h5', 'h5']]
  .forEach(function(spec) {
    var targetElements = document.querySelectorAll(spec[0]);
    if (window.innerWidth > 500) {
      targetElements.forEach(function(element) {
        element.classList.remove(spec[1] + '-minimum');
        element.classList.add(spec[1] + '-proportional');
      });
    }
    else {
      targetElements.forEach(function(element) {
        element.classList.remove(spec[1] + '-proportional');
        element.classList.add(spec[1] + '-minimum');
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

var replaceSection = function(replacee, replacer) {
  replacer.style.display = 'block';
  window.setTimeout(function() {
    replacer.style.opacity = 1;
  }, 50);
  replacee.style.opacity = 0;
  window.setTimeout(function() {
    replacee.style.display = 'none';
  }, 1500);
};

var replaceOnClick = function(trigger, replacee, replacer) {
  trigger.onclick = function() {
    replaceSection(replacee, replacer);
  };
};

// var yieldSection = function(
//   yielderSelector, yieldeeSelector, yielderOpacity
// ) {
//   var yielder = document.querySelector(yielderSelector);
//   var yieldee = document.querySelector(yieldeeSelector);
//   yieldee.style.display = 'block';
//   window.setTimeout(function() {
//     yieldee.style.opacity = 1;
//   }, 50);
//   yielder.style.opacity = yielderOpacity;
// };
//
// var unyieldSection = function(unyielderSelector, unyieldeeSelector) {
//   var unyielder = document.querySelector(unyielderSelector);
//   var unyieldee = document.querySelector(unyieldeeSelector);
//   unyieldee.style.opacity = 0;
//   window.setTimeout(function() {
//     unyieldee.style.display = 'none';
//   }, 1500);
//   unyielder.style.opacity = 1;
// };
//
// var yieldSectionTemp = function(
//   yielderSelector, yieldeeSelector, yielderOpacity, waitTime
// ) {
//   yieldSection(yielderSelector, yieldeeSelector, yielderOpacity);
//   window.setTimeout(function() {
//     unyieldSection(yielderSelector, yieldeeSelector);
//   }, waitTime);
// };

var sectionOf = function(element) {
  var parent = element.parentElement;
  if (parent.tagName === 'SECTION') {
    return parent;
  }
  else {
    return sectionOf(parent);
  }
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
  document.querySelectorAll('[dest]').forEach(function(button) {
    replaceOnClick(
      button,
      sectionOf(button),
      document.querySelector('#' + button.getAttribute('dest'))
    );
  });
  document.querySelectorAll('[pic]').forEach(function(button) {
    button.onclick = function() {
      var imageSection = document.querySelector('#images');
      imageSection.style.backgroundImage
        = 'url(resources/images/' + button.getAttribute('pic') + ')';
      var buttonSection = sectionOf(button);
      replaceOnClick(
        imageSection.firstElementChild, imageSection, buttonSection
      );
      replaceSection(buttonSection, imageSection);
    };
  });
  document.querySelectorAll('#members-list > p.list > span.toggle-child')
  .forEach(function(button) {
    button.onclick = function() {
      var sublist = button.parentNode.nextElementSibling;
      if (sublist.style.display === 'none') {
        button.innerHTML = 'Hide examples …';
        sublist.style.display = 'block';
        sublist.style.opacity = 1;
      }
      else {
        button.innerHTML = 'Show examples …';
        sublist.style.display = 'none';
        sublist.style.opacity = 0;
      }
    };
  });
};

window.onresize = function() {
  fontResize();
  creditResize();
};
