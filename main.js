(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}e.d({},{f:()=>K});var n=function(){function e(t,n,o){var r=t.link,i=t.name,a=t.likes,c=t._id,s=t.owner;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=i,this._link=r,this._likes=a.length,this._likesArray=a,this._id=c,this._ownerID=s._id,this._cardSelector=n,this._handleCardClick=o,this.deleteCard=this.deleteCard.bind(this)}var n,o;return n=e,(o=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"createCard",value:function(){var e=this;return this._element=this._getTemplate(),this._cardPhoto=this._element.querySelector(".card__photo"),this._cardPhoto.src=this._link,this._cardPhoto.alt=this._name,this._element.querySelector(".card__caption").textContent=this._name,this._element.querySelector(".card__number-of-likes").textContent=this._likes,this._likesArray.forEach((function(t){"dbbc920c38acac6899a63e51"===t._id&&e._element.querySelector(".card__like").classList.add("card__like_active")})),"dbbc920c38acac6899a63e51"!==this._ownerID&&this._element.querySelector(".card__delete").classList.add("card__delete_hidden"),this._setEventListeners(),this._element}},{key:"deleteCard",value:function(){K._popup.querySelector(".popup__submit-button").removeEventListener("click",this.deleteCard),K.close(),this._element.remove(),this._element=null,fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards/".concat(this._id),{method:"DELETE",headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8","Content-Type":"application/json"}})}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__like").addEventListener("click",(function(t){t.target.classList.toggle("card__like_active"),t.target.classList.contains("card__like_active")?fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards/".concat(e._id,"/likes"),{method:"PUT",headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){e._element.querySelector(".card__number-of-likes").textContent=t.likes.length})):fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards/".concat(e._id,"/likes"),{method:"DELETE",headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){e._element.querySelector(".card__number-of-likes").textContent=t.likes.length}))})),"dbbc920c38acac6899a63e51"===this._ownerID&&this._element.querySelector(".card__delete").addEventListener("click",(function(){K.open(),K._popup.querySelector(".popup__submit-button").addEventListener("click",e.deleteCard),K._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&K._popup.querySelector(".popup__submit-button").removeEventListener("click",e.deleteCard),t.target.classList.contains("popup__close")&&K._popup.querySelector(".popup__submit-button").removeEventListener("click",e.deleteCard)})),document.addEventListener("keydown",(function(t){"Escape"===t.key&&K._popup.querySelector(".popup__submit-button").removeEventListener("click",e.deleteCard)}))})),this._cardPhoto.addEventListener("click",(function(){e._handleCardClick(e._link,e._name)}))}}])&&t(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var r=function(){function e(t,n){var o=t.items,r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=o,this._renderer=r,this._containerElement=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._containerElement.prepend(e)}},{key:"addInitialItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var a=function(){function e(t,n){var o=t.inputSelector,r=t.inputClassInvalid,i=t.submitSelector,a=t.submitClassInactive,c=t.errorClassActive;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=o,this._inputClassInvalid=r,this._submitSelector=i,this._submitClassInactive=a,this._errorClassActive=c,this._formElement=n}var t,n;return t=e,(n=[{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._submitClassInactive),this._buttonElement.disabled=!0):(this._buttonElement.classList.remove(this._submitClassInactive),this._buttonElement.disabled=!1)}},{key:"disableSubmit",value:function(){this._buttonElement.classList.add(this._submitClassInactive),this._buttonElement.disabled=!0}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));n.classList.add(this._errorClassActive),n.textContent=t,e.classList.add(this._inputClassInvalid)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._errorClassActive),t.textContent="",e.classList.remove(this._inputClassInvalid)}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"enableValidation",value:function(){var e=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitSelector),this.toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e.toggleButtonState()}))}))}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close")&&e.close()}))}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=f(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},p.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function h(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(o);if(r){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._photoInPopup=t._popup.querySelector(".popup__photo"),t._cardCaption=t._popup.querySelector(".popup__caption"),t}return t=a,(n=[{key:"open",value:function(e,t){p(_(a.prototype),"open",this).call(this),this._photoInPopup.src=e,this._photoInPopup.alt=t,this._cardCaption.textContent=t}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function m(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=E(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},v.apply(this,arguments)}function E(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function w(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(o);if(r){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popup.querySelector(".popup__form"),n._submitForm=t,n._inputList=n._form.querySelectorAll(".popup__input"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;v(S(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm(e._getInputValues()),e.close()}))}},{key:"close",value:function(){v(S(a.prototype),"close",this).call(this),this._form.reset()}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var j=function(){function e(t){var n=t.name,o=t.job;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._job=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,job:this._job.textContent}}},{key:"setUserInfo",value:function(e,t){this._name.textContent=e,this._job.textContent=t}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),L=document.querySelector(".profile"),O=L.querySelector(".profile__avatar"),P=L.querySelector(".profile__edit-button"),I=L.querySelector(".profile__add-button"),q=(document.querySelector(".cards"),".cards"),T=document.querySelector(".popup-edit"),R=T.querySelector(".popup__input_field_name"),x=T.querySelector(".popup__input_field_job"),A=T.querySelector(".popup__form"),D=document.querySelector(".popup-add").querySelector(".popup__form"),z=[],B={inputSelector:".popup__input",inputClassInvalid:"popup__input_invalid",submitSelector:".popup__submit-button",submitClassInactive:"popup__submit-button_inactive",errorClassActive:"popup__error_active"};function U(e){return new n(e,"#card-template",(function(e,t){H.open(e,t)})).createCard()}fetch("https://nomoreparties.co/v1/cohort-42/users/me",{headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8"}}).then((function(e){return e.json()})).then((function(e){F.setUserInfo(e.name,e.about),O.src=e.avatar})),fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards",{headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8"}}).then((function(e){return e.json()})).then((function(e){e.forEach((function(e){z.push(e)}));var t=new r({items:z,renderer:function(e){t.addItem(U(e))}},q);t.addInitialItems()}));var V=new r({items:z,renderer:function(e){V.addItem(U(e))}},q),F=new j({name:".profile__name",job:".profile__description"}),N=new a(B,A),J=new a(B,D);N.enableValidation(),J.enableValidation();var H=new y(".photo-popup"),M=new C(".popup-edit",(function(e){F.setUserInfo(e.name,e.job),fetch("https://mesto.nomoreparties.co/v1/cohort-42/users/me",{method:"PATCH",headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8","Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.job})})})),G=new C(".popup-add",(function(e){fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards",{method:"POST",headers:{authorization:"4ebcb58d-24e4-4099-bba2-cf0ad7de26a8","Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return e.json()})).then((function(e){var t=U(e);V.addItem(t)}))})),K=new s(".delete-popup");H.setEventListeners(),M.setEventListeners(),G.setEventListeners(),K.setEventListeners(),P.addEventListener("click",(function(){var e=F.getUserInfo();R.value=e.name,x.value=e.job,N.disableSubmit(),M.open()})),I.addEventListener("click",(function(){J.disableSubmit(),G.open()}))})();