import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import Swal from 'sweetalert2';


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

  deleteAppointment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This appointment will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The appointment has been removed.', 'success');
            this.fetchAppointments();
          },
          error: (err) => {
            console.error('Delete failed:', err);
            Swal.fire('Error', 'Failed to delete appointment.', 'error');
          }
        });
      }
    });
  }  
  
}
