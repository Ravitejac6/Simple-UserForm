import { UserForm } from "../features/forms/reducer";

export type SetFormAction = { type: "SET_FORM"; payload: UserForm };
export type UpdateFormAction = { type: "UPDATE_FORM"; payload: UserForm };
export type EditFormAction = { type: "EDIT_FORM"; payload: UserForm };

export const setForm = (userForm: UserForm): SetFormAction => ({
  type: "SET_FORM",
  payload: userForm,
});

export const UpdateForm = (userForm: UserForm): UpdateFormAction => ({
  type: "UPDATE_FORM",
  payload: userForm,
});

export const editForm = (userForm: UserForm): EditFormAction => ({
  type: "EDIT_FORM",
  payload: userForm,
});
