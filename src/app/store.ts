import { ThunkAction, Action, createStore } from "@reduxjs/toolkit";
import { formReducer, UserForm } from "../features/forms/reducer";

const allUsersArray: UserForm[] = [];
const saveToLocalStorage = (state: UserForm) => {
  try {
    const userData = state;
    allUsersArray.push(userData);
    const serializable = JSON.stringify(allUsersArray);
    localStorage.setItem("AllUsersFormData", serializable);
  } catch (e) {
    console.log(e);
  }
};

const getDataFromLocalStorage = () => {
  try {
    const serializableState = localStorage.getItem("AllUsersFormData");
    if (serializableState === null) {
      return undefined;
    }
    return JSON.parse(serializableState);
  } catch (e) {
    console.log(e);
  }
};

export const store = createStore(formReducer, getDataFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
