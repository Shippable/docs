$(document).ready(function () {
	$('.shipNav-item').click(
	 function () {
	   $('.shipNav-item').removeClass('active')
	   $(this).addClass('active')
	 }
	)
});
