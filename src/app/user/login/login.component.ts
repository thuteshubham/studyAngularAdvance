import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import {Cookie} from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:String;
  public password:string;

  constructor(
    public appService:AppService,
    public router:Router,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
  }

  public goToSignUp:any=()=>{
    this.router.navigate(['/sign-up'])
 
  }

  
 public loginFunction:any=()=>{
  let data={
    email:this.email,
    password:this.password

  }

  console.log(data);
  console.log("Hello there ");
  this.appService.loginFunction(data).subscribe(
    response=>{
      console.log(response);
      
      if(response.status===200){
       this.toastr.success("Login Successfull");

       Cookie.set('authToken',response.data.authToken);
       Cookie.set('receiverId',response.data.userDetails.userId);
       Cookie.set('receiverName',response.data.userDetails.firstName+' '+response.data.userDetails.lastName);
       this.appService.stUserInfoFromLocalStorage(response.data.userDetails);
       this.router.navigate(['/chat']);
      }
      else{
        console.log(response.error);

      }

    },
    error=>{
      console.log("error in sign in ");
      this.toastr.error("error in sign in")

    }
  )
}


 

}
