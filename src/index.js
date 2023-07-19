import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authSlice from "./stores/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // data persists in local storage and remains there even when page is refreshed or closed, unless user clears cache
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// redux-persist integration //
const persistConfig = { key: "root", storage, version: 1 }; // configuration object for Redux Persist
const persistedReducer = persistReducer(persistConfig, authSlice); // wraps configuration and reducer into `persistedReducer`. `persistReducer` can take multiple reducers.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  
);

/*
<Provider> is a higher-order component that wraps the application and makes the store accessible to all components in the component tree.
It takes Redux `store` as a prop and ensures that any components can access the store and dispatch actions.

<PersistGate> delays the application until the persisted state is retrieved and rehydrated into the Redux store.
It takes 2 props: 
- `loading` prop which determines what to render while state is being loaded and
- `persistor` prop which uses `persistStore(store)` to provide the necessary persistence config.

`rehydrate` = a phase where the persisted data in storage replaces the data in Redux store.
The rehydration process ensures that when the application starts or reloads, it initializes the Redux 
store with the previously persisted state, allowing the application to resume from where it left off.
*/
