import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAppointments(): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.baseUrl}/appointment`, { headers });
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post(this.baseUrl, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
