$(document).ready(
  function () {
    $('.shipNav-item-nav').click(
      function (e) {
        e.stopPropagation();
      }
    );
    $('.shipNav-item').click(
      function () {
        if (!$(this).hasClass('active')) {
          $('.shipNav-item').removeClass('active');
          $(this).addClass('active');
        } else {
          $('.shipNav-item').removeClass('active');
        }
      }
    );
});
