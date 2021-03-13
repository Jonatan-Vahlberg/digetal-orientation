import { createContext, FC, useContext } from 'react';
import UserStore from './UserStore';
import AuthStore from './AuthStore';
import LocationStore from './LocationStore';
import RouteStore from './RouteStore';

type Stores = {
  userStore: UserStore;
  authStore: AuthStore;
  locationStore: LocationStore;
  routeStore: RouteStore;
};

const StoreContext = createContext<Stores>({
  userStore: new UserStore(),
  authStore: new AuthStore(),
  locationStore: new LocationStore(),
  routeStore: new RouteStore(),
});

const StoreProvider: FC<{ stores: Stores }> = ({ stores, children }) => {
  return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

const useUserStore = () => {
  return useContext(StoreContext).userStore;
};

const useAuthStore = () => {
  return useContext(StoreContext).authStore;
};
const useLocationStore = () => {
  return useContext(StoreContext).locationStore;
};
const useRouteStore = () => {
  return useContext(StoreContext).routeStore;
};

export { StoreProvider, useUserStore, useAuthStore, useLocationStore, useRouteStore, UserStore, AuthStore, LocationStore, RouteStore };
