export type RootParaList = {
  Splash: undefined;
  Auth: {screen: 'Login' | 'Sign'};
  App: {screen: 'Home' | 'AddNotes'};
};

export type Auth = {
  Sign: undefined;
  Login: undefined;
};

export type App = {
  Home: undefined;
  AddNotes: undefined;
};

