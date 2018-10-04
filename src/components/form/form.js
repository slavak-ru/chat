import css from'./form.css';
import formTemplate from'./form.templ.pug';

/** 
 * @class Form
 * @description Class Form collect data from form-elements on Submint event. 
 * */
export default class Form {
  /**
		* @description check and collect data from form-elements.
    * @param {object} element - the Form (DOM-element).
    * @param {object} template - the Form template (function from pug).
    * @param {class} tooltip - class Tooltip for create tooltips.
	*/
  constructor({element, template, tooltip}) {
    this.form = element;
    this.createTooltip = tooltip;
    this.tooltips = {}; 
    this.template = template;

    this._onSubmit = this._onSubmit.bind(this);
    
    this._initEvents();
  }

  /**
		* @method _initEvents
		* @description Inner method - adding EventListener on Submit to the Form.
	*/
  _initEvents() {
    this.form.addEventListener('submit', this._onSubmit);
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
		* @method _collectData
    * @description Inner method - collect-data from form-elements.
    * @return {object} collectData - data for post to the database.
	*/
  _collectData() {   
    let collectData = {};
    let elements = this.form.querySelectorAll('[name]');
    
    elements.forEach((elem)=>{ 
      if(elem.tagName === 'FORM') return;
      if (!elem.value.length) {
        this._setErrorClass(elem);
        return;
      }

      if(elem.name === 'e-mail' && !this._checkMail(elem.value)) {
        this._setErrorClass(elem);
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
    * @param {string} tooltipName - tooltip name. 
	*/
  _setErrorClass(elem, tooltipName) {
    console.log(elem)
    elem.classList.add('error');
    if (!this.createTooltip || this.tooltips[elem.name]) return;
    this.tooltips[elem.name] = new this.createTooltip({element: elem, tooltipName: tooltipName});
    this.tooltips[elem.name].createTooltip();
  }

  /**
		* @method _removeErrorClass(elem)
		* @description Inner method - remove Error class from the from form-elements if value isn't empty.
	*/
  _removeErrorClass(elem) {
    if(elem.classList.contains('error')) {
      elem.classList.remove('error');
    }
    
    if (this.tooltips[elem.name]) this.tooltips[elem.name].removeTooltip();
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
    let dataOption = {day: '2-digit', month: '2-digit', year: '2-digit', minute: '2-digit', hour:'2-digit', second:'2-digit'};
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
    this.observer();
    this.form.innerHTML = this.template();
  }

  /**
		* @method observer
		* @description Public method - observe changing DOM-element (parrent form element) and removing tooltips.
	*/
  observer() {
    let options, target, observer;

    options = {
      'childList': true,
    };

    target = this.form;
    observer = new MutationObserver( (mutations)=>{
        let tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach((elem) => document.body.removeChild(elem));
      } 
    );

    observer.observe(target, options);
  }

}
