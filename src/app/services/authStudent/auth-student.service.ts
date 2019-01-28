import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Student } from '../../models/account/student';
import { LoginStudent } from '../../models/login/login-student';
import { CheckEvaluationEvent } from 'src/app/models/students/check-evaluation-event';
import { GetEvaluationEvent } from 'src/app/models/students/get-evaluation-event';
import { GetEvent } from 'src/app/models/students/get-event';
import { GetNotifications } from 'src/app/models/students/get-notifications';
import { CreateRegisterStudentEvent } from 'src/app/models/students/create-register-student-event';
import { RemoveRegisterStudentEvent } from 'src/app/models/students/remove-register-student-event';
import { GetRegisterEvent } from 'src/app/models/students/get-register-event';
import { GetServicesAllocation } from 'src/app/models/students/get-services-allocation';
import { CreateStudentEvaluation } from 'src/app/models/students/create-student-evaluation';
import { ModifyStudentEvaluation } from 'src/app/models/students/modify-student-evaluation';
import { GetStudentEvaluation } from 'src/app/models/students/get-student-evaluation';
import { GetNotification } from 'src/app/models/students/get-notification';
import { RemoveNotification } from 'src/app/models/students/remove-notification';

@Injectable({
  providedIn: 'root'
})
export class AuthStudentService {
  authToken: any
  student: Student

  constructor(private http: Http) { }

  // Get studentIds
  getStudentIds() {
    let headers = new Headers()
    headers.append('Connect-Type', 'application/json')
    return this.http.get('https://just-events.herokuapp.com/students/getStudentIds')
      .pipe(map(res => res.json()))
  }

  // Login student
  LoginStudent(student: LoginStudent) {
    let headers = new Headers()
    headers.append('Connect-Type', 'application/json')
    return this.http.post('https://just-events.herokuapp.com/students/login', student, { headers: headers })
      .pipe(map(res => res.json()))
  }

  // Store token and student info
  storeStudentData(token: any, student: Student): void {
    localStorage.setItem('id_token', token)
    localStorage.setItem('student', JSON.stringify(student))
    this.authToken = token
    this.student = student
  }

  // Load token
  loadToken(): void {
    this.authToken = localStorage.getItem('id_token')
  }

  // Load student info
  loadStudent(): void {
    this.student = JSON.parse(localStorage.getItem('student'))
  }

  // Get student info
  getProfile(): Student {
    this.loadStudent()
    return this.student
  }

  // Logout
  logout(): void {
    this.authToken = null
    this.student = null
    localStorage.clear()
  }

  // Check evaluation event
  checkEvaluationEvent(eventId: CheckEvaluationEvent) {
    return this.http.post('https://just-events.herokuapp.com/students/evaluations/checkEvaluationEvent', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get evaluation event
  getEvaluationEvent(eventId: GetEvaluationEvent) {
    return this.http.post('https://just-events.herokuapp.com/students/evaluations/getEvaluationsEvent', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get event by department
  getEventsByDepartment() {
    this.loadStudent()
    const department = { department: this.student.department }
    return this.http.post('https://just-events.herokuapp.com/students/events/getEventsByDepartment', department, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get event by id
  getEvent(eventId: GetEvent) {
    return this.http.post('https://just-events.herokuapp.com/students/events/getEvent', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get notifications
  getNotifications(studentId: GetNotifications) {
    return this.http.post('https://just-events.herokuapp.com/students/notifications/getNotifications', studentId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get notification information
  getNotification(notificationId: GetNotification) {
    return this.http.post('https://just-events.herokuapp.com/students/notifications/getNotification', notificationId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Remove notification
  removeNotification(notificationId: RemoveNotification) {
    return this.http.post('https://just-events.herokuapp.com/students/notifications/removeNotification', notificationId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Create register event
  createRegisterStudentEvent(registerEvent: CreateRegisterStudentEvent) {
    return this.http.post('https://just-events.herokuapp.com/students/registerStudentEvents/createRegisterStudentEvent', registerEvent, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Remove register event
  RemoveRegisterStudentEvent(registerEvent: RemoveRegisterStudentEvent) {
    return this.http.post('https://just-events.herokuapp.com/students/registerStudentEvents/removeRegisterStudentEvent', registerEvent, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get register event
  getRegisterEvent(registerEvent: GetRegisterEvent) {
    return this.http.post('https://just-events.herokuapp.com/students/registerStudentEvents/getRegisterEvent', registerEvent, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get services allocation
  getServicesAllocation(eventId: GetServicesAllocation) {
    return this.http.post('https://just-events.herokuapp.com/students/servicesAllocations/getServicesAllocation', eventId, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Create student evaluation
  createStudentEvaluation(studentEvaluation: CreateStudentEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/students/studentEvaluations/createStudentEvaluation', studentEvaluation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Modify student evaluation
  modifyStudentEvaluation(studentEvaluation: ModifyStudentEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/students/studentEvaluations/modifyStudentEvaluation', studentEvaluation, { headers: this.storeHeader() })
      .pipe(map(res => res.json()))
  }

  // Get student evaluation
  getStudentEvaluation(studentEvaluation: GetStudentEvaluation) {
    return this.http.post('https://just-events.herokuapp.com/students/studentEvaluations/getStudentEvaluation', studentEvaluation, { headers: this.storeHeader() })
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
