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

$(document).ready(function() {
  $('#question .btn').filter(':first').click(function() {
    $('#question').addClass('d-none');
    $('#answer').removeClass('d-none');
    var answerSec = $('#answer');
  });
  $('#answer .reminder').filter(':first').click(function() {
    $('#answer').addClass('d-none');
    $('#question').removeClass('d-none');
  });
});
