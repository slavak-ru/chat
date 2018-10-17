import css from './tooltip.css';

/**
 * @class Tooltip
 * @description Component Tooltip creates DOM-element if form-element value is empty.
 * */
export default class Tooltip {
  /**
   * @param {object} element - target element.
   * @param {string} tooltipContent - tooltip's content.
   * @param {string} group - group-name of the tooltip.
   */
  constructor({ element, tooltipContent = 'placeholder', group }) {
    this.target = element;
    this.tooltipContent = tooltipContent;
    this.group = group;

    this.tooltip;
    this.trotting = this._throttle(this._setTooltipPosition, 500);

    this._initEvents();
  }

  /**
   * @method _initEvents
   * @description Inner method - creates events listener for the window resizing.
   */
  _initEvents() {
    window.addEventListener('resize', () => {
      if (!this.tooltip) return;
      this.trotting();
    });
  }

  /**
   * @method _throttle
   * @description Inner method - throttle (ms - delay time) in the execution of any methods (func).
   * @param {object} func - callback method
   * @param {number} ms - delay time in ms
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
   * @description Public method - creates tooltip for the target element.
   */
  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = `tooltip tooltip_${this.group}`;
    this.tooltip.dataset.show = 'show-tooltip';
    this.tooltip.innerHTML = this.tooltipContent;

    document.body.appendChild(this.tooltip);

    this.targetBorderRadius = getComputedStyle(this.target, null).borderRadius
      ? parseFloat(getComputedStyle(this.target, null).borderRadius)
      : 0;

    this._setTooltipPosition();
  }

  /**
   * @method _setTooltipPosition
   * @description Inner method - sets tooltip position.
   */
  _setTooltipPosition() {
    this._defineCoordinate();

    this.tooltip.style.top = Math.round(this.top) + 'px';

    this.tooltip.style.left = Math.round(this.left) + 'px';
  }

  /**
   * @method _defineCoordinate
   * @description Inner method - defines coordinates for tooltip.
   */
  _defineCoordinate() {
    this.top =
      this.target.getBoundingClientRect().top -
      this.tooltip.offsetHeight +
      pageYOffset;

    if (this.top - this.tooltip.offsetHeight - pageYOffset < 0) {
      this.top -= this.tooltip.offsetHeight;
    }

    let paddingLeft = parseFloat(
      getComputedStyle(this.target, null)['paddingLeft']
    );
    let marginLeft = parseFloat(
      getComputedStyle(this.target, null)['marginLeft']
    );

    if (this.group === 'placeholder') {
      this.left =
        this.target.getBoundingClientRect().left +
        this.targetBorderRadius +
        paddingLeft +
        marginLeft +
        pageXOffset;

      return;
    }

    this.left =
      this.target.getBoundingClientRect().left +
      this.target.offsetWidth -
      marginLeft -
      this.tooltip.offsetWidth -
      this.targetBorderRadius +
      pageXOffset;
  }

  /**
   * @method removeTooltip
   * @description Public method - removes the tooltip from the target element.
   */
  removeTooltip() {
    if (this.tooltip) document.body.removeChild(this.tooltip);
    this.tooltip = null;
  }
}
