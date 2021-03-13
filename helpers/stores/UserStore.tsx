import { makeAutoObservable } from 'mobx';

class UserStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }
}

export default UserStore;
