import React, { useContext } from 'react'
import {TextField, Stack, Button, Card, Typography} from '@mui/material'
import { orange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import userContext from '../../context/UserContext';
const muicolor = orange[200]
const Login = () => {
  const {loginUser, loginInputs, setLoginInputs} = useContext(userContext)
  return (
    <>
    
    <Card sx={{px:10, py:7, width:"50%", display:"flex", justifyContent:"center", bgcolor:muicolor}}>
      <Stack spacing={2} sx={{width:"60%"}} >
        <Typography variant="h5" sx={{p:2}} align='center'>
          Login for NoteIt
        </Typography>
        <TextField
          id="filled-hidden-label-normal"
          variant="filled"
          type="email"
          size="small"
          label="Email"
          name="email"
          value={loginInputs.email}
          onChange={(e)=> setLoginInputs(prev=>({...prev, [e.target.name]:e.target.value}))}
        />
        <TextField
          id="filled-hidden-label-normal"
          variant="filled"
          size="small"
          type="password"
          label="Password"
          name="password"
          value={loginInputs.password}
          onChange={(e)=> setLoginInputs(prev=>({...prev, [e.target.name]:e.target.value}))}
        />
       
            
          <Stack spacing={2} direction="column" justifyContent="center">
            <Link to="/register">Don't have an account?</Link>
            <Button variant='contained' size='large' color='warning' onClick={loginUser}>Login</Button>
          </Stack>
      </Stack>
    </Card>
    </>
  )
}

export default Login
