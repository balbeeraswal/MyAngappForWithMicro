
export interface Employee{
    empName:string;
    deptId:number;
    locId:number;
}

export interface ApiResponse{
    statusCode:number;
    message:string;
    data:Employee[];
}