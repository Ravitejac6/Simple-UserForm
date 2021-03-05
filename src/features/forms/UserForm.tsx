import React, { useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import {
  setFormUser,
  UserForm,
  Technology
} from './formSlice';
import {useForm} from 'react-hook-form'
import {TextField, Button, Radio, RadioGroup, FormControlLabel, Checkbox,FormGroup} from '@material-ui/core';



export const Forms= () => {
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [user, setUser] = useState<UserForm | {}>();
  const [userTech, setUserTech] = useState<Technology>();

  // Whenever users changes then the technologies need to updated for the user.
  useEffect(() =>{
    setUser(prevUser => ({ ...prevUser, technology: userTech}))
  },[userTech])

  let newUser:UserForm;


  const handleUserData = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      setUser({
        ...user,
        [e.currentTarget.name] : e.currentTarget.value
      })
  }

  const handleUserTechnologyData = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setUserTech(prevUserTech => ({...prevUserTech, [e.currentTarget.name] : e.currentTarget.checked}))
  }

  const onSubmit = (data:UserForm) =>{
    newUser = {
      firstName: data.firstName,
      email : data.email,
      gender:data.gender,
      mobileNumber : data.mobileNumber,
      technology : data.technology
    }
    dispatch(setFormUser(newUser));
    console.log(user);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField name="firstName" label="First Name" onChange = {(e) => handleUserData(e)} inputRef={register}/>
        <RadioGroup name="gender" onChange = {(e) => handleUserData(e)}>
          <FormControlLabel value="female" control={<Radio />} label="Female" inputRef={register}/>
          <FormControlLabel value="male" control={<Radio />} label="Male" inputRef={register}/>
        </RadioGroup>
        <TextField name="email" label="Email" onChange = {(e) => handleUserData(e)} inputRef={register}/>
        <TextField name="mobileNumber" label="Mobile Number" onChange = {(e) => handleUserData(e)} inputRef={register}/>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={(e) => handleUserTechnologyData(e)} name="c" inputRef={register}/>}
            label="C"
          />
          <FormControlLabel
            control={<Checkbox onChange={(e) => handleUserTechnologyData(e)} name="c_plus" inputRef={register}/>}
            label="C++"
          />
          <FormControlLabel
            control={<Checkbox onChange={(e) => handleUserTechnologyData(e)} name="python" inputRef={register}/>}
            label="Python"
          />
        </FormGroup>

        <Button variant="contained" color="primary" type="submit" disabled={user === undefined ? true:false}>Submit</Button>
      </form>
    </div>
  );
}
