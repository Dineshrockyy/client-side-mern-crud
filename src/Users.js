import React, { useEffect, useState } from 'react'
import  './tailwind.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

export default function Users(props) {
    const navigate=useNavigate()
    const [datas,setdatas]=useState([])
    const [input,setinput]=useState('')
    
    useEffect(()=>{
        Axios.get('http://localhost:8080/api/users')
            .then(res=>{
                console.log(res.data)
                setdatas(res.data)
            })
            .catch(err=>{
                console.log(err.message)
            })
    },[])

    const handeldelete=(id)=>{
        Axios.delete(`http://localhost:8080/api/user/${id}`)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err.message)
            })
            window.location.reload();
    }

    const users=datas.map((datas)=>{
        return(
            <div className='flex bg-gray-200 p-3' key={datas._id}>
            <p className='w-1/2 mr-2'>{datas.name}</p>
            <p className='w-1/2 mr-2'>{datas.email}</p>
            <p className='w-1/2 mr-2'>{datas.gender}</p>
            <p className='w-1/2 mr-2'>{datas.mobile_number}</p>
            <button className='w-1/6 bg-blue-400 mr-2' onClick={()=>{props.handelinput({name:datas.name,email:datas.email,gender:datas.gender,mob:datas.mobile_number,id:datas._id});navigate('/')}}>Edit</button>
            <button className='w-1/6 bg-red-400' onClick={()=>{handeldelete(datas._id)}}>Delete</button>
            </div>
        )
    })
    const show=()=>{
        if(users.length===0){
            return <div className='bg-red-400 text-center mt-4 p-2'>
            <p className='font-semibold'>No Data Found</p> 
        </div>
        }else{
            return users
        }
    }

    const handelsearch=()=>{
        Axios.put(`http://localhost:8080/api/user?value=${input}`)
            .then(res=>{
                console.log(res.data)
                setdatas([res.data])
            })
            .catch(err=>{
                console.log(err.message)
            })
    }

  return (
    <div>
        <div className='bg-green-300 font-bold text-2xl p-3'>
            <h2 className='text-center'>User Management</h2>
        </div>
        <div className=' mt-2 w-11/12 justify-between flex'>
        <p className='p-3 ml-20 bg-purple-400 w-28 cursor-pointer' onClick={()=>{
            navigate('/')
        }}>Form Page</p>
        <div className='flex'>
        <input className='rounded p-2 border-2 border-gray-900' type='text' placeholder='name , email , mobile number' value={input} onChange={(e)=>{setinput(e.target.value)}}></input>
        <p className='p-3 ml-2 bg-blue-400 cursor-pointer' onClick={handelsearch}>search</p>
        </div>
        </div>
        <div className='w-11/12 mx-auto'>
            <div className='bg-green-500 text-center mt-4 p-2'>
                <h3 className='font-semibold'>All User</h3> 
            </div>
            {show()}
        </div>
    </div>
  )
}
