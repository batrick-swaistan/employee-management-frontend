import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    EmployeeService.getemployee()
      .then((res) => {
        setEmployee(res.data);
        // console.log(employee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const actionTemplate = (id) => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button type="button" icon="pi pi-pencil" onClick={()=> navigate(`/editemployee/${id}`)} on rounded></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          severity="danger"
          rounded
          onClick={()=>deleteEmployee(id)}
        ></Button>
      </div>
    );
  };


  const deleteEmployee=(id)=>{
    EmployeeService.deleteEmployee(id)
    .then((res) =>{
        if(employee){
            setEmployee((prevElement)=>{
                return prevElement.filter((employee)=>employee.id !==id);
            });
        }
    })
    .catch((error)=>{
        console.log(error);
    })
  }

 

  return (
    <div className="mx-8  my-4">
      <div className="">
        <Button
          className="font-semibold px-4 border-3"
          label="Add Employee"
          onClick={() => navigate("/addemployee")}
        />
      </div>
      <div className="flex shadow-3 ">
        <div className="card w-full">
          <DataTable value={employee} className="w-full">
            <Column field="id" header="Id"></Column>
            <Column field="firstName" header="First Name"></Column>
            <Column field="lastName" header="Last Name"></Column>
            <Column field="emailId" header="Email ID"></Column>
            <Column body={(empData) => actionTemplate(empData.id)} header="Action"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
