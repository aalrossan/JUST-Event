import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { ValidateService } from '../../../services/validate/validate.service';
import { CheckTimeDate } from 'src/app/models/admins/check-time-date';
import { GetEvent } from 'src/app/models/admins/get-event';
import { ModifyEvent } from 'src/app/models/admins/modify-event';
import { AdvertiseEvent } from 'src/app/models/admins/advertise-event';
import { Event } from 'src/app/models/events/event';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.page.html',
  styleUrls: ['./modify-event.page.scss'],
})
export class ModifyEventPage implements OnInit {
  event: Event = null
  showModifyEventBtn: boolean = false
  showStartDate: boolean = false
  showStartTime: boolean = false
  loadEvent: boolean = false
  checkedItem: boolean = false

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
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  // Get event information
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const eventId: GetEvent = {
      eventId: this.route.snapshot.paramMap.get('id')
    }
    this.authAdminService.getEvent(eventId).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.dates = this.validateService.getDateArray()
        this.event = data.event
        this.showStartDate = true
        this.showStartTime = true
        this.loadEvent = true
        this.showModifyEventBtn = true
        this.checkedItem = this.event.eventRegistered
        const checkTimeDate: CheckTimeDate = {
          minNoStd: this.event.minNoStd,
          collage: this.authAdminService.getProfile().collage,
          department: this.authAdminService.getProfile().department,
          days: this.validateService.getDays(this.event.startDate)
        }
        this.authAdminService.checkTimeDate(checkTimeDate).subscribe(data => {
          if (data.success) {
            this.times = this.validateService.getTime(data.time, data.data)
          }
        })
        this.times = this.times
      }
    })
  }

  // check event feild => eventName, eventType, minNoStd, startDate, startTime
  modifyEvent(ev: any): void {
    if (this.validateService.validateEvent(this.event)) {
      this.showModifyEventBtn = true
    } else {
      this.showModifyEventBtn = false
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

  // Modify event
  async modifyEventBtn() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()
    const modifyEvent: ModifyEvent = {
      eventId: this.event._id,
      eventName: this.event.eventName,
      eventType: this.event.eventType,
      minNoStd: this.event.minNoStd,
      startDate: this.event.startDate,
      startTime: this.event.startTime,
      eventDescription: this.event.eventDescription,
      eventRegistered: this.event.eventRegistered,
      collage: this.event.collage,
      department: this.event.department,
      createFrom: this.event.createFrom
    }
    this.authAdminService.modifyEvent(modifyEvent).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.sendNotification()
      }
    })
  }

  // Send notification
  async sendNotification(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Send Notification',
      message: 'Do you want to send notifications to students in the event?',
      inputs: [
        {
          type: 'text',
          placeholder: 'description',
          name: 'description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['admins', 'event-manager'])
          }
        },
        {
          text: 'Send',
          handler: async (value) => {
            const loading = await this.loadingController.create({ message: 'Please wait...' })
            await loading.present()

            const advertiseEvent: AdvertiseEvent = {
              eventId: this.event._id,
              description: value.description,
              department: this.event.department
            }
            this.authAdminService.advertiseEvent(advertiseEvent).subscribe(data => {
              loading.dismiss()
              this.router.navigate(['admins', 'event-manager'])
            })
          }
        }
      ]
    })
    await alert.present()
  }

}
