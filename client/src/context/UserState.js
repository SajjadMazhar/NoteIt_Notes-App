import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from './NoteContext';
import userContext from './UserContext'

const initialUserInputs = {
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    dob:"",
    dp:null
}
const port = 3001;
const host = `http://localhost:${port}`
const authPath = ['/', '/favourites', '/Profile', '/Logout', '/Account']

const UserState = ({children}) => {

    const navigate = useNavigate()
    const {fetchTheNotes} = useContext(noteContext)
    const [registerInputs, setRegisterInputs] = useState(initialUserInputs)
    const [profile, setProfile] = useState(null)
    const [loginInputs, setLoginInputs] = useState({email:"", password:""})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [updatePassInput, setUpdatePassInput] = useState({oldPassword:"", newPassword:""})
    const [alertDetails, setAlertDetails] = useState({status:"", title:"", message:""})
    const [display, setDisplay] = useState("none")

    const handleOnChangeRegisterInputs = (e)=>{
        setRegisterInputs(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const timer = ()=>{
        setTimeout(() => {
            setDisplay("none")
        }, 3000);
    }

    const fetchTheUser = ()=>{
        const token = localStorage.getItem("authToken")
        axios.get(host+"/api/user", {
            headers:{
                "Content-Type":"multipart/form-data",
                "authorization":"Bearer "+token
            }
        }).then(resp=>{
            const data = resp.data.user
            const newdp = data.dp.split("/")
            newdp.shift()
            newdp.shift()
            console.log(newdp)
            const updatedUserData = {...resp.data.user, dp:newdp.join("/")}
            setProfile(updatedUserData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const addNewUser = ()=>{
        
        axios.post(host+"/api/user/signup", registerInputs, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(resp=>{
            localStorage.setItem("authToken", resp.data.token)
            console.log("registered")
            setRegisterInputs(initialUserInputs)
            setProfile(resp.data.user)
            fetchTheNotes()
            const data = resp.data.user
            const newdp = data.dp.split("/")
            newdp.shift()
            const updatedUserData = {...resp.data.user, dp:newdp.join("/")}
            setProfile(updatedUserData)
            navigate("/")
            setAlertDetails({status:"success", message:"successfully registered into NoteIt", title:"Success"})
            setDisplay("block")
            // window.location.reload()
        }).catch(err=>{
            setAlertDetails({status:"success", message:"successfully registered into NoteIt", title:"Success"})
            setDisplay("block")
            console.log(err)
        })
        timer()
    }

    const loginUser = ()=>{
        axios.post(host+"/api/user/signin", loginInputs, {
            headers:{
                "Content-Type":"application/json"
            }
        }).then(resp=>{
            
            localStorage.setItem("authToken", resp.data.token)
            console.log("Loggedin")
            setLoginInputs({email:"", password:""})
            setProfile(resp.data.user)
            navigate("/")
            setAlertDetails({status:"success", message:"successfully logged in", title:"Success"})
            setDisplay("block")
            window.location.reload()
        }).catch(err=>{
            console.log(err.message)
            setAlertDetails({status:"warning", message:"something failed", title:"Unable to login"})
            setDisplay("block")
        })
        timer()
    }

    const handleChangePassword = ()=>{
        const token = localStorage.getItem("authToken")

        axios.patch(host+"/api/user/updatepassword", updatePassInput, {
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+token
            }
        }).then(resp=>{
            alert("password updated")
            navigate("/")
        }).catch(err=>{
            console.log(err.message)
        })
    }

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            setIsLoggedIn(false)
            if( authPath.includes(window.location.pathname)) navigate("/login");

        }else{
            setIsLoggedIn(true)
            fetchTheUser(8, 0)
        }
        const title = window.location.pathname.slice(1).toUpperCase()
        document.title = `NoteIt - ${title===""?"Home":title}`

    },[isLoggedIn, navigate])
const userValues={
    host,
    registerInputs,
    handleOnChangeRegisterInputs,
    addNewUser,
    loginInputs,
    setLoginInputs,
    setRegisterInputs,
    loginUser,
    profile,
    handleChangePassword,
    updatePassInput,
    setUpdatePassInput,
    isLoggedIn,
    setIsLoggedIn,
    alertDetails,
    setAlertDetails,
    display,
    setDisplay,
    fetchTheUser
    
}
  return (
    <userContext.Provider value={userValues}>
        {children}
    </userContext.Provider>
  )
}

export default UserState
