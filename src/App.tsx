import React from 'react';
import { Forms } from './features/forms/UserForm';
import './App.css';
import {UserForm} from './features/forms/reducer'
import {useSelector} from 'react-redux'
import {ToolBarComponent} from './features/toolbar'
import { DialogBoxComponent } from './features/dialogBoxComponent';
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch} from 'react-router-dom';



const App = () => {
  const selectUserForm:UserForm = useSelector((state:UserForm) => state)

  return(
    <>
      <ToolBarComponent/>
        <Router>
          <div className="form-area">
            <Forms/> 
          </div>
          <div>
            <DialogBoxComponent/>
          </div>
            {console.log(selectUserForm)}
        </Router> 
    </>
  ); 
}

export default App;
