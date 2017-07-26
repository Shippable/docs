$(document).ready(
  function () {
    $('.subSectionHeader').click(
      function () {
        var parent = $(this).parent();
        if (!parent.hasClass('active')) {
          $('.subSection').removeClass('active');
          parent.addClass('active');
        } else {
          $('.subSection').removeClass('active');
        }
      }
    );

    $('.subSubSectionHeader').click(
      function () {
        var parent = $(this).parent();
        if (!parent.hasClass('active')) {
          $('.subSubSection').removeClass('active');
          parent.addClass('active');
        } else {
          $('.subSubSection').removeClass('active');
        }
      }
    );
});
