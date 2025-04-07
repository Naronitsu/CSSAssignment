import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-appointments',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.css'
})

export class ListAppointmentsComponent {
  appointments = [
    {
      id: 1,
      patientName: 'Fluffy',
      animalType: 'Cat',
      ownerName: 'John',
      ownerSurname: 'Doe',
      date: '2025-04-10 10:00',
      duration: '15 mins'
    }
  ];
  
}
