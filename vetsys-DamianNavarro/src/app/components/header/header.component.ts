import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
