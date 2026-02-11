import { Contact } from '../types/contact';

export type ScreenName = 'Home' | 'AddContact' | 'Details';

export type RouteParams = {
  Home: {
    refreshAt?: number;
    toastMessage?: string;
  };
  AddContact: undefined;
  Details: {
    contact: Contact;
  };
};

export type Route<T extends ScreenName = ScreenName> = {
  name: T;
  params: RouteParams[T];
};

export type AppNavigation = {
  navigate: <T extends ScreenName>(name: T, params: RouteParams[T]) => void;
  goBack: () => void;
};
