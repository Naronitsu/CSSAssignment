import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-appointment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-appointment-details.component.html',
  styleUrls: ['./view-appointment-details.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  appointmentId = 0;
  appointment: any;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.appointmentId = Number(idParam);

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (data) => {
        this.appointment = data;

        // Convert MM/DD/YYYY to readable format (optional)
        if (this.appointment.appointmentDate.includes('/')) {
          const [month, day, year] = this.appointment.appointmentDate.split('/');
          this.appointment.appointmentDate = `${day}/${month}/${year}`;
        }
      },
      error: (err) => {
        console.error('Failed to load appointment:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/appointments']);
  }
}
