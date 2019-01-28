import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthManagerService } from '../../../services/authManager/auth-manager.service';
import { GetLogfiles } from '../../../models/logfiles/get-logfiles';

@Component({
  selector: 'app-logfile',
  templateUrl: './logfile.page.html',
  styleUrls: ['./logfile.page.scss'],
})
export class LogfilePage implements OnInit {
  logfiles: GetLogfiles = null
  showLogfile: boolean = false

  constructor(
    private authManagerService: AuthManagerService,
    private loadingController: LoadingController
  ) { }

  // Get logfiles
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    this.authManagerService.getLogfiles().subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.logfiles = data.logfiles
        this.showLogfile = true
      }
    })
  }

  doRefresh() {
    location.reload()
  }
  
}
