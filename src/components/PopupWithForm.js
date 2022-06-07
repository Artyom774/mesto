import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {   // собрать информацию с формы в объект
    const elements = {};
    this._inputList.forEach((input) => {elements[input.name] = input.value;});
    return elements;
  }

  setEventListeners() {   // установить слушатели
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}