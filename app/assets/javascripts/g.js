
$(function() {
  $('.slider').slick({
    arrows: false,
    
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
    
    
  });

  
});

$(function(){
  $("smooth-scroll").click(function() {
    $("html,body").animate({scrollTop:0}, "300");
  });
});