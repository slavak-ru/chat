import css from'./tooltip.css';

/** @description Component Tooltip create DOM-element if form-element value is empty. */
export default class Tooltip {
  /**
		* @description create Tooltip.
		* @param {object} element - target element.
		* @param {number} top - top position of target.
		* @param {number} left - left position of target.
	*/
  constructor({element, tooltipName, message}) {
    this.target = element;
    this.top = this.target.getBoundingClientRect().top + pageYOffset;
    this.left = this.target.getBoundingClientRect().left;
    this.tooltipName = (tooltipName)? tooltipName: 'tooltip';
    this.tooltip;
  }

  /**
		* @method createTooltip()
		* @description Public method - create tooltip for the target element.
	*/
   createTooltip() {
     this.tooltip = document.createElement('div');
     this.tooltip.className = 'tooltip';
     this.tooltip.dataset.show = 'show-tooltip'
     this.tooltip.innerHTML = this.target.dataset[this.tooltipName];

     document.body.appendChild(this.tooltip);

    this.tooltip.style.top = Math.round(this.top + this.target.offsetHeight + 2) + 'px';
    if ( this.top - this.tooltip.offsetHeight - pageYOffset > 0 ) {
      this.tooltip.style.top = Math.round(this.top - this.tooltip.offsetHeight + 2) + 'px';
    }
  
    this.tooltip.style.left = Math.round(this.left) + this.target.offsetWidth -this.tooltip.offsetWidth - 5 + 'px';
  }
  /**
		* @method removeTooltip()
		* @description Public method - remove tooltip from the target element.
	*/
  removeTooltip() {
    if (this.tooltip) document.body.removeChild(this.tooltip);
     this.tooltip = null;
      
  }
}
