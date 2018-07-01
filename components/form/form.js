(function(){
  'use strict'
  /** @description Class Form collect data from form-elements on Submint event. */
  class Form {
    /**
			* @description check and collect data from form-elements.
			* @param {object} element - the Form (DOM-element).
		*/
    constructor(element) {
      this.form = element;

      this._onSubmit = this._onSubmit.bind(this);
      this._initEvents();
    }

    /**
			* @method _initEvents()
			* @description Inner method - adding EventListener on Submit to the Form.
		*/
    _initEvents() {
      this.form.addEventListener('submit', this._onSubmit);
    }

    /**
			* @method render()
			* @description Public method - create inners DOM-elements in the Form.
		*/
    render() {
      let inner = `
        <form>
        <label class="form__label"><span class="label__text">Пользователь</span>
        <input class="form__input form__input_user-name" type="text" data-tooltip="Введите Ваше имя" name="user">
        </label>
        <label class="form__label"><span class="label__text">Сообщение</span>
        <textarea class="form__textarea" rows="3" cols="53" data-tooltip="Введите сообщение" name="message"></textarea>
        </label>
        <input type="submit" value="ОТПРАВИТЬ"class="form__button">
        </form>
      `;

      this.form.innerHTML = inner;
    }

    /**
			* @method onSubmit(message)
			* @description Public method - recive function from app.js.
		*/
    onSubmit(message) {
      console.log('You must set own onSubmit method');
    }

    /**
			* @method _onSubmit(e)
			* @description Inner method - initial collect-data method on submit event.
		*/
    _onSubmit(e) {
      e.preventDefault();
      let data = this._collectData();

      this.onSubmit(data);
    }

    /**
			* @method _collectData()
			* @description Inner method - collect-data from form-elements.
		*/
    _collectData() {   
      let collectData = {};
      let elements = this.form.querySelectorAll('[name]');
      
      elements.forEach((elem)=>{ 
        if (!elem.value.length) {
          this._setErrorClass(elem);
          return;
        } 

        this._removeErrorClass(elem);
        collectData[elem.name] = elem.value
      });

      return collectData;
    }

    /**
			* @method _setErrorClass(elem)
			* @description Inner method - set Error class to the from form-elements if value is empty.
		*/
    _setErrorClass(elem) {
      elem.classList.add('error');

    }

    /**
			* @method _removeErrorClass(elem)
			* @description Inner method - remove Error class from the from form-elements if value isn't empty.
		*/
    _removeErrorClass(elem) {
      if(elem.classList.contains('error')) {
        elem.classList.remove('error');
      }  
    }

  }

  window.Form = Form;
})();