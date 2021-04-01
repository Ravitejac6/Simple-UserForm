import React,{useEffect} from 'react'
import {UserForm} from './reducer'
import {Card, CardContent, CardHeader, GridList, GridListTile} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
export const ViewRecordComponent = () =>{
    let allUsersData:UserForm[] = [];

    useEffect(()=>{
        axios.get('/records').then(res => {
            const data:Array<any> = res.data
            console.log(data)
            data.map((user) =>{
                allUsersData.push(user)
            })
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
                                <img src={`data:image/jpeg/png;base64,${user.userImage}`} alt="Image not loaded" width="275" height="250"/>
                                <CardContent>
                                    <h4>{user.gender}</h4>
                                    <h4>{user.mobileNumber}</h4>
                                    {user.c === true?<h4>C</h4>:''}
                                    {user.c_plus === true?<h4>C_Plus</h4>:''}
                                    {user.python === true?<h4>Python</h4>:''}
                                </CardContent>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </>
    )
}