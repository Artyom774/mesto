import './index.css';   // импорт стилей для вебпака

// импорт классов из модулей
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PoupConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import { profileAvatarButton, profileEditButton, cardAddButton, cardsContainerSelection, cardTemplate,
  popupName, popupJob, popupEditForm, popupAddForm, popupAvatarForm, setting } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json'
  }
});

function createCard(item) {
  const newCard = new Card(item, cardTemplate, (link, name) => {popupPhoto.open(link, name);}, () => {
    popupDelete.open();
    popupDelete.getElement(newCard);
  }, (isMylike) => {
    if (!isMylike) {
      api.putLike(newCard._id)   // поставить лайк
      .then((result) => {newCard.thenPutLike(result.likes)})
      .catch(err => console.log(err));
    } else {
      api.deleteLike(newCard._id)  // убрать лайк
      .then((result) => {newCard.thenDeleteLike(result.likes)})
      .catch(err => console.log(err));
    }
  });
  return newCard.createCard(adminID);
}

const profileInfo = new UserInfo({name: '.profile__name', job: '.profile__description', avatar: '.profile__avatar'});
let adminID = '';

const cardSection = new Section({renderer: (item) => {   // секция для карточек
  cardSection.addItem(createCard(item));
}}, cardsContainerSelection);

Promise.all([
  api.getUserInfo(),  // запрос информации о профиле
  api.getInitialCards()  // зашрузка изначальных карточек
])
  .then(([info, initialCards])=>{
    profileInfo.setUserInfo(info.name, info.about);
    profileInfo.setAvatar(info.avatar);
    adminID = info._id;
    cardSection.addInitialItems(initialCards);  // добавить начальные карточки
  }).catch(err => console.log(err))

// валидация форм
const profileValidation = new FormValidator(setting, popupEditForm);
const addCardValidation = new FormValidator(setting, popupAddForm);
const popupAvatarValidation = new FormValidator(setting, popupAvatarForm);
profileValidation.enableValidation(); // запускает валидацию формы
addCardValidation.enableValidation();
popupAvatarValidation.enableValidation();

// создание всплывающих окон (ВО)
const popupPhoto = new PopupWithImage('.photo-popup');
const popupEdit = new PopupWithForm('.popup-edit', (data) => {
  popupEdit.renderLoading(true, 'Сохранить', 'Сохранение');
  api.refreshUserInfo(data)   // отправка обновлённых данных о пользователе
  .then((result) => {profileInfo.setUserInfo(result.name, result.about); popupEdit.close();})
  .finally(()=>{popupEdit.renderLoading(false, 'Сохранить', 'Сохранение');})
  .catch(err => console.log(err));
});
const popupAdd = new PopupWithForm('.popup-add', (data) => {
  popupAdd.renderLoading(true, 'Создать', 'Создание');
  api.postNewCard(data)   // загрузка новой карточки на сервер
  .then(result => {
    const aNewCard = createCard(result);
    cardSection.addItem(aNewCard);
    popupAdd.close();
  })
  .finally(()=>{popupAdd.renderLoading(false, 'Создать', 'Создание');})
  .catch(err => console.log(err));
});
const popupDelete = new PopupConfirmation('.delete-popup', (card) => {
  console.log(card);
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    popupDelete.close();
  })
  .catch(err => console.log(err));
});
const popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
  popupAvatar.renderLoading(true, 'Сохранить', 'Сохранение');
  api.refreshAvatar(data)   // загрузка новой аватарки пользователя
  .then(result => {profileInfo.setAvatar(result.avatar); popupAvatar.close();})
  .finally(()=>{popupAvatar.renderLoading(false, 'Сохранить', 'Сохранение');})
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