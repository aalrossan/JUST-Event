import { Injectable } from '@angular/core';
import { LoginStudent } from '../../models/login/login-student';
import { ToastController } from '@ionic/angular';
import { LoginManager } from '../../models/login/login-manager';
import { AuthAdminService } from '../authAdmin/auth-admin.service';
import { AuthStudentService } from '../authStudent/auth-student.service';
import { AuthManagerService } from '../authManager/auth-manager.service';
import { Evaluation } from 'src/app/models/evaluations/evaluation';
import { AlertInput } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    private authAdminService: AuthAdminService,
    private authStudentService: AuthStudentService,
    private authManagerService: AuthManagerService,
    private toastController: ToastController,
  ) { }

  // Validate login input => studentId and password
  validateUser(login: LoginStudent): boolean {
    let studentId: string = ''
    if (login.studentId === null || login.studentId === undefined) {
      studentId = ''
    } else {
      studentId = login.studentId.toString()
    }
    if (studentId !== '' && studentId !== null && studentId !== undefined &&
      login.password !== '' && login.password !== null && login.password !== undefined
    ) {
      return true
    } else {
      return false
    }
  }

  // Validate login input => managerId and password
  validateManager(login: LoginManager): boolean {
    if (login.managerId !== '' && login.managerId !== null && login.managerId !== undefined &&
      login.password !== '' && login.password !== null && login.password !== undefined
    ) {
      return true
    } else {
      return false
    }
  }

  // Validate event input => eventName, eventType, minNoStd, startDate and startTime
  validateEvent(event): boolean {
    if (event.eventName != null && event.eventName != undefined && event.eventName != '' &&
      event.eventType != null && event.eventType != undefined && event.eventType != '' &&
      event.minNoStd != null && event.minNoStd != undefined && event.minNoStd > 0 &&
      event.startDate != null && event.startDate != undefined && event.startDate != '' &&
      event.startTime != null && event.startTime != undefined && event.startTime != ''
    ) {
      return true
    } else {
      return false
    }
  }

  // Validate evaluation form => question, answer1, answer2, answer3 and answer4 
  validateEvaluation(evaluation): Evaluation {
    let createEvaluation: Evaluation = {
      answer: [],
      question: ''
    }
    if (evaluation.question != null && evaluation.question != undefined && evaluation.question != '') {
      createEvaluation.question = evaluation.question
      if (evaluation.answer1 !== null && evaluation.answer1 !== undefined && evaluation.answer1 !== '') {
        createEvaluation.answer.push(evaluation.answer1)
      }
      if (evaluation.answer2 !== null && evaluation.answer2 !== undefined && evaluation.answer2 !== '') {
        createEvaluation.answer.push(evaluation.answer2)
      }
      if (evaluation.answer3 !== null && evaluation.answer3 !== undefined && evaluation.answer3 !== '') {
        createEvaluation.answer.push(evaluation.answer3)
      }
      if (evaluation.answer4 !== null && evaluation.answer4 !== undefined && evaluation.answer4 !== '') {
        createEvaluation.answer.push(evaluation.answer4)
      }
    }
    if (createEvaluation.answer.length >= 2) {
      return createEvaluation
    } else {
      return null
    }
  }

  // Check user login => Student or Admin, Student and Admin
  checkStudentOrAdmin(user: number, users: Array<Number>): boolean {
    let check: boolean = false
    for (let i = 0; i < users.length; i++) {
      if (user == users[i]) {
        check = true
        break
      }
    }
    return check
  }

  // Toast message
  async presentToast(msg: string) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present()
  }

  // Check login user => student, admin or manager
  loggedInUser(user: string): boolean {
    if (localStorage.getItem('user') == user) {
      return true
    } else {
      return false
    }
  }

  // check login user
  loggedIn(): boolean {
    const token = localStorage.getItem('id_token')
    if (token) {
      return true
    } else {
      return false
    }
  }

  // Logout user => student, admin or manager
  logout() {
    if (this.loggedInUser('manager')) {
      this.authManagerService.logout()
    } else if (this.loggedInUser('admin')) {
      this.authAdminService.logout()
    } else if (this.loggedInUser('student')) {
      this.authStudentService.logout()
    }
  }

  // Edit
  // Get Date Array
  getDateArray(): Array<string> {
    let date: Date = new Date()

    let dateArray: Array<string> = new Array<string>()
    for (let i = 0; i <= 7; i++) {
      let d: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
      if (d.getDay() !== 5 && d.getDay() !== 6) {
        dateArray.push(d.toDateString())
      }
    }
    return dateArray
  }

  // Get days formatted
  getDays(startDate: string): string {
    let split = startDate.split(' ')
    let day = split[0];
    if (day == 'Sun' || day == 'Tue' || day == 'Thu') {
      return 'Sun,Tue,Thu'
    } else {
      return 'Mon,Wed'
    }
  }

  // Get days formatted
  getArrayDays(startDate: string): Array<string> {
    let split = startDate.split(' ')
    let day = split[0];
    if (day == 'Sun' || day == 'Tue' || day == 'Thu') {
      return ['Sun', 'Tue', 'Thu']
    } else {
      return ['Mon', 'Wed']
    }
  }

  // Get halls
  getHalls(halls: Array<string>): AlertInput[] {
    let i = 0;
    const obj = []
    for (i = 0; i < halls.length; i++) {
      if (halls[i] != null && halls[i] != undefined && halls[i] != '') {
        obj.push({
          name: halls[i].toString(),
          type: 'radio',
          label: halls[i].toString(),
          value: halls[i].toString()
        })
      }
      if (i === halls.length - 1) {
        return obj;
      }
    }
  }

  // Get halls
  getModifyHalls(halls: Array<string>, hall: string): AlertInput[] {
    let i = 0;
    const obj = []
    for (i = 0; i < halls.length; i++) {
      if (halls[i] != null && halls[i] != undefined && halls[i] != '') {
        obj.push({
          name: halls[i].toString(),
          type: 'radio',
          label: halls[i].toString(),
          value: halls[i].toString(),
          checked: (halls[i] === hall)
        })
      }
      if (i === halls.length - 1) {
        return obj;
      }
    }
  }

  // Get time and number of student
  getTime(times: Array<string>, minNoOfStds: Array<number>): Map<string, number> {
    let data: Map<string, number> = new Map<string, number>()
    for (let i = 0; i < minNoOfStds.length; i++) {
      if (minNoOfStds[i] != 0) {
        data.set(times[i], minNoOfStds[i])
      }
    }
    return data
  }

}
