var $ = $.noConflict();
$(document).ready(function () {
    "use strict";

    if ($(".navbar").width() > 1007)
    {
        $('.nav .dropdown').hover(function () {
            $(this).addClass('open');
        }, function () {
            $(this).removeClass('open');
        });
    }
    ;
// site preloader
    $(window).load(function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    $(".search-nav a,.close-search").click(function () {
        $(".top-search").hide();
    });
    $(".search-nav a").click(function () {
        $(".top-search").show();
    });
    //back to top
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    //animated scroll menu
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $('.navbar-transparent').addClass('shrink');
        }
        if (scroll <= 0) {
            $('.navbar-transparent').removeClass('shrink');
        }
    });
    //smooth scroll
    $(function () {
        $('.scroll-to a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });

});

