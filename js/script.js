'use strict';

(function () {

  // IMAGE ZOOM
  function scaleImage(image) {
    image.addEventListener('click', function () {
      var srcImg = image.getAttribute('src');
      srcImg = srcImg.replace("small", "large");
      addPopupImg(srcImg);
      document.querySelector('.popup-btn-close').addEventListener("click", function () {
        removePopupImg();
      });
      document.querySelector('.overlay').addEventListener("click", function () {
        removePopupImg();
      });
    });
  }

  function addPopupImg(srcImg) {
    var popupImg = document.createElement('div');
    popupImg.className = 'popup-img';
    document.body.prepend(popupImg);

    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    popupImg.append(overlay);

    var imgLarge = document.createElement('img');
    imgLarge.setAttribute("src",srcImg);
    popupImg.append(imgLarge);

    var btnClose = document.createElement('div');
    btnClose.className = 'popup-btn-close';
    btnClose.innerHTML = "×";
    popupImg.append(btnClose);
  }

  function removePopupImg() {
    document.body.removeChild(document.querySelector('.popup-img'));
  }

  var imgsZoomable = document.querySelectorAll('.img-zoom');
  imgsZoomable.forEach(function (img) {
    scaleImage(img);
  });
})();
