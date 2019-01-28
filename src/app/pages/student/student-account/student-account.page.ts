import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/account/student';
import { AuthStudentService } from '../../../services/authStudent/auth-student.service';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.page.html',
  styleUrls: ['./student-account.page.scss'],
})
export class StudentAccountPage implements OnInit {
  student: Student = null

  constructor(
    private authStudentService: AuthStudentService
  ) { }

  // Get student info
  ngOnInit(): void {
    this.student = this.authStudentService.getProfile()
  }

}
