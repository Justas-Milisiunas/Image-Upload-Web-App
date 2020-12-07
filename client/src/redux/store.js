import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

import { INITIAL_STATE } from './reducers/authReducer';

// TODO: Refactor this code by extracting user state handling to the different file

const loadUserState = () => {
  try {
    const userState = localStorage.getItem('user');
    return JSON.parse(userState);
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

const saveUserState = (state) => {
  try {
    const deserializedUserState = JSON.stringify(state.user.data);
    localStorage.setItem('user', deserializedUserState);
  } catch (e) {
    console.log(e.message);
  }
};

const getUserInitialState = () => {
  const userState = loadUserState();
  return {
    user: {
      ...INITIAL_STATE,
      data: userState,
      isSignedIn: true,
    },
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  getUserInitialState(),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  saveUserState(store.getState());
});

export default store;
