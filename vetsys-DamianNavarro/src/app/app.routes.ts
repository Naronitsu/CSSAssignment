import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListAppointmentsComponent } from './components/appointments/list-appointments/list-appointments.component';
import { ViewAppointmentComponent } from './components/appointments//view-appointment-details/view-appointment-details.component';
import { AddAppointmentComponent } from './components/appointments//add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './components/appointments//update-appointment/update-appointment.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'appointments', component: ListAppointmentsComponent },
  { path: 'appointments/view/:id', component: ViewAppointmentComponent },
  { path: 'appointments/add', component: AddAppointmentComponent },
  { path: 'appointments/update/:id', component: UpdateAppointmentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
