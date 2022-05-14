export default class FormValidator {
  constructor({inputSelector, inputClassInvalid, submitSelector, submitClassInactive, errorClassActive}, formElement) {
    this._inputSelector = inputSelector;
    this._inputClassInvalid = inputClassInvalid;
    this._submitSelector = submitSelector;
    this._submitClassInactive = submitClassInactive;
    this._errorClassActive = errorClassActive;
    this._formElement = formElement;
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  toggleButtonState() {  // переключает кнопку submit, если форма не проходит валидацию
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._submitClassInactive);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._submitClassInactive);
      this._buttonElement.disabled = false;
    };
  }

  disableSubmit() {   // деактивировать кнопку "принять"
    this._buttonElement.classList.add(this._submitClassInactive);
    this._buttonElement.disabled = true;
  }

  _showInputError (formInput, errorMessage) {   // показать поле с ошибкой
    const errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    errorElement.classList.add(this._errorClassActive);
    errorElement.textContent = errorMessage;
    formInput.classList.add(this._inputClassInvalid);
  };

  _hideInputError (formInput) {   // скрыть поле с ошибкой
    const errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    errorElement.classList.remove(this._errorClassActive);
    errorElement.textContent = '';
    formInput.classList.remove(this._inputClassInvalid);
  };

  _isValid(formInput) {  // вызывает ошибку, если поле не проходит валидацию
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    };
  }

  enableValidation() {  // обойти все поля в форме
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitSelector);
    this.toggleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this.toggleButtonState();
      });
    });
  }
}