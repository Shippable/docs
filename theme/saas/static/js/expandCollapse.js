$(document).ready(function () {
  if ($.cookie('selectedMenuId')) {
    var selectedId = $.cookie('selectedMenuId');
    $('#' + selectedId).addClass('active');
    $.removeCookie('selectedMenuId');
  }

  $('.shipNav-item').click(
    function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $('.shipNav-item').removeClass('active');
        $(this).addClass('active');
        $.cookie('selectedMenuId', $(this).attr('id'),
          {expires: 90, path: '/'}
        );
      }
    }
  );
});
