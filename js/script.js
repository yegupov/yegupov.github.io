'use strict';

(function () {

  // IMAGE ZOOM
  function scaleImage(image) {
    image.addEventListener('click', function () {
      var srcImg = image.getAttribute('src');
      srcImg = srcImg.replace("small", "large");
      addPopupImg(srcImg);
      centerPopupImg(getScrollbarWidth());
      document.querySelector('.popup-btn-close').addEventListener("click", function () {
        removePopupImg();
      });
      document.querySelector('.overlay').addEventListener("click", function () {
        removePopupImg();
      });
    });
  }

  // Get the scrollbar width
  function getScrollbarWidth() {
    var divScroll = document.createElement('div');
    divScroll.style.overflowY = 'scroll';
    divScroll.style.width = '50px';
    divScroll.style.height = '50px';
    document.body.append(divScroll);
    var scrollWidth = divScroll.offsetWidth - divScroll.clientWidth;
    divScroll.remove();
    return scrollWidth;
  }

  function addPopupImg(srcImg) {
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    var popupImg = document.createElement('div');
    popupImg.className = 'popup-img';
    popupImg.innerHTML = "<img src=" + srcImg + ">";
    var btnClose = document.createElement('div');
    btnClose.className = 'popup-btn-close';
    btnClose.innerHTML = "×";
    popupImg.append(btnClose);
    document.body.prepend(popupImg);
    document.body.prepend(overlay);
  }

  function removePopupImg() {
    document.body.removeChild(document.querySelector('.popup-img'));
    document.body.removeChild(document.querySelector('.overlay'));
  }

  function centerPopupImg(scrollWidth) {
    var divPopup = document.querySelector('.popup-img'),
        widthWindow,
        heightWindow,
        styleImgLeft,
        styleImgTop;

    // Get Window size
    function refreshWindowSize() {
      widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      heightWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    function centerPopup() {
      styleImgLeft = Math.trunc((widthWindow - scrollWidth - divPopup.offsetWidth) / 2);
      divPopup.style.left = styleImgLeft + "px";
      styleImgTop = Math.trunc((heightWindow - divPopup.offsetHeight) / 2);
      divPopup.style.top = styleImgTop + "px";
    }

    refreshWindowSize();

    // Get Image Sizes and Center Popup
    divPopup.querySelector('img').addEventListener("load", function () {
      centerPopup();
    });

    // Resize of Window
    window.addEventListener('resize', function () {
      refreshWindowSize();
      centerPopup();
    });
  }

  var imgsZoomable = document.querySelectorAll('.img-zoom');
  imgsZoomable.forEach(function (img) {
    scaleImage(img);
  });
})();
