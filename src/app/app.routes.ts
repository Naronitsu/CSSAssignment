import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'appointments', component: ListAppointmentsComponent },
  { path: 'appointments/view/:id', component: ViewAppointmentDetailsComponent },
  { path: 'appointments/add', component: AddAppointmentComponent },
  { path: 'appointments/update/:id', component: UpdateAppointmentComponent },
  { path: '**', redirectTo: '' }
];
