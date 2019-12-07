const initMainSlider = () => {

  const $sliderMain = $('.js-main-slider');

  $sliderMain.slick({
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    easing: 'linear',
    speed: 1000,
    zIndex: 1
  });
}

const initServicesSlider = () => {

  const $sliderServices = $('.js-services-slider');
  $sliderServices.slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000,
    centerMode: false,
    vertical: true,
    zIndex: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: false
        }
      }
    ]
  });
}

const getHeightServicesSlide = () => {
  var maxHeight = 0;
  $('.services-slide').each(function(index, element) {
    if($(element).height() > maxHeight) {
      maxHeight = $(element).height();
    }
  });
  return function heightSlide() {
    return maxHeight;
  };
}

const initStudySlider = () => {

  const $sliderStudy = $('.js-study-slider');

  $sliderStudy.slick({
    arrows: false,
    dots: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: 'linear',
    speed: 1000,
    zIndex: 1
  });
}

$(document).ready(()=> {
  initMainSlider();
  initServicesSlider();
  initStudySlider();

  // Smooth scroll
  var $page = $('html, body');
  $('.menu-list a, .btn-more[href="#who-we"]').click(function() {
	  $page.animate({
		  scrollTop: $($.attr(this, 'href')).offset().top
  	}, 1700);
  	return false;
  });

  // Mobile menu
  var menu_link = $('.menu-link');
  var navbar = $('.menu');
  var menulist_link = $('.menu-list a');

  menu_link.click(function (event) {
    event.preventDefault();
    $(this).toggleClass('active');
    navbar.toggleClass('active');
  });
  menulist_link.click(function () {
    menu_link.toggleClass('active');
    navbar.toggleClass('active');
  });

  // Work tabs
  $('.work-item').each(function( index ) {
    if (index > 7) {
      $(this).hide();
    }
  });

  $('.list-works > li > a').click(function(e) {
    e.preventDefault();
    $('.list-works a').removeAttr('class');
    var aId = this.id,
        currentTypeWork = $('.work-items .' + aId);
    $('#' + aId).addClass('active');
    $('.work-item').not(currentTypeWork).hide(100);
    currentTypeWork.show(100);
  });

  $('#workall').click(function(e) {
    e.preventDefault();
    $('.work-item').each(function( index ) {
      if (index < 8) {
        $(this).show(100);
      }
    });
  });

  // Compensation Services slides
  if(window.matchMedia('(max-width: 768px)').matches) {
    var heightSlider = getHeightServicesSlide();
    var currentHeightSlide = heightSlider() + 25;
    $('.js-services-slider .slick-slide').height(currentHeightSlide);
    $('.js-services-slider .slick-slide').css('background-color', '#202020');
    //console.log('maxHeight ', heightSlider());
    $('#services').height(currentHeightSlide);
  }

})
