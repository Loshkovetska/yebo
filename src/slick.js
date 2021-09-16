window.$ = window.jQuery = require('jquery');
require('slick-carousel');

$(".twits__slider").slick({
    infinite: false,
    dots: true,
    dotsClass: "dots__list",
    fade: true,
    slidesToShow: 1,
    arrows: false,
    touchMove: false
});