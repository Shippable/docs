$(document).ready(
  function () {
    $('.shipNav-item').click(
      function () {
        if (!$(this).hasClass('active')) {
          $('.shipNav-item').removeClass('active');
          $(this).addClass('active');
        }
      }
    );
});
