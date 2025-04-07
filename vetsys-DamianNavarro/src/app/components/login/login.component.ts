import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('role', response.role);
        localStorage.setItem('token', response.jwtToken);
        this.router.navigate(['/appointments']); 
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'Invalid credentials. Please try again.';
      }
    });
  }
}
