import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee,ApiResponse } from './models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService   {

   private apiUrlGetEmps="https://employeewebapp-bheseyhvhuawejg5.centralindia-01.azurewebsites.net/api/Employee/GetEmployees";
   private apiUrlPostEmp="https://employeewebapp-bheseyhvhuawejg5.centralindia-01.azurewebsites.net/api/Employee/AddEmployee";
  //  apiUrl="https://localhost:7283/api/Employee/GetEmployees";
   private getEmpByIdapiUrl="https://localhost:7283/api/Employee";
 //postapiUrl="https://localhost:7283/api/Employee/AddEmployee";
  private getDepartmentsAPIUrl="https://localhost:7004/api/Department/GetDepartments";
 

  constructor(private httpClient:HttpClient)  {} 

   getEmployees():Observable<ApiResponse>{
      return this.httpClient.get<ApiResponse>(this.apiUrlGetEmps);
   }

   addEmployee(employee:any):Observable<any[]>{
     console.log("EmployeeService Post Employee Url:", this.apiUrlPostEmp);
    return this.httpClient.post<any>(this.apiUrlPostEmp,employee);
   }

   getEmployeeById(id:number):Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(`${this.getEmpByIdapiUrl}/getEmployeeById/${id}`)
   }

    getDepartments():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.getDepartmentsAPIUrl}`)
   }
}


