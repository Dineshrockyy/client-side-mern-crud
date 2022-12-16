import React,{useEffect, useState} from 'react'
import  './tailwind.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

export default function Form(props) {
    const [userobj,setuserobj]=useState({id:props.userobj.id,name:props.userobj.name,email:props.userobj.email,mob:props.userobj.mob,gender:props.userobj.gender})
    const[id,setid]=useState(true)
    const [user,setuser]=useState({name:'',email:'',mobile_number:'',gender:''})
    const [checked,setchecked]=useState('gender')
    const navigate=useNavigate()

    useEffect(()=>{
        if(userobj.id===''){
            setuser({name:'',email:'',mobile_number:'',gender:''})
        }else{
            setuser({name:userobj.name,email:userobj.email,mobile_number:userobj.mob,gender:userobj.gender,id:userobj.id})
            setid(false)
            console.log(id)
        }
    },[])

    const handelsubmit = (props)=>{
        if(props){
            Axios.post('http://localhost:8080/api/users',user)
            .then(res=>{console.log(res.data)})
            .catch(err=>{
                console.log(err.message)
            })
        }else if(props===false){
            Axios.put(`http://localhost:8080/api/user/${user.id}`,user)
            .then(res=>{console.log(res.data)})
            .catch(err=>{
                console.log(err.message)
            })
        }
            
            setuser({name:'',email:'',mobile_number:'',gender:''})
            setuserobj({id:'',name:'',email:'',mob:'',gender:''})
            setchecked('gender')
            setid(true)
    }

    const handelalluser=()=>{
        navigate('api/users')
    }

    const handelinput = (e)=>{
        if(e.target.name==="name"){
            setuser({...user,name:e.target.value})
        }

        if(e.target.name==="email"){
            setuser({...user,email:e.target.value})
        }

        if(e.target.name==="mb_num"){
            setuser({...user,mobile_number:e.target.value})
        }

        if(e.target.value==="male"){
            setuser({...user,gender:e.target.value})
            setchecked('male')
        }

        if(e.target.value==="female"){
            setuser({...user,gender:e.target.value})
            setchecked('female')
        }
    }
  return (
    <div>
        <div className='bg-green-300 font-bold text-2xl p-3'>
            <h2 className='text-center'>User Management</h2>
        </div>
        <div className='container w-1/2 mx-auto'>
            <button className='bg-purple-400 p-2 rounded mt-2' onClick={handelalluser}>All Users</button>
        <div className='w-11/12 mx-auto'>
            <div className='bg-green-500 text-center mt-4 p-2'>
                <h3 className='font-semibold'>New User</h3>
            </div>
        <input type='text'  className='border border-gray-900 w-full rounded p-3 mt-5' onChange={handelinput} value={user.name}placeholder='name' name='name'></input>
        <input type='text'  className='border border-gray-900 w-full rounded p-3 mt-5' onChange={handelinput} value={user.email}placeholder='email' name='email'></input>
        <input type='text'  className='border border-gray-900 w-full rounded p-3 mt-5' onChange={handelinput} value={user.mobile_number}placeholder='mobile number' name='mb_num'></input>
        <div className='flex mt-3'>
        <input type='radio' className='border border-gray-900'  value='male' checked={checked==='male'}  name='gender' onChange={handelinput}></input><p className='ml-2'>male</p>
        </div>
        <div className='flex mt-3'>
        <input type='radio' className='border border-gray-900'  value='female' checked={checked==='female'}  name='gender' onChange={handelinput}></input><p className='ml-2'>female</p>
        </div>
        <button className='bg-green-300 w-full px-2 py-3 rounded mt-2' onClick={()=>{handelsubmit(id)}}>{{id}?'submit':'delete'}</button>
        </div>
        </div>
    </div>
  )
}
