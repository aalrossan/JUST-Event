import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { ValidateService } from '../../../services/validate/validate.service';
import { CreateEvent } from 'src/app/models/admins/create-event';
import { CheckTimeDate } from 'src/app/models/admins/check-time-date';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  event: CreateEvent = {
    eventName: '',
    eventType: '',
    minNoStd: undefined,
    startDate: '',
    startTime: '',
    eventDescription: '',
    eventRegistered: false,
    collage: '',
    department: '',
    createFrom: ''
  }
  showCreateEventBtn: boolean = false
  showStartDate: boolean = false
  showStartTime: boolean = false

  eventType = [
    { value: 'Athlete' },
    { value: 'Educational' },
    { value: 'Entertainment' },
    { value: 'Scientific' },
    { value: 'Workshop' }
  ]

  dates: Array<string> = new Array<string>()
  times: Map<string, number> = new Map<string, number>()

  constructor(
    private validateService: ValidateService,
    private authAdminService: AuthAdminService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  // Get event => collage, department, create from
  ngOnInit(): void {
    this.event.collage = this.authAdminService.getProfile().collage
    this.event.department = this.authAdminService.getProfile().department
    this.event.createFrom = this.authAdminService.getProfile().name
  }

  // check event feild => eventName, eventType, minNoStd, startDate, startTime
  createEvent(ev: any): void {
    if (this.validateService.validateEvent(this.event)) {
      this.showCreateEventBtn = true
    } else {
      this.showCreateEventBtn = false
    }
  }

  // Get minimum of number students
  getMinNoStd(): void {
    if (this.event.minNoStd > 0) {
      this.showStartDate = true
      this.dates = this.validateService.getDateArray()
    } else {
      this.showStartDate = false
    }
  }

  // Get event date
  async getEventDate(date: any) {
    let val: string = date.target.value
    if (val != null) {
      const loading = await this.loadingController.create({ message: 'Please wait...' })
      await loading.present()

      this.showStartTime = true
      const checkTimeDate: CheckTimeDate = {
        minNoStd: this.event.minNoStd,
        collage: this.authAdminService.getProfile().collage,
        department: this.authAdminService.getProfile().department,
        days: this.validateService.getDays(this.event.startDate)
      }

      this.authAdminService.checkTimeDate(checkTimeDate).subscribe(data => {
        if (data.success) {
          loading.dismiss()
          this.times = this.validateService.getTime(data.time, data.data)
        }
      })
    } else {
      this.showStartTime = false
    }
  }

  // Create event
  async createEventBtn() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    this.authAdminService.createEvent(this.event).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.router.navigate(['admins', 'event-manager'])
        location.reload()
      }
    })
  }

}
