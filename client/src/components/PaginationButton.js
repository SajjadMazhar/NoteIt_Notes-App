import { Button, Stack } from '@mui/material'
import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PaginationButton = () => {
    const {previousPage, nextPage, pageNo, noteQty} = useContext(noteContext)
  return (
    <Stack direction="row" style={{display:"flex", justifyContent:"space-between",margin:"3rem"}}>
        <Button disabled={pageNo===0?true:false} color='error' variant="outlined" onClick={previousPage} startIcon={<ArrowBackIosIcon/>}>Previous</Button>
        <Button disabled={noteQty<8?true:false} color='error' variant="outlined" onClick={nextPage} endIcon={<ArrowForwardIosIcon/>}>Next</Button>
    </Stack>
  )
}

export default PaginationButton
