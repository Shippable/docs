$(document).ready(function () {
  if (localStorage.getItem("selectedMenuId")) {
    var selectedId = localStorage.getItem("selectedMenuId");
    $('#' + selectedId).addClass('active');
  }

  if (localStorage.getItem("currentSection")) {
    var selectedId = localStorage.getItem("currentSection");
    $('ul.indiviualSection').addClass('hideSection');
    $('ul#' + selectedId).removeClass('hideSection')
  } else {
    $('ul.indiviualSection').addClass('hideSection');
    $('ul.indiviualSection').eq(0).removeClass('hideSection')
  }

  $('.shipNav-item').click(
    function () {
      if (!$(this).hasClass('active')) {
        $('.shipNav-item').removeClass('active');
        $(this).addClass('active');
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("selectedMenuId", $(this).attr('id'));
        }
      }
    }
  );

  $('.topPanel').click(
    function () {
      localStorage.setItem("currentSection", $(this).attr('id'));
    }
  );
});
