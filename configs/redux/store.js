import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let store;

const persistConfig = {
  key: "primary",
  storage,
  // whitelist: ['exampleData'], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

function initStore(initialState) {
  return createStore(persistedReducer, initialState, applyMiddleware(thunkMiddleware));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
