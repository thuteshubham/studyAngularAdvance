import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {Cookie} from 'ng2-cookies';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpParams} from '@angular/common/http'
import { Observable, observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private url='https://chatapi.edwisor.com/api/v1';

  constructor(public http:HttpClient) {
    //connection is created 
    //handshake is happening
    this.socket=io(this.url);
   }

   public verifyUser=()=>{
     return Observable.create((observer)=>{
       this.socket.on('verifyUser',(data)=>{
         observer.next(data);
       });
     })
   }

   public onlineUserList=()=>{
     return Observable.create((observer)=>{
       this.socket.on('onlineUserList',(userList)=>{
         observer.next(userList);
       });
     });
   }

   public disconnectSocket=()=>{
     return Observable.create((observer)=>{
       this.socket.on('disconnect',()=>{
         observer.next();
       });
     });
   }


   //only one emit we ae doing i.e. authToken
   public setUser=(authToken)=>{
     this.socket.emit('set-user',authToken);
   }

   private handleError(err:HttpErrorResponse){
     let errorMessage='';
     if(err.error instanceof Error){
       errorMessage=`An error occured ${err.error.message}`
     }
     else{
       errorMessage=`${err.status}`;
     }
     console.log(errorMessage);
     return Observable.throw(errorMessage);
   }
}
