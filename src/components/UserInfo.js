export default class UserInfo {
  constructor({name, job, avatar}) {
    this._name = document.querySelector(name);  // псевдоним (имя) пользователя
    this._job = document.querySelector(job);  // статус пользователя
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {name: this._name.textContent, job: this._job.textContent};
  }

  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }

  setAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }
}