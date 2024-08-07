import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { authResponse } from '../Model/authResponse';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { user } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
htttp:HttpClient=inject(HttpClient)
user=new BehaviorSubject<user>(null)
  constructor() { }
  signUp(email,password){
     const data ={
      email:email,
      password:password,
      returnSecureToken:true
     }
    return this.htttp.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKkJ-KyNDGSQ_q1SujVLVNBEZp1QoQQ-M',data).pipe(catchError(this.handleError),tap((res)=>{
      tap((res)=>{
        console.log(res)
        this.handleCreateUser(res)
      })
    }))
    
  }
  login(email,password){
    const data ={
      email:email,
      password:password,
      returnSecureToken:true
     }
    return this.htttp.post<authResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKkJ-KyNDGSQ_q1SujVLVNBEZp1QoQQ-M",data).pipe(catchError(this.handleError),tap((res)=>{
      // console.log(res)
      this.handleCreateUser(res)
    }))

  }
  private handleError(err)
  {
    let errorMessage='something went wronger'
    if(!err.error || !err.error.error )
    { console.log(err.error.error.message)
      errorMessage='mlcmdsm'
     return  throwError(()=>errorMessage)
    }
    console.log(err)
    switch(err.error.error.message){
     
      case 'EMAIL_EXISTS':
        console.log('emailalr')
        errorMessage='this email already exist';
        break;
      case 'OPERATION_NOT_ALLOWED': 
        errorMessage='this operationnot perform';
         break;
      case 'EMAIL_NOT_FOUND':
        errorMessage='email not found'
        break;
        case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage='credential wrong'
        break;
        case 'USER_DISABLED':
          errorMessage='user disabled'
          break;
      }
    
     return   throwError(()=>errorMessage)
  
  
  }
  private handleCreateUser(res){
    // console.log(res.expiresIn )
    const expiresinTs=new Date().getTime()+ +res.expiresIn *1000
    // console.log(expiresinTs)
    const  expiresin=new Date(expiresinTs)
   const user1= new user(res.email,res.localid,res.idToken,expiresin )
    this.user.next(user1)
  }
}
