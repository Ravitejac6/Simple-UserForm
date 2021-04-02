import axios from "axios";
import {
  SetFormAction,
  UpdateFormAction,
  EditFormAction,
} from "../../actions/actions";

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
  userImage: string;
  file?: FormData | string; //Image file used to store the image path
}

const initialState: UserForm = {
  firstName: "",
  gender: "",
  email: "",
  mobileNumber: "",
  userImage: "",
  c: false,
  c_plus: false,
  python: false,
  file: "",
};

const saveToLocalStorage = (state: UserForm) => {
  try {
    let allUsersDataArr: UserForm[] = [];
    if (localStorage.getItem("usersData") !== null) {
      const val = localStorage.getItem("usersData");
      if (val) {
        let arr: Array<UserForm> = JSON.parse(val);
        arr.map((user) => {
          allUsersDataArr.push(user);
        });
        allUsersDataArr.push(state);
        localStorage.setItem("usersData", JSON.stringify(allUsersDataArr));
        //console.log(allUsersDataArr);
      }
    } else {
      allUsersDataArr.push(state);
      const serializable = JSON.stringify(allUsersDataArr);
      console.log(allUsersDataArr);
      localStorage.setItem("usersData", serializable);
    }
  } catch (e) {
    console.log(e);
  }
};

const postRequestData = (action: SetFormAction) => {
  axios.post("/records", {
    firstName: action.payload.firstName,
    gender: action.payload.gender,
    email: action.payload.email,
    mobileNumber: action.payload.mobileNumber,
    //image: action.payload.userImage,
    image: action.payload.file,
    file_image: action.payload.file,
    c: action.payload.c,
    c_plus: action.payload.c_plus,
    python: action.payload.python,
  });
};

const setUserFormReducer = (state: UserForm, action: SetFormAction) => {
  postRequestData(action);
  saveToLocalStorage(action.payload);
  return {
    ...state,
    firstName: action.payload.firstName,
    gender: action.payload.gender,
    email: action.payload.email,
    mobileNumber: action.payload.mobileNumber,
    userImage: action.payload.userImage,
    c: action.payload.c,
    c_plus: action.payload.c_plus,
    python: action.payload.python,
  };
};

// const updateFormReducer = (state: UserForm, action: UpdateFormAction) => {
//   console.log("Update Form" + action.payload);
//   return {
//     ...state,
//     firstName: action.payload.firstName,
//     gender: action.payload.gender,
//     email: action.payload.email,
//     mobileNumber: action.payload.mobileNumber,
//     userImage: action.payload.userImage,
//     c: action.payload.c,
//     c_plus: action.payload.c_plus,
//     python: action.payload.python,
//   };
// };

const editFormReducer = (state: UserForm, action: EditFormAction) => {
  console.log("Edit form" + action.payload.email);
  return {
    ...state,
    firstName: action.payload.firstName,
    gender: action.payload.gender,
    email: action.payload.email,
    mobileNumber: action.payload.mobileNumber,
    userImage: action.payload.userImage,
    c: action.payload.c,
    c_plus: action.payload.c_plus,
    python: action.payload.python,
  };
};

export const formReducer = (
  state: UserForm = initialState,
  action: SetFormAction | UpdateFormAction | EditFormAction
) => {
  switch (action.type) {
    case "SET_FORM": {
      return setUserFormReducer(state, action);
    }
    // case "UPDATE_FORM": {
    //   return updateFormReducer(state, action);
    // }
    case "EDIT_FORM": {
      return editFormReducer(state, action);
    }
    default: {
      return state;
    }
  }
};
