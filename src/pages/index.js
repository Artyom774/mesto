import './index.css';   // импорт стилей для вебпака

// импорт классов из модулей
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { profileEditButton, cardAddButton, cardsContainerSelection, cardTemplate,
  popupName, popupJob, popupEditForm, popupAddForm, initialCards, setting } from '../utils/constants.js';

function createCard(item) {
  const newCard = new Card(item, cardTemplate, (link, title) => {popupPhoto.open(link, title);}); 
  return newCard.createCard();
} 

// секция для карточек
const cardSection = new Section({items: initialCards, renderer: (item) => {
  cardSection.addItem(createCard(item));
}}, cardsContainerSelection);
cardSection.addInitialItems();  // добавить начальные карточки

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
});
const popupAdd = new PopupWithForm('.popup-add',(data) => {
  const aNewCard = createCard(data);
  cardSection.addItem(aNewCard);
});
popupPhoto.setEventListeners(); // установить слушатели для ВО
popupEdit.setEventListeners();
popupAdd.setEventListeners();

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