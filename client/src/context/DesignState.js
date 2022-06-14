import React, { useState } from 'react'
import designContext from './DesignContext'
const DesignState = ({children}) => {
    const [mode, setMode] = useState("light")

    const toggleMode = ()=>{
        if(mode==="light"){
            setMode("dark")
        }else{
            setMode("light")
        }
    }


    const values={
        toggleMode,
        mode
    }
  return (
    <designContext.Provider value={values}>
        {children}
    </designContext.Provider>
  )
}

export default DesignState
