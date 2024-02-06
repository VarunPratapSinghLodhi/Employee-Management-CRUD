import axios from 'axios'
import React,{ useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditEmployee() {
    let navigate=useNavigate()

    const {id} =useParams()

    const [employee, setEmployee]=useState({
        name:"",
        dept:"",
        income:""
    })

    const {name, dept, income}= employee

    useEffect(()=>{
        loadEmployee()
    },[]);

    const onInputChange=(e)=>{
        setEmployee({...employee, [e.target.name]:e.target.value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/employee/${id}`,employee)
        navigate("/")
    }

    const loadEmployee =async()=>{
        const result = await axios.get(`http://localhost:8080/employee/${id}`)
        setEmployee(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className="text-center m-4">Edit Employee</h2>
        
            <form onSubmit={(e)=>onSubmit(e)}>

            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>Name</label>
                <input type ={"text"} className='form-control' 
                placeholder='Enter Name' name="name" 
                value={name} onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='Department' className='form-label'>Department</label>
                <input type ={"text"} className='form-control' 
                placeholder='Enter Department' name="dept" 
                value={dept} onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='Income' className='form-label'>Income</label>
                <input type ={"text"} className='form-control' 
                placeholder='Enter Income' name="income" 
                value={income} onChange={(e)=>onInputChange(e)}/>
            </div>
            <button type="submit" className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to ="/">
                Cancel
            </Link>
            </form>
            </div>    
        </div>
    </div>
  )
}
