// =================貓頭鷹輪播=================
var owl = $('.owl-carousel');
console.log(owl)
owl.owlCarousel({
    stagePadding: 20,
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause: true,
    autoWidth:true,
    items:10,
})    