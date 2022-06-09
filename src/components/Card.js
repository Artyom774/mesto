import {api} from '../pages/index.js';
import { popupDelete } from "../pages";

export default class Card {
  constructor({link, name, likes, _id, owner}, cardSelector, handleCardClick, functionDeleteCard, deleteListener) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._likesArray = likes;
    this._id = _id;
    this._ownerID = owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._functionDeleteCard = functionDeleteCard;
    this._deleteListener = deleteListener;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }

  createCard(adminID) {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector('.card__photo');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    this._element.querySelector('.card__number-of-likes').textContent = this._likes;
    this._likesArray.forEach(element => {
      if (element._id === adminID) {this._element.querySelector('.card__like').classList.add('card__like_active')};
    });
    if (this._ownerID !== adminID) {this._element.querySelector('.card__delete').classList.add('card__delete_hidden');}
    this._setEventListeners(adminID);
    return this._element;
  }

  deleteCard() {  // удалить карточку
    this._functionDeleteCard();
  }

  _setEventListeners(adminID) {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('card__like_active')) {
        api.putLike(this._id)   // поставить лайк
        .then((result) => {this._element.querySelector('.card__number-of-likes').textContent = result.likes.length;
        evt.target.classList.toggle('card__like_active');});
      } else {
        api.deleteLike(this._id)  // убрать лайк
        .then((result) => {this._element.querySelector('.card__number-of-likes').textContent = result.likes.length;
        evt.target.classList.toggle('card__like_active');});
      };
    });
    if (this._ownerID === adminID) {
    this._element.querySelector('.card__delete').addEventListener('click', this._deleteListener);
  };
    this._cardPhoto.addEventListener('click', () => {this._handleCardClick(this._link, this._name)}); // добавление возможности увеличить фотографию
  }
}