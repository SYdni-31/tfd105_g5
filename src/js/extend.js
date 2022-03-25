// =================貓頭鷹輪播=================
var owl = $('.owl-carousel');
owl.owlCarousel({
    stagePadding: 50,
    loop:true,
    margin:5,
    nav:true,
    dots:false,
    autoplay:false,
    autoplayTimeout:3000,
    autoplayHoverPause: true,
    responsive:{
        0:{
            items:3
        },
        768:{
            items:5
        },
        1000:{
            items:8
        }
    }
})
// 滑鼠滾動事件
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});