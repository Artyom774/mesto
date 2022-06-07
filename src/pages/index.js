import './index.css';   // импорт стилей для вебпака

// импорт классов из модулей
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profileAvatar, profileEditButton, cardAddButton, cardsContainerSelection, cardTemplate,
  popupName, popupJob, popupEditForm, popupAddForm, initialCards, setting } from '../utils/constants.js';

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

fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
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
profileValidation.enableValidation(); // запускает валидацию формы
addCardValidation.enableValidation();

// создание всплывающих окон (ВО)
export const popupPhoto = new PopupWithImage('.photo-popup');
const popupEdit = new PopupWithForm('.popup-edit',(data) => {
  profileInfo.setUserInfo(data.name, data.job);
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
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
const popupAdd = new PopupWithForm('.popup-add',(data) => {
  data.likes = [];
  data.owner = {_id: 'dbbc920c38acac6899a63e51'};
  const aNewCard = createCard(data);
  cardSection.addItem(aNewCard);
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
  method: 'POST',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({
    name: data.name,
    link: data.link
  })
  });
});
export const popupDelete = new Popup('.delete-popup');
popupPhoto.setEventListeners(); // установить слушатели для ВО
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();

profileEditButton.addEventListener('click', function() {    // отслеживание кнопки "редактировать профиль"
  const userInfo = profileInfo.getUserInfo();
  popupName.value = userInfo.name;
  popupJob.value = userInfo.job;
  profileValidation.disableSubmit();
  popupDelete.open();
});

cardAddButton.addEventListener('click', function() {    // отслеживание кнопки "добавить карточку"
  addCardValidation.disableSubmit();
  popupAdd.open();
});