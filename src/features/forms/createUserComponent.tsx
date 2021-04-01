import React, { useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import {
  UserForm,
  Technology
} from './reducer';
import {useForm} from 'react-hook-form'
import {setForm} from '../../actions/actions'
import {TextField, Button, Radio, RadioGroup, FormControlLabel, Checkbox,FormGroup} from '@material-ui/core';
import {DialogBoxComponent} from '../previewModalComponent'
import {useHistory} from 'react-router-dom'
import axios from 'axios';


export const Forms= () => {

  let intialStateUserTechnology : Technology = {
    c : false,
    c_plus : false,
    python : false
  }
  const dispatch = useDispatch();
  const {register, handleSubmit, errors} = useForm();
  const [user, setUser] = useState<UserForm | {}>();
  const [userTech, setUserTech] = useState<Technology>(intialStateUserTechnology);
  const history = useHistory()
  let base64UserImage:string=''
  let image_file:File;

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
    setUserTech(prevUserTech => 
      ({
        ...prevUserTech, 
        [e.currentTarget.name] : e.currentTarget.checked}
      ))
  }
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files !== null){
      let file = e.target.files[0]
      image_file = e.target.files[0]
      if(file){
          const reader = new FileReader()
          reader.addEventListener('loadend',() =>{
             let binaryString  = reader.result as string
             base64UserImage = btoa(binaryString)
          },false)
          reader.readAsBinaryString(file)
      }
    }
  }

  const onSubmit = (data:UserForm) =>{
    let formData = new FormData()
    let imgVal = ''
    formData.append('file',image_file,image_file.name)
    console.log("FileName"+image_file.name)
    try{
      fetch('/records/upload',{
        method:'POST',
        body:formData
      }).then(res => res.json()).then(data => console.log(data))
    }catch(err){console.log(err)}
    newUser = {
      firstName: data.firstName,
      email : data.email,
      gender:data.gender,
      mobileNumber : data.mobileNumber,
      c: userTech.c,
      c_plus: userTech.c_plus,
      python:userTech.python,
      userImage : base64UserImage,
      file:imgVal
    }
    dispatch(setForm(newUser))
    history.push('/users/view')
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField name="firstName" label="First Name" onChange = {(e) => handleUserData(e)} inputRef={register({required: "First Name is required.", minLength:"2", maxLength:"30"})} error={Boolean(errors.firstName)} helperText={errors.firstName?.message}/>
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
        <input type="file" className="upload-button" name="file" id="file" accept=".jpeg, .png, .jpg" onChange = {(e) => handleImageUpload(e)}/><br/>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          disabled={user === undefined ? true:false}
        >
          Submit
        </Button>
      </form>
      <DialogBoxComponent/>
    </div>
  );
}
