import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  appointment = {
    animalType: '',
    appointmentDate: '',
    appointmentTime: '', 
    appointmentDuration: 30, 
    ownerContactNumber: '',
    ownerIdCardNumber: '',
    ownerName: '',
    ownerSurname: '',
    patientName: '',
    reasonForAppointment: '',
    vetNotes: ''
  };

  constructor(private appointmentService: AppointmentService, private router: Router) {}
  userRole = localStorage.getItem('role');
  

  addAppointment() {
    const rawDate = new Date(this.appointment.appointmentDate);
    const month = String(rawDate.getMonth() + 1).padStart(2, '0');
    const day = String(rawDate.getDate()).padStart(2, '0');
    const year = rawDate.getFullYear();
    
    this.appointment.appointmentDate = `${day}/${month}/${year}`;

    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: () => {
        alert('Appointment added successfully!');
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error('Error adding appointment:', err);
        alert('Failed to add appointment.');
      }
    });
  }
}
