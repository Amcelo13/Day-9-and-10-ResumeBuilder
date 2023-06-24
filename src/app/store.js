import { configureStore, combineReducers } from "@reduxjs/toolkit";
import templateSlice from './features/templateSlice' //importing slice 
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,

  //blacklist means it will not be persisted
  
};


const mypersistReducer = persistReducer(persistConfig, templateSlice);

export const store = configureStore({
  reducer: mypersistReducer,
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
