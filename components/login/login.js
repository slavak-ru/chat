(function(){
  'use strict';

  

  /** @description Class Login collect data from form-elements on Submint event. */
  class Login {
    /**
			* @description check and collect data from form-elements.
      * @param {object} element - the Form (DOM-element).
      * @param {class} tooltip - class Tooltip for create tooltips.
		*/
    constructor({element, form, tooltip, usersUrl}) {
      this.logins = element;
      this.form = form;
      this.createTooltip = tooltip;
      this.usersUrl = usersUrl;
      this.users = new Users({usersUrl: this.usersUrl});
      this.loginErrorText = 'Введенные данные (логин или пароль) не верны, попробуйте еще раз';
      this.signErrorText = 'Пользователь с таким логином или мейлом уже существует';
      this.forgotErrorText = 'Пользователя с таким логином или мейлом не существует';
      this.formsList = {};
      
      this.currentRadioChecked = document.querySelector('input[type="radio"]:checked')

      
      this._initLogin();
      this.clearErrors = this._clearErrors.bind(this);
      this._initEvents();
    }


    _initLogin() {
      this.forms = this.logins.querySelectorAll('form[name]');
      this.radios = this.logins.querySelectorAll('input[type="radio"]');


      this.forms.forEach(form => {
        this[form['name']+'Form'] = new this.form({element: form, tooltip: this.createTooltip});
        this[form['name']+'Form'].onSubmit = this.onLoginSubmit.bind(this);
        this.formsList[form['name']] = this[form['name']+'Form'];
      });
    }

    _clearErrors() {
      let tooltips = document.querySelectorAll('.tooltip');
      let errors = document.querySelectorAll('.error');

      tooltips.forEach((elem) => document.body.removeChild(elem));
      errors.forEach((elem) => elem.classList.remove('error'));
    }

    /**
			* @method _initEvents()
			* @description Inner method - adding EventListener on Submit to the Login.
		*/
    _initEvents() {
      this.logins.addEventListener('click', (e) => {
        let input = this.logins.querySelector("input[name='pass']");
        let elem = e.target;
        if(elem.type != 'radio' && 
          !elem.classList.contains('label__password')) return;

        if(elem.type === 'radio' || elem != this.currentRadioChecked) {
          this.currentRadioChecked = elem;
          this.clearErrors();
          return;
        }

        elem.classList.toggle('label__password_unlock');

        (input.getAttribute('type') === 'password') ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');

      })
      
    }


    /**
			* @method onSubmit(message)
			* @description Public method - 
			* @param {object} data - 
		*/
    onSubmit(data) {
      console.log(console.log('You must set own onSubmit method'));

    }
    /**
			* @method onLoginSubmit(data)
			* @description Public method - 
			* @param {object} data - 
		*/
    onLoginSubmit(data) {

      if(!data['user-name'] || !data.pass) return;
      if(data.formName != 'login' && !data['e-mail']) return;

      switch(data.formName) {
        case 'login': 

                      if(!this.users.checkUser('user-name', data['user-name']) || 
                          !this.users.checkUser('pass', data.pass)) {

                        this._clearErrors();
                        this.modalWindow = new Modal({string: this.loginErrorText});
                        this.modalWindow.onEvent = this.onModalEvent.bind(this);
                        
                        return;
                      }
                      this._clearErrors();

                      this.onSubmit(data['user-name']);
                      return;

        case 'sign': 

                      if(this.users.checkUser('user-name', data['user-name']) || 
                      this.users.checkUser('e-mail', data['e-mail'])) {

                        this._clearErrors();
                        this.modalWindow = new Modal({string: this.signErrorText});
                        this.modalWindow.onEvent = this.onModalEvent.bind(this);
                        
                        return;
                      }
                      //data = this._reformatData(data);

                      this.users.setNewUser({data: data, usersUrls: this.usersUrl});
                      
                      this._clearErrors();
                      this.onSubmit(data['user-name']);

                      return;

        case 'forgot': 
                      if(!this.users.checkUser('user-name', data['user-name']) || 
                      !this.users.checkUser('e-mail', data['e-mail'])) {

                        this._clearErrors();
                        this.modalWindow = new Modal({string: this.forgotErrorText});
                        this.modalWindow.onEvent = this.onModalEvent.bind(this);
                        
                        return;
                      }

                      console.log('меняем пароль');
                      console.log(data)
                      
                      this.users.setNewUser({data: data, usersUrls: this.usersUrl});
                      
                      //this._clearErrors();
                      //this.onSubmit(data['user-name']);

                      return;
      }

    }

    onModalEvent() {
      document.body.removeChild(this.modalWindow.modal);
      this.modal = null;
    }

    _reformatData(data) {
      let newData = {0:{}};
      newData[0] = {'user-name': data['user-name'],'e-mail': data['e-mail'], pass: data.pass, time: data.time}
      
      return newData;
    }
 
  }

  window.Login = Login;
})();