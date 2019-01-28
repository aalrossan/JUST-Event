import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStudentService } from '../../../services/authStudent/auth-student.service';
import { GetEvaluation } from 'src/app/models/evaluations/get-evaluation';
import { LoadingController } from '@ionic/angular';
import { GetEvaluations } from 'src/app/models/admins/get-evaluations';
import { ModifyStudentEvaluation } from 'src/app/models/students/modify-student-evaluation';
import { CreateStudentEvaluation } from 'src/app/models/students/create-student-evaluation';
import { GetStudentEvaluation } from 'src/app/models/students/get-student-evaluation';
import { StudentEvaluation } from 'src/app/models/evaluations/student-evaluation';

@Component({
  selector: 'app-show-evaluation-event',
  templateUrl: './show-evaluation-event.page.html',
  styleUrls: ['./show-evaluation-event.page.scss'],
})
export class ShowEvaluationEventPage implements OnInit {
  loadEvaluations: boolean = false
  evaluations: Array<GetEvaluation> = new Array<GetEvaluation>()
  evaluationStd: Array<StudentEvaluation> = new Array<StudentEvaluation>()

  constructor(
    private authStudentService: AuthStudentService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  // Get evaluation by event id
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const eventId: GetEvaluations = {
      eventId: this.route.snapshot.paramMap.get('id')
    }
    this.authStudentService.getEvaluationEvent(eventId).subscribe(data => {
      if (data.success) {
        this.evaluations = data.evaluations
        this.loadEvaluations = true
        let studentEvaluation: GetStudentEvaluation = {
          eventId: this.route.snapshot.paramMap.get('id'),
          studentId: this.authStudentService.getProfile().studentId
        }
        this.authStudentService.getStudentEvaluation(studentEvaluation).subscribe(data => {
          if (data.success) {
            console.log(data)
            this.evaluationStd = data.studentEvaluation
            console.log(this.evaluationStd)
            loading.dismiss()
          } else {
            console.log(data)
            loading.dismiss()
          }
        })
      }
    })
  }

  // Send evaluation
  async sendEvaluation() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    let studentEvaluation: GetStudentEvaluation = {
      eventId: this.route.snapshot.paramMap.get('id'),
      studentId: this.authStudentService.getProfile().studentId
    }
    this.authStudentService.getStudentEvaluation(studentEvaluation).subscribe(data => {
      if (data.success) {
        if (data.studentEvaluation.length !== 0) {
          const studentEvaluation: ModifyStudentEvaluation = {
            studentEvaluationId: data.studentEvaluation[0]._id,
            eventId: this.route.snapshot.paramMap.get('id'),
            studentId: this.authStudentService.getProfile().studentId,
            values: this.evaluationStd,
            eventName: this.route.snapshot.paramMap.get('eventName'),
            studentName: this.authStudentService.getProfile().name
          }
          this.authStudentService.modifyStudentEvaluation(studentEvaluation).subscribe(data => {
            loading.dismiss()
            if (data.success) {
              this.router.navigate(['students', 'show-event-info', this.route.snapshot.paramMap.get('eventName'), this.route.snapshot.paramMap.get('id')])
            }
          })
        } else {
          const studentEvaluation: CreateStudentEvaluation = {
            eventId: this.route.snapshot.paramMap.get('id'),
            studentId: this.authStudentService.getProfile().studentId,
            values: this.evaluationStd,
            eventName: this.route.snapshot.paramMap.get('eventName'),
            studentName: this.authStudentService.getProfile().name
          }
          this.authStudentService.createStudentEvaluation(studentEvaluation).subscribe(data => {
            loading.dismiss()
            if (data.success) {
              this.router.navigate(['students', 'show-event-info', this.route.snapshot.paramMap.get('eventName'), this.route.snapshot.paramMap.get('id')])
            }
          })
        }
      }
    })
  }

  mcqAnswer(index: number, val: any): void {
    const values = {
      question: this.evaluations[index].question,
      answer: val.target.value
    }
    this.evaluationStd.push(values)
  }

}
