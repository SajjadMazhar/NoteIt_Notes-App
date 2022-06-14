import axios from 'axios'
import React, { useEffect, useState } from 'react'
import noteContext from './NoteContext'

const isFavourite = false
const initialNote = [{
  title:"",
  content:"",
  isFavourite,
  color:'',
  createdAt:""
}]
const port = 3001;
// const host = `http://localhost:${port}`
// const host = "https://note-it-007.herokuapp.com"

const NoteState = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [notes, setNotes] = useState(initialNote)
    const [noteInput, setNoteInput] = useState({title:"", content:""})
    const [updateInput, setUpdateInput] = useState({id:null, title:"", content:""})
    const [anchorEl, setAnchorEl] = useState(null);
    const [radioValue, setRadioValue] = useState("");
    const [pageNo, setPageNo] = useState(0)
    const [noteQty, setNoteQty] = useState(null)
    const [favourites, setFavourites] = useState([])

    const nextPage = ()=>{
      setPageNo(prev=>prev+1)
      fetchTheNotes(8, pageNo)
    }
    const previousPage = ()=>{
      if(pageNo===0){
        return
      }
      setPageNo(prev=>prev-1)
      fetchTheNotes(8, pageNo)
    }

    //fetching notes
    const fetchTheNotes = (take=8, pageNo=0)=>{
      const token = localStorage.getItem("authToken")
      axios.get(`/api/note?take=${take}&pageNo=${pageNo}`, {
        headers:{
          authorization:"Bearer "+token
        }
      }).then(res=>{
        setIsLoading(false)
        setNoteQty(res.data.totalData)
        setNotes(res.data.notes)
        setFavourites(res.data.favs)
      })
    }

    // adding notes
    const handleSetNotes = ()=>{
      if(!validation(noteInput)) return console.log("The field is empty");
      const currentNote = {
        title:noteInput.title, content:noteInput.content,
        isFavourite:false, color:radioValue
      }
      const token = localStorage.getItem("authToken")
      axios.post("/api/note", currentNote, {
        headers:{
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        }
      }).then(resp=>{
          setNoteInput({title:"", content:""})
          fetchTheNotes()
      }).catch(err=>{
          console.log(err)
      })
    }


    // delete note
    const deleteNote = (id)=>{
      const token = localStorage.getItem("authToken")
      axios.delete("/api/note/"+id, {
        headers:{
            "authorization":"Bearer "+token
        }
      }).then(resp=>{
          fetchTheNotes(8, pageNo)
      }).catch(err=>{
          console.log(err)
      })
    }

    // opening popover screen
    const handlePopover = (event, id)=>{
      setAnchorEl(event.currentTarget);
      const selectedNote = notes.find(note=> note.id===id)
      setUpdateInput({id,title:selectedNote.title, content:selectedNote.content})
    }

    // updating the note
    const updateNote = ()=>{
      
      const token = localStorage.getItem("authToken")
      const currentNote = {
        title:updateInput.title, content:updateInput.content
      }
      axios.patch("/api/note/"+updateInput.id, currentNote, {
        headers:{
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        }
      }).then(resp=>{
          fetchTheNotes(8,pageNo)
      }).catch(err=>{
          console.log(err)
      })
      handleClose()
    }

    // radio button handler
    const handleRadioChange = (e)=>{
      setRadioValue(e.target.value)
    }

    // validation Check
    const validation = (testData)=>{
      const regex = /^(?!\s*$).+/
      return regex.test(testData.title) && regex.test(testData.content)
    }

    // toggling the favourite notes 
    const toggleFavourite = (id)=>{
      
      const token = localStorage.getItem("authToken")
      axios.patch("/api/note/fav/"+id, {}, {
        headers:{
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        }
      }).then(resp=>{
          fetchTheNotes(8, pageNo)
      }).catch(err=>{
          console.log(err)
      })
      
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    if(localStorage.getItem("authToken")) fetchTheNotes(8, pageNo);
  },[pageNo])
  
const values ={
  notes, 
  // host,
  noteInput,
  setNoteInput,
  handleSetNotes,
  toggleFavourite,
  deleteNote,
  favourites,
  handlePopover,
  anchorEl,
  handleClose,
  updateInput,
  setUpdateInput,
  updateNote,
  setRadioValue,
  radioValue,
  handleRadioChange,
  fetchTheNotes,
  isLoading,
  nextPage,
  previousPage,
  pageNo,
  noteQty
}
  return (
    <noteContext.Provider value={values}>
        {children}
    </noteContext.Provider>
  )
}

export default NoteState
