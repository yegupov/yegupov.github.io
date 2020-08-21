$(function () {
  'use strict';

  // Delivery address
  function findEl(el, array, value) {
    var coincidence = false,
        regular = new RegExp('^' + value, 'ig');
    el.empty();
    for (var i = 0; i < array.length; i++) {
      if (array[i].match(regular)) {
        el.children('li').each(function () {
          if(array[i] === $(this).text()) {
            coincidence = true;
          }
        });
        if(coincidence === false){
           el.append('<li class="address__item js-filter-address">' + array[i] + '</li>');
        }
      }
    }
  }

  var filterInput = $('#filter-address'),
      filterUl = $('.address__list'),
      addresses = [];

  $.getJSON('https://yegupov.github.io/vsem-eda/addresses.json', function(data) {
    addresses = data["addresses"];
  });

  filterInput.bind('input propertychange', function() {
    if($(this).val() !== ''){
      filterUl.fadeIn(100);
      findEl(filterUl, addresses, $(this).val());
    }
    else{
      filterUl.fadeOut(100);
    }
  });

  filterUl.on('click','.js-filter-address', function(e) {
     $('#filter-address').val('');
     filterInput.val($(this).text());
     filterInput.trigger('change');
     filterUl.fadeOut(100);
  });

  // Search
  function processSearch(e) {
    if (e.which == 13 || e.keyCode == 39) {
      var searchPhrase = $('.search__input').val();
      searchPhrase = searchPhrase.charAt(0).toUpperCase() + searchPhrase.substr(1);

      if (localStorage.getItem('phrases')) {
        localStorage.setItem('phrases', localStorage.getItem('phrases') + ',' + searchPhrase);
      } else {
        localStorage.setItem('phrases', searchPhrase);
      }

      $('.search .search__button').removeClass('active');
    	$('.search .search__button').next().toggle();
      $('.input').val('');
    }
  }

  if (navigator.userAgent.indexOf("Firefox") > 0) {
    $('.header__search').keypress(processSearch);
  } else {
    $('.header__search').keydown(processSearch);
  }

  $('.search__button').click(function(event){
		$(event.target).toggleClass('active');
		event.stopPropagation();
    $(event.target).next().toggle();
		$('.input').focus();
    $('.input').val('');

    if ($('.search .search__button').hasClass('active')) {
      var arrSrchPhrases = localStorage.getItem('phrases').split(',').slice(-3).reverse(),
          htmlSearchPhrase = '';
      console.log('arrSrchPhrases : ', arrSrchPhrases);

      $.each(arrSrchPhrases, function (index, value) {
        if (value) htmlSearchPhrase = htmlSearchPhrase + '<li class="search__phrase">' + value + '</li>';
      });

      $('.search__phrases').html(htmlSearchPhrase);
    }
	});

  $('.search .search__submit').click(function (e) {
    $(this).parent().prev().toggleClass('active');
  	$(this).parent().toggle();
  	$('.input').val('');
  });

	$(".search__toggle").on("click", function (event) {
		event.stopPropagation();
	});

  $('.search__phrases').click(function (e) {
    $('.search__input').val($(e.target).text());
    // $(this).toggle();
  })

  // Week-offers Slider
  $('.week-offers__slider').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true
  });

  // Set width for images of week-offers section
  var widthСarouselImg = ($('.container').width() - 50) / 3;
  $('.week-offers__img').css({width: widthСarouselImg + 'px'});

  // Load button for Places section
  var numberDisplayItems = +$('.offer-list.places').attr('data-display');

  $('.offer-list.places .offer-list__item').slice(0, numberDisplayItems).show();

  $('#show-more').click(function(e){
    e.preventDefault();
    $(".offer-list.places .offer-list__item:hidden").slice(0, 4).slideDown("slow");

    if($(".offer-list.places .offer-list__item:hidden").length == 0){
       $('#show-more').fadeOut("slow");
      }
  });

  // Modal toggle behavior
  function processModal() {
    $('.modal').toggleClass('is-visible');

    var widthScrooBar = window.outerWidth - $('body').width();

    if ($('body').hasClass('fixed')) {
      $('body').removeClass('fixed');
      $('body').removeAttr('style');
    } else {
      $('body').addClass('fixed');
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        widthScrooBar = widthScrooBar / 2 + 1;
      }
      $('body').css({paddingRight: widthScrooBar + 'px'});
    }
  }

  $('.modal-toggle').on('click', function(e) {
    e.preventDefault();
    processModal();
  });

  // Phone mask
  $("#phone").mask("+7(999) 999-99-99");

  // Check Login form
  $('#phone, #code').on('input', function () {
    $('.btn-primary').removeAttr('disabled');
    if($(this).val() !== 0) $(this).removeClass('error');
  });

  $('#agreement').on("change", function() {
    if ($("#agreement").prop("checked")) {
      $('.btn-primary').removeAttr('disabled');
      $('.agreement-label').removeClass('error')
    }
  });

  $('.log-in-form').submit(function (e) {
    e.preventDefault();
    var validForm = true;
    $('#phone, #code').each(function () {
      if ($(this).val() == 0)  {
        $('.btn-primary').attr('disabled', 'disabled');
        $(this).addClass('error');
        validForm = false;
      }
    });

    if (!$("#agreement").prop("checked")) {
      $('.btn-primary').attr('disabled', 'disabled');
      $('.agreement-label').addClass('error');
      validForm = false;
    }

    if (validForm) {
      // Очищаем поля формы
      $(':input')
        .not(':button, :submit, :reset, :hidden')
        .val('');
      processModal();
      $('body').addClass('logged');
    }
  });

  // Logout
  $('.logout').click(function (e) {
    e.preventDefault();
    $('body').removeClass('logged');
  })

});
