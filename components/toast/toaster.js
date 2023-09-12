import React, {useEffect, useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const toastDuration = 5000


export default function Toaster({text = '', type = ''}) {


  useEffect(() => {
    
    if(type == "success"){
      toast.success(text)
    }
    else if(type == "error"){
      toast.error(text)
    }
    else if(type == "info"){
      toast.info(text)
    }

  
  }, [text, type])
  return (
    <div>
      <ToastContainer
      autoClose={toastDuration}
      theme='light'
      />
        
      
    </div>
  )
}


// import React, { useRef } from 'react';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';

// export default function Toaster({severity,summary,detail}) {
//     console.log(severity, 'severity')
//     console.log(summary, 'summary')
//     console.log(detail, 'detail')

//     const toast = useRef(null);

//     const show = () => {
//         toast.current.show({ severity: 'info', summary: 'info', detail: 'test' });
//     };

//     return (
//         <div className="card flex justify-content-center">
//             <Toast ref={toast} />
//             <Button onClick={show} label="Show va" />

//         </div>
//     )
// }
        