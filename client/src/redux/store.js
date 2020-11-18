import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const getTokensFromLocalStorage = () => {
  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  return {
    accessToken,
    refreshToken,
  };
};

const isUserSignedIn = (tokens) =>
  Boolean(tokens.accessToken && tokens.refreshToken);

const tokensFromLocalStorage = getTokensFromLocalStorage();

const initialState = {
  user: {
    ...tokensFromLocalStorage,
    isSignedIn: isUserSignedIn(tokensFromLocalStorage),
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  const { accessToken, refreshToken } = store.getState().user;

  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
});

export default store;
