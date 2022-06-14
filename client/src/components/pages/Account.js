import React, { useContext } from 'react'
import {TextField, Stack, Button, Card, Typography} from '@mui/material'
import { orange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import userContext from '../../context/UserContext';
const muicolor = orange[200]

const Account = () => {
    const {setUpdatePassInput, updatePassInput, handleChangePassword} = useContext(userContext)
  return (
    <Card sx={{px:10, py:7, width:"50%", display:"flex", justifyContent:"center", bgcolor:muicolor}}>
      
      <Stack spacing={2} sx={{width:"60%"}} >
        <Typography variant="h5" sx={{p:2}} align='center'>
            Change your password
        </Typography>
        <TextField
          id="filled-hidden-label-normal"
          variant="filled"
          type="password"
          size="small"
          label="Old Password"
          name="oldPassword"
          value={updatePassInput.email}
          onChange={(e)=> setUpdatePassInput(prev=>({...prev, [e.target.name]:e.target.value}))}
        />
        <TextField
          id="filled-hidden-label-normal"
          variant="filled"
          size="small"
          type="password"
          label="New Password"
          name="newPassword"
          value={updatePassInput.password}
          onChange={(e)=> setUpdatePassInput(prev=>({...prev, [e.target.name]:e.target.value}))}
        />
       
            
          <Stack spacing={2} direction="column" justifyContent="center">
            <Link to="/register">Don't have an account?</Link>
            <Button variant='contained' size='large' color='warning' onClick={handleChangePassword}>Change Password</Button>
          </Stack>
      </Stack>
    </Card>
  )
}

export default Account
