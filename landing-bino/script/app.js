/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var initMainSlider = function initMainSlider() {\n  var $sliderMain = $('.js-main-slider');\n  $sliderMain.slick({\n    fade: true,\n    slidesToShow: 1,\n    slidesToScroll: 1,\n    autoplay: true,\n    autoplaySpeed: 3800,\n    easing: 'linear',\n    speed: 1000,\n    zIndex: 1\n  });\n};\n\nvar initServicesSlider = function initServicesSlider() {\n  var $sliderServices = $('.js-services-slider');\n  $sliderServices.slick({\n    arrows: false,\n    dots: true,\n    slidesToShow: 1,\n    slidesToScroll: 1,\n    autoplay: true,\n    autoplaySpeed: 2000,\n    speed: 2000,\n    centerMode: false,\n    vertical: true,\n    zIndex: 0,\n    responsive: [{\n      breakpoint: 768,\n      settings: {\n        vertical: false\n      }\n    }]\n  });\n};\n\nvar getHeightServicesSlide = function getHeightServicesSlide() {\n  var maxHeight = 0;\n  $('.services-slide').each(function (index, element) {\n    if ($(element).height() > maxHeight) {\n      maxHeight = $(element).height();\n    }\n  });\n  return function heightSlide() {\n    return maxHeight;\n  };\n};\n\n$(document).ready(function () {\n  initMainSlider();\n  initServicesSlider(); // Smooth scroll\n\n  var $page = $('html, body');\n  $('.menu-list a').click(function () {\n    $page.animate({\n      scrollTop: $($.attr(this, 'href')).offset().top\n    }, 1700);\n    return false;\n  }); // Mobile menu\n\n  var menu_link = $('.menu-link');\n  var navbar = $('.menu');\n  var menulist_link = $('.menu-list a');\n  menu_link.click(function (event) {\n    event.preventDefault();\n    $(this).toggleClass('active');\n    navbar.toggleClass('active');\n  });\n  menulist_link.click(function () {\n    menu_link.toggleClass('active');\n    navbar.toggleClass('active');\n  }); // Work tabs\n\n  $('.work-item').each(function (index) {\n    if (index > 7) {\n      $(this).hide();\n    }\n  });\n  $('.list-works > li > a').click(function (e) {\n    e.preventDefault();\n    $('.list-works a').removeAttr('class');\n    var aId = this.id,\n        currentTypeWork = $('.work-items .' + aId);\n    $('#' + aId).addClass('active');\n    $('.work-item').not(currentTypeWork).hide(100);\n    currentTypeWork.show(100);\n  });\n  $('#workall').click(function (e) {\n    e.preventDefault();\n    $('.work-item').each(function (index) {\n      if (index < 8) {\n        $(this).show(100);\n      }\n    });\n  }); // Compensation Services slides\n\n  if (window.matchMedia('(max-width: 768px)').matches) {\n    var heightSlider = getHeightServicesSlide();\n    var currentHeightSlide = heightSlider() + 25;\n    $('.slick-slide').height(currentHeightSlide);\n    $('.slick-slide').css('background-color', '#202020'); //console.log('maxHeight ', heightSlider());\n\n    $('#services').height(currentHeightSlide);\n  }\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });
