import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._handleConfirm = handleConfirm;
  }

  renderLoading(isLoading, submitText, submitTextLoading) {
    if (isLoading) {this._submitButton.textContent = submitTextLoading + '...'}
    else {this._submitButton.textContent = submitText};
  }

  getElement(element) {
    this.elementCard = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {this._handleConfirm(this.elementCard)});
  }
}