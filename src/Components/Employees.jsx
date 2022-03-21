import React, { useState } from 'react'
import { FiveButton } from './FiveButton';
import { Sort } from './Sort';
import styles from "./Employees.module.css"


const Employees = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState("");



    React.useEffect(() => {
        getTodos();
    },[]);

    const getTodos = () => {
        
        fetch(`http://localhost:3001/employees`)
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
        .catch((err) => console.log(err))
    };

    const handleAdd = () => {
        const payload = {
            name,
            department,
            gender,
            role,
            salary
        };

        const payloadjson = JSON.stringify(payload);

        fetch(`http://localhost:3001/employees`,{
            method: "POST",
            body: payloadjson,
            headers: {
                "content-type": "application/json"
            }
        }).then((res) => {
            getTodos();
        }).catch((err) => console.log(err));

        setName("");
        setDepartment("");
        setGender("");
        setRole("");
        setSalary("");
    }


    
  return (
    <div>
        <input 
            placeholder='Name' 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
        />
        <br />
        <input 
            placeholder='Gender' 
            onChange={(e) => setGender(e.target.value)} 
            value={gender} 
        />
        <br />
        <input 
            placeholder='Role' 
            onChange={(e) => setRole(e.target.value)} 
            value={role} 
        />
        <br />
        <input 
            placeholder='Department' 
            onChange={(e) => setDepartment(e.target.value)} 
            value={department} 
        />
        <br />
        <input 
            placeholder='Salary' 
            onChange={(e) => setSalary(e.target.value)} 
            value={salary} 
        />
        <br />
        <button onClick={handleAdd}>ADD EMPLOYEE</button>
        <br />
        <br />
        <hr />
        <FiveButton />
        <br />
        <br />
        <Sort />
        {
            data.map((item) => (
                <div className={styles.Effect}>
                    <p>{`Name : ${item.name}`}</p>
                    <p>{`Gender : ${item.gender}`}</p>
                    <p>{`Role : ${item.role}`}</p>
                    <p>{`Department : ${item.department}`}</p>
                    <p>{`Salary : ${item.salary}`}</p>
                </div>
            ))
        }
    </div>
  )
}

export { Employees };