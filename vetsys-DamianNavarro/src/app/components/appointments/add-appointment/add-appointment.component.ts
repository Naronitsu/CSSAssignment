import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'success',
          title: 'Appointment Added',
          text: 'The appointment was successfully saved.'
        }).then(() => this.router.navigate(['/appointments']));        
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to add appointment.', 'error');
      }
    });
  }

  isDateTimeValid(): boolean {
    const date = new Date(this.appointment.appointmentDate);
    const [hours, minutes] = this.appointment.appointmentTime.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes);
    return date > new Date();
  }
  
  formSubmitted = false;

  
}


