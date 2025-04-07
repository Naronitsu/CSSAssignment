import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus',
  standalone: true
})
export class AppointmentStatusPipe implements PipeTransform {
  transform(appointmentDate: string, appointmentTime: string): string {
    if (!appointmentDate || !appointmentTime) return 'Unknown';

    // Convert MM/DD/YYYY to YYYY-MM-DD for parsing
    const [month, day, year] = appointmentDate.split('/');
    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${appointmentTime}`;

    const appointmentDateTime = new Date(isoDate);
    const now = new Date();

    return appointmentDateTime > now ? 'Upcoming' : 'Past';
  }
}
