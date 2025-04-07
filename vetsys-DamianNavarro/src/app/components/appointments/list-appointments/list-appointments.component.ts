import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { AppointmentStatusPipe } from '../../../pipes/appointment-status.pipe';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-appointments',
  imports: [CommonModule, RouterModule, AppointmentStatusPipe],
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  userRole = localStorage.getItem('role');
  statusPipe = new AppointmentStatusPipe();

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

  exportToExcel(): void {
    const exportData = this.appointments.map(appt => {
      return {
        'Patient': appt.patientName,
        'Animal Type': appt.animalType,
        'Owner': `${appt.ownerName} ${appt.ownerSurname}`,
        'Mobile': appt.ownerContactNumber,
        'ID Card': appt.ownerIdCardNumber,
        'Date': appt.appointmentDate,
        'Time': appt.appointmentTime,
        'Duration': appt.appointmentDuration,
        'Reason': appt.reasonForAppointment,
        'Status': this.getStatus(appt)
      };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'appointments.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
  
    autoTable(doc, {
      head: [['Patient', 'Animal', 'Owner', 'Date', 'Time', 'Duration', 'Status']],
      body: this.appointments.map(appt => [
        appt.patientName,
        appt.animalType,
        `${appt.ownerName} ${appt.ownerSurname}`,
        appt.appointmentDate,
        appt.appointmentTime,
        appt.appointmentDuration,
        this.getStatus(appt)
      ]),
      didParseCell: (data) => {
        if (data.section === 'body') {
          const status = (data.row.raw as string[])[6];
          if (status === 'Upcoming') {
            data.cell.styles.fillColor = [204, 255, 204]; // Light green
          } else if (status === 'Past') {
            data.cell.styles.fillColor = [255, 204, 204]; // Light red
          }
        }
      }
    });
  
    doc.save('appointments.pdf');
  }  
  
  
  getStatus(appt: any): string {
    const [month, day, year] = appt.appointmentDate.split('/');
    const dateStr = `${year}-${month}-${day}T${appt.appointmentTime}`;
    return new Date(dateStr) > new Date() ? 'Upcoming' : 'Past';
  }
  
  
}
