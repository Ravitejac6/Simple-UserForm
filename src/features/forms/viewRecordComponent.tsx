import React,{useEffect, useState} from 'react'
import {UserForm} from './reducer'
import {Button, Card, CardActions, CardContent, CardHeader, GridList, GridListTile} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'


export const ViewRecordComponent = () =>{
    let data_arr:UserForm[] = [];
    const [allUsersData, setAllUsersData] = useState<UserForm[]>([])
    useEffect(()=>{
        axios.get('/records').then(res => {
            const data:Array<any> = res.data
            data.map((user) =>{
                let newUser:UserForm = {
                    firstName: user.firstName,
                    email: user.email,
                    gender:user.gender,
                    mobileNumber:user.mobileNumber,
                    c:user.c,
                    c_plus:user.c_plus,
                    python:user.python,
                    userImage:user.image
                }
                data_arr.push(newUser)
            })
            setAllUsersData(data_arr)
        })
    },[])
    // const loadData = () =>{
    //     const localStorageVal = localStorage.getItem('usersData')
    //     if(localStorageVal){
    //         let arr: Array<UserForm> = JSON.parse(localStorageVal);
    //         arr.map((user) => {
    //             allUsersData.push(user);
    //         });
    //     }
    // }

    // loadData()

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
            },
            gridList: {
                width: 1000,
                height: 600,
            },
        }),
    );
    const useStylesForCard = makeStyles((theme: Theme) =>
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

    const classesForCard = useStylesForCard();
    const classes = useStyles()

    const handleEditUser = (userEmail:string) =>{
        console.log(userEmail)
    }

    const handleDeleteUser = (userEmail:string) =>{
        console.log(userEmail)
        fetch('/records/'+userEmail,{
            method:'DELETE'
        }).catch(err => {console.log(err)})
    }
    return(
        <>
            <h4>Users Records View</h4>
            {console.log(allUsersData)}
            <div className={classes.root}>
                <GridList cellHeight={700} className={classes.gridList} cols={3}>
                    {allUsersData.map((user) => (
                        <GridListTile key={user.email} cols={1}>
                            <Card className={classesForCard.root} variant="outlined">
                                <CardHeader 
                                    title={user.firstName}
                                    subheader = {user.email}
                                />
                                {/* <CardMedia src={`data:image/jpeg/png;base64,${user.userImage}`}/> */}
                                {/* <img src={`data:image/jpeg/png;base64,${user.userImage}`} alt="Image not loaded" width="275" height="250"/> */}
                                <img src="" alt="Image not loaded" width="275" height="250"/>
                                <CardContent>
                                    <h4>{user.gender}</h4>
                                    <h4>{user.mobileNumber}</h4>
                                    {user.c === true?<h4>C</h4>:''}
                                    {user.c_plus === true?<h4>C_Plus</h4>:''}
                                    {user.python === true?<h4>Python</h4>:''}
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        color="primary" 
                                        variant="contained" 
                                        startIcon={<CreateIcon/>}
                                        onClick={() => handleEditUser(user.email)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        size="small" 
                                        color="secondary" 
                                        variant="contained" 
                                        startIcon={<DeleteIcon/>}
                                        onClick = {() => handleDeleteUser(user.email)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </>
    )
}