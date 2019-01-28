import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthManagerService } from '../../../services/authManager/auth-manager.service';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { ValidateService } from '../../../services/validate/validate.service';
import { Student } from '../../../models/account/student';
import { GetStudentInfo } from 'src/app/models/managers/get-student-info';
import { CreateAdmin } from 'src/app/models/managers/create-admin';
import { RemoveAdmin } from 'src/app/models/managers/remove-admin';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.page.html',
  styleUrls: ['./create-admin.page.scss'],
})
export class CreateAdminPage implements OnInit {
  studentId: number = null
  showInfo: boolean = false
  disabledBtn: boolean = true
  student: Student = null
  admin: boolean = false

  constructor(
    private authManagerService: AuthManagerService,
    private authAdminService: AuthAdminService,
    private validateService: ValidateService,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void { }

  // Get student id
  getStudentId(studentId: any): void {
    this.studentId = studentId.target.value
    let id: string = this.studentId.toString()
    if (this.studentId !== null && this.studentId !== undefined && id !== '') {
      this.disabledBtn = false
    } else {
      this.disabledBtn = true
    }
  }

  // Get student information
  async getStudent() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const studentId: GetStudentInfo = {
      studentId: this.studentId
    }
    
    this.authManagerService.getStudentInfo(studentId).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.student = data.student
        this.showInfo = true
        this.authAdminService.getAdminIds().subscribe(data => {
          if (this.validateService.checkStudentOrAdmin(this.studentId, data)) {
            this.admin = true
          } else {
            this.admin = false
          }
        })
      } else {
        loading.dismiss()
        this.showInfo = false
        this.validateService.presentToast('Student ID is not found')
      }
    })
  }

  // Create admin
  async createAdmin() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const student: CreateAdmin = {
      managerName: this.authManagerService.getProfile().name,
      studentId: this.student.studentId
    }

    this.authManagerService.createAdmin(student).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.admin = true
      } else {
        loading.dismiss()
        this.admin = false
      }
    })
  }

  // Remove admin
  async removeAdmin() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const admin: RemoveAdmin = {
      managerName: this.authManagerService.getProfile().name,
      adminId: this.student.studentId
    }
    
    this.authManagerService.removeAdmin(admin).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.admin = false
      } else {
        loading.dismiss()
        this.admin = true
      }
    })
  }
  
}
