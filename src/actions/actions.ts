import { UserForm } from "../features/forms/reducer";

export type Action = { type: "SET_FORM"; payload: UserForm };
export const setForm = (userForm: UserForm): Action => ({
  type: "SET_FORM",
  payload: userForm,
});
