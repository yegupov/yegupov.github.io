'use strict';

(function() {
    const stopwatchFirstNode = document.querySelector('.stopwatch-first');
	const stopwatchSecondNode = document.querySelector('.stopwatch-second');

	// Содержит ли элемент givenEl в себе TargetElement
	function isElementContainsTargetElement(givenEl, targetEl) {
		let reachedEndOfDOMTree = targetEl === null;    // reache - достиг ли конца DOM дерева
		if (reachedEndOfDOMTree) return false;     // Если достиг, то вернуть false

		let parentEl = targetEl.parentNode;
		return parentEl === givenEl ? true : isElementContainsTargetElement(givenEl, parentEl);
	}

	class Stopwatch {
	    constructor(node) {
		this.node = node;
  		this.switchBtn;
  		this.timer;
  		this.infoBtn;
  		this.stopwatchList;
  		this.resetBtn;
        	this.stopwatchListItems = [];
        	this.stopwatchListItemsClose = [];
  		this.lastValueInterval = 0;
  		this.createStopwatchHtmlMarkup();
  		this.node.addEventListener('click', this.onNodeClick.bind(this), false);
  		this.node.addEventListener('keyup', this.onNodeKeyup.bind(this), false);
  	    }

		  createStopwatchHtmlMarkup() {
		    let blockTimer = document.createElement('div');
			blockTimer.className = 'row';
			this.node.appendChild(blockTimer);

			let colLeft = document.createElement('div');
			colLeft.className = 'col-xs-4';
			blockTimer.appendChild(colLeft);

			let stopwatchCurrent = document.createElement('h2');
			stopwatchCurrent.className = 'stopwatch-current';
			stopwatchCurrent.innerHTML = '00:00:00:000';
			colLeft.appendChild(stopwatchCurrent);
			this.timer = stopwatchCurrent;

			let stopwatchLaps = document.createElement('div');
			stopwatchLaps.className = 'stopwatch-laps';
			colLeft.appendChild(stopwatchLaps);
			this.stopwatchList = stopwatchLaps;

			let colRight = document.createElement('div');
			colRight.className = 'col-xs-4 stopwatch-controls';
			blockTimer.appendChild(colRight);

            let btnGroup = document.createElement('div');
			btnGroup.className = 'btn-group btn-group-lg';
			// btnGroup.innerHTML = 'Knopki';
			colRight.appendChild(btnGroup);

            let btnStart = document.createElement('button');
			btnStart.className = 'btn btn-primary';
			btnStart.innerHTML = 'Start';
			btnGroup.appendChild(btnStart);
			this.switchBtn = btnStart;

			let btnLap = document.createElement('button');
			btnLap.className = 'btn btn-info';
			btnLap.innerHTML = 'Lap';
			btnGroup.appendChild(btnLap);
			this.infoBtn = btnLap;

			let btnReset = document.createElement('button');
			btnReset.className = 'btn btn-danger btn-sm';
			btnReset.innerHTML = 'Reset';
			colRight.appendChild(btnReset);
			this.resetBtn = btnReset;
		}

		startStopwatch() {
		  let _this = this;
			let timer = this.timer;
			let node = this.node;
			let hour = 0;
			let min = 0;
			let sec = 0;
			let msec = 0;
			let lastValueInterval = this.lastValueInterval;

			let start = new Date();
			start.setTime(start.getTime() - _this.lastValueInterval); // Устанавливаем время Первого клика по Секундомеру

			let end, timeInterval, balanceHour, balanceMin;

			this.switchBtn.innerText = 'Stop';

			node.timer = setInterval(function () {    // Тут можно использовать рекурсивный setTimeout
				end = new Date();
				timeInterval = end.getTime() - start.getTime();  // замерить промежуток времени, произошедший между двумя этими вызовами

				hour = Math.floor(timeInterval/3600000);   // Math.floor округляет число вниз
				balanceHour = timeInterval % 3600000;

				min = Math.floor(balanceHour/60000);
				balanceMin = balanceHour % 60000;          // остаток от деления balanceHour на 1000

				sec = Math.floor(balanceMin/1000);
				msec = balanceMin % 1000;

				if (hour < 10) hour ='0' + hour;
				if (min < 10) min = '0' + min;
				if (sec < 10) sec = '0' + sec;
				if (msec < 10) msec = '0' + msec;

				timer.innerText = hour + ':' + min + ':' + sec + ':' + msec;
				_this.lastValueInterval = timeInterval;
			}, 1);
		}

		stopStopwatch() {
		    let node = this.node;

			this.switchBtn.innerText = 'Start';
			clearInterval(node.timer);
		}

		addTimer() {
			let stopwatchList = this.stopwatchList;   // Список таймеров .stopwatch-laps

			let stopwatchListItem = document.createElement('div');
			stopwatchListItem.className = 'alert alert-info';
			stopwatchListItem.innerHTML = this.timer.innerText;
			stopwatchList.insertBefore(stopwatchListItem, stopwatchList.firstChild);  // вставить перед первым потомком

			let closeListItem = document.createElement('span');
			closeListItem.className = 'label label-danger';
			closeListItem.innerHTML = '×';
			stopwatchListItem.appendChild(closeListItem);

      this.stopwatchListItemsClose.push(closeListItem);

			this.stopwatchListItems.push(stopwatchListItem);
		}		

		resetTimer() {
		  let timer = this.timer,
          node = this.node;
			clearInterval(node.timer);
			timer.innerText = '00:00:00:000';
			this.switchBtn.innerText = 'Start';
			this.stopwatchList.innerText = '';
			this.lastValueInterval = 0;
		}

		onNodeClick(event) {
      if (event.target === this.switchBtn) {
				if (this.switchBtn.innerText === 'Start') {
					this.startStopwatch();
				} else {
				    this.stopStopwatch();
				}
			}
			if (event.target === this.infoBtn) {
				this.addTimer();
			}
			if (event.target === this.resetBtn) {
				this.resetTimer();
			}
      let _this = this;
      for(let i = 0; i < this.stopwatchListItemsClose.length; i += 1) {
        let lapElem = this.stopwatchListItemsClose[i].parentNode;
        if (event.target === this.stopwatchListItemsClose[i]) {
          lapElem.parentNode.removeChild(lapElem);
          _this.stopwatchListItems.splice(i, 1);
          _this.stopwatchListItemsClose.splice(i, 1);
        }
      }
    }

		onNodeKeyup(event) {
      const s_keycode = 83;
			const l_keycode = 76;
			const r_keycode = 82;

			if (event.keyCode === s_keycode) {
				this.toSwitchTimer();
			}
			if (event.keyCode === l_keycode) {
				this.addOrRemoveTimer();
			}
			if (event.keyCode === r_keycode) {
				this.resetTimer();
			}
        }
	}

    stopwatchFirstNode.sw = new Stopwatch(stopwatchFirstNode);
	stopwatchSecondNode.sw = new Stopwatch(stopwatchSecondNode);
}());
