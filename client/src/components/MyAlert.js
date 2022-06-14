import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import userContext from '../context/UserContext';

export default function MyAlert() {
  const {display, setDisplay, alertDetails} = React.useContext(userContext)
  return (
    <Stack sx={{ width: '100%' }} spacing={2} style={{display}}>
      <Alert onClose={()=>setDisplay(prev=>(prev==="none")?"block":"none")} severity={`${alertDetails.status}`}>{alertDetails.title} — {alertDetails.message}</Alert>
    </Stack>
  );
}