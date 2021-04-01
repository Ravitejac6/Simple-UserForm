import axios from "axios";

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
  userImage: "",
  //technology: intialStateTechnology,
  c: false,
  c_plus: false,
  python: false,
  file: "",
};

type Action = { type: "SET_FORM"; payload: UserForm };

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

const postRequestData = (action: Action) => {
  axios.post("/records", {
    firstName: action.payload.firstName,
    gender: action.payload.gender,
    email: action.payload.email,
    mobileNumber: action.payload.mobileNumber,
    //image: action.payload.userImage,
    image: "imageRoy",
    file_image: action.payload.file,
    c: action.payload.c,
    c_plus: action.payload.c_plus,
    python: action.payload.python,
  });
};

const setUserFormReducer = (state: UserForm, action: Action) => {
  postRequestData(action);
  saveToLocalStorage(action.payload);
  return {
    ...state,
    firstName: action.payload.firstName,
    gender: action.payload.gender,
    email: action.payload.email,
    mobileNumber: action.payload.mobileNumber,
    userImage: action.payload.userImage,
    //technology: action.payload.technology,
    c: action.payload.c,
    c_plus: action.payload.c_plus,
    python: action.payload.python,
  };
};

export const formReducer = (state: UserForm = initialState, action: Action) => {
  switch (action.type) {
    case "SET_FORM": {
      return setUserFormReducer(state, action);
    }
    default: {
      return state;
    }
  }
};
