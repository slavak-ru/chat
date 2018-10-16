import css from './modal.css';

/**
 * @class Modal
 * @description Class Modal - creates modal window.
 * @param {string} string - information that should be in the modal window.
 */
export default class Modal {
  constructor({ string }) {
    this.modalContent = string;
    this._onEvent = this._onEvent.bind(this);

    this._createModal();
    this._initEvent();
  }

  /**
   * @method _createModal
   * @description Inner method - creates modal window.
   */
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

  /**
   * @method _initEvent
   * @description Inner method - sets events listener on the DOM-element.
   */
  _initEvent() {
    this.modal.addEventListener('click', this._onEvent, false);
  }

  /**
   * @method _onEvent(e)
   * @description Inner method - sets the behavior of the modal window on events.
   * @param {object} e - event object.
   */
  _onEvent(e) {
    let target = e.target;

    if (target.type != 'submit' && target != this.modal) return;

    this.onEvent();
  }

  /**
   * @method onEvent
   * @description Public method - sets the behavior of the modal window on events.
   */
  onEvent() {
    console.log('You must set own onEvent method');
  }
}
