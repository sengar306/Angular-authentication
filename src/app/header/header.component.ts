import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  authService:AuthService=inject(AuthService)
 isLoggedin:boolean=false
  ngOnInit(): void {
  this.authService.user.subscribe((user)=>{
    console.log(user)
     this.isLoggedin=user? true:false
  }) 
  }
  onLogout(){
this.authService.logout()    
  }

}
