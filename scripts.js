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

var setFocusOf = function(section) {
  var priorFocus = section.querySelector('[had-focus]');
  if (priorFocus) {
    priorFocus.focus();
  }
  else {
    var firstListBtn = section.querySelector('.btn-list');
    if (firstListBtn) {
      firstListBtn.focus();
    }
    else {
      var firstNextBtn = section.querySelector('.next');
      if (firstNextBtn) {
        firstNextBtn.focus();
      }
      else {
        var firstLgBtn = section.querySelector('.btn-lg');
        if (firstLgBtn) {
          firstLgBtn.focus();
        }
        else {
          var firstLink = section.querySelector('a');
          if (firstLink) {
            firstLink.focus();
          }
          else {
            var firstSmBtn = section.querySelector('.btn-sm');
            if (firstSmBtn) {
              firstSmBtn.focus();
            }
          }
        }
      }
    }
  }
};

var replaceSection = function(replacee, replacer) {
  // Manage focus in old section.
  var activeElement = document.activeElement;
  if (activeElement && activeElement.tagName !=='body') {
    var priorReplaceeFocus = replacee.querySelector('[had-focus]');
    if (priorReplaceeFocus) {
      priorReplaceeFocus.removeAttribute('had-focus');
    }
    activeElement.setAttribute('had-focus', '');
  }
  // Make old section invisible and new one visible.
  replacer.style.display = 'block';
  window.setTimeout(function() {
    replacer.style.opacity = 1;
  }, 50);
  replacee.style.opacity = 0;
  window.setTimeout(function() {
    replacee.style.display = 'none';
  }, 1000);
  setFocusOf(replacer);
  replacer.firstElementChild.scrollIntoView();
};

var replaceOnClick = function(trigger, replacee, replacer) {
  trigger.onclick = function() {
    replaceSection(replacee, replacer);
  };
  trigger.onkeydown = function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      replaceSection(replacee, replacer);
    }
  };
};

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
  document.querySelectorAll('.btn-info').forEach(function(button) {
    button.setAttribute('tabindex', '0');
  });
  setFocusOf(document.querySelector('#question'));
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
    var handler = function() {
      var imageSection = document.querySelector('#images');
      imageSection.style['background-image']
        = 'url(resources/images/' + button.getAttribute('pic') + ')';
      var buttonSection = sectionOf(button);
      replaceOnClick(
        imageSection.firstElementChild, imageSection, buttonSection
      );
      replaceSection(buttonSection, imageSection);
    };
    button.onclick = handler;
    button.onkeydown = function(event) {
      if (event.key === ' ' || event.key === 'Enter') {
        handler();
      }
    };
  });
  document.querySelectorAll('#members-list > p.list > span.toggle-child')
  .forEach(function(button) {
    var handler = function() {
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
    button.onclick = handler;
    button.onkeydown = function(event) {
      if (event.key === ' ' || event.key === 'Enter') {
        handler();
      }
    };
  });
};

window.onresize = function() {
  fontResize();
  creditResize();
};
