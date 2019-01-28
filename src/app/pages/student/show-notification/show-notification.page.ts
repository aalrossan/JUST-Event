import { Component, OnInit } from '@angular/core';
import { AuthStudentService } from 'src/app/services/authStudent/auth-student.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { GetEvent } from 'src/app/models/students/get-event';
import { ActivatedRoute, Router } from '@angular/router';
import { GetNotification } from 'src/app/models/students/get-notification';
import { RemoveNotification } from 'src/app/models/students/remove-notification';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.page.html',
  styleUrls: ['./show-notification.page.scss'],
})
export class ShowNotificationPage implements OnInit {
  notification = null
  notificationDescription: string = null
  loadNotification: boolean = false

  constructor(
    private authStudentService: AuthStudentService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const notificationId: GetNotification = {
      notificationId: this.route.snapshot.paramMap.get('id')
    }
    this.authStudentService.getNotification(notificationId).subscribe(data => {
      if (data.success) {
        this.notification = data.notification
        const eventId: GetEvent = {
          eventId: this.notification.eventId
        }
        this.authStudentService.getEvent(eventId).subscribe(data => {
          if (data.success) {
            loading.dismiss()
            this.loadNotification = true
            this.notificationDescription = 'The event ' + data.event.eventName + ' ' + this.notification.description
          }
        })
      }
    })
  }

  async removeNotification() {
    const alert = await this.alertController.create({
      header: 'Remove Notification',
      message: 'Do you want to remove the notification?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: async () => {
            const loading = await this.loadingController.create({ message: 'Please wait...' })
            await loading.present()
            const notificationId: RemoveNotification = {
              notificationId: this.notification._id
            }
            this.authStudentService.removeNotification(notificationId).subscribe(data => {
              if (data.success) {
                loading.dismiss()
                localStorage.setItem('load', 'load')
                this.router.navigate(['students', 'notification'])
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  doRefresh() {
    location.reload()
  }

}
