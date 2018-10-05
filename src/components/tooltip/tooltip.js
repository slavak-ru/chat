import css from'./tooltip.css';

/** 
  * @class Tooltip
 * @description Component Tooltip create DOM-element if form-element value is empty. 
 * */
export default class Tooltip {
  /**
		* @description create Tooltip.
		* @param {object} element - target element.
		* @param {string} tooltipName - tooltip name.
	*/
  constructor({element, tooltipName = 'tooltip', message}) {
    this.target = element;
    this.tooltipName = tooltipName;
    this.tooltip;
    this.trotting = this._throttle(this._setTooltipPosition, 500);

    this._initEvents();
  }

  /**
		* @method _initEvents
    * @description Inner method - creating events for the window resizing.
	*/
  _initEvents() {
    window.addEventListener('resize', () =>{
      this.trotting();
    });
  }

  /**
		* @method _throttle(func, ms)
    * @description Inner method - throttle (ms - delay time) in the execution of any methods (func).
	*/
  _throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;
  
    function wrapper() {
  
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }
  
      func.apply(this, arguments);
  
      isThrottled = true;
  
      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
  
    return wrapper;
  }

  /**
		* @method _defineCoordinate
    * @description Inner method - define coordinates for tooltip.
	*/
  _defineCoordinate() {
    this.top = this.target.getBoundingClientRect().top + pageYOffset;
    this.left = this.target.getBoundingClientRect().left;
  }

  /**
		* @method createTooltip
		* @description Public method - create tooltip for the target element.
	*/
   createTooltip() {
    this._defineCoordinate();

    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.dataset.show = 'show-tooltip'
    this.tooltip.innerHTML = this.target.dataset[this.tooltipName];

    document.body.appendChild(this.tooltip);

    this._setTooltipPosition();
  }

  /**
		* @method _defineCoordinate
    * @description Inner method - set tooltip position.
	*/
  _setTooltipPosition() {
    this._defineCoordinate();
    // console.log(this.target);
    // console.log(this.tooltip);
    // console.log(`new coordinates. top: ${this.top}, left: ${this.left}`);

    this.tooltip.style.top = Math.round(this.top + this.target.offsetHeight + 2) + 'px';
    if ( this.top - this.tooltip.offsetHeight - pageYOffset > 0 ) {
      this.tooltip.style.top = Math.round(this.top - this.tooltip.offsetHeight + 2) + 'px';
    }
  
    this.tooltip.style.left = Math.round(this.left) + this.target.offsetWidth - this.tooltip.offsetWidth + 'px';
  }

  /**
		* @method removeTooltip
		* @description Public method - remove tooltip from the target element.
	*/
  removeTooltip() {
    if (this.tooltip) document.body.removeChild(this.tooltip);
    this.tooltip = null;
  }
}
