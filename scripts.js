'use strict';

// Define a handler to make fonts’ sizes responsive to window width.
var fontResize = function() {
  [['.h1', 'h1'], ['.h2', 'h2'], ['.h3', 'h3'], ['.h4', 'h4'], ['.h5', 'h5']]
  .forEach(function(spec) {
    var targetElements = Array.from(document.querySelectorAll(spec[0]));
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

// Define a handler to make the credit’s size responsive to window width.
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

// Define a function to set the focus of a section.
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

// Define listeners and handler for a button navigating between sections.
var replaceSection = function(replacee, replacer) {
  // Perform only if no transition in progress.
  if (document.body.getAttribute('transition') === 'off') {
    document.body.setAttribute('transition', 'on');
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
      setFocusOf(replacer);
      document.body.setAttribute('transition', 'off');
    }, 500);
    var reminder = replacer.querySelector('.reminder');
    if (reminder) {
      reminder.scrollIntoView();
    }
    replacer.scrollTop = 0;
  };
}
/*
  Define listeners. Using addEventListener so tour-start button can have 2 each.
*/
var replaceOnClick = function(trigger, replacee, replacer) {
  trigger.addEventListener('click', function() {
    replaceSection(replacee, replacer);
  });
  trigger.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      replaceSection(replacee, replacer);
    }
  });
};

// Define listeners and handler for verbosity toggling.
// Handler.
var toggleVerbosity = function(button) {
  var sublist = button.parentNode.nextElementSibling;
  if (sublist.style.display === 'none') {
    button.querySelector('.do').style.display = 'none';
    button.querySelector('.undo').style.display = 'inline';
    sublist.style.display = 'block';
    sublist.style.opacity = 1;
  }
  else {
    button.querySelector('.do').style.display = 'inline';
    button.querySelector('.undo').style.display = 'none';
    sublist.style.display = 'none';
    sublist.style.opacity = 0;
  }
};
// Listeners.
var toggleVerbosityOnClick = function(button) {
  button.onclick = function() {
    toggleVerbosity(button);
  };
  button.onkeydown = function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      toggleVerbosity(button);
    }
  };
};

// Define listeners and handlers for a tour stop.
// Handler utility.
var showPicOf = function(tourData, tourSection, newStop) {
  tourSection.setAttribute('stop', newStop);
  var titleParagraph = tourSection.querySelector('.tour-title');
  var captionParagraph = tourSection.querySelector('.tour-caption');
  if (tourData[newStop][0]) {
    tourSection.style['background-image']
      = 'url(resources/images/' + tourData[newStop][0] + ')';
    titleParagraph.innerHTML = '';
    captionParagraph.innerHTML = tourData[newStop][1];
  }
  else {
    tourSection.style['background-image'] = '';
    titleParagraph.innerHTML = tourData[newStop][1];
    captionParagraph.innerHTML = '';
  }
};
// Handler for next.
var showNextPic = function(tourData) {
  var tourSection = document.querySelector('#tour');
  var tourStop = Number.parseInt(tourSection.getAttribute('stop'));
  var nextStop = tourStop === tourData.length - 1 ? 0 : tourStop + 1;
  showPicOf(tourData, tourSection, nextStop);
};
// Handler for prior.
var showPriorPic = function(tourData) {
  var tourSection = document.querySelector('#tour');
  var tourStop = Number.parseInt(tourSection.getAttribute('stop'));
  var priorStop = tourStop === 0 ? tourData.length - 1 : tourStop - 1;
  showPicOf(tourData, tourSection, priorStop);
};
/*
  Listeners. Using addEventListener so tour-start button can have 2 each
  (one to replace section and one to show next pic).
*/
var showNextPicOnClick = function(button, tourData) {
  button.addEventListener('click', function() {
    showNextPic(tourData);
  });
  button.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      showNextPic(tourData);
    }
  });
}
var showPriorPicOnClick = function(button, tourData) {
  button.onclick = function() {
    showPriorPic(tourData);
  };
  button.onkeydown = function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      showPriorPic(tourData);
    }
  };
}

// Define a function to identify an element’s section.
var sectionOf = function(element) {
  var parent = element.parentElement;
  if (parent.tagName === 'SECTION') {
    return parent;
  }
  else {
    return sectionOf(parent);
  }
};

// Define listeners and handler for a picture-showing button.
// Handler.
var showPic = function(button) {
  var imageSection = document.querySelector('#images');
  imageSection.style['background-image']
    = 'url(resources/images/' + button.getAttribute('pic') + ')';
  var buttonSection = sectionOf(button);
  // Make back button on picture return to sending section.
  replaceOnClick(
    imageSection.firstElementChild, imageSection, buttonSection
  );
  replaceSection(buttonSection, imageSection);
};
// Listeners.
var showPicOnClick = function(button) {
  button.onclick = function() {
    showPic(button);
  };
  button.onkeydown = function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      showPic(button);
    }
  };
};

// When the page is retrieved or refreshed:
window.onload = function() {
  // Make all initially hidden sections invisible.
  Array.from(document.querySelectorAll('.later')).forEach(function(section) {
    section.style.display = 'none';
    section.style.opacity = 0;
  });
  // Make all buttons focusable.
  Array.from(document.querySelectorAll('.btn-info')).forEach(function(button) {
    button.setAttribute('tabindex', '0');
  });
  setFocusOf(document.querySelector('#question'));
  // Create listeners for window resizings.
  fontResize();
  creditResize();
  // Create listeners for section-replacing buttons.
  Array.from(document.querySelectorAll('[dest]')).forEach(function(button) {
    replaceOnClick(
      button,
      sectionOf(button),
      document.querySelector('#' + button.getAttribute('dest'))
    );
  });
  // Create contents of and listeners for picture-showing buttons.
  var picSpans = Array.from(document.querySelectorAll('[pic], [tour-intro]'));
  picSpans.forEach(function(button) {
    if (button.hasAttribute('pic')) {
      button.innerHTML
        = '<img src="resources/images/'
        + button.getAttribute('pic')
        + '" class="mini-image">';
      showPicOnClick(button);
    }
  });
  // Create data on tour stops.
  var tourData = picSpans.map(function(picSpan) {
    if (picSpan.hasAttribute('pic')) {
      return [
        picSpan.getAttribute('pic'),
        sectionOf(picSpan).getAttribute('tour-intro') + '<br>'
          + picSpan.parentElement.firstChild.textContent.trim()
      ].filter(function(element) {
        return element[1];
      });
    }
    else {
      return ['', picSpan.getAttribute('tour-intro')];
    }
  });
  // Create listeners for tour navigation buttons.
  Array.from(document.querySelectorAll('.next-pic'))
  .forEach(function(button) {
    showNextPicOnClick(button, tourData);
  });
  Array.from(document.querySelectorAll('.prior-pic'))
  .forEach(function(button) {
    showPriorPicOnClick(button, tourData);
  });
  // Create listeners for buttons that toggle verbosity.
  Array.from(document.querySelectorAll('span.toggle-child'))
  .forEach(toggleVerbosityOnClick);
};

window.onresize = function() {
  fontResize();
  creditResize();
};
