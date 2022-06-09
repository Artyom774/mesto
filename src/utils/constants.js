// объявление констант для элементов страницы
const profile = document.querySelector('.profile');   // секция "профиль"
export const profileAvatar = profile.querySelector('.profile__avatar');
export const profileAvatarButton = profile.querySelector('.profile__avatar-change-icon')
export const profileEditButton = profile.querySelector('.profile__edit-button'); // кнопка "редактировать профиль"
export const cardAddButton = profile.querySelector('.profile__add-button');    // кнопка "добавить карточку"

// объявление константы для работы с карточками
export const cardsContainer = document.querySelector('.cards');
export const cardsContainerSelection = '.cards';
export const cardTemplate = '#card-template';

// объявление констант для всплывающих окон
const popupEdit = document.querySelector('.popup-edit');
export const popupName = popupEdit.querySelector('.popup__input_field_name');
export const popupJob = popupEdit.querySelector('.popup__input_field_job');
export const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup-add');
export const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAvatar = document.querySelector('.popup-avatar');
export const popupAvatarForm = popupAvatar.querySelector('.popup__form');

/*// константы для вебпака
const cardImage1 = new URL('../images/tobolsk.jpg', import.meta.url);
const cardImage2 = new URL('../images/omsk.jpg', import.meta.url);
const cardImage3 = new URL('../images/tyumen.jpg', import.meta.url);
const cardImage4 = new URL('../images/bashkiria.jpg', import.meta.url);
const cardImage5 = new URL('../images/yekaterinburg.jpg', import.meta.url);
const cardImage6 = new URL('../images/ural.jpg', import.meta.url);*/

export const initialCards = []  // массив с данными по начальным карточкам

export const setting = {   // настройки для валидации форм
  inputSelector: '.popup__input',
  inputClassInvalid: 'popup__input_invalid',
  submitSelector: '.popup__submit-button',
  submitClassInactive: 'popup__submit-button_inactive',
  errorClassActive: 'popup__error_active'
};