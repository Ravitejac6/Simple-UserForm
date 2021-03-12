import React from 'react'
import {UserForm} from './reducer'
import {Card, CardContent, CardHeader, CardMedia} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                maxWidth: 375,
            },
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            },
        }),
    );

    const classes = useStyles();
    return(
        <>
            <h4>Users Records View</h4>
            {console.log(allUsersData)}
            {allUsersData.map(user =>{
                return(
                <div key={user.email} className="records-view">
                    <Card className={classes.root} variant="outlined">
                        <CardHeader 
                            title={user.firstName}
                            subheader = {user.email}
                        />
                        {/* <CardMedia src={`data:image/jpeg/png;base64,${user.userImage}`}/> */}
                        <img src={`data:image/jpeg/png;base64,${user.userImage}`} alt="Image not loaded" width="275" height="325"/>
                        <CardContent>
                            <h4>{user.gender}</h4>
                            <h4>{user.mobileNumber}</h4>
                            {user.c === true?<h4>C</h4>:''}
                            {user.c_plus === true?<h4>C_Plus</h4>:''}
                            {user.python === true?<h4>Python</h4>:''}
                        </CardContent>
                    </Card>
                    {/* <img src={`data:image/jpeg/png;base64,${user.userImage}`} alt="Image not loaded" width="275" height="325"/> */}
                </div>
                )
            })}
        </>
    )
}