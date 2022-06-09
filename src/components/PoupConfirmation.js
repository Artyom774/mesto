import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  renderLoading(isLoading, submitText, submitTextLoading) {
    if (isLoading) {this._submitButton.textContent = submitTextLoading + '...'}
    else {this._submitButton.textContent = submitText};
  }
}