import { popupDelete } from "../pages";

export default class Card {
  constructor({link, name, likes, _id, owner}, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._likesArray = likes;
    this._id = _id;
    this._ownerID = owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector('.card__photo');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    this._element.querySelector('.card__number-of-likes').textContent = this._likes;
    this._likesArray.forEach(element => {
      if (element._id === 'dbbc920c38acac6899a63e51') {this._element.querySelector('.card__like').classList.add('card__like_active')};
    });
    if (this._ownerID !== 'dbbc920c38acac6899a63e51') {this._element.querySelector('.card__delete').classList.add('card__delete_hidden');}
    this._setEventListeners();
    return this._element;
  }

  deleteCard() {
    popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', this.deleteCard);
    popupDelete.close();
    this._element.remove(); this._element = null;
    fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${this._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
      'Content-Type': 'application/json'
    }
    });
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
      if (evt.target.classList.contains('card__like_active')) {
        fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${this._id}/likes`, {
          method: 'PUT',
          headers: {
            authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then((result) => {this._element.querySelector('.card__number-of-likes').textContent = result.likes.length});
      } else {
        fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${this._id}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then((result) => {this._element.querySelector('.card__number-of-likes').textContent = result.likes.length});
      };
    });
    if (this._ownerID === 'dbbc920c38acac6899a63e51') {
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      popupDelete.open();
      popupDelete._popup.querySelector('.popup__submit-button').addEventListener('click', this.deleteCard);
      popupDelete._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', this.deleteCard);
        };
        if (evt.target.classList.contains('popup__close')) {
          popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', this.deleteCard);
        };
      });
      document.addEventListener('keydown', (evt) => {if (evt.key === 'Escape') {
        popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', this.deleteCard);
      };
    });
    });};
    this._cardPhoto.addEventListener('click', () => {this._handleCardClick(this._link, this._name)}); // добавление возможности увеличить фотографию
  }
}