import React, {useEffect, useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const toastDuration = 5000


export default function Info({text, type}) {
  const [toastText, setToastText] = useState('')
  const [toastType, setToastType] = useState('')

const destroyToastValues = () => {
  setTimeout(() => {
    setToastText('')
    setToastType('')
  }, toastDuration);
}
  useEffect(() => {
    console.log(text, type)
    console.log(toastText, toastType)
    if(type == "success"){
      setToastText(text)
      toast.success(toastText)
      destroyToastValues()
    }
    else if(type == "error"){
      setToastText(text)
      toast.error(toastText)
      destroyToastValues()
    }
    else if(type == "info"){
      setToastText(text)
      toast.info(toastText)
      destroyToastValues()
    }

    
  }, [toastText, toastType])
  return (
    <div>
      <ToastContainer
      autoClose={toastDuration}
      theme='colored'
      />
        
      {/* <button onClick={() => triggerNotify()}>hello</button> */}
    </div>
  )
}