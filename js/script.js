'use strict';

(function () {

  const bodyElem = document.querySelector('body'),
        // navToggler = bodyElem.querySelector('.nav-toggler'),
        // navMenu = bodyElem.querySelector('.aside__nav'),
        workStickyTabsNode = document.querySelector('.work-stickytabs'),
        smarttabs = new Tabs(),
        contactForm = document.getElementById('contactForm'),
        asideSection = document.querySelector('.aside'),
        footerSection = document.querySelector('.footer'),
        urlPath = window.location.pathname;


  let widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      heightWindow = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;

  writeAsideAndFooter();
  activateShowImageLinks();
  feather.replace(); // init Feather Icons : https://github.com/feathericons/feather#feather
  correctVideoSizes();
  formCodeExamples();
  handleAccordionMenu();
  toggleScrollToTop();

  const navToggler = bodyElem.querySelector('.nav-toggler'),
        navMenu = bodyElem.querySelector('.aside__nav');

  navToggler.addEventListener('click', toggleMainMenu);
  if (contactForm !== null) contactForm.addEventListener('submit', handleContactForm);

  async function handleContactForm (e) {
    e.preventDefault();

    const contactName = document.getElementById('contactName'),
          contactPhone = document.getElementById('contactPhone'),
          contactEmail = document.getElementById('contactEmail'),
          contactMess = document.getElementById('contactMess'),
  	      contactNotice = contactForm.querySelector('.form-notice'),
          contactAgreement = document.getElementById('contactAgreement'),
          antiSpamInput = document.getElementById('contactMagicinput'),
          emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
          contactFields = [contactName, contactPhone, contactEmail, contactMess];

    let formValid = true;

    console.log('Spam input : ', antiSpamInput.value);

    if (antiSpamInput.value.length) {
      contactNotice.innerHTML = "<span style='color:green;'>Message sent!</span>";
    } else {

      contactFields.forEach( (field, index) => {
        field.classList.remove('error');
        contactAgreement.parentNode.classList.remove('error');
        formValid = true;

        if (field.value === '' ||
          index === contactFields.length - 2 && !field.value.match(emailPattern)) {

          if (field.getAttribute('data-required') === 'required') {
            field.classList.add('error');
            formValid = false;
          }
        }
      });

      if (!contactAgreement.checked) {
        contactAgreement.parentNode.classList.add('error');
        formValid = false;
      }

      if (formValid) {
        console.log('Form is valid!');
        let response = await fetch('https://make-website.ru/assets/templates/work/api/myGithub-mail.php', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            name: contactName.value,
            phone: contactPhone.value,
            email: contactEmail.value,
            mess: contactMess.value
          })
        });

        let result = await response.json();
        contactNotice.innerHTML = result.message;

        contactName.value = '';
        contactPhone.value = '';
        contactEmail.value = '';
        contactMess.value = '';
        contactAgreement.checked = false;

      } else {
        contactNotice.innerHTML = "<span style='color:red;'>Fill in all the fields!</span>";
      }
    }
  }

  // Mobile Menu
  function toggleMainMenu() {
    navMenu.classList.toggle('open');
    navToggler.classList.toggle('toggler-open');
    bodyElem.classList.toggle('noscroll');
  }

  /* function navLinkClick() {
    if (navMenu.classList.contains('open')) navToggler.click();
  }

  function slideDownUp(elem) {
    if(!elem.classList.contains('open')) {  // Slide down effect -  https://jsfiddle.net/gebpjo1L/18/
    	elem.classList.add('open');
      let heightElem = 0;

      if(!elem.classList.contains('aside__nav')) {
        elem.style.height = "auto"
        heightElem = elem.clientHeight + "px"
      } else {
        heightElem = widthWindow > 480 ? heightWindow - 109 + "px" : heightWindow - 119 + "px"
      }

      elem.style.height = "0px"
      // console.log('heightElem = ', heightElem);

      setTimeout(() => {
        elem.style.height = heightElem
      }, 0)

    } else {  // Slide up.
    	elem.style.height = "0px"
      // Remove the `open` class when the animation ends.
    	elem.addEventListener('transitionend', () => {
      	elem.classList.remove('open')
      }, {once: true})
    }
  }  */

  // Lazy load images
  lazyLoadImages();
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy');
    lazyImages.forEach(function (img) {
      img.setAttribute('loading', 'lazy');

      let srcLazyImage = img.getAttribute("src");
      srcLazyImage = srcLazyImage.replace('-th','');
      img.setAttribute("src", srcLazyImage);
    });
  }

  // Text-link hover - show image
  function activateShowImageLinks() {
    const showImageLinks = document.querySelectorAll('.show-image');
    showImageLinks.forEach((el) => {
      const imageLinkIcon = document.createElement('i');
      const imageLinkPic = document.createElement('img');
      imageLinkPic.src = el.getAttribute('href');
      imageLinkPic.classList.add('invisible');
      imageLinkIcon.setAttribute('data-feather', 'image');

      el.append(imageLinkIcon);
      el.append(imageLinkPic);

      el.addEventListener('click', (e) => {
        e.preventDefault();
      });
      el.addEventListener('mouseover', (e) => {

        const imageLinkCoord = e.target.getBoundingClientRect();

        if (imageLinkCoord.left > widthWindow / 1.6) {
          imageLinkPic.style.left = 'auto';
          imageLinkPic.style.right = '-25px';
        }
        if (imageLinkCoord.left > widthWindow / 2.5 && imageLinkCoord.left <= widthWindow / 1.6) imageLinkPic.style.left = '-300px';
        imageLinkPic.classList.remove('invisible');

      });
      el.addEventListener('mouseleave', (e) => {
        imageLinkPic.classList.add('invisible');
      });
    });
  }

  // Scroll To Top Button
  function toggleScrollToTop() {
    const scrollToTopButton = document.getElementById('js-scrolltotop');

    // Show Scroll-to-top button
    const toggleScrollToTopBtn = () => {
      let y = window.scrollY;
      if (y > 0) {
        scrollToTopButton.className = "top-link show";
      } else {
        scrollToTopButton.className = "top-link hide";
      }
    };

    window.addEventListener("scroll", toggleScrollToTopBtn);

    scrollToTopButton.onclick = function(e) {
      e.preventDefault();
      window.scrollTo(pageXOffset, 0);
    }
  }

  const splideCarousel = document.getElementById('splide');
  if (splideCarousel !== null) {
    new Splide( '#splide', {
      type   : 'loop',
    } ).mount();
  }

  // Multi-level nested menu
  function handleAccordionMenu() {
    const accordionnavItems = document.querySelectorAll('.accordionnav li');
    const accordionnavLinks = document.querySelectorAll('.accordionnav a');

    accordionnavLinks.forEach(function (link, index) {
      link.addEventListener('click', handleClickAccordionNav);
    });

    function handleClickAccordionNav (event) {
      event.preventDefault();
      const target = event.target;

      if (target.classList.contains('accordionnav__heading')) {
        accordionnavItems.forEach(function (item) {

          let link = item.querySelector('.accordionnav__heading');
          if (link !== null && link !== target) link.closest('li').classList.remove('show');
          if (isElementContainsTargetElement(item, target) && item !== target.closest('li')) item.classList.add('show');
        });

        target.closest('li').classList.toggle('show');
      } else {
        accordionnavItems.forEach(function (item) {
          item.classList.remove('show');
        });
        // Make Redirect
        console.log('Just link : ', target.getAttribute('href'));
        window.location = target.getAttribute('href');
      }
    }
  }

  function isElementContainsTargetElement(givenEl, targetEl) {
  	let reachedEndOfDOMTree = targetEl === null;
  	if (reachedEndOfDOMTree) return false;

  	let parentEl = targetEl.parentNode;
  	return parentEl === givenEl ? true : isElementContainsTargetElement(givenEl, parentEl);
  }


  // function findParents(childElem, parentElem) {
  //   let parents = [];
  //   if (childElem.closest(parentElem)) {
  //     console.log('Parent : ', childElem.closest(parentElem));
  //     parents.push(childElem.closest(parentElem));
  //     childElem = childElem.closest(parentElem);
  //     findParents(childElem, parentElem);
  //   }
  //   return parents;
  // }

  function findParents(childElem, parentElem) {
    let parents = [];
    // if (childElem.closest(parentElem)) {
    if (childElem.parentNode.tagName) {
      console.log('Parent : ', childElem.closest(parentElem));
      parents.push(childElem.closest(parentElem));
      childElem = childElem.closest(parentElem);
      findParents(childElem, parentElem);
    }
    return parents;
  }

  // Code Pre
  function formCodeExamples() {
    //filter IE8 and earlier which don't support the generated content
		if(typeof(window.getComputedStyle) == 'undefined') return;
		let pre = document.getElementsByTagName('pre');

		for (let len = pre.length, i = 0; i < len; i ++) {
			//get the CODE or SAMP element inside it,
			//or just in case there isn't one, continue to the next PRE
			let code = pre[i].getElementsByTagName('code').item(0);
			if(!code)	{
				code = pre[i].getElementsByTagName('samp').item(0);
				if(!code)	{
					continue;
				}
			}
			console.log('Code elem : ', code);
			//create a containing DIV column (but don't append it yet)
			//including aria-hidden so that ATs don't read the numbers
			let column = document.createElement('div');
			column.setAttribute('aria-hidden', 'true');

			//split the code by line-breaks to count the number of lines
			//then for each line, add an empty span inside the column
			for (let n = 0; n < code.innerHTML.split(/[\n\r]/g).length; n ++)	{
				column.appendChild(document.createElement('span'));
			}
			//now append the populated column before the code element
			pre[i].insertBefore(column, code);
			//finally add an identifying class to the PRE to trigger the extra CSS
			pre[i].className = 'line-numbers';
		}
  }

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

  function Tabs() {

    let menuLinks = document.querySelectorAll('.smarttabs__navlink'),
       tabsContent = document.querySelectorAll('.smarttabs__tabcontent');
    let bindAll = function() {
      for (let i = 0; i < menuLinks.length ; i++) {
        menuLinks[i].addEventListener('click', change, false);
      }
    }
    let clear = function() {
      for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].classList.remove('active');
        tabsContent[i].classList.remove('active');
      }
    }
    let change = function(e) {
      e.preventDefault();
      clear();
      e.target.classList.add('active');
      let currentTabId = e.currentTarget.getAttribute('href').slice(1);
      document.getElementById(currentTabId).classList.add('active');
    }
    bindAll();
  }

  // StickyMenuTabs
  window.StickyMenuTabs = function(inputOptions) {

    this.options = {
      tabsNode: null,
      menuName: "Tabs menu",
      mobileTabsOpen: false,
      tabsMenu: null,
      tabMenuItems: [],
      tabContentItems: [],
      heightCurrentTab: 0,
      currentTab: 0
    };

    for(var prop in inputOptions){
      if(inputOptions.hasOwnProperty(prop) && this.options.hasOwnProperty(prop)){
        this.options[prop] = inputOptions[prop];
      }
    }

    if (this.options.tabsNode) {
      var stickyTabs = this.options.tabsNode.querySelectorAll('.stickytabs__content'),
          firstStickyTabImages = stickyTabs[0].querySelectorAll('img');

      this.options.tabContentItems = stickyTabs;

      // We are waiting for the loading of all the pictures of the First tab
      Promise.all(Array.from(firstStickyTabImages)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
          .then(() => {
        // console.log('Images finished loading');

        this._init();

        if (this.options.mobileTabsOpen) this._expandAllTabs();
        else this._initMobileMenu();

        window.addEventListener('resize', this._processWindowResize.bind(this), false);

      });
    }
  };

  // init Menu Actions
  StickyMenuTabs.prototype._init = function () {
    var tabsMenu = this.options.tabsNode.children[0],
        tabMenuItems = this.options.tabsNode.querySelectorAll('.stickytabs__navitem');

    this.options.tabsMenu = tabsMenu;
    this.options.tabMenuItems = tabMenuItems;

    this.options.tabContentItems.forEach(function (tab, index) {
      if (index !== 0) tab.classList.add('stickytabs__invisible');
    });

    if (document.readyState === "complete") {
      this._getHeightCurrentTab();
    } else {
      var checkDocumentLoad = () => {
        var self = this;
        if (document.readyState === "complete") {
          // console.log('window.ONLOAD Height First = ', self.options.tabContentItems[0].offsetHeight);
          self._getHeightCurrentTab();
        } else {
          setTimeout(function () {
            checkDocumentLoad(self);
          }, 5);
        }
      }
      checkDocumentLoad();
    }

    tabMenuItems[0].classList.add('active');

    tabMenuItems.forEach( (menuItem, index) => {
      menuItem.addEventListener('click', this._processClickMenu.bind(this, index), false);
    });
  };

  // get Height Current Tab
  StickyMenuTabs.prototype._getHeightCurrentTab = function () {
    var stickyTabsMarginTop = +getComputedStyle(this.options.tabsNode).marginTop.slice(0, -2);

    this.options.heightCurrentTab = this.options.tabContentItems[this.options.currentTab].clientHeight;

    if (!this.options.mobileTabsOpen ||
      this.options.mobileTabsOpen &&
      window.screen.width > 800) this.options.tabsNode.style.height = this.options.heightCurrentTab + 110 + 'px';  // 110px - margins Img and Video

    if (!this.options.mobileTabsOpen &&
      window.screen.width <= 800) this.options.tabsNode.style.height = this.options.heightCurrentTab + stickyTabsMarginTop + 110 + 'px';

    if (this.options.mobileTabsOpen && window.screen.width <= 800 ||
      this.options.mobileTabsOpen &&
      window.innerWidth <= 800) this.options.tabsNode.style.height = 'auto';
  };

  // process Click Menu
  StickyMenuTabs.prototype._processClickMenu = function (targetItemIndex) {
    this.options.tabMenuItems.forEach(function (menuItem) {
      menuItem.classList.remove('active');
    });
    this.options.tabMenuItems[targetItemIndex].classList.add('active');

    this.options.tabContentItems.forEach(function (contentItem) {
      contentItem.classList.add('stickytabs__invisible');
    });
    this.options.tabContentItems[targetItemIndex].classList.remove('stickytabs__invisible');

    this.options.currentTab = targetItemIndex;
    this._getHeightCurrentTab();

    window.scrollTo({
      top: this.options.tabsNode.getBoundingClientRect().top + pageYOffset - 30,
      behavior: "smooth"
    });
  };

  // Window Resize
  StickyMenuTabs.prototype._processWindowResize = function () {
    this._getHeightCurrentTab();

    if (this.options.mobileTabsOpen) this._expandAllTabs();
    else this._initMobileMenu();
  };

  StickyMenuTabs.prototype._initMobileMenu = function () {
    var tabsList = this.options.tabsMenu.querySelector('.stickytabs__nav'),
        mobileMenuBtn = document.createElement('a');

    mobileMenuBtn.innerHTML = this.options.menuName;
    mobileMenuBtn.href = '#';
    mobileMenuBtn.className = "stickytabs__menu";

    if (window.screen.width <= 800 && this.options.tabsNode.querySelector('.stickytabs__menu') === null) {

      this.options.tabsMenu.prepend(mobileMenuBtn);

      mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenuBtn.classList.toggle('menuactive');
        tabsList.classList.toggle('menu-active');

        var tabsMenuTop = this.options.tabsMenu.getBoundingClientRect().top + pageYOffset,
            tabsMenuHeight = tabsList.offsetHeight,
            tabsSectionBottom = this.options.tabsNode.getBoundingClientRect().top + pageYOffset + this.options.heightCurrentTab,
            lowerBoundsDifference = tabsSectionBottom - (tabsMenuTop + tabsMenuHeight);

        if (lowerBoundsDifference < tabsMenuHeight) {
          window.scrollTo({
            top: tabsSectionBottom - tabsMenuHeight - 82,
            behavior: "smooth"
          });
        }
      });

      tabsList.addEventListener('click', function (e) {
        e.preventDefault();
        mobileMenuBtn.classList.toggle('menuactive');
        tabsList.classList.toggle('menu-active');
      });
    }

    if (window.screen.width > 800 &&
      this.options.tabsNode.querySelector('.stickytabs__menu') !== null) this.options.tabsNode.querySelector('.stickytabs__menu').remove();

    function outsideClickListener(event) {
      if (!this.options.tabsMenu.contains(event.target) && tabsList.classList.contains('menu-active')) {
        mobileMenuBtn.classList.toggle('menuactive');
        tabsList.classList.toggle('menu-active');
        document.removeEventListener('click', outsideClickListener);
      }
    }
    document.addEventListener('click', outsideClickListener.bind(this), false);
  };

  StickyMenuTabs.prototype._expandAllTabs = function () {
    if (window.screen.width <= 800) {
      this.options.tabContentItems.forEach(function (contentItem, index) {
        contentItem.classList.remove('stickytabs__invisible');
        if (index !== 0) contentItem.style.paddingTop = '60px';
      });

      this.options.tabsNode.style.height = 'auto';
      this.options.tabContentItems[0].closest('.stickytabs__article').style.paddingTop = '0px';

      this.options.tabMenuItems.forEach( (menuItem, index) => {

        if (this.options.tabContentItems[index].querySelector('.stickytabs__caption') === null) {
          var captionTab = document.createElement('p');
          captionTab.className = 'stickytabs__caption';
          captionTab.innerHTML = menuItem.innerHTML;
          this.options.tabContentItems[index].prepend(captionTab);
        }

      });
      this.options.tabsMenu.style.display = 'none';
    } else {
      this.options.tabContentItems.forEach(function (contentItem, index) {

        if (index === 0) contentItem.classList.remove('stickytabs__invisible');
        else {
          contentItem.classList.add('stickytabs__invisible');
          contentItem.style.paddingTop = '0px';
        }

        if (contentItem.querySelector('.stickytabs__caption') !== null) contentItem.querySelector('.stickytabs__caption').remove();
      });

      this.options.currentTab = 0;
      this._getHeightCurrentTab();


      this.options.tabContentItems[0].closest('.stickytabs__article').style.removeProperty('paddingTop');

      this.options.tabsMenu.style.display = 'block';

      this.options.tabMenuItems.forEach( (menuItem, index) => {
        menuItem.classList.remove('active');
        this.options.tabMenuItems[this.options.currentTab].classList.add('active');
      });
    }
  };


  // OLD CODE ---------------------------------------------------------------------  Mobile Portfolio Menu
  function togglePortfolioMenu(menuCheckbox, sidebarNav) {

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

  if (workStickyTabsNode !== null) {
    workStickyTabsNode.stabs = new StickyMenuTabs ({
      tabsNode: workStickyTabsNode,
      menuName: 'Screenshots/Video'
    });
  }

  function writeAsideAndFooter() {

    const currentYear = new Date().getFullYear();

    asideSection.innerHTML = `
    <a href="/" class="aside__logo" title="Home">YG</a>

    <ul class="aside__nav flexbox">
      <li><a href="/" title="About me">About</a></li>
      <li><a href="/works/index.html" title="Portfolio">Works</a></li>
      <li><a href="/contact.html" title="Contact me">Contact</a></li>
      <li><a href="../../frontend-egupov-cv.pdf" title="Resume PDF" target="_blank">CV</a></li>
    </ul>
    <button class="nav-toggler"><span></span></button>

    <div class="icon-links">
      <div class="icon-links__item gh">
        <a rel="nofollow" href="https://github.com/yegupov" title="GitHub" target="_blank"><i data-feather="github"></i></a>
      </div>
      <div class="icon-links__item ig">
        <a rel="nofollow" href="https://www.instagram.com/gennadii_makewebsite/" title="Instagram" target="_blank"><i data-feather="instagram"></i></a>
      </div>
      <div class="icon-links__item tg">
        <a rel="nofollow" href="https://t.me/gennadii_makewebsite" title="Telegram" target="_blank"><i data-feather="send"></i></a>
      </div>
      <div class="icon-links__item mail">
        <a rel="nofollow" href="mailto:make.website.info@gmail.com" title="make.website.info@gmail.com" target="_blank"><i data-feather="mail"></i></a>
      </div>
    </div>`;

    footerSection.innerHTML =
      `<p>Designed and developed by <a href="https://github.com/yegupov" target="_blank">Gennady Yegupov</a> <span>©${currentYear} All rights reserved</span></p>`;

    highlightActiveMenuItem();
  }

  function highlightActiveMenuItem() {
    const menuLinks = bodyElem.querySelectorAll('.aside__nav a');

    menuLinks.forEach(function (link, index) {
      if (link.getAttribute('href') === urlPath && index < menuLinks.length - 1 ||
          urlPath.indexOf('/works/') !== -1 && index === 1)
          link.classList.add('active');
    });
  }

})();
