// class was created, but is not uses in this project
/**
 * @class Textarea
 * @description Component Textarea define height of the textarea DOM-Element by adding/removing additional rows. */
export default class Textarea {
  /**
   * @description define height of textarea.
   * @param {object} element - the textarea (DOM-element).
   * @param {number} cols - cols of the textarea.
   * @param {number} rows - rows of the textarea.
   */
  constructor ({ element }) {
    this.textarea = element;
    this.cols = this.textarea.cols;
    this.rows = this.textarea.rows;
    this.maxValue = this.rows * this.cols;

    this._textareaSize = this._textareaSize.bind(this);

    this._initEvent();
  }

  /**
   * @method _initEvent
   * @description Inner method - sets event listener on keydown event.
   */
  _initEvent () {
    this.textarea.addEventListener('keydown', this._textareaSize);
  }

  /**
   * @method removeTooltip
   * @description Inner method - define textarea size (rows) by adding or removing additional row.
   */
  _textareaSize () {
    let curentValue = this.textarea.value.length;
    let curentMaxValue = this.textarea.rows * this.textarea.cols;
    if (curentValue > curentMaxValue - this.cols) {
      this.textarea.rows = this.textarea.rows + 1;
    }

    if (
      curentValue < curentMaxValue - this.cols * 2 &&
      this.textarea.rows > this.rows
    ) {
      this.textarea.rows = this.textarea.rows - 1;
    }
  }
}
