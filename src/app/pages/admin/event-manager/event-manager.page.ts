import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';
import { Event } from 'src/app/models/events/event';
import { GetEventByCreateFrom } from 'src/app/models/admins/get-event-by-create-from';
import { AdvertiseEvent } from 'src/app/models/admins/advertise-event';
import { NotifyRegisteredEvent } from 'src/app/models/admins/notify-registered-event';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.page.html',
  styleUrls: ['./event-manager.page.scss'],
})
export class EventManagerPage implements OnInit {
  isSearchbarOpend: boolean = false
  emptyEvents: boolean = false
  events: Array<Event> = new Array<Event>()
  viewEvents: Array<Event> = new Array<Event>()

  constructor(
    private authAdminService: AuthAdminService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  // Get all events
  async ngOnInit() {
    if (localStorage.getItem('load') == 'load') {
      location.reload()
      localStorage.removeItem('load')
    }

    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const createFrom: GetEventByCreateFrom = {
      createFrom: this.authAdminService.getProfile().name
    }

    this.authAdminService.getEventByCreateFrom(createFrom).subscribe(data => {
      if (data.success) {
        loading.dismiss()
        this.viewEvents = data.events
        if (this.viewEvents !== [] && this.viewEvents !== null && this.viewEvents !== undefined && this.viewEvents.length !== 0) {
          this.emptyEvents = false
        } else {
          this.emptyEvents = true
        }
        this.initializeItems()
      }
    })
  }

  initializeItems(): void {
    this.events = this.viewEvents
    Array.prototype.sort.call(this.events, (a, b) => {
      if (a.startDate > b.startDate) {
        return 1
      }
      if (a.startDate < b.startDate) {
        return -1;
      }
      return 0;
    })
  }

  // Search event Name
  getItems(ev: any): void {
    this.initializeItems()
    let val: string = ev.target.value
    if (val && val.trim() != '') {
      this.events = this.events.filter((item) => {
        return (item.eventName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // Go to create event page
  createEventBtn(): void {
    this.router.navigate(['admins', 'create-event'])
  }

  // Go to analysis page
  analysisBtn(eventId: string): void {
    this.router.navigate([`admins/analysis/${eventId}`])
  }

  // Go to modify event page
  editEventBtn(eventId: string): void {
    this.router.navigate([`admins/modify-event/${eventId}`])
  }

  // Go to create evaluation page
  createEvaluationBtn(event: Event): void {
    this.router.navigate([`admins/create-evaluation/${event.eventName}/${event._id}`])
  }

  // show alert => notification, delete event, or services allocation
  async moreBtn(event: Event): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Select One',
      inputs: [
        {
          name: 'Notification',
          type: 'radio',
          label: 'Notification',
          value: 'Notification'
        },
        {
          name: 'Services Allocation',
          type: 'radio',
          label: 'Services Allocation',
          value: 'Services Allocation'
        },
        {
          name: 'Delete Event',
          type: 'radio',
          label: 'Delete Event',
          value: 'Delete Event'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value: string) => {
            if (value === 'Notification') {
              if (event.eventRegistered) {
                this.notificationRegisteredAlert(event._id)
              } else {
                this.notificationNotRegisteredAlert(event._id)
              }
            } else if (value === 'Delete Event') {
              this.deleteEvent(event._id)
            } else if (value === 'Services Allocation') {
              this.servivesAllocationPage(event._id)
            }
          }
        }
      ]
    })
    await alert.present()
  }

  // Select advertise event and notify about registered event
  async notificationRegisteredAlert(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Select Notification',
      inputs: [
        {
          name: 'Advertise Event',
          type: 'radio',
          label: 'Advertise Event',
          value: 'Advertise Event',
        },
        {
          name: 'Notify About Registered Event',
          type: 'radio',
          label: 'Notify About Registered Event',
          value: 'Notify About Registered Event'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (value: string) => {
            if (value === 'Advertise Event') {
              this.advertiseEvent(eventId)
            } else if (value === 'Notify About Registered Event') {
              this.notifyAboutRegisteredEventAlert(eventId)
            }
          }
        }
      ]
    })
    await alert.present()
  }

  // Select advertise event
  async notificationNotRegisteredAlert(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Select Notfication',
      inputs: [
        {
          name: 'Advertise Event',
          type: 'radio',
          label: 'Advertise Event',
          value: 'Advertise Event'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.advertiseEvent(eventId)
          }
        }
      ]
    })
    await alert.present()
  }

  // Advertise event
  async advertiseEvent(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Advertise Event',
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
          role: 'cancel'
        },
        {
          text: 'Send',
          handler: async (value) => {
            const loading = await this.loadingController.create({ message: 'Please wait...' })
            await loading.present()

            const advertiseEvent: AdvertiseEvent = {
              eventId: eventId,
              description: value.description,
              department: this.authAdminService.getProfile().department
            }
            this.authAdminService.advertiseEvent(advertiseEvent).subscribe(data => {
              if (data.success) {
                loading.dismiss()
              } else {
                loading.dismiss()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Notify about registered event
  async notifyAboutRegisteredEventAlert(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Notify about Registered Event',
      message: 'Do you want to send notifications to registered students in the event?',
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
          role: 'cancel'
        },
        {
          text: 'Send',
          handler: async (value) => {
            const loading = await this.loadingController.create({ message: 'Please wait...' })
            await loading.present()

            const notifyRegisteredEvent: NotifyRegisteredEvent = {
              eventId: eventId,
              description: value.description,
            }
            this.authAdminService.notifyRegisteredEvent(notifyRegisteredEvent).subscribe(data => {
              if (data.success) {
                loading.dismiss()
              } else {
                loading.dismiss()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Delete event
  async deleteEvent(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Event',
      message: 'Do you want to delete the event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingController.create({ message: 'Please wait...' })
            await loading.present()

            const id = {
              eventId: eventId
            }

            this.authAdminService.removeEvent(id).subscribe(data => {
              if (data.success) {
                loading.dismiss()
                this.sendNotification(eventId)
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Send notification
  async sendNotification(eventId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Send Notification',
      message: 'Do you want to send notifications to students in the event?',
      inputs: [
        {
          name: 'description',
          type: 'text',
          placeholder: 'description...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            location.reload()
          }
        },
        {
          text: 'Send',
          handler: async (value) => {
            const loading = await this.loadingController.create({ message: 'Please wait...' })
            await loading.present()
            const advertiseEvent: AdvertiseEvent = {
              eventId: eventId,
              description: value.description,
              department: this.authAdminService.getProfile().department
            }
            this.authAdminService.advertiseEvent(advertiseEvent).subscribe(data => {
              loading.dismiss()
              location.reload()
            })
          }
        }
      ]
    })
    await alert.present()
  }

  servivesAllocationPage(eventId: string): void {
    this.router.navigate([`admins/services-allocation/${eventId}`])
  }

  doRefresh() {
    location.reload()
  }

}
