import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {
    // generate token

    
  }

  public generateToken(loginData:any){
      return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // Login user: set toekn in local storage

  public loginUser(token: string){
    localStorage.setItem("token",token);
    
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr == '' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  // logout : remove token from Local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token

  public getToken(){
    return localStorage.getItem('token');
  }

  // set userDetails
  public setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user Role

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

 //current user: which is loggedin
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }
}
