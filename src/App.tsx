import React from 'react';
import { Forms } from './features/forms/UserForm';
import './App.css';
import {UserForm} from './features/forms/reducer'
import {useSelector} from 'react-redux'
import {ToolBarComponent} from './features/toolbar'
import { DialogBoxComponent } from './features/dialogBoxComponent';
import {ViewRecordComponent} from './features/forms/viewRecordComponent'
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect} from 'react-router-dom';



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
