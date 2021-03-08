import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Technology {
  c: boolean;
  c_plus: boolean;
  python: boolean;
}
export interface UserForm extends Technology {
  firstName: string;
  gender: string;
  email: string;
  mobileNumber: string;
}

// const intialStateTechnology: Technology = {
//   c: false,
//   c_plus: false,
//   python: false,
// };

const initialState: UserForm = {
  firstName: "",
  gender: "",
  email: "",
  mobileNumber: "",
  //technology: intialStateTechnology,
  c: false,
  c_plus: false,
  python: false,
};

export const formSlice = createSlice({
  name: "userform",
  initialState,
  reducers: {
    setFormUser: (state, action: PayloadAction<UserForm>) => {
      console.log(action);
      return {
        ...state,
        firstName: action.payload.firstName,
        gender: action.payload.gender,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        //technology: action.payload.technology,
        c: action.payload.c,
        c_plus: action.payload.c_plus,
        python: action.payload.python,
      };
    },
  },
});

export const { setFormUser } = formSlice.actions;
// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

export default formSlice.reducer;
