import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:string;
  public lastName:string;
  public mobile:string;
  public email:String;
  public password:string;
  public apiKey:string;

  constructor(
    public appService:AppService,
    public router:Router,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
  }

 public goToSignIn:any=()=>{
   this.router.navigate(['/'])

 }

 public signUpFunction:any=()=>{
   let data={
     firstName:this.firstName,
     lastName:this.lastName,
     mobile:this.mobile,
     email:this.email,
     password:this.password,
     apiKey:this.apiKey

   }

   console.log(data);
   this.appService.signUpFunction(data).subscribe(
     response=>{
       console.log(response);
       
       if(response.status===200){
        this.toastr.success("SignUp successfull");
        setTimeout(()=>{
           
          this.goToSignIn();
        },2000 );

       }
       else{
         console.log(response.error);

       }

     },
     error=>{
       console.log("error in sign up");
       this.toastr.error("Error in sign up")

     }
   )
 }

}
