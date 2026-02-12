export type ScreenName = 'Home' | 'Exercise1Paper' | 'Exercise2Api' | 'Exercise3Sqlite';

export type RouteParams = {
  Home: undefined;
  Exercise1Paper: undefined;
  Exercise2Api: undefined;
  Exercise3Sqlite: undefined;
};

export type Route<T extends ScreenName = ScreenName> = {
  name: T;
  params: RouteParams[T];
};

export type AppNavigation = {
  navigate: <T extends ScreenName>(name: T, params: RouteParams[T]) => void;
  goBack: () => void;
};
