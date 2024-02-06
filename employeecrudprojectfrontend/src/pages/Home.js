import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [employees, setEmployees] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        loadEmployees();
    },[]);

    const loadEmployees = async()=>{
        const result = await axios.get("http://localhost:8080/employees");
        setEmployees(result.data);
    };

    const deleteEmployee = async(id)=>{
        await axios.delete(`http://localhost:8080/employee/${id}`)
        loadEmployees();
    }

  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Sno.</th>
      <th scope="col">Name</th>
      <th scope="col">Department</th>
      <th scope="col">Income</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {
        employees.map((employee, index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{employee.name}</td>
            <td>{employee.dept}</td>
            <td>{employee.income}</td>

            <td>
               
                <Link className='btn btn-outline-primary mx-2'
                to={`/editemployee/${employee.id}`}>Edit</Link>
                <button className='btn btn-danger mx-2'
                onClick = {() => deleteEmployee(employee.id)}
                >Delete</button>
            </td>
          </tr>
        ))
    }
  
  </tbody>
</table>
        </div>
    </div>
  )
}
