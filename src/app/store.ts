import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import formReducer from "../features/forms/formSlice";

export const store = configureStore({
  reducer: {
    userform: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
