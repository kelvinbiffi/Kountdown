var Kountdown;

(function () {

  /**
   * Constructor Function
   * 
   * @param {String|Element} _element Query String element or DOM Element who host the Kountdown
   * @param {String|Date} _date Date string or Date Object for Kountdown reference calculator
   * @param {String} _position Relative position BEFORE BEGIN END AFTER (Optional)
   * 
   * @return {void}
   */
  Kountdown = function (_element, _date, _position, _style) {
    if (!_element) {
      console.error('The _element must be set');
      return;
    }
    if (!_date) {
      console.error('The _date must be set as String or Date format');
      return;
    }
    this.element = (_element ? _element : null);
    this.date = (_date ? _date : null);
    this.position = (_position ? this.positions[_position] : this.positions['BEGIN']);
    this.style = (_style ? _style : null);
    this.watcher = false;
  };

  /**
   * Destroy Kountdown element
   * 
   * @return {Void}
   */
  Kountdown.prototype.destroy = function () {
    if (this.watcher) {
      clearInterval(this.watcher);
    }
    this.element.parentElement.removeChild(this.element);
  };

  /**
   * Available positions to insert the kountdown element
   */
  Kountdown.prototype.positions = {
    BEFORE: 'beforeBegin',
    0: 'beforeBegin',
    BEGIN: 'afterBegin',
    1: 'afterBegin',
    END: 'beforeEnd',
    2: 'beforeEnd',
    AFTER: 'afterEnd',
    3: 'afterEnd',
  };

  Kountdown.prototype.regex = {
    date: /^(\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))$/i
  };

  /**
   * Check date format
   * 
   * @return {Boolean}
   */
  Kountdown.prototype.isDateValid = function () {
    if (typeof this.date === 'string' && this.regex.date.test(this.date)) {
      this.date = new Date(this.date);
      return true;
    } else if (this.date instanceof Date && Object.prototype.toString.call(this.date) === '[object Date]') {
      return true;
    }
    console.error('The date must be a Valid Date Object or a String Date YYYY-MM-DDTHH:MM:SS', this.element);
    return false;
  };

  /**
   * Check callback function
   * 
   * @param {Function|String} callback Function that run after each down second
   * 
   * @return {Boolean:Function}
   */
  Kountdown.prototype.isCallbackValid = function (callback) {
    if (!callback) return "No callback function";
    if (typeof callback === 'function') {
      return callback;
    } else if (typeof callback === 'string' && window[callback] && typeof window[callback] === 'function') {
      return window[callback];
    }
    console.error('Fatal error: Callback must be a Function or String function name from window', this.element);
    return false;
  };

  /**
   * Create the timer structure
   * 
   * @return {String}
   */
  Kountdown.prototype.timerStructure = function () {
    var kid = 'kountdown' + new Date().getTime() + Math.floor((Math.random() * 1000) + 1);
    this.element.insertAdjacentHTML(
      this.position, 
      '<div id="' + kid + '">' +
      '  <div class="time">' +
      '    <div class="day">' +
      '      <span>00</span>' +
      '      <small>Days</small>' +
      '    </div>' +
      '    <span>:</span>' +
      '    <div class="hour">' +
      '      <span>00</span>' +
      '      <small>Hours</small>' +
      '    </div>' +
      '    <span>:</span>' +
      '    <div class="minute">' +
      '      <span>00</span>' +
      '      <small>Minutes</small>' +
      '    </div>' +
      '    <span>:</span>' +
      '    <div class="second">' +
      '      <span>00</span>' +
      '      <small>Seconds</small>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );

    return kid;
  };

  /**
   * Handle the timer countdown and timewatch
   * 
   * @param {String} id Id of the current timer
   * @param {Function|String} callback Callback to each decrement second iteration
   * 
   * @return {void}
   */
  Kountdown.prototype.handleTimer = function (id, callback) {
    var timerElements = {
      day: document.querySelector('#' + id + ' .day span'),
      dayLabel: document.querySelector('#' + id + ' .day small'),
      hour: document.querySelector('#' + id + ' .hour span'),
      hourLabel: document.querySelector('#' + id + ' .hour small'),
      minute: document.querySelector('#' + id + ' .minute span'),
      minuteLabel: document.querySelector('#' + id + ' .minute small'),
      second: document.querySelector('#' + id + ' .second span'),
      secondLabel: document.querySelector('#' + id + ' .second small')
    }

    var now = new Date();
    var kountdownObject = this;
    this.watcher = setInterval(function () {
      setTimeout(function () {
        now = new Date();
        let res = Math.abs(now - kountdownObject.date) / 1000;
        var time = {
          kountdown: kountdownObject,
          day: Math.floor(res / 86400),
          hour: Math.floor(res / 3600) % 24,
          minutes: Math.floor(res / 60) % 60,
          seconds: Math.floor(res % 60)
        };
        timerElements.day.innerText = (time.day < 10 ? '0'+time.day : time.day);
        timerElements.dayLabel.innerText = (time.day > 1 ? 'days' : 'day');
        timerElements.hour.innerText = (time.hour < 10 ? '0'+time.hour : time.hour);
        timerElements.hourLabel.innerText = (time.hour > 1 ? 'hours' : 'hour');
        timerElements.minute.innerText = (time.minutes < 10 ? '0'+time.minutes : time.minutes);
        timerElements.minuteLabel.innerText = (time.minutes > 1 ? 'minutes' : 'minute');
        timerElements.second.innerText = (time.seconds < 10 ? '0'+time.seconds : time.seconds);
        timerElements.secondLabel.innerText = (time.seconds > 1 ? 'seconds' : 'second');

        if (callback && typeof callback === 'function') {
          callback(time);
        }
      }, 300);
    }, 1000);

  };

  /**
   * Create the count down
   * 
   * @param {Function|String} callback Callback to each decrement second iteration
   * 
   * @return {void}
   */
  Kountdown.prototype.create = function (callback) {
    callback = this.isCallbackValid(callback);
    console.log(callback);
    if (this.isDateValid() && callback) {
      console.log('Create the Kountdown');

      var kid = this.timerStructure();
      this.handleTimer(kid, callback);
    }
  };

  /**
   * Check Kountdown elements
   */
  window.addEventListener('DOMContentLoaded',function(){
    var dc = [].slice.call(document.querySelectorAll('[data-kountdown]'));
    dc.forEach(function (dce) {
      kd = dce.dataset.kountdown.split('|');
      if (kd && kd.length >= 1) {
          new Kountdown(dce, kd[0], kd[1] ? kd[1] : null).create(kd[2] ? kd[2] : null);
      } else {
        console.error('Check if the dataset kountdown exists and is pattern formated');
      }
    });
  });

})();