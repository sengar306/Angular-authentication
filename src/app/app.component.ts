import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authService:AuthService=inject(AuthService)
  ngOnInit(): void {
   this.authService.autoLogin()
  }
  title = 'angular-http-client';
}
