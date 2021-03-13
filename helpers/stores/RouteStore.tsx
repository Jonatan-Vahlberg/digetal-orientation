import { makeAutoObservable } from 'mobx';

class RouteStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default RouteStore;
