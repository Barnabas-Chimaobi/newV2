import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, PersistConfig } from 'redux-persist';
import {
    userSlice, formSlice, schoolSetupSlice, invoiceSlice, studentSlice
} from './reducers';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage: storage,
  }

 const rootReducer = combineReducers({ 
    user: userSlice,
    form: formSlice,
    schoolSetup: schoolSetupSlice,
    invoice: invoiceSlice,
    student: studentSlice
  })

 const persistedReducer = persistReducer(persistConfig, rootReducer)


 export const store = configureStore({
    reducer: persistedReducer,
    // reducer: {
    //     user: userSlice,
    // },
    middleware: [
        ...getDefaultMiddleware({ immutableCheck: false, 
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
              } 
         }),
        thunkMiddleware,
       ],
 });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);