export default class Popup {   // класс для работы со всплывающими окнами (ВО)
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {  // открыть ВО
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {   // закрыть ВО
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {   // закрыть ВО нажатием на "Escape"
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {   // установить слушатели
    this._popup.addEventListener('mousedown', (evt) => {  // закрыть ВО нажатием на иконку или затемнённую область
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      };
    });
  }
}