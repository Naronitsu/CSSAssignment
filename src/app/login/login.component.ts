import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // ← add this too!
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'test.receptionist@pethealth.com' && this.password === 'Pa$$w0rd') {
      localStorage.setItem('role', 'RECEPTIONIST');
      this.router.navigate(['/appointments']);
    } else {
      alert('Invalid credentials');
    }
  }
}
