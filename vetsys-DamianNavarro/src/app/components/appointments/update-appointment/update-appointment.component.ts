import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {
  appointmentId: number = 0;

  appointment = {
    animalType: '',
    appointmentDate: '',
    appointmentDuration: 0,
    appointmentTime: '',
    ownerContactNumber: '',
    ownerIdCardNumber: '',
    ownerName: '',
    ownerSurname: '',
    patientName: '',
    reasonForAppointment: '',
    vetNotes: ''
  };

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAppointment();
  }

  loadAppointment() {

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (data) => {
        this.appointment = data;
        if (this.appointment.appointmentDate.includes('/')) {
          const [day, month, year] = this.appointment.appointmentDate.split('/');
          this.appointment.appointmentDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        console.log(this.appointment)
      },
      error: (err) => {
        console.error('Error loading appointment:', err);
      }
    });
  }

  updateAppointment() {
    const rawDate = new Date(this.appointment.appointmentDate);
    const month = String(rawDate.getMonth() + 1).padStart(2, '0');
    const day = String(rawDate.getDate()).padStart(2, '0');
    const year = rawDate.getFullYear();
    
    this.appointment.appointmentDate = `${day}/${month}/${year}`;

    this.appointmentService.updateAppointment(this.appointmentId, this.appointment).subscribe({
      next: () => {
        alert('Appointment updated!');
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error('Error updating appointment:', err);
        alert('Update failed.');
      }
    });
  }
}
