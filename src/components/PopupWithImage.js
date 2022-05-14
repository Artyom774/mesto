import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoInPopup = this._popup.querySelector('.popup__photo');
    this._cardCaption = this._popup.querySelector('.popup__caption');
  }

  open(src, caption) {
    super.open();
    this._photoInPopup.src = src;
    this._photoInPopup.alt = caption;
    this._cardCaption.textContent = caption;
  }
}