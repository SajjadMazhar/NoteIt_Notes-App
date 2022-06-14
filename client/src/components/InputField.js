import React, { useContext } from 'react'
import {TextField, Stack, Button, Grid} from '@mui/material'
import noteContext from '../context/NoteContext'
import Radios from './Radios'


const InputField = () => {
  const {
    setNoteInput,
    handleSetNotes,
    noteInput
   } = useContext(noteContext)
  return (
    <Grid container justifyContent="center" >
        <TextField
            id="outlined-multiline-flexible"
            label="Title"
            color='warning'
            multiline
            rows={1}
            style={{width:"60%"}}
            sx={{m:2}}
            name='title'
            value={noteInput.title}
            onChange={(e)=>setNoteInput(prev=> ({...prev, [e.target.name]:e.target.value}))}
  
          />
        <TextField
            id="outlined-multiline-flexible"
            label="Content"
            multiline
            color='warning'
            rows={4}
            style={{width:"60%"}}
            sx={{m:2}}
            name='content'
            value={noteInput.content}
            onChange={(e)=>setNoteInput(prev=> ({...prev, [e.target.name]:e.target.value}))}
   
          />
          <Radios/>
        <Stack spacing={2} direction="row">
          <Button variant='contained' disabled={
            noteInput.title && noteInput.content ? false:true
          } size='large' color='warning' onClick={handleSetNotes}>Add Note</Button>
        </Stack>
    </Grid>
  )
}

export default InputField
