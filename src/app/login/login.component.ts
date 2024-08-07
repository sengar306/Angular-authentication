import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { authResponse } from '../Model/authResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isLoginMode:boolean=true
authService:AuthService=inject(AuthService)
isLoading:boolean=false
authObs:Observable<authResponse>
router:Router=inject(Router)

errorMessage: string | null = null;
onSwitchMode(){
  this.isLoginMode=!this.isLoginMode
}
onFormsubmitted(authform:NgForm){
  console.log(authform.value)
  const email=authform.value.email
  const password=authform.value.password
if(this.isLoginMode){
this.authObs=this.authService.login(email,password)
}
else{
  this.isLoading=true
this.authObs=this.authService.signUp(email,password)
}
this.authObs.subscribe({
  next:(res)=>{
    console.log(res)
    this.isLoading=false  
    this.router.navigate(['/dashboard'])
  },
  error:(errMsg)=>{
    console.log(errMsg)
    this.isLoading=false
    this.errorMessage=errMsg
    this.hideSnakbar()
  }
})

}
setErrorMessage(){

}
hideSnakbar(){
  setTimeout(() => {
    this.errorMessage=null
  }, 3000);
}
}

