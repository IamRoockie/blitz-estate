/* Menu Animation */
document.querySelector('.menu-hamburger__inner').onclick = menuToggle;
document.querySelector('.menu__cross').onclick = menuToggle;
document.querySelectorAll('.menu__link').forEach(function (item) {
	item.onclick = menuToggle;
});

/* Appartments Filter */
const appartments = document.querySelectorAll('.apartments__item');
document.querySelectorAll('.apartments__tab').forEach(function (tab) {
	tab.onclick = function () {
		if (!this.classList.contains('apartments__tab--active')) {
			/* Toggle Tabs */
			classToggle('.apartments__tab--active', 'apartments__tab--active');
			this.classList.add('apartments__tab--active');
			/* Filter */
			let currentFilter = getCurrentFilter();
			appartments.forEach(function (appartment) {
				let price = getAppartmentPrice(appartment);
				if (price >= currentFilter[0]) {
					if (currentFilter.length >= 1 && price > currentFilter[1]) {
						hideAppartment(appartment);
					} else {
						showAppartment(appartment);
					}
				} else {
					hideAppartment(appartment);
				}
			});
		}
	}
});

/* Slider */
document.querySelectorAll('.about__img').forEach(function (item) {
	item.onclick = function () {
		let imageBig = document.querySelector('.about__img--big');
		if (item != imageBig) {
			let pathCur = item.getAttribute('src');
			let pathBig = imageBig.getAttribute('src');
			item.style.opacity = 0.3;
			imageBig.style.opacity = 0.3;
			setTimeout(() => {
				item.setAttribute('src', pathBig);
				imageBig.setAttribute('src', pathCur);
				item.style.opacity = 1;
				imageBig.style.opacity = 1;
			}, 200);
		}
	}
});

/* Listener for Modal */
document.querySelectorAll('.btn').forEach(function (item) {
	if (!item.classList.contains('modal__btn')) {
		item.addEventListener('click', showModalWindow);
	}
})

/* Close Modal window */
document.querySelector('.modal__close').onclick = closeModalWindow;


/* Fns */
function classToggle(item, className) {
	document.querySelector(item).classList.toggle(className);
}

function menuToggle() {
	classToggle('.menu', 'menu--hidden');
	classToggle('.menu-hamburger', 'menu-hamburger--hidden');
}

function getAppartmentPrice(item) {
	return +item.querySelector('.apartments__price')
		.textContent
		.replace(/\D/g, '');
}

/* TODO: Finish the animation for show/hide appartment item */
function hideAppartment(item) {
	item.style.display = 'none';
	// item.style.opacity = 0;
	// setTimeout(() => {
	// 	item.style.display = 'none';
	// }, 300);
}

function showAppartment(item) {
	item.style.display = 'block';
	// setTimeout(() => {
	// 	item.style.opacity = 1;
	// }, 300);
}

function getCurrentFilter() {
	return document.querySelector('.apartments__tab--active')
		.getAttribute('data-price')
		.split('-')
		.map(x => +x * 1_000_000);
}

function showModalWindow(item) {
	item.preventDefault();
	document.querySelector('.modal').classList.add('modal--show');
	document.querySelector('body').style.overflow = 'hidden';
}

function closeModalWindow() {
	document.querySelector('.modal').classList.remove('modal--show');
	document.querySelector('body').style.overflow = 'auto';
}
