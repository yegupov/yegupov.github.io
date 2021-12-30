const bodyTag = document.querySelector('body');
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.navbar-list');
const navLinks = document.querySelectorAll('.site-navbar a');
const animatedElements = document.querySelectorAll('[data-animation]');
const flipButton = document.getElementById('flipButton');
const cardofday = document.getElementById('cardofday');
const flipContainer = document.querySelectorAll('.flip-container')[0];
const photoGallery = document.getElementById('lightgallery');
const loaderEl = document.getElementsByClassName('fullpage-loader')[0];
const scrollToTopButton = document.getElementById('js-top');

let isScrolling = false,
    widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    heightWindow = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;

// Show Scroll-to-top button
const toggleScrollToTopBtn = () => {
  let y = window.scrollY;
  if (y > 0) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

if (localStorage.getItem('cardofdaySelect') == null) {
  localStorage.setItem('cardofdaySelect', '0');
}

// load all event listners
allEventListners();

new Splide( '#reviewsList', {
  	type   : 'loop',
  	perPage: 2,
    breakpoints: {
  		991: {
  			perPage: 1,
  		}
  	},
  	perMove: 1,
    pagination: false
  } ).mount();

lightGallery(document.getElementById('certificate'), {
  download: false
});

lightGallery(photoGallery, {
  download: false
});
addClassGalleryItems(photoGallery);

hideFlipButton();

// POP-UP Window
const modalTriggers = document.querySelectorAll('.popup-trigger');
const modalCloseTrigger = document.querySelector('.popup-modal__close');
const bodyBlackout = document.querySelector('.body-blackout');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    const { popupTrigger } = trigger.dataset;
    const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`);

    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');
    bodyTag.classList.add('popup-bottom');

    popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
       popupModal.classList.remove('is--visible');
       bodyBlackout.classList.remove('is-blacked-out');
       bodyTag.classList.remove('popup-bottom');
    });

    bodyBlackout.addEventListener('click', () => {
      popupModal.classList.remove('is--visible');
      bodyBlackout.classList.remove('is-blacked-out');
      bodyTag.classList.remove('popup-bottom');
    });
  });
});

// functions of all event listners
function allEventListners() {

  document.addEventListener('readystatechange', hidePreloader);

  navToggler.addEventListener('click', toggleMenu);

  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick)); // Nav links click event
  // Animations
  window.addEventListener("scroll", throttleScroll, false);
  document.addEventListener("DOMContentLoaded", scrolling, false);

  flipButton.addEventListener('click', showTarotCard, false);

  window.addEventListener("scroll", toggleScrollToTopBtn);

  window.addEventListener('resize', function(event){
    widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    addClassGalleryItems(photoGallery);
    if(widthWindow > 767 && navMenu.classList.contains('open')) {
      navToggler.classList.remove('toggler-open');
      navMenu.classList.remove('open');
      navMenu.style.height = "auto";
      bodyTag.classList.remove('noscroll');
    }
  });

  scrollToTopButton.onclick = function(e) {
    e.preventDefault();
    window.scrollTo(pageXOffset, 0);
  }
}

// Preloader
function hidePreloader(event) {
	const readyState = "complete";

	if(document.readyState == readyState) {
		loaderEl.classList.add('fullpage-loader--invisible');
		setTimeout( () => {
			loaderEl.parentNode.removeChild(loaderEl);
		}, 2000)
  }
}

// Show Card of Day
function showTarotCard() {
  const quoteContainer = document.querySelector('.card-ofday-image'),
        quoteEl = document.createElement('div');

  localStorage.setItem('cardofdaySelect', '1');

  quoteEl.className = 'card-ofday-quote';
  quoteEl.innerHTML = document.querySelector('.card-ofday-content').getAttribute('data-quote');

  cardofday.setAttribute('src', cardofday.getAttribute('data-src'));
  flipButton.closest('.half-row').classList.add('animation');

  setTimeout( () => {
    flipContainer.classList.add('hover');
  }, 2700);
  setTimeout( () => {
    flipButton.closest('.half-row').classList.add('content');
    quoteContainer.append(quoteEl);
    flipButton.closest('.half-row').classList.remove('animation');
  }, 3000);
}

function hideFlipButton() {
  let date = new Date(),
      todaysDate = +date.getDate();

  if (localStorage.getItem('date') == null) {
    localStorage.setItem('date', todaysDate);

  } else {
    if (localStorage.getItem('date') == todaysDate && localStorage.getItem('cardofdaySelect') === '1') {
      flipButton.style.display = "none";
      const messForUser = document.createElement("p");
      messForUser.classList.add('card-ofday-mess');
      messForUser.innerHTML = "Сегодня Вы уже выбрали свою карту дня."
      flipButton.after(messForUser);
    }
  }
}

function addClassGalleryItems(gallery) {
  let specialItems = [],
      odd = true,
      serialNumber = 0,
      i = 0;
  const differenceOne = 2,
        differenceTwo = 3;

  while (i < 20) {
    if (i === 0) {
      specialItems.push(serialNumber + differenceOne);
      serialNumber += differenceOne;
    } else {
      if (odd) {
        specialItems.push(serialNumber + differenceTwo);
        serialNumber += differenceTwo;
      } else {
        specialItems.push(serialNumber + differenceOne);
        serialNumber += differenceOne;
      }
    }

    odd = !odd;
    i++;
  }

  const galleryItems = gallery.children;

  for (let i = 0, child; child = galleryItems[i]; i++) {
    if (specialItems.includes(i)) {
      if (widthWindow > 600) child.classList.add('right');
      else child.classList.remove('right');
    }
  }
}

// Mobile Menu
function toggleMenu() {
  navToggler.classList.toggle('toggler-open');
  bodyTag.classList.toggle('noscroll');
  slideDownUp(navMenu);
}
// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}

function slideDownUp(elem) {
  if(!elem.classList.contains('open')) {
  	elem.classList.add('open');
    let heightElem = 0;

    if(!elem.classList.contains('navbar-list')) {
      elem.style.height = "auto"
      heightElem = elem.clientHeight + "px"
    } else {
      heightElem = widthWindow > 480 ? heightWindow - 109 + "px" : heightWindow - 119 + "px"
    }

    elem.style.height = "0px"

    setTimeout(() => {
      elem.style.height = heightElem
    }, 0)

  } else {
  	elem.style.height = "0px"
  	elem.addEventListener('transitionend', () => {
    	elem.classList.remove('open')
    }, {once: true})
  }
}

// Animations
function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function() {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}

function scrolling(e) {
  animatedElements.forEach((elem) => {
    if (isFullyVisible(elem)) elem.classList.add('animated', elem.getAttribute('data-animation'));
    if (isPartiallyVisible(elem)) {
      elem.classList.add('animated', elem.getAttribute('data-animation'));
    } else {
      elem.classList.remove('animated', elem.getAttribute('data-animation'));
    }
  })
}

function isPartiallyVisible(el) {
  const elementBoundary = el.getBoundingClientRect(),
        top = elementBoundary.top,
        bottom = elementBoundary.bottom,
        height = elementBoundary.height;
  return ((top + height >= 0) && (height + window.innerHeight >= bottom + 80));
}

function isFullyVisible(el) {
  const elementBoundary = el.getBoundingClientRect(),
        top = elementBoundary.top,
        bottom = elementBoundary.bottom;

  return ((top >= 0) && (bottom + 80 <= window.innerHeight));
}

async function sendForm(e) {
  e.preventDefault();
  
  const contactName = document.getElementById('contactName'),
      contactEmail = document.getElementById('contactEmail'),
      contactMess = document.getElementById('contactMess'),
      contactFields = [contactName, contactEmail, contactMess];
  let formValid = true;

  contactFields.forEach( (field) => {
    field.classList.remove('error');
    formValid = true;
  });

  contactFields.forEach( (field) => {
    if (field.value === '') {
      field.classList.add('error');
      formValid = false;
    }
  });

  if (formValid) {
    let response = await fetch('https://daria-bloom.ru/mail.php', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        name: contactName.value,
        email: contactEmail.value,
        mess: contactMess.value
      })
    });

    let resultForm = await response.json();

    console.log('Message : ', resultForm.message);

    contactMessages.innerHTML = resultForm.message;
  } else {
    contactMessages.innerHTML = "<span style='color:red;'>Заполните все поля!</span>";
  }

}
