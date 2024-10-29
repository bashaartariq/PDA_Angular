import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signin: boolean = true;
  constructor(private route: Router, private service: AuthService) { }
  ngOnInit(): void {
  }

  signinTrue(): void {
    this.signin = localStorage.getItem('token') ? true : false;
  }

  navigateto() {
    const role = this.service.decodeToken()?.role;
    if (role === 'patient') {
      this.route.navigate(['/app/patient/list']);
    }
    else if(role === 'doctor') {
      this.route.navigate(['/app/doctor/dashboard']);
    }
  }
  logout(): void {
    this.signin = false;
    localStorage.clear();
    this.route.navigate(['/home']);

  }
}
