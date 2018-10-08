// Variant insert tooltip in a parent element (Labele).
// The problem with the position of the tooltip when resizing the window.
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
		* @param {object} form - the form contains the target element.
	*/
  constructor({element, tooltipName = 'tooltip', parent}) {
    this.target = element;
    this.tooltipName = tooltipName;
    this.parent = parent;
    this.tooltip;

    this.throttling = this._throttle(this._setTooltipPosition,100);
    this._initEvents();
  }

  /**
		* @method _initEvents
    * @description Inner method - creating events for the window resizing.
	*/
  _initEvents() {
    window.addEventListener('resize', () =>{
      if (!this.tooltip) return;
      this.throttling();
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
		* @method createTooltip
		* @description Public method - create tooltip for the target element.
	*/
   createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.dataset.show = 'show-tooltip'
    this.tooltip.innerHTML = this.target.dataset[this.tooltipName];

    this.parent.appendChild(this.tooltip);
    
    if (getComputedStyle(this.parent).position !== 'relative') this.parent.style.position = 'relative';
    
    this._setTooltipPosition();

    this._observer();
  }

  /**
		* @method _setTooltipPosition
    * @description Inner method - set tooltip position.
	*/
  _setTooltipPosition() {
    this._defineCoordinate();

    this.tooltip.style.top = Math.round(this.top) + 'px';
    this.tooltip.style.left = Math.round(this.left) + 'px';
  }

  
  /**
		* @method _defineCoordinate
    * @description Inner method - define coordinates for tooltip.
	*/
  _defineCoordinate() {
    let borderRadius = (getComputedStyle(this.target)['border-top-right-radius']) ? 
                          parseFloat(getComputedStyle(this.target)['border-top-right-radius']) : 0;
    
    this.top = this.target.getBoundingClientRect().y - this.tooltip.getBoundingClientRect().y - this.tooltip.offsetHeight + window.pageYOffset;
        
    this.left = this.target.getBoundingClientRect().x - this.parent.getBoundingClientRect().x - this.tooltip.offsetWidth + this.target.offsetWidth - borderRadius + window.pageXOffset;
    
    if (this.top - this.tooltip.offsetHeight - pageYOffset > 0) {
      this.top = - this.tooltip.getBoundingClientRect().y + this.target.getBoundingClientRect().y + this.target.offsetHeight;
    }
  }

  /**
		* @method removeTooltip
		* @description Public method - remove tooltip from the target element.
	*/
  removeTooltip() {
    if (this.tooltip) this.parent.removeChild(this.tooltip);
    this.tooltip = null;
  }

  /**
		* @method _observer
		* @description Inner method - observing of the form, when the target element was remove - remove tooltip.
	*/
  _observer() {
    let target, observer, observerOptions;

    target = this.parent;

    observer = new MutationObserver((mutation) => {
      if (!document.querySelector(`[name=${this.target.name}]`)) {
        this.parent.removeChild(this.tooltip);
      };
    })

    observerOptions = {
      childList: true,
    }

    return observer.observe(target, observerOptions);
  }

}
