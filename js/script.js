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

  // Language selection
  const languageSwitcher = document.querySelector('#languageswitcher');

  languageSwitcher.addEventListener('change', function () {
    let urlAddress = window.location.href,
        relativeUrlAddress = urlAddress.replace('https://' + window.location.host, '');
    relativeUrlAddress = relativeUrlAddress.replace('/en/', '/');

    if (languageSwitcher.checked == true) {
      window.location = 'https://yegupov.github.io/en' + relativeUrlAddress;
    } else {
      window.location = 'https://yegupov.github.io' + relativeUrlAddress;
    }
  });

  // Mobile Portfolio Menu
  function togglePortfolioMenu(menuCheckbox, sidebarNav) {
    let widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (widthWindow <= 600 && menuCheckbox) {
      menuCheckbox.addEventListener('change', function () {
        if (menuCheckbox.checked == true) {
          sidebarNav.classList.add('active');
        } else {
          sidebarNav.classList.remove('active');
        }
      });
    }
  }

  const portfolioMenuCheckbox = document.querySelector('#portfoliomenu'),
        sidebarNav = document.querySelector('.sidebar-nav'),
        portfolioNavLinks = document.querySelectorAll('.portfolio-nav a');

  togglePortfolioMenu(portfolioMenuCheckbox, sidebarNav)

  window.addEventListener('resize', function() {
    togglePortfolioMenu(portfolioMenuCheckbox, sidebarNav)
  });

  portfolioNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      sidebarNav.classList.remove('active');
      portfolioMenuCheckbox.checked = false;
    });
  });

  // <video> size correction
  function correctVideoSizes () {
    const videoOnThePage = document.querySelectorAll('video');
    if (videoOnThePage !== null) {
      videoOnThePage.forEach(function (video, index) {
        let widthVideoContainer = video.parentNode.offsetWidth,
            videoWidth = video.getAttribute('width');

        if (videoWidth > widthVideoContainer) {
          video.setAttribute('width', widthVideoContainer);
          video.setAttribute('height', widthVideoContainer * video.getAttribute('height') / videoWidth);
        }
      });
    }
  }
  correctVideoSizes();

})();
