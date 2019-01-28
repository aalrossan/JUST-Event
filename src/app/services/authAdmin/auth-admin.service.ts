import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Admin } from '../../models/account/admin';
import { LoginAdmin } from '../../models/login/login-admin';
import { CreateEvent } from 'src/app/models/admins/create-event';
import { ModifyEvent } from 'src/app/models/admins/modify-event';
import { RemoveEvent } from 'src/app/models/admins/remove-event';
import { GetEvent } from 'src/app/models/admins/get-event';
import { GetEventByCreateFrom } from 'src/app/models/admins/get-event-by-create-from';
import { CreateEvaluation } from 'src/app/models/admins/create-evaluation';
import { ModifyEvaluation } from 'src/app/models/admins/modify-evaluation';
import { RemoveEvaluation } from 'src/app/models/admins/remove-evaluation';
import { GetEvaluations } from 'src/app/models/admins/get-evaluations';
import { GetNumberOfStudent } from 'src/app/models/admins/get-number-of-student';
import { GetStudentEvaluation } from 'src/app/models/admins/get-student-evaluation';
import { CheckTimeDate } from 'src/app/models/admins/check-time-date';
import { AdvertiseEvent } from 'src/app/models/admins/advertise-event';
import { NotifyRegisteredEvent } from 'src/app/models/admins/notify-registered-event';
import { GetRegisteredEvent } from 'src/app/models/admins/get-registered-event';
import { GetServicesAllocation } from 'src/app/models/admins/get-services-allocation';
import { CreateServicesAllocation } from 'src/app/models/admins/create-services-allocation';
import { ModifyServicesAllocation } from 'src/app/models/admins/modify-services-allocation';
import { RemoveServicesAllocation } from 'src/app/models/admins/remove-services-allocation';
import { GetHalls } from 'src/app/models/admins/get-halls';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  authToken: any
  admin: Admin

  constructor(private http: Http) { }

  // Get all adminsId
  getAdminIds() {
    let headers = new Headers()
    headers.append('Connect-Type', 'application/json')
    return this.http.get('https://just-events.herokuapp.com/admins/getAdminsId', { headers: headers })
      .pipe(map(res => res.json()))
  }

  // Login admin
  LoginAdmin(admin: LoginAdmin) {
    let headers = new Headers()
    headers.append('Connect-Type', 'application/json')
    return this.http.post('https://just-events.herokuapp.com/admins/login', admin, { headers: headers })
      .pipe(map(res => res.json()))
  }

  // Store token and admin information
  storeAdminData(token: any, admin: Admin): void {
    localStorage.setItem('id_token', token)
    localStorage.setItem('admin', JSON.stringify(admin))
    this.authToken = token
    this.admin = admin
  }

  // Load token
  loadToken(): void {
    this.authToken = localStorage.getItem('id_token')
  }

  // Load admin information
  loadAdmin(): void {
    this.admin = JSON.parse(localStorage.getItem('admin'))
  }

  // Get admin information
  getProfile(): Admin {
    this.loadAdmin()
    return this.admin
  }

  // Logout
  logout(): void {
    this.authToken = null
    this.admin = null
    localStorage.clear()
  }

  // Create event
  createEvent(event: CreateEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/createEvent', event, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Modify event
  modifyEvent(event: ModifyEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/modifyEvent', event, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Remove event
  removeEvent(event: RemoveEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/removeEvent', event, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get event
  getEvent(event: GetEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/getEvent', event, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get event by create from
  getEventByCreateFrom(event: GetEventByCreateFrom) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/getEventByCreateFrom', event, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Create evaluation
  addEvaluation(evaluation: CreateEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/admins/evaluations/createEvaluation', evaluation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Modify evaluation
  modifyEvaluation(evaluation: ModifyEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/admins/evaluations/modifyEvaluation', evaluation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Remove evaluation
  removeEvaluation(evaluation: RemoveEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/admins/evaluations/removeEvaluation', evaluation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get evaluation by event id
  getEvaluations(eventId: GetEvaluations) {
    return this.http.post('https://just-events.herokuapp.com/admins/evaluations/getEvaluations', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get number students registered event
  getNoStdOfRegEvent(eventId: GetNumberOfStudent) {
    return this.http.post('https://just-events.herokuapp.com/admins/registeredStudentEvents/getNoOfStdRegEvent', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get student evaluation by event id
  getStudentEvaluation(eventId: GetStudentEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/admins/studentEvaluations/getStudentEvaluation', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Check time and date
  checkTimeDate(checkTimeDate: CheckTimeDate) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/checkTimeDate', checkTimeDate, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Advertise event
  advertiseEvent(advertiseEvent: AdvertiseEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/notifications/advertiseEvent', advertiseEvent, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Notify an about registered event
  notifyRegisteredEvent(registeredEvent: NotifyRegisteredEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/notifications/notifyRegisteredEvent', registeredEvent, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get registered event or not
  getRegisteredEvent(eventId: GetRegisteredEvent) {
    return this.http.post('https://just-events.herokuapp.com/admins/events/getRegisteredEvent', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Create services allocation
  createServicesAllocation(servicesAllocation: CreateServicesAllocation) {
    return this.http.post('https://just-events.herokuapp.com/admins/servicesAllocations/createServicesAllocation', servicesAllocation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Modify services allocation
  modifyServicesAllocation(servicesAllocation: ModifyServicesAllocation) {
    return this.http.post('https://just-events.herokuapp.com/admins/servicesAllocations/modifyServicesAllocation', servicesAllocation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Remove services allocation
  removeServicesAllocation(servicesAllocation: RemoveServicesAllocation) {
    return this.http.post('https://just-events.herokuapp.com/admins/servicesAllocations/removeServicesAllocation', servicesAllocation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get services allocation
  getServicesAllocation(servicesAllocation: GetServicesAllocation) {
    return this.http.post('https://just-events.herokuapp.com/admins/servicesAllocations/getServicesAllocation', servicesAllocation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get halls
  getHalls(getHalls: GetHalls) {
    return this.http.post('https://just-events.herokuapp.com/admins/servicesAllocations/getHalls', getHalls, { headers: this.storeHeader() })
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
