import css from './form.css';
import formTemplate from './form.templ.pug';

/**
 * @class Form
 * @description Class Form creates a Form from a template, controls pop-up tooltips on error and on placeholders, collects data from Form elements on the Submit event.
 * */
export default class Form {
  /**
   * @description check and collect data from form-elements.
   * @param {object} element - the Form (DOM-element).
   * @param {object} template - the Form template (function from pug).
   * @param {class} tooltip - class Tooltip for create tooltips.
   */
  constructor({ element, template, tooltip }) {
    this.form = element;
    this.tooltip = tooltip;
    this.template = template;

    this.tooltips = {};

    this._onSubmit = this._onSubmit.bind(this);
    this._hidePlaceholder = this._hidePlaceholder.bind(this);
    this._showPlaceholder = this._showPlaceholder.bind(this);
  }

  /**
   * @method _initEvents
   * @description Inner method - adding EventListener on Submit to the Form.
   */
  _initEvents() {
    this.form.addEventListener('submit', this._onSubmit);
    this.form.addEventListener('focus', this._hidePlaceholder, true);
    this.form.addEventListener('blur', this._showPlaceholder, true);
  }

  /**
   * @method _onSubmit(e)
   * @description Inner method - initial collect-data method on submit event.
   * @param {object} e - event object.
   */
  _onSubmit(e) {
    e.preventDefault();
    let data = this._collectData();

    this.onSubmit(data);
  }

  /**
   * @method _hidePlaceholder
   * @description Inner method - hides placeholder value (if value of the input is empty) and creates tooltip from placeholder value of the input element on focus event.
   * @param {object} e - event object.
   */
  _hidePlaceholder(e) {
    let target = e.target;
    if (!target.placeholder) {
      return;
    }
    this._createTooltip({
      group: 'placeholder',
      elem: target,
      tooltipContent: target.placeholder,
    });

    target.placeholder = '';
  }

  /**
   * @method _showPlaceholder
   * @description Inner method - shows the value of the placeholder (if value of the input is empty) and removes tooltip on blur event.
   * @param {object} e - event object.
   */
  _showPlaceholder(e) {
    let target = e.target;

    if (target.value.length) {
      return;
    }

    if (!this.tooltips['placeholder']) return;

    target.placeholder = this.tooltips['placeholder'][
      target.name
    ].tooltipContent;

    this._removeTooltip({ group: 'placeholder', elem: target });
  }

  /**
   * @method _collectData
   * @description Inner method - collect-data from form-elements.
   * @return {object} collectData - data for post to the database.
   */
  _collectData() {
    let collectData = {};
    let elements = this.form.querySelectorAll('[name]');

    elements.forEach(elem => {
      if (elem.tagName === 'FORM') return;
      if (
        !elem.value.length ||
        (elem.name === 'e-mail' && !this._checkMail(elem.value))
      ) {
        this._setErrorClass(elem, elem.dataset['tooltip']);
        return;
      }

      this._removeErrorClass(elem);
      collectData[elem.name] = elem.value;
    });

    collectData.time = this._setMessageTime();

    collectData.formName = this.form.firstChild.name;
    return collectData;
  }

  /**
   * @method _setErrorClass(elem)
   * @description Inner method - set Error class to the from form-elements if value is empty.
   * @param {object} elem - element (input) without information.
   * @param {string} tooltipContent - tooltip's content.
   */
  _setErrorClass(elem, tooltipContent) {
    elem.classList.add('error');

    this._createTooltip({
      group: 'error',
      elem: elem,
      tooltipContent: tooltipContent,
    });
  }

  /**
   * @method _removeErrorClass(elem)
   * @description Inner method - remove Error class from the from form-elements if value isn't empty.
   */
  _removeErrorClass(elem) {
    if (elem.classList.contains('error')) {
      elem.classList.remove('error');
    }

    this._removeTooltip({ group: 'error', elem: elem });
  }

  /**
   * @method _checkMail(mail)
   * @description Inner method - to check the e-mail address.
   * @return {boolean} return true if e-mail address is true and false if e-mail address wrong.
   */
  _checkMail(mail) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return reg.test(mail);
  }

  /**
   * @method _setMessageTime
   * @description Inner method - return message's time.
   * @return {string} time of message (dd.mm.yy; hh:mm:ss).
   */
  _setMessageTime() {
    let dataOption = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      minute: '2-digit',
      hour: '2-digit',
      second: '2-digit',
    };
    let messageDate = new Date().toLocaleString('ru', dataOption);

    return messageDate;
  }

  /**
   * @method onSubmit(message)
   * @description Public method - recive function from app.js.
   */
  onSubmit(message) {
    console.log('You must set own onSubmit method');
  }

  /**
   * @method render
   * @description Public method - create inners DOM-elements (inputs and submit button) in the Form.
   */
  render() {
    this.form.innerHTML = this.template();

    this._placeholdersRegister();
    this._observer();
    this._initEvents();
  }

  /**
   * @method _placeholdersRegister
   * @description Inner method - registers all input elements in the form.
   */
  _placeholdersRegister() {
    this.placeholders = {};
    let elements = this.form.querySelectorAll('[placeholder]');
    elements.forEach(input => {
      if (input.placeholder) {
        this.placeholders[input.placeholder] = input;
      }
    });
  }

  /**
   * @method _observer
   * @description Inner method - observing the parent element of the form, when the target element was remove - removes all tooltips.
   */
  _observer() {
    let targets, observer, observerOptions;

    targets = [
      this.form,
      this.form.parentElement,
      this.form.parentElement.parentElement,
    ];

    observer = new MutationObserver(mutation => {
      if (!document.querySelector(`[name=${this.form.name}]`)) {
        if (!Object.values(this.tooltips).length) return;

        Object.keys(this.tooltips).forEach(group => {
          Object.keys(this.tooltips[group]).forEach(key => {
            if (!this.tooltips[group][key].tooltip) return;

            document.body.removeChild(this.tooltips[group][key].tooltip);
            delete this.tooltips[group][key].tooltip;
            delete this.tooltips[group][key];
          });
        });
      }
    });

    observerOptions = {
      childList: true,
    };

    return targets.forEach(target => {
      if (!target) return;

      return observer.observe(target, observerOptions);
    });
  }

  /**
   * @method _createTooltip
   * @description Inner method - creates tooltip.
   * @param {string} group - the name of the tooltip group
   * @param {object} elem - the target element
   * @param {string} tooltipContent - content for the tooltip
   */
  _createTooltip({ group, elem, tooltipContent }) {
    if (!this.tooltips[group]) {
      this.tooltips[group] = {};
    }

    if (!this.tooltip || this.tooltips[group][elem.name]) return;

    this.tooltips[group][elem.name] = new this.tooltip({
      element: elem,
      tooltipContent: tooltipContent,
      form: this.form,
      group: group,
    });
    this.tooltips[group][elem.name].createTooltip();
  }
  /**
   * @method _removeTooltip
   * @description Inner method - removes tooltip.
   * @param {string} group - the name of the tooltip group
   * @param {object} elem - the target element
   */
  _removeTooltip({ group, elem }) {
    if (!this.tooltips[group] || !this.tooltips[group][elem.name]) {
      return;
    }

    this.tooltips[group][elem.name].removeTooltip();
    delete this.tooltips[group][elem.name];
  }
}
