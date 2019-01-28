import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Manager } from '../../models/account/manager';
import { LoginManager } from '../../models/login/login-manager';
import { GetStudentInfo } from 'src/app/models/managers/get-student-info';
import { CreateAdmin } from 'src/app/models/managers/create-admin';
import { RemoveAdmin } from 'src/app/models/managers/remove-admin';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {
  authToken: any
  manager: Manager

  constructor(private http: Http) { }

  // Login manager
  LoginManager(manager: LoginManager) {
    let headers = new Headers()
    headers.append('Connect-Type', 'application/json')
    return this.http.post('https://just-events.herokuapp.com/managers/login', manager, { headers: headers })
      .pipe(map(res => res.json()))
  }

  // Store token and manager information
  storeManagerData(token: any, manager: Manager): void {
    localStorage.setItem('id_token', token)
    localStorage.setItem('manager', JSON.stringify(manager))
    this.authToken = token
    this.manager = manager
  }

  // Load token
  loadToken(): void {
    this.authToken = localStorage.getItem('id_token')
  }

  // Load manager information
  loadManager(): void {
    this.manager = JSON.parse(localStorage.getItem('manager'))
  }

  // Logout
  logout(): void {
    this.authToken = null
    this.manager = null
    localStorage.clear()
  }

  // Get manager information
  getProfile(): Manager {
    this.loadManager()
    return this.manager
  }

  // Get student information
  getStudentInfo(studentId: GetStudentInfo) {
    return this.http.post('https://just-events.herokuapp.com/managers/students/getStudentInfo', studentId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Create admin
  createAdmin(student: CreateAdmin) {
    return this.http.post('https://just-events.herokuapp.com/managers/admins/createAdmin', student, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Remove admin
  removeAdmin(admin: RemoveAdmin) {
    return this.http.post('https://just-events.herokuapp.com/managers/admins/removeAdmin', admin, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get all logfiles
  getLogfiles() {
    return this.http.get('https://just-events.herokuapp.com/managers/logfiles/getLogfiles', { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Store html header
  storeHeader(): Headers {
    let headers = new Headers()
    headers.append('Connect-Type', 'application/json')
    this.loadToken()
    headers.append('Authorization', this.authToken)
    return headers
  }
}
