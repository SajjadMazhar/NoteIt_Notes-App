import React, { useContext } from 'react'
import {Button, Stack, ButtonGroup, Card,
    CardContent, Typography, CardActions
} from '@mui/material'
import {Delete, Edit} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import noteContext from '../context/NoteContext';
import BasicPopover from './PopOver';

const NoteCard = ({data}) => {
    const {toggleFavourite, deleteNote, handlePopover} = useContext(noteContext)
  return (
      <div style={{padding:"10px"}}>
        <Card sx={{ minWidth: 275, bgcolor:data.color }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.createdAt}
            </Typography>
            <Typography variant="h5" component="div">
            {data.title}
            </Typography>
            <Typography variant="body2">
            {data.content}
            </Typography>
        </CardContent>
        <CardActions style={{marginLeft:"1rem"}}>
            {!data.isFavourite ? <FavoriteBorderIcon style={{cursor:"pointer"}} onClick={()=>toggleFavourite(data.id)} color="error"/> : <FavoriteIcon style={{cursor:"pointer"}} onClick={()=>toggleFavourite(data.id)} color="error"/>}
        </CardActions>
        <Stack direction='row'>
            <ButtonGroup sx={{m:3}} variant='contained' size='small' color='warning'>
            <Button onClick={()=> deleteNote(data.id)} endIcon={<Delete/>}>delete</Button>
            <Button endIcon={<Edit/>} onClick={(e)=>handlePopover(e, data.id)}>Edit</Button>
            </ButtonGroup>
            <BasicPopover/>
        </Stack>
        </Card>      
      </div>
  )
}

export default NoteCard
