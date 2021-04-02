import React, { useEffect, useState } from "react";
import { UserForm } from "./reducer";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  GridList,
  GridListTile,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import axios from "axios";
import CreateIcon from "@material-ui/icons/Create";
import { DeleteButtonDialogComponent } from "../deleteButtonDialgoComponent";
import { useDispatch } from "react-redux";
import { editForm } from "../../actions/actions";
import { useHistory } from "react-router";

export const ViewRecordComponent = () => {
  const [allUsersData, setAllUsersData] = useState<UserForm[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let data_arr: UserForm[] = [];
    axios.get("/records").then((res) => {
      const data: Array<any> = res.data;
      data.map((user) => {
        let newUser: UserForm = {
          firstName: user.firstName,
          email: user.email,
          gender: user.gender,
          mobileNumber: user.mobileNumber,
          c: user.c,
          c_plus: user.c_plus,
          python: user.python,
          userImage: user.image,
        };
        data_arr.push(newUser);
      });
      setAllUsersData(data_arr);
    });
  }, []);
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 1200,
        height: 600,
        marginTop: 20,
      },
    })
  );
  const useStylesForCard = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: 350,
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
    })
  );

  const classesForCard = useStylesForCard();
  const classes = useStyles();

  const handleEditUser = (userEmail: string, user: UserForm) => {
    dispatch(editForm(user));
    history.push("/users/create");
    console.log(userEmail);
  };

  return (
    <>
      <h4>Users Records View</h4>
      {console.log(allUsersData)}
      <div className={classes.root}>
        <GridList
          cellHeight="auto"
          className={classes.gridList}
          cols={3}
          spacing={5}
        >
          {allUsersData.map((user) => (
            <GridListTile key={user.email} cols={1}>
              <Card className={classesForCard.root} variant="outlined">
                <CardHeader title={user.firstName} subheader={user.email} />
                {/* <CardMedia src={`data:image/jpeg/png;base64,${user.userImage}`}/> */}
                {/* <img src={`data:image/jpeg/png;base64,${user.userImage}`} alt="Image not loaded" width="275" height="250"/> */}
                <img
                  src={`../../../form-backend/uploads/${user.userImage}`}
                  alt="Image not loaded"
                  width="275"
                  height="250"
                />
                <CardContent>
                  <span>
                    <h4>
                      Gender:<span>{user.gender}</span>
                    </h4>
                  </span>
                  <span>
                    <h4>
                      Phone Number:
                      <span>{user.mobileNumber}</span>
                    </h4>
                  </span>
                  <h4>Technologies:</h4>
                  <ul>
                    {user.c === true ? (
                      <li>
                        <h4>C</h4>
                      </li>
                    ) : (
                      ""
                    )}
                    {user.c_plus === true ? (
                      <li>
                        <h4>C++</h4>
                      </li>
                    ) : (
                      ""
                    )}
                    {user.python === true ? (
                      <li>
                        <h4>Python</h4>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    startIcon={<CreateIcon />}
                    onClick={() => handleEditUser(user.email, user)}
                  >
                    Edit
                  </Button>
                  <DeleteButtonDialogComponent userEmail={user.email} />
                </CardActions>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </>
  );
};
