import css from './modal.css';

/**
 * @class Modal
 * @description Class Modal - creates modal window.
 * @param {string} string - information that should be in the modal window.
 */
export default class Modal {
  constructor() {
    this._onEvent = this._onEvent.bind(this);
    this.modal;
  }

  /**
   * @method createModal
   * @description Public method - creates modal window.
   * @param {string} modalMessage - text content for modal window
   */
  createModal(modalMessage) {
    if (this.modal) return;

    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    let content = document.createElement('div');
    content.className = 'modal__content';
    let text = document.createElement('div');
    text.className = 'modal__text';
    text.innerHTML = modalMessage;
    let button = document.createElement('button');
    button.className = 'button button_modal';
    button.type = 'submit';
    button.innerHTML = 'ok';

    content.appendChild(text);
    content.appendChild(button);

    this.modal.appendChild(content);
    document.body.appendChild(this.modal);

    this._initEvent();
  }

  /**
   * @method removeModal
   * @description Public method - removes modal window.
   */
  removeModal() {
    document.body.removeChild(this.modal);
    this.modal = null;
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
