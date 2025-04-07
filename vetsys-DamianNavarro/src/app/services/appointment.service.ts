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

  createAppointment(appt: any) {
    const token = localStorage.getItem('token');
    return this.http.post('http://localhost:8080/appointment', appt, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }  

  getAppointmentById(id: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`http://localhost:8080/appointment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  updateAppointment(id: number, data: any) {
    const token = localStorage.getItem('token');
    return this.http.put(`http://localhost:8080/appointment/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  deleteAppointment(id: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(`http://localhost:8080/appointment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }  
}
