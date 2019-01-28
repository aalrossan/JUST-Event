import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate/validate.service';
import { AuthStudentService } from '../../../services/authStudent/auth-student.service';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { LoginStudent } from '../../../models/login/login-student';
import { LoginAdmin } from '../../../models/login/login-admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: LoginStudent = {
    studentId: undefined,
    password: ''
  }
  private students: Array<number> = new Array<number>()
  private admins: Array<number> = new Array<number>()

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private authStudentService: AuthStudentService,
    private authAdminService: AuthAdminService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  // Get all student ids and admin ids
  async ngOnInit() {
    localStorage.clear()
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()
    
    this.authStudentService.getStudentIds().subscribe(data => {
      if (this.admins.length != 0) {
        loading.dismiss()
      }
      this.students = data
    })
    this.authAdminService.getAdminIds().subscribe(data => {
      if (this.students.length != 0) {
        loading.dismiss()
      }
      this.admins = data
    })
  }

  // Validate login student or admin
  loginBtn(): void {
    if (this.validateService.validateUser(this.login)) {
      if (this.validateService.checkStudentOrAdmin(this.login.studentId, this.students) && this.validateService.checkStudentOrAdmin(this.login.studentId, this.admins)) {
        this.checkLogin()
      } else if (this.validateService.checkStudentOrAdmin(this.login.studentId, this.students)) {
        this.loginStudent()
      } else if (this.validateService.checkStudentOrAdmin(this.login.studentId, this.admins)) {
        this.loginAdmin()
      } else {
        this.validateService.presentToast('Wrong Student ID or Password')
      }
    } else {
      this.validateService.presentToast('Please Fill All Field')
    }
  }

  // Check login student or admin
  async checkLogin(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Login As Student or Admin',
      inputs: [
        {
          name: 'Student',
          type: 'radio',
          label: 'Student',
          value: 'Student'
        },
        {
          name: 'Admin',
          type: 'radio',
          label: 'Admin',
          value: 'Admin'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Login',
          handler: (value) => {
            if (value == 'Student') {
              this.loginStudent()
            } else if (value == 'Admin') {
              this.loginAdmin()
            }
          }
        }
      ]
    })
    await alert.present()
  }

  // Login student
  async loginStudent() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    this.authStudentService.LoginStudent(this.login).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        localStorage.setItem('user', 'student')
        this.authStudentService.storeStudentData(data.token, data.student)
        localStorage.setItem('load', 'load')
        this.router.navigate(['students', 'show-event'])
      } else {
        this.validateService.presentToast('Wrong Student ID or Password')
      }
    })
  }

  // Login admin
  async loginAdmin() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const login: LoginAdmin = {
      adminId: this.login.studentId,
      password: this.login.password
    }
    this.authAdminService.LoginAdmin(login).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        localStorage.setItem('user', 'admin')
        this.authAdminService.storeAdminData(data.token, data.admin)
        localStorage.setItem('load', 'load')
        this.router.navigate(['admins', 'event-manager'])
      } else {
        this.validateService.presentToast('Wrong Admin ID or Password')
      }
    })
  }

  // Go to login manager page
  goToLoginManager(): void {
    this.router.navigate(['login-manager'])
  }

}
