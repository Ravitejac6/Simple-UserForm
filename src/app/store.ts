import { ThunkAction, Action, createStore } from "@reduxjs/toolkit";
import { formReducer } from "../features/forms/reducer";

export const store = createStore(formReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
