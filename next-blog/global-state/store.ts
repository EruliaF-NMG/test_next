'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
import formReducer from './slice/formSlices';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        form:formReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;