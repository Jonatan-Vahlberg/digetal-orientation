import { makeAutoObservable } from 'mobx';

class LocationStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default LocationStore;
