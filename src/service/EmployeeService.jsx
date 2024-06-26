import axios from "axios";

const EMPLOYEE_API_BASE_URL = "https://emp-api-employee-api.onrender.com/api/v1/employees";

class EmployeeService{

    saveEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }
    getemployee(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    getEmployee(id){
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    updateEmployee(employee,id){
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id,employee);
    }

}

export default new EmployeeService();