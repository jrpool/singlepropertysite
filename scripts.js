'use strict';

$(window).on('load', function () {
  $('.carousel-image').each(function() {
    if (this.naturalWidth > this.naturalHeight) {
      $(this).removeClass('w-100').addClass('h-100');
    }
    else {
      $(this).removeClass('h-100').addClass('w-100');
    }
  });
});