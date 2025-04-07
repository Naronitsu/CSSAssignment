import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service'; 
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'You are now logged in.'
        }).then(() => this.router.navigate(['/appointments']));        
        this.authService.setRole(response.role);
        localStorage.setItem('token', response.jwtToken);
        this.router.navigate(['/appointments']); 
      },
      error: (err) => {
        Swal.fire('Login Failed', 'Invalid credentials. Please try again.', 'error');
        console.error('Login failed:', err);
      }
    });
  }
}
