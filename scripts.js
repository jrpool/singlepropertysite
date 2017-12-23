'use strict';

var fontResize = function() {
  [
    ['.h1', 'h1'], ['.h2', 'h2'], ['.h3', 'h3'], ['.h4', 'h4'], ['.h5', 'h5'],
    ['li', 'li']
  ]
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

var replaceSection = function(replaceeSelector, replacerSelector) {
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

var replaceOnClick = function(trigger, replaceeSelector, replacerSelector) {
  document.querySelector(trigger).onclick = function() {
    replaceSection(replaceeSelector, replacerSelector);
  };
};

var yieldSection = function(
  yielderSelector, yieldeeSelector, yielderOpacity
) {
  var yielder = document.querySelector(yielderSelector);
  var yieldee = document.querySelector(yieldeeSelector);
  yieldee.style.display = 'block';
  window.setTimeout(function() {
    yieldee.style.opacity = 1;
  }, 50);
  yielder.style.opacity = yielderOpacity;
};

var unyieldSection = function(unyielderSelector, unyieldeeSelector) {
  var unyielder = document.querySelector(unyielderSelector);
  var unyieldee = document.querySelector(unyieldeeSelector);
  unyieldee.style.opacity = 0;
  window.setTimeout(function() {
    unyieldee.style.display = 'none';
  }, 1500);
  unyielder.style.opacity = 1;
};

var yieldSectionTemp = function(
  yielderSelector, yieldeeSelector, yielderOpacity, waitTime
) {
  yieldSection(yielderSelector, yieldeeSelector, yielderOpacity);
  window.setTimeout(function() {
    unyieldSection(yielderSelector, yieldeeSelector);
  }, waitTime);
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
    ['#answer .back', '#answer', '#question'],
    ['#answer .btn-lg', '#answer', '#details'],
    ['#apt-list .back', '#apt-list', '#details'],
    ['#apt-list .btn-lg', '#apt-list', '#walk-list'],
    ['#apt-more', '#details', '#apt-list'],
    ['#common-list .back', '#common-list', '#details'],
    ['#common-list .btn-lg', '#common-list', '#apt-list'],
    ['#common-more', '#details', '#common-list'],
    ['#coop-list .back', '#coop-list', '#details'],
    ['#coop-list .btn-lg', '#coop-list', '#gov-list'],
    ['#coop-more', '#details', '#coop-list'],
    ['#details .back', '#details', '#answer'],
    ['#details .btn-lg', '#details', '#join'],
    ['#gov-list .back', '#gov-list', '#details'],
    ['#gov-list .btn-lg', '#gov-list', '#common-list'],
    ['#gov-more', '#details', '#gov-list'],
    ['#join .back', '#join', '#details'],
    ['#life-list .back', '#life-list', '#details'],
    ['#life-list .btn-lg', '#life-list', '#coop-list'],
    ['#life-more', '#details', '#life-list'],
    ['#map .back', '#map', '#walk-list'],
    ['#map .btn-lg', '#map', '#join'],
    ['#members-list .back', '#members-list', '#details'],
    ['#members-list .btn-lg', '#members-list', '#life-list'],
    ['#members-more', '#details', '#members-list'],
    ['#question .btn-lg', '#question', '#answer'],
    ['#walk-list .back', '#walk-list', '#details'],
    ['#walk-list .btn-lg', '#walk-list', '#map'],
    ['#walk-more', '#details', '#walk-list']
  ];
  replacements.forEach(function(agenda) {
    replaceOnClick(agenda[0], agenda[1], agenda[2]);
  });
  var imageUses = [
    ['btn-apt-bathcab', 'apt-list', 'bathcab.jpg'],
    ['btn-apt-bed', 'apt-list', 'bed.jpg'],
    ['btn-apt-blinds', 'apt-list', 'blinds.jpg'],
    ['btn-apt-dw', 'apt-list', 'dw.jpg'],
    ['btn-apt-elec', 'apt-list', 'elec.jpg'],
    ['btn-apt-floor', 'apt-list', 'floor.jpg'],
    ['btn-apt-kitcab', 'apt-list', 'kitcab.jpg'],
    ['btn-apt-kitchen', 'apt-list', 'kitchen.jpg'],
    ['btn-apt-light', 'apt-list', 'light.jpg'],
    ['btn-apt-lowe', 'apt-list', 'lowe.jpg'],
    ['btn-apt-medcab', 'apt-list', 'medcab.jpg'],
    ['btn-apt-micro', 'apt-list', 'micro.jpg'],
    ['btn-apt-pantry', 'apt-list', 'pantry.jpg'],
    ['btn-apt-remodel09', 'apt-list', 'remodel09.png'],
    ['btn-apt-shower', 'apt-list', 'shower.jpg'],
    ['btn-apt-sink', 'apt-list', 'sink.jpg'],
    ['btn-apt-storage', 'apt-list', 'storage.jpg'],
    ['btn-apt-toilet', 'apt-list', 'toilet.jpg'],
    ['btn-common-av', 'common-list', 'av.jpg'],
    ['btn-common-bb', 'common-list', 'bb.jpg'],
    ['btn-common-bike', 'common-list', 'bike.jpg'],
    ['btn-common-dine', 'common-list', 'dine.jpg'],
    ['btn-common-elev', 'common-list', 'elev.jpg'],
    ['btn-common-entry', 'common-list', 'entry.jpg'],
    ['btn-common-fire', 'common-list', 'fire.jpg'],
    ['btn-common-fridge', 'common-list', 'fridge.jpg'],
    ['btn-common-garden', 'common-list', 'garden.jpg'],
    ['btn-common-give', 'common-list', 'give.jpg'],
    ['btn-common-kit', 'common-list', 'kit.jpg'],
    ['btn-common-laundry', 'common-list', 'laundry.jpg'],
    ['btn-common-library', 'common-list', 'library.jpg'],
    ['btn-common-mail', 'common-list', 'mail.jpg'],
    ['btn-common-msg', 'common-list', 'msg.jpg'],
    ['btn-common-piano', 'common-list', 'piano.jpg'],
    ['btn-common-roof', 'common-list', 'roof.jpg'],
    ['btn-common-ttennis', 'common-list', 'ttennis.jpg'],
    ['btn-common-walls', 'common-list', 'walls.jpg'],
    ['btn-gov-avplan', 'gov-list', 'avplan.png'],
    ['btn-gov-board', 'gov-list', 'board.png'],
    ['btn-gov-decor', 'gov-list', 'decor.jpg'],
    ['btn-gov-dem', 'gov-list', 'dem.jpg'],
    ['btn-gov-finance', 'gov-list', 'finance.png'],
    ['btn-gov-gardening', 'gov-list', 'gardening.jpg'],
    ['btn-gov-landscape', 'gov-list', 'landscape.png'],
    ['btn-gov-recycle', 'gov-list', 'recycle.jpg'],
    ['btn-gov-remodel', 'gov-list', 'remodel.png'],
    ['btn-gov-rules', 'gov-list', 'rules.png'],
    ['btn-gov-water', 'gov-list', 'water.png'],
    ['btn-life-art', 'life-list', 'art.jpg'],
    ['btn-life-book', 'life-list', 'book.png'],
    ['btn-life-chamber', 'life-list', 'chamber.jpg'],
    ['btn-life-circle', 'life-list', 'circle.png'],
    ['btn-life-expert', 'life-list', 'expert.jpg'],
    ['btn-life-forum', 'life-list', 'forum.png'],
    ['btn-life-host', 'life-list', 'host.png'],
    ['btn-life-movie', 'life-list', 'movie.png'],
    ['btn-life-multi', 'life-list', 'multi.jpg'],
    ['btn-life-party', 'life-list', 'party.jpg'],
    ['btn-life-rock', 'life-list', 'rock.jpg'],
    ['btn-life-talk', 'life-list', 'talk.jpg'],
    ['btn-walk-bam', 'walk-list', 'bam.jpg'],
    ['btn-walk-bart', 'walk-list', 'bart.png'],
    ['btn-walk-bot', 'walk-list', 'bot.jpg'],
    ['btn-walk-bowl', 'walk-list', 'bowl.jpg'],
    ['btn-walk-bpl', 'walk-list', 'bpl.jpg'],
    ['btn-walk-academic', 'walk-list', 'academic.jpg'],
    ['btn-walk-cafe', 'walk-list', 'cafe.jpg'],
    ['btn-walk-cheap', 'walk-list', 'cheap.jpg'],
    ['btn-walk-chez', 'walk-list', 'chez.jpg'],
    ['btn-walk-cinema', 'walk-list', 'cinema.jpg'],
    ['btn-walk-freight', 'walk-list', 'freight.jpg'],
    ['btn-walk-health', 'walk-list', 'health.jpg'],
    ['btn-walk-lbnl', 'walk-list', 'lbnl.jpg'],
    ['btn-walk-nature', 'walk-list', 'nature.jpg'],
    ['btn-walk-park', 'walk-list', 'park.jpg'],
    ['btn-walk-pfa', 'walk-list', 'pfa.jpg'],
    ['btn-walk-stage', 'walk-list', 'stage.jpg'],
    ['btn-walk-tool', 'walk-list', 'tool.jpg'],
    ['btn-walk-ucaf', 'walk-list', 'ucaf.jpg'],
    ['btn-walk-ucb', 'walk-list', 'ucb.jpg']
  ];
  imageUses.forEach(function(specs) {
    document.querySelector('#' + specs[0]).onclick = function() {
      document.querySelector('#images').style.backgroundImage
        = 'url(resources/images/' + specs[2] + ')';
      yieldSectionTemp('#' + specs[1], '#images', 0.1, 2000);
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
