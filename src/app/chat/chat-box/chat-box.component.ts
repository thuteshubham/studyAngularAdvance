import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {SocketService} from './../../socket.service';
import {AppService} from './../../app.service'
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {

  public authToken:any;
  public userInfo:any;
  public receiverId:any;
  public receiverName:any;
  public userList:any=[];
  public disconnectedSocket:boolean;

  constructor(
    public socketService:SocketService,
    public appService:AppService,
    public router:Router,
    private toastr:ToastrService
    ) { 
      this.receiverId=Cookie.get('receiverId');
      this.receiverName=Cookie.get('receiverName');
    }

  ngOnInit() {
    this.authToken=Cookie.get('authToken');
    this.userInfo=this.appService.getUserInfoFromLocalStorage();
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();

  }

  public checkStatus=()=>{
    if(Cookie.get('authToken')===undefined || Cookie.get('authToken')===''|| Cookie.get('authToken')===null){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }

  public verifyUserConfirmation:any=()=>{
    this.socketService.verifyUser().subscribe(
      (response)=>{
        this.disconnectedSocket=false;
        this.socketService.setUser(this.authToken);
        this.getOnlineUserList();
      }
    )
  }

  public getOnlineUserList:any=()=>{
    console.log("Online user list");
    this.socketService.onlineUserList().subscribe(
      (userList)=>{
        this.userList=[];
        for(let x in userList){
          let temp={
            'userId':x,
            'name':userList[x],
            'unread':0,
             'chatting':false
          }
          this.userList.push(temp);
        }
        console.log("Online user list");
        console.log(this.userList);

      });
    }
   

}
  