import React from 'react'
import {UserForm} from './reducer'
export const ViewRecordComponent = () =>{
    let allUsersData:UserForm[] = [];

    const loadData = () =>{
        const localStorageVal = localStorage.getItem('usersData')
        if(localStorageVal){
            let arr: Array<UserForm> = JSON.parse(localStorageVal);
            arr.map((user) => {
                allUsersData.push(user);
            });
        }
    }

    loadData()
    return(
        <>
            <h4>Users Records View</h4>
            {console.log(allUsersData)}
            {allUsersData.map(user =>{
                return(
                <div>
                    <h4>{user.firstName}</h4>
                    <h4>{user.email}</h4>
                    <h4>{user.gender}</h4>
                    <h4>{user.mobileNumber}</h4>
                    {user.c === true?<h4>C</h4>:''}
                    {user.c_plus === true?<h4>C_Plus</h4>:''}
                    {user.python === true?<h4>Python</h4>:''}
                    <img src={`data:image/jpeg/png;base64,${user.userImage}`} alt="Image not loaded" width="275" height="325"/>
                </div>
                )
            })}
        </>
    )
}