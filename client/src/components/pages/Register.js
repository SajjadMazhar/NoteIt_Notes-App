import React, { useContext } from 'react'
import {TextField, Stack, Button, Card, Typography} from '@mui/material'
import { orange } from '@mui/material/colors';
import userContext from '../../context/UserContext';
const muicolor = orange[200]
const Register = () => {
  
  const {
      handleOnChangeRegisterInputs,
      registerInputs,
      addNewUser,
      setRegisterInputs
    } = useContext(userContext)
  return (
    <Card sx={{px:10, py:7, width:"50%", display:"flex", justifyContent:"center", bgcolor:muicolor}}>
      
      <Stack spacing={2} sx={{width:"60%"}} >
        <Typography variant="h5" sx={{p:2}} align='center'>
          Register for NoteIt
        </Typography>
      
          <TextField
          value={registerInputs.name}
          name="name"
          onChange={handleOnChangeRegisterInputs}
          id="filled-hidden-label-small"
          variant="filled"
          label="Name"
          size="small"
        />
        <TextField
          value={registerInputs.email}
          name="email"
          onChange={handleOnChangeRegisterInputs}
          id="filled-hidden-label-normal"
          variant="filled"
          size="small"
          label="Email"
        />
        <TextField
          value={registerInputs.password}
          name="password"
          onChange={handleOnChangeRegisterInputs}
          id="filled-hidden-label-normal"
          variant="filled"
          size="small"
          type="password"
          label="Password"
        />
        <TextField
          id="filled-hidden-label-normal"
          value={registerInputs.confirmPassword}
          name="confirmPassword"
          onChange={handleOnChangeRegisterInputs}
          variant="filled"
          type="password"
          size="small"
          label="Confirm Password"
        />
        <label>Date of birth</label>
        <TextField
          value={registerInputs.dob}
          name="dob"
          onChange={handleOnChangeRegisterInputs}
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="date"
          size="small"
        />
        <label>Upload Profile Picture</label>
        <TextField
          name='dp'
          onChange={e=> setRegisterInputs(prev=>({...prev, dp:e.target.files[0]}))}
          id="filled-hidden-label-normal"
          type="file"
          size="small"
        />
            
          <Stack spacing={2} direction="column" justifyContent="center">
            <Button variant='contained' size='large' color='warning' onClick={addNewUser}>signup</Button>
          </Stack>
      </Stack>
    </Card>
  )
}

export default Register
