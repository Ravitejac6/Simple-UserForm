import React from 'react';
import { Forms } from './features/forms/UserForm';
import './App.css';
import {UserForm} from './features/forms/formSlice'
import {useSelector} from 'react-redux'
const App = () => {
  const selectUserForm:UserForm = useSelector((state:UserForm) => state)

  return(
    <div>
        <div>
          <Forms/> 
        </div>
          {/* {console.log(selectUserForm)} */}
    </div>
  ); 
}

export default App;
