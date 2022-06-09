import './index.css';   // импорт стилей для вебпака

// импорт классов из модулей
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profileAvatar, profileAvatarButton, profileEditButton, cardAddButton, cardsContainerSelection, cardTemplate,
  popupName, popupJob, popupEditForm, popupAddForm, popupAvatarForm, initialCards, setting } from '../utils/constants.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json'
  }
});

function createCard(item) {
  const newCard = new Card(item, cardTemplate, (link, name) => {popupPhoto.open(link, name);}, () => {
    popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', newCard.deleteCard);
    popupDelete.close();
    newCard._element.remove(); newCard._element = null;
    api.deleteCard(newCard._id).catch(err => console.log(err));
  }, () => {
    popupDelete.open();
    popupDelete._popup.querySelector('.popup__submit-button').addEventListener('click', newCard.deleteCard);
    popupDelete._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', newCard.deleteCard);
      };
      if (evt.target.classList.contains('popup__close')) {
        popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', newCard.deleteCard);
      };
    });
    document.addEventListener('keydown', (evt) => {if (evt.key === 'Escape') {
      popupDelete._popup.querySelector('.popup__submit-button').removeEventListener('click', newCard.deleteCard);
    };
  });
  }); 
  return newCard.createCard(adminID);
}

let adminID = '';
api.getUserInfo()
  .then((result) => {
    profileInfo.setUserInfo(result.name, result.about);
    profileAvatar.src = result.avatar;
    adminID = result._id;
  }).catch(err => console.log(err));

api.getInitialCards()   // загрузка изначальных карточек
  .then((result) => {
    result.forEach((item) => {
      initialCards.push(item);
    });
    const cardSection = new Section({items: initialCards, renderer: (item) => {   // секция для карточек
      cardSection.addItem(createCard(item));
    }}, cardsContainerSelection);
    cardSection.addInitialItems();  // добавить начальные карточки
  }).catch(err => console.log(err));

const cardSection = new Section({items: initialCards, renderer: (item) => {   // секция для карточек
  cardSection.addItem(createCard(item));
}}, cardsContainerSelection);

// валидация форм
const profileInfo = new UserInfo({name: '.profile__name', job: '.profile__description'});
const profileValidation = new FormValidator(setting, popupEditForm);
const addCardValidation = new FormValidator(setting, popupAddForm);
const popupAvatarValidation = new FormValidator(setting, popupAvatarForm);
profileValidation.enableValidation(); // запускает валидацию формы
addCardValidation.enableValidation();
popupAvatarValidation.enableValidation();

// создание всплывающих окон (ВО)
export const popupPhoto = new PopupWithImage('.photo-popup');
const popupEdit = new PopupWithForm('.popup-edit', (data) => {
  popupEdit.renderLoading(true, 'Сохранить');
  api.refreshUserInfo(data)   // отправка обновлённых данных о пользователе
  .then((result) => {profileInfo.setUserInfo(result.name, result.about); popupEdit.close();})
  .finally(()=>{popupEdit.renderLoading(false, 'Сохранить');})
  .catch(err => console.log(err));
});
const popupAdd = new PopupWithForm('.popup-add', (data) => {
  popupAdd.renderLoading(true, 'Создать');
  api.postNewCard(data)   // загрузка новой карточки на сервер
  .then(result => {
    const aNewCard = createCard(result);
    cardSection.addItem(aNewCard);
    popupAdd.close();
  })
  .finally(()=>{popupAdd.renderLoading(false, 'Создать');})
  .catch(err => console.log(err));
});
export const popupDelete = new Popup('.delete-popup');
const popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
  popupAvatar.renderLoading(true, 'Сохранить');
  api.refreshAvatar(data)   // загрузка новой аватарки пользователя
  .then(result => {profileAvatar.src = result.avatar; popupAvatar.close();})
  .finally(()=>{popupAvatar.renderLoading(false, 'Сохранить');})
  .catch(err => console.log(err));
});
popupPhoto.setEventListeners(); // установить слушатели для ВО
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();

profileAvatarButton.addEventListener('click', () => {
  popupAvatarValidation.disableSubmit();
  popupAvatar.open();
})

profileEditButton.addEventListener('click', function() {    // отслеживание кнопки "редактировать профиль"
  const userInfo = profileInfo.getUserInfo();
  popupName.value = userInfo.name;
  popupJob.value = userInfo.job;
  profileValidation.disableSubmit();
  popupEdit.open();
});

cardAddButton.addEventListener('click', function() {    // отслеживание кнопки "добавить карточку"
  addCardValidation.disableSubmit();
  popupAdd.open();
});