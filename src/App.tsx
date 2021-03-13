import React from 'react';
import { Forms } from './features/forms/userFormComponent';
import './App.css';
import {UserForm} from './features/forms/reducer'
import {useSelector} from 'react-redux'
import {ToolBarComponent} from './features/toolbar'
import {ViewRecordComponent} from './features/forms/viewRecordComponent'
import {Switch, Route, Redirect} from 'react-router-dom';



const App = () => {
  const selectUserForm:UserForm = useSelector((state:UserForm) => state)

  return(
    <>
      <ToolBarComponent/>
            {console.log(selectUserForm)}
        <Switch>
          <Route exact path="/" >
            <Redirect to="/users/create"/>
          </Route>
          <Route path="/users/create">
              <div className="form-area">
                <Forms/> 
              </div>
          </Route>
          <Route path="/users/view">
            <ViewRecordComponent/>
          </Route>
        </Switch> 
    </>
  ); 
}

export default App;
