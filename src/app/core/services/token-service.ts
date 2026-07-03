import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private token:string | null=null;

  setToken(token:string){
    this.token=token;
  }

  getToken():string | null{
    return this.token;
  }

  removeToken():void{
    this.token=null;
  }

  hasToken():boolean{
    return !!this.token ;
  }

}
