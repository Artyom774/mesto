import Card from './Card.js';
import { popupPhoto } from '../pages/index.js';

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }

  addInitialItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  newCard(item, cardTemplate) {
    const aNewCard = new Card(item, cardTemplate, (link, title) => {popupPhoto.open(link, title);});
    return aNewCard;
  }
}