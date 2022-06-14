import {Stack, Grid, Typography} from '@mui/material'
import { useContext } from 'react'
import noteContext from '../../context/NoteContext'
import NoteCard from '../NoteCard'
const Favourites = () => {
  const {favourites} = useContext(noteContext)
  return (
    <Stack>
      <div>
          <hr style={{margin:"2rem"}}/>
        <Typography variant="h4">
          Your Favorites:
        </Typography>
      </div>
    <Grid container >
        { favourites.length===0?"": favourites
        .map(note=> <NoteCard key={note.id} data = {note} />)
        }
    </Grid>
    </Stack>
  )
}

export default Favourites
