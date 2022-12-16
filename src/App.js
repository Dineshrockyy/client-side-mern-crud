import React, { useState } from 'react'
import  './tailwind.css'
import{BrowserRouter ,Routes,Route} from 'react-router-dom'
import Form from './Form'
import Users from './Users'

export default function App() {
  const[userobj,setuserobj]=useState({id:'',email:'',gender:'',name:'',mob:''})

  const handelinput=(obj)=>{
    console.log(obj)
    setuserobj(obj)
  }

  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Form userobj={userobj}/>}></Route>
            <Route path='api/users' element={<Users handelinput={handelinput}/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
