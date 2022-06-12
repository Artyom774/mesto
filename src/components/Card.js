export default class Card {
  constructor({link, name, likes, _id, owner}, cardSelector, handleCardClick, handleDeleteCard, like) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._likesArray = likes;
    this._id = _id;
    this._ownerID = owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._like = like;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }

  createCard(adminID) {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector('.card__photo');
    this._likeElement = this._element.querySelector('.card__like');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    this._element.querySelector('.card__number-of-likes').textContent = this._likes;
    this._likesArray.forEach(element => {
      if (element._id === adminID) {this._likeElement.classList.add('card__like_active')};
    });
    if (this._ownerID !== adminID) {this._element.querySelector('.card__delete').classList.add('card__delete_hidden');}
    this._setEventListeners(adminID);
    return this._element;
  }

  thenPutLike(likesArray) {
    this._element.querySelector('.card__number-of-likes').textContent = likesArray.length;
    this._likeElement.classList.toggle('card__like_active');
  }

  thenDeleteLike(likesArray) {
    this._element.querySelector('.card__number-of-likes').textContent = likesArray.length;
    this._likeElement.classList.toggle('card__like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(adminID) {
    this._userId = adminID;
    this._likeElement.addEventListener('click', this._changeLike.bind(this));
    if (this._ownerID === adminID) {
    this._element.querySelector('.card__delete').addEventListener('click', this._handleDeleteCard);
  };
    this._cardPhoto.addEventListener('click', () => {this._handleCardClick(this._link, this._name)}); // добавление возможности увеличить фотографию
  }

  _changeLike() {
    const isMylike = this._likesArray.some((like) => {return like._id === this._userId});
    this._like(isMylike);
  }
}