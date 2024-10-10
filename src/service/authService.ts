import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = environment.BACKEND_HOST + '/Auth'

  constructor(private http: HttpClient) { }

  googleAction(credentials: Record<string, any>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/google/login`, credentials);
  }

  facebookAction(credentials: Record<string, any>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/facebook`, credentials);
  }

  registerUser(credentials: Record<string, any>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials);
    
  }

  login(credentials: Record<string, any>): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: credentials
    };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
