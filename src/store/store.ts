import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as folderReducer } from './slices/folderSlice';

export const store = configureStore({
  reducer: {
    folder: folderReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
