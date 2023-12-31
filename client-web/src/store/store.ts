import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import word from './word/slice';

export const store = configureStore({
	reducer: {
		word
	}
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();