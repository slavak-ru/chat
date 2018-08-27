import css from'./modal.css';

export default class Modal {
  constructor({string}) {
    this.modalContent = string;
    this._onEvent = this._onEvent.bind(this);
      
    this._createModal();
    this._initEvent();
  }

  _createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    let content = document.createElement('div');
    content.className = 'modal__content';
    let text = document.createElement('div');
    text.className = 'modal__text';
    text.innerHTML = this.modalContent;
    let button = document.createElement('button');
    button.className = 'button button_modal';
    button.type = 'submit';
    button.innerHTML = 'ok';

    content.appendChild(text);
    content.appendChild(button);

    this.modal.appendChild(content);
    document.body.appendChild(this.modal);
  }

  _initEvent() {

    this.modal.addEventListener('click', this._onEvent, false);
/*
      this.modal.addEventListener('click', (e)=>{
        let target = e.target;
        console.log(target.type)
        if(target.type != 'submit') return;
        this._onSubmit
      });


      this.modal.addEventListener('keydown', (e) => {
        console.log(e.key)
      });
*/
  }

  _onEvent(e) {
    let target = e.target;

    if(target.type != 'submit' && target != this.modal) return;
      
    this.onEvent()
      /*
      document.body.removeChild(this.modal);
      this.modal = null;
      */
  }

  onEvent() {
    console.log('You must set own onEvent method');
  }

}
