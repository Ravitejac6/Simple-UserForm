import React from 'react';
import { Forms } from './features/forms/UserForm';
import './App.css';
import {UserForm} from './features/forms/formSlice'
import {useSelector} from 'react-redux'
import {ToolBarComponent} from './features/toolbar'
import { DialogBoxComponent } from './features/dialogBoxComponent';


const App = () => {
  const selectUserForm:UserForm = useSelector((state:UserForm) => state)

  return(
    <>
      <ToolBarComponent/>
        <div className="form-area">
          <Forms/> 
        </div>
        <div>
          <DialogBoxComponent/>
        </div>
          {console.log(selectUserForm)} 
    </>
  ); 
}

export default App;
