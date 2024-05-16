import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const updateEmployee = (e) => {
    e.preventDefault();
    console.log(id);

    console.log(employee)
    EmployeeService.updateEmployee(employee,id)
      .then((res) => {
        navigate("/");
      })

      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      EmployeeService.getEmployee(id)
        .then((res) => {
          setEmployee(res.data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen  justify-content-center align-items-center">
      <div className="max-w-30rem h-auto mx-auto shadow-3 px-4 py-4 w-full ">
        <div className="font-light text-2xl mb-5 text-center ">
          Update Employee
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
          <InputText
            id="email"
            aria-describedby="username-help"
            type="email"
            name="emailId"
            value={employee.emailId}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-row gap-3">
          <Button
            className="font-semibold px-4"
            label="Update"
            rounded
            onClick={updateEmployee}
          />
          <Button
            className="font-semibold px-4"
            label="Cancel"
            severity="danger"
            onClick={()=>navigate("/")}
            rounded
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
