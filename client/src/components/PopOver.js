import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {TextField, Stack, Button, Grid} from '@mui/material'
import noteContext from '../context/NoteContext';

export default function BasicPopover() {
  const {anchorEl, handleClose, updateInput, setUpdateInput, updateNote} = React.useContext(noteContext)

  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        <Grid container justifyContent="center" >
        <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            rows={1}
            style={{width:"100%"}}
            sx={{m:2}}
            name='title'
            value={updateInput.title}
            onChange={(e)=>setUpdateInput(prev=>({...prev, [e.target.name]:e.target.value}))}

          />
        <TextField
            id="outlined-multiline-flexible"
            label="Content"
            multiline
            rows={4}
            style={{width:"100%"}}
            sx={{m:2}}
            name='content'
            value={updateInput.content}
            onChange={(e)=>setUpdateInput(prev=>({...prev, [e.target.name]:e.target.value}))}
            
          />
        <Stack spacing={2} direction="row">
          <Button variant='contained' size='large' color='warning' onClick={updateNote}>Update</Button>
          <Button variant='contained' size='large' color='warning'>Clear</Button>
        </Stack>
    </Grid>
        </Typography>
      </Popover>
    </div>
  );
}
