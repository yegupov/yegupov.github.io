(function() {
  this.StickyMenuTabs = function(inputOptions) {

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
      var stickyTabs = this.options.tabsNode.querySelectorAll('.tab-item'),
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
        tabMenuItems = this.options.tabsNode.querySelectorAll('.tab');

    this.options.tabsMenu = tabsMenu;
    this.options.tabMenuItems = tabMenuItems;

    this.options.tabContentItems.forEach(function (tab, index) {
      if (index !== 0) tab.classList.add('sticky-tabs__invisible');
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

    if (!this.options.mobileTabsOpen || this.options.mobileTabsOpen && window.screen.width > 600) this.options.tabsNode.style.height = this.options.heightCurrentTab + 'px';
    if (!this.options.mobileTabsOpen && window.screen.width <= 600) this.options.tabsNode.style.height = this.options.heightCurrentTab + stickyTabsMarginTop + 'px';
  };

  // process Click Menu
  StickyMenuTabs.prototype._processClickMenu = function (targetItemIndex) {
    this.options.tabMenuItems.forEach(function (menuItem) {
      menuItem.classList.remove('active');
    });
    this.options.tabMenuItems[targetItemIndex].classList.add('active');

    this.options.tabContentItems.forEach(function (contentItem) {
      contentItem.classList.add('sticky-tabs__invisible');
    });
    this.options.tabContentItems[targetItemIndex].classList.remove('sticky-tabs__invisible');

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
    var tabsList = this.options.tabsMenu.querySelector('.tabs'),
        mobileMenuBtn = document.createElement('a');

    mobileMenuBtn.innerHTML = this.options.menuName;
    mobileMenuBtn.href = '#';
    mobileMenuBtn.className = "sticky-tabs__menu";

    if (window.screen.width <= 600 && this.options.tabsNode.querySelector('.sticky-tabs__menu') === null) {

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

    if (window.screen.width > 600 && this.options.tabsNode.querySelector('.sticky-tabs__menu') !== null) this.options.tabsNode.querySelector('.sticky-tabs__menu').remove();

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
    if (window.screen.width <= 600) {
      this.options.tabContentItems.forEach(function (contentItem, index) {
        contentItem.classList.remove('sticky-tabs__invisible');
        if (index !== 0) contentItem.style.paddingTop = '60px';
      });

      this.options.tabsNode.style.height = 'auto';
      this.options.tabContentItems[0].closest('.tab-content').style.paddingTop = '0px';

      this.options.tabMenuItems.forEach( (menuItem, index) => {

        if (this.options.tabContentItems[index].querySelector('.sticky-tabs__caption') === null) {
          var captionTab = document.createElement('p');
          captionTab.className = 'sticky-tabs__caption';
          captionTab.innerHTML = menuItem.innerHTML;
          this.options.tabContentItems[index].prepend(captionTab);
        }

      });
      this.options.tabsMenu.style.display = 'none';
    } else {
      this.options.tabContentItems.forEach(function (contentItem, index) {

        if (index === 0) contentItem.classList.remove('sticky-tabs__invisible');
        else {
          contentItem.classList.add('sticky-tabs__invisible');
          contentItem.style.paddingTop = '0px';
        }

        if (contentItem.querySelector('.sticky-tabs__caption') !== null) contentItem.querySelector('.sticky-tabs__caption').remove();
      });

      this.options.currentTab = 0;
      this._getHeightCurrentTab();


      this.options.tabContentItems[0].closest('.tab-content').style.removeProperty('paddingTop');

      this.options.tabsMenu.style.display = 'block';

      this.options.tabMenuItems.forEach( (menuItem, index) => {
        menuItem.classList.remove('active');
        this.options.tabMenuItems[this.options.currentTab].classList.add('active');
      });
    }
  };

}());

var firstStickyTabsNode = document.querySelector('.first-stickytabs'),
    secondStickyTabsNode = document.querySelector('.second-stickytabs');

firstStickyTabsNode.stabs = new StickyMenuTabs({
  tabsNode: firstStickyTabsNode,
  menuName: 'Страницы сайта'
});

secondStickyTabsNode.stabs = new StickyMenuTabs({
  tabsNode: secondStickyTabsNode,
  menuName: 'Список услуг',
  mobileTabsOpen: true
});
