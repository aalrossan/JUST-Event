import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { GetRegisteredEvent } from 'src/app/models/admins/get-registered-event';
import * as jsPDF from 'jspdf';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  loadRegisteredEvent: boolean = false
  loadEvaluatoin: boolean = false
  noOfEventRegister: number
  stdEvaluation

  constructor(
    private authAdminService: AuthAdminService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private file: File,
    private platform: Platform
  ) { }

  // Get number of student registered event and get all student evaluations event
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const eventId: GetRegisteredEvent = {
      eventId: this.route.snapshot.paramMap.get('id')
    }

    this.authAdminService.getRegisteredEvent(eventId).subscribe(data => {
      if (data.success) {
        if (this.noOfEventRegister != 0) {
          loading.dismiss()
        }
        this.loadRegisteredEvent = data.registered
      }
    })

    this.authAdminService.getNoStdOfRegEvent(eventId).subscribe(data => {
      if (data.success) {
        this.noOfEventRegister = data.eventRegistered
      }
    })
  }

  async downloadStudentEvaluation() {
    const eventId = {
      eventId: this.route.snapshot.paramMap.get('id'),

    }
    this.authAdminService.getStudentEvaluation(eventId).subscribe(async data => {
      if (data.success) {
        let doc = new jsPDF()
        doc.fromHTML(data.evaluations, 10, 10)

        if (this.platform.is('cordova') || this.platform.is('android')) {
          let blob = doc.output('blob', { type: 'application/pdf' })
          let path = this.file.externalRootDirectory + '/Download/';
          let filename = 'StudentEvaluations.pdf';
          this.file.writeFile(path, filename, blob, { replace: true })
        } else {
          doc.save('StudentEvaluations.pdf')
        }

      }
    })
  }

  doRefresh() {
    location.reload()
  }

}
