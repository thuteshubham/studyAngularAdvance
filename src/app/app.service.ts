import { Injectable } from '@angular/core';

import {Cookie} from 'ng2-cookies';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppService {

 

  private url='https://chatapi.edwisor.com/api/v1';

  constructor(public http:HttpClient) {
    
   }

  public getUserInfoFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }


  public stUserInfoFromLocalStorage=(data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }


  //https://chatapi.edwisor.com/api/v1/users/signup

  public signUpFunction(data):Observable<any>{

    return this.http.post(`${this.url}/users/signup`,data);
  }

  //https://chatapi.edwisor.com/api/v1/users/login

  public loginFunction(data):Observable<any>{
    return this.http.post(`${this.url}/users/login`,data);

  }




}
