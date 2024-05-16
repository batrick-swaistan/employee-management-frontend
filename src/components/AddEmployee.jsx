import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import EmployeeService from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {

    const navigate=useNavigate();

    const initial_state={
        firstName:"",
        lastName: "",
        emailId: ""
    };

    const [employee,setEmployee]=useState(initial_state);

    const handleChange = (e) =>{
        const value = e.target.value;
       setEmployee({...employee,[e.target.name]:value});
    }

    const clearForm = ()=>{
        setEmployee(initial_state);
    }

  const saveUser= async(event)=>{
    event.preventDefault();
    EmployeeService.saveEmployee(employee)
    .then((response)=>{
        alert("User Created Successfully");
        console.log(response);
        setEmployee(initial_state);
        navigate("/")
    })
    .catch((error)=>{
        alert("Error Occured");
        console.log(error);
    })
 
  }

  return (
    <div className="flex h-screen  justify-content-center align-items-center">
      <div className="max-w-30rem h-auto mx-auto shadow-3 px-4 py-4 w-full ">
        <div className="font-light text-2xl mb-5 text-center ">
          Add new Employee
        </div>

        <div className="flex flex-column gap-2 h-4rem w-full mb-3">
          <label className="font-semibold" htmlFor="firstname">
            First Name
          </label>
          <InputText
            id="firstname"
            aria-describedby="username-help"
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-column gap-2 h-4rem w-full  mb-3">
          <label className="font-semibold" htmlFor="lastname">
            Last Name
          </label>
          <InputText
            id="lastname"
            aria-describedby="username-help"
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-column gap-2 h-4rem w-full  mb-3">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <InputText id="email" aria-describedby="username-help" type="email" name="emailId" value={employee.emailId}  onChange={(e) => handleChange(e)}  />
        </div>
        <div className="flex flex-row gap-3">
          <Button className="font-semibold px-4" label="Save" rounded onClick={saveUser} />
          <Button
            className="font-semibold px-4"
            label="Clear"
            severity="danger"
            onClick={clearForm}
            rounded
          />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
