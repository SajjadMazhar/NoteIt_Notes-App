import {Stack, Grid, Typography} from '@mui/material'
import { useContext } from 'react'
import noteContext from '../context/NoteContext'
import Loading from './Loading'
import NoteCard from './NoteCard'
import PaginationButton from './PaginationButton'
const NotesBody = () => {
  const {notes, isLoading} = useContext(noteContext)
  return (
    <Stack>
          <hr style={{margin:"2rem"}}/>
      <div style={{display:"flex", justifyContent:"center"}}>
        <Typography variant="h4" sx={{mb:4}} style={{borderBottom:"5px dotted black"}}>
          YOUR NOTES
        </Typography>
      </div>
        {isLoading?<Loading/>:""}
    <Grid container justifyContent="center">
        { 
        notes.length===0 ? <Typography variant="h3">No notes to show</Typography>:
        notes.map((note, index)=> <NoteCard key={index} data = {note} />)
        }
    </Grid>
    <PaginationButton/>
    </Stack>
  )
}

export default NotesBody
