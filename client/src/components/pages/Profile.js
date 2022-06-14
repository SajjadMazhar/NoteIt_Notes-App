import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent, TextField, Stack, Typography, InputAdornment} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import userContext from '../../context/UserContext';
import axios from 'axios';

export default function Profile() {
  const {profile, host, fetchTheUser} = React.useContext(userContext)
  const [display, setDisplay] = React.useState("none")
  const [bioInput, setBioInput] = React.useState("")
  

  const handleUpdateBio = async()=>{
    const token = localStorage.getItem("authToken")
    const resp = await axios.patch(host+"/api/user/bio", {bio:bioInput},{
      headers:{
        "Content-Type":"application/json",
        "authorization":"Bearer "+token
    }
    })
    setDisplay("none")
    fetchTheUser()
  }

  return (profile&&
    <Card style={{backgroundColor:"rgb(209 154 72)", borderRadius:"150px"}} sx={{minWidth:275, p:5, height:"12rem", width:"50rem", display:"flex"}}>
        <Stack sx={{p:2}}>
            <Avatar alt="Remy Sharp" src={"http://localhost:3001/"+profile.dp} sx={{height:"10rem", width:"10rem"}}/>
        </Stack>
        <CardContent sx={{p:2, px:4}}>
        <Typography variant="h6" component="div">
                {profile.name} <DriveFileRenameOutlineIcon sx={{width:20, height:20}}/>
                </Typography>
        <Stack direction="row" spacing={5}>
            <Stack>
                <Typography variant="h6" component="div">
                        Bio <DriveFileRenameOutlineIcon onClick={()=>{
                            if(display==="none"){
                              setBioInput(profile.bio)
                              setDisplay("block")
                            }else{
                              setDisplay("none")
                            }
                          }} style={{cursor:"pointer"}} sx={{width:20, height:20}}/>
                        <TextField 
                        style={{display}} id='outlined-multiline-flexible' 
                        label="update bio" 
                        multiline
                        color='warning'
                        rows={2}
                        value={bioInput}
                        onChange={(e)=> setBioInput(e.target.value)}
                        InputProps={{
                          endAdornment:(
                          <InputAdornment position='end'>
                            <DoneIcon
                              style={{cursor:bioInput?"pointer":""}}
                              onClick={()=>bioInput?handleUpdateBio():""}
                              color={bioInput?"warning":"disabled"}
                            />
                            </InputAdornment>)}}
                        />
                </Typography>
                <Typography sx={{ fontSize: 14 }} style={{display:display==="none"?"block":"none"}} color="text.secondary" gutterBottom>
                {profile.bio}
                </Typography>
                <Typography variant="h6" component="div">
                {profile.dob} <EventIcon sx={{width:20, height:20}}/>
                </Typography>
                <Typography variant="h6" component="div">
                {profile.email} <EmailIcon sx={{width:20, height:20}}/>
                </Typography>
            </Stack>
        </Stack>
            </CardContent>
    </Card>
  );
}
