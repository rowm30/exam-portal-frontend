import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private _http: HttpClient) { }

  public catagories(){
    return this._http.get(`${baseUrl}/catagory/`)
  }

  // add new catagory
  public addCatagory(catagory: any){
    return this._http.post(`${baseUrl}/catagory/`,catagory);
  }
}
