import './index.css';   // импорт стилей для вебпака

// импорт классов из модулей
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profileAvatar, profileAvatarButton, profileEditButton, cardAddButton, cardsContainerSelection, cardTemplate,
  popupName, popupJob, popupEditForm, popupAddForm, popupAvatarForm, initialCards, setting } from '../utils/constants.js';

function createCard(item) {
  const newCard = new Card(item, cardTemplate, (link, name) => {popupPhoto.open(link, name);}); 
  return newCard.createCard();
}

fetch('https://nomoreparties.co/v1/cohort-42/users/me', { // загрузка сведений о пользователе со сервера
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileInfo.setUserInfo(result.name, result.about);
    profileAvatar.src = result.avatar;
  });

fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {  // загрузка изначальных карточек
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.forEach((item) => {
      initialCards.push(item);
    });
    const cardSection = new Section({items: initialCards, renderer: (item) => {   // секция для карточек
      cardSection.addItem(createCard(item));
    }}, cardsContainerSelection);
    cardSection.addInitialItems();  // добавить начальные карточки
  });

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
  profileInfo.setUserInfo(data.name, data.job);
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {   // отправка обновлённых данных о пользователе
  method: 'PATCH',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: data.name,
    about: data.job
  })
  });
});
const popupAdd = new PopupWithForm('.popup-add', (data) => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {  // загрузка новой карточки на сервер
  method: 'POST',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({
    name: data.name,
    link: data.link
  })
  }).then(res => res.json())
  .then(result => {
    const aNewCard = createCard(result);
    cardSection.addItem(aNewCard);
  });
});
export const popupDelete = new Popup('.delete-popup');
const popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me/avatar', {  // загрузка новой карточки на сервер
  method: 'PATCH',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({
    avatar: data.avatar
  })
  }).then(res=>res.json())
  .then(result => profileAvatar.src = result.avatar);
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