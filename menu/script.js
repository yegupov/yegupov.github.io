'use strict';

(function() {
	let menuExample = [{
		title: 'File',
		action: function () {console.log('open file')}
	}, {
		title: 'Edit',
		action: function () {console.log('edit content')}
	}, {
		title: 'Save',
		submenu: [{
			title: 'Save on comp',
			action: function () {alert('Вы хотите сохранить на компьютер'); console.log('comp')}
		}, {
			title: 'Save on disk',
			submenu: [{
				title: 'Жесткий диск',
				action: function () {console.log('Hard disk')}
			}, {
				title: 'Флешка',
				action: function () {console.log('Fleshka')}
			}]
		}]
	}, {
		title: 'More stuff',
		submenu: [{
			title: 'Send by email',
			action: function () {console.log('emailed')}
		}, {
			title: 'Send via skype',
			action: function () {console.log('skyped')}
		}]
	}];

	let contextMenuNode = document.querySelector('.container-menu');
	let blockMenu;

	// Создаем Класс-конструктор менюшек
	class ContextMenu {
	    constructor(node, menuStructure) {
		    this.node = node;
				this.menuStructure = menuStructure;
				this.createContextMenu();
				this.showOrHideSubmenu();
				this.showOrHideMenu();
        this.performAction(menuStructure);
		}

		// методы (функции):
		// Создать меню и вставить на страницу

		createContextMenu() {
			// Создаем блок div с меню
			blockMenu = document.createElement('div');
			blockMenu.className = 'context-menu';
			blockMenu.style.display = 'none';

			// Формируем Список меню <ul><li></li></ul>
			function createList(listData, listContainer, itemContainer) {
				listContainer = listContainer || 'ul';
				itemContainer = itemContainer || 'li';

				let containerItems = document.createElement(listContainer);  // Создаем список ul
				var itemTopLevel, listBottomLevel;

				for (let i = 0; i < listData.length; i += 1) {
					itemTopLevel = document.createElement(itemContainer); // li Top Level
					itemTopLevel.innerHTML = listData[i].title;
					containerItems.appendChild(itemTopLevel);             // вставка li в конец внутри ul
					if (listData[i].submenu) {
						itemTopLevel.className = 'has-submenu';
						// console.log('submenu', listData[i].submenu);
						listBottomLevel = createList(listData[i].submenu);
						// console.log('listBottomLevel', listBottomLevel);
						itemTopLevel.innerHTML += listBottomLevel.outerHTML;
					} 
				}
				return containerItems;
			}

			blockMenu.innerHTML = createList(this.menuStructure).outerHTML;
			console.log('blockMenu', blockMenu);

			// Вставляем на страницу
			this.node.appendChild(blockMenu);
		}

		// Скрывать / Показывать Подменю
		showOrHideSubmenu() {
			let itemsWithSubmenu = document.querySelectorAll('.has-submenu');
			for (let i = 0; i < itemsWithSubmenu.length; i++) {
			    let subList = itemsWithSubmenu[i].childNodes[1];
				subList.style.display = 'none';
				itemsWithSubmenu[i].addEventListener('mouseenter', function(event) {
				    subList.style.display = 'block';
				}, false);
				itemsWithSubmenu[i].addEventListener('mouseleave', function(event) {
				    subList.style.display = 'none';
				}, false);
			}
		}

		// Скрывать / Показывать все Контекстное меню
		showOrHideMenu() {
			this.node.addEventListener('contextmenu', function (event) {
				event.preventDefault();
				blockMenu.style.display = 'block';

				// Позиционируем
				blockMenu.style.left = event.pageX + 'px';
				blockMenu.style.top = event.pageY + 'px';
				console.log('Слева и сверху:', blockMenu.style.left, blockMenu.style.top);
			}, false);

			// Клик за пределами блока
      document.body.addEventListener('click', function (event) {
				function topWalker(node, testFunc, lastParent) {
				  while (node && node !== lastParent) {
					  if (testFunc(node)) {
						  return node;
						}
						node = node.parentNode;
					}
				}

				if (!topWalker(event.target, function (node) {
					return blockMenu === node;
				})) {
					blockMenu.style.display = 'none';
				}
			}, false);
		}

		// Выполнить действие при клике на пункт меню
		performAction(menuList) {
			let arrItems = [];
			function expandArray(element) {
				element.forEach(function(item) {
					if (!item.submenu) {
						arrItems.push(item);
					} else {
						expandArray(item.submenu);
					}
				});
				return arrItems;
			}

			let arrItemsMenu = expandArray(menuList);

			let itemsMenu = document.querySelectorAll('li');
			for (let i = 0; i < itemsMenu.length; i++) {
				if (!itemsMenu[i].classList.contains('has-submenu')) {
					let action;
					arrItemsMenu.forEach(function(item) {
						if (itemsMenu[i].textContent === item.title) {
						    action = item.action;
						}
					});
					itemsMenu[i].addEventListener('click', function(event) {
						action();
					}, false);
				}
			}
		}
	}

	// Создаем новый Экземпляр и Записываем созданный Экземпляр меню в свойство Контейнера
	contextMenuNode.cm = new ContextMenu(contextMenuNode, menuExample);

}());
