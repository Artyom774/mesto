export default class Card {
  constructor({link, name}, cardSelector, handleCardClick) {
    this._title = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector('.card__photo');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._title;
    this._element.querySelector('.card__caption').textContent = this._title;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__like_active');
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {this._element.remove(); this._element = null});
    this._cardPhoto.addEventListener('click', () => {this._handleCardClick(this._link, this._title)}); // добавление возможности увеличить фотографию
  }
}