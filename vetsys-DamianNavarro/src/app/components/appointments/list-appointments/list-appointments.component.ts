import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  userRole = localStorage.getItem('role');


  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('Appointments fetched:', this.appointments);
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  deleteAppointment(id: String){}
}
