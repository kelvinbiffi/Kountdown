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
  var Kountdown = function (_element, _date, _position, _style) {
    this.element = (_element ? _element : null);
    this.date = (_date ? _date : null);
    this.position = (_position ? this.positions[_position] : this.positions['BEGIN']);
    this.style = (_style ? _style : null);
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
   * @return {Date|Boolean}
   */
  Kountdown.prototype.isDateValid = function () {
    if (typeof this.date === 'string' && this.regex.date.test(this.date)) {
        return new Date(this.date);
    } else if (this.date instanceof Date && Object.prototype.toString.call(this.date) === '[object Date]') {
      return this.date;
    }
    return false;
  };

  /**
   * Create the count down
   * 
   * @param {Function|String} callback Callback to each decrement second iteration
   * 
   * @return {void}
   */
  Kountdown.prototype.create = function (callback) {
    if (this.isDateValid()) {
      console.log('Create the Kountdown')
    } else {
      console.error('The date must be a Valid Date Object or a String Date YYYY-MM-DDTHH:MM:SS', this.element);
    }
  };

  /**
   * Check Kountdown elements
   */
  window.addEventListener('DOMContentLoaded',function(){
    var dc = [].slice.call(document.querySelectorAll('[data-kountdown]'));
    dc.forEach(function (dce) {
      try {
        kd = dce.dataset.kountdown.split('|');
        if (kd && kd.length >= 1) {
            new Kountdown(dce, kd[0], kd[1] ? kd[1] : null).create(kd[2] ? kd[2] : null);
        } else {
          console.error('Check if the dataset kountdown exists and is pattern formated');
        }
      } catch (error) {
        console.error('Fatal error: Check if the dataset kountdown exists and is pattern formated');
      }
    });
  });

})();