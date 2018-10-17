$(function () {
  'use strict';

  const slideList = [
    {
      number: 1,
      isActiv: true
    }, {
      number: 2,
      isActiv: false
    }, {
      number: 3,
      isActiv: false
    }, {
      number: 4,
      isActiv: false
    }
  ];

  const sliderJquery = function(sliderDOMElement, slideList) {
    const state = {
      sliderDOMElement: sliderDOMElement,
      isStop: false,
      slideList: [],
      slideInterval: 3000,
      activeSlide: null,
      qtySlides: null,
      buttonActive: null
    };

    // Добавляем в состояние все слайды
    slideList.forEach(function(slide) {
      const newSlide = {
        number: slide.number,
        isActiv: slide.isActiv,
        domElement: null
      };
      state.slideList.push(newSlide);
    });
    console.dir('Начальное состояние:', state);

    // Присваиваем каждому слайду его DOM узел
    state.slideList.forEach(function(slide) {
      var slideNumber = slide.number - 1;
      slide.domElement = $('.slides > div').eq(slideNumber);

      if (slide.isActiv) {
        state.activeSlide = slide.number;
        slide.domElement.css({'left':'0'});
      }
    });

    // Количество слайдов
    state.qtySlides = state.slideList.length;

    state.buttonActive = $('.buttons > li').eq(state.activeSlide - 1);
    state.buttonActive.addClass('active');

    // Запускаем слайдшоу
    var slideShow = setInterval( function(){
        changeSlide(state);
    }, state.slideInterval);

    // Обработчик события Клик на кнопке
    $('.buttons > li').click(function(e) {
      clearInterval(slideShow);

      var indexActiveButton = $(this).index();


      renderSlider(state, indexActiveButton);

      // через 2 сек возобновить слайдшоу
      setTimeout(function() {
        slideShow = setInterval( function(){
            changeSlide(state);
        }, state.slideInterval);
      }, 2000);
    });

    // Наведение курсора на слайд
    $('.slides').hover(function() {
        clearInterval(slideShow);
    }, function() {
      slideShow = setInterval( function(){
          changeSlide(state);
      }, state.slideInterval);
    });

  };

  // Внешний вид

  const changeSlide = function(state) {
    var slideAfterActive = state.activeSlide + 1,
        slideBeforeActive = state.activeSlide - 1;

    if (state.activeSlide === state.qtySlides) {
      slideAfterActive = 1;
    }

    if (slideBeforeActive === 0) {
      slideBeforeActive = state.qtySlides;
    }

    state.slideList.forEach(function(slide) {

      if (slide.number === state.activeSlide) {

        slide.domElement.animate({
            left: '-100%'
          }, 1000);

        state.buttonActive.removeClass('active');

        if (slide.number === state.qtySlides) {
          state.buttonActive = $('.buttons > li').eq(0);
        } else {
          state.buttonActive = $('.buttons > li').eq(slide.number);
        }
        state.buttonActive.addClass('active');
      }
      if (slide.number === slideAfterActive) {
        slide.domElement.animate({
            left: '0'
          }, 1000);
      }
      if (slide.number === slideBeforeActive) {
        slide.domElement.css({'left':'100%'});
      }
    });

    state.slideList.forEach(function(slide) {
      if (slide.number === state.activeSlide) {
        slide.isActiv = false;
      }
      if (slide.number === slideAfterActive) {
        slide.isActiv = true;
      }
    });

    if (state.activeSlide === state.qtySlides) {
      state.activeSlide = 1;
    } else {
      state.activeSlide++;
    }    
  };

  const renderSlider = function (state, activeButton) {
    $('.buttons > li').removeClass('active');
    state.buttonActive = $('.buttons > li').eq(activeButton);
    
    state.buttonActive.addClass('active');

    state.activeSlide = activeButton + 1;    

    state.slideList.forEach(function(slide) {
      if (slide.number === state.activeSlide) {
        slide.isActiv = true;
        slide.domElement.css({'left':'0'});
      } else {
        slide.isActiv = false;
        slide.domElement.css({'left':'100%'});
      }
    });

  };

  sliderJquery($('.slider'), slideList);
});
