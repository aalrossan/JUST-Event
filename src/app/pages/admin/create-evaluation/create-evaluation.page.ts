import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { ValidateService } from '../../../services/validate/validate.service';
import { GetEvaluation } from 'src/app/models/evaluations/get-evaluation';
import { GetEvaluations } from 'src/app/models/admins/get-evaluations';
import { CreateEvaluation } from 'src/app/models/admins/create-evaluation';
import { RemoveEvaluation } from 'src/app/models/admins/remove-evaluation';
import { ModifyEvaluation } from 'src/app/models/admins/modify-evaluation';
import { Evaluation } from 'src/app/models/evaluations/evaluation';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.page.html',
  styleUrls: ['./create-evaluation.page.scss'],
})
export class CreateEvaluationPage implements OnInit {
  evaluations: Array<GetEvaluation> = new Array<GetEvaluation>()

  constructor(
    private alertController: AlertController,
    private authAdminService: AuthAdminService,
    private route: ActivatedRoute,
    private validateService: ValidateService,
    private loadingController: LoadingController
  ) { }

  // Get evaluation info 
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const eventId: GetEvaluations = {
      eventId: this.route.snapshot.paramMap.get('id')
    }
    this.authAdminService.getEvaluations(eventId).subscribe(data => {
      loading.dismiss()
      this.evaluations = data.evaluations
    })
  }

  // Create question
  async createEvaluation(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Create Evaluation Form',
      inputs: [
        {
          name: 'question',
          type: 'text',
          placeholder: 'Question..'
        },
        {
          name: 'answer1',
          type: 'text',
          placeholder: 'Answer 1'
        },
        {
          name: 'answer2',
          type: 'text',
          placeholder: 'Answer 2'
        },
        {
          name: 'answer3',
          type: 'text',
          placeholder: 'Answer 3'
        },
        {
          name: 'answer4',
          type: 'text',
          placeholder: 'Answer 4'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value) => {
            let evaluation: Evaluation = this.validateService.validateEvaluation(value)
            if (evaluation !== null) {
              const createEvaluation: CreateEvaluation = {
                adminName: this.authAdminService.getProfile().name,
                eventName: this.route.snapshot.paramMap.get('eventName'),
                eventId: this.route.snapshot.paramMap.get('id'),
                question: evaluation.question,
                answer: evaluation.answer
              }
              this.authAdminService.addEvaluation(createEvaluation).subscribe(data => {
                if (data.success) {
                  location.reload()
                }
              })
            } else {
              this.validateService.presentToast('Please fill Question Name and at least Two Feilds')
            }
          }
        }
      ]
    })
    await alert.present()
  }

  // Delete question
  async deleteQuestion(e_id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Question',
      message: 'Do you want to delete the Question?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: () => {
            const evaluation: RemoveEvaluation = {
              evaluationId: e_id,
              adminName: this.authAdminService.getProfile().name,
              eventName: this.route.snapshot.paramMap.get('eventName')
            }
            this.authAdminService.removeEvaluation(evaluation).subscribe(data => {
              if (data.success) {
                location.reload()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Modify question
  async modifyQuestion(getEvaluation: GetEvaluation): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Modify Evaluation Form',
      inputs: [
        {
          name: 'question',
          type: 'text',
          value: getEvaluation.question,
          placeholder: 'Question..'
        },
        {
          name: 'answer1',
          type: 'text',
          value: getEvaluation.answer[0],
          placeholder: 'Answer 1'
        },
        {
          name: 'answer2',
          type: 'text',
          value: getEvaluation.answer[1],
          placeholder: 'Answer 2'
        },
        {
          name: 'answer3',
          type: 'text',
          value: getEvaluation.answer[2],
          placeholder: 'Answer 3'
        },
        {
          name: 'answer4',
          type: 'text',
          value: getEvaluation.answer[3],
          placeholder: 'Answer 4'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value) => {
            let evaluation: Evaluation = this.validateService.validateEvaluation(value)
            if (evaluation !== null) {
              let modifyEvaluation: ModifyEvaluation = {
                adminName: this.authAdminService.getProfile().name,
                eventName: this.route.snapshot.paramMap.get('eventName'),
                evaluationId: getEvaluation._id,
                eventId: this.route.snapshot.paramMap.get('id'),
                question: evaluation.question,
                answer: evaluation.answer
              }
              this.authAdminService.modifyEvaluation(modifyEvaluation).subscribe(data => {
                if (data.success) {
                  location.reload()
                }
              })
            } else {
              this.validateService.presentToast('Please fill question name and at least two feilds')
            }
          }
        }
      ]
    })
    await alert.present()
  }

}
