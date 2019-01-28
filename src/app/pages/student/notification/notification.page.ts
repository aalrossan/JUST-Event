import { Component, OnInit } from '@angular/core';
import { AuthStudentService } from 'src/app/services/authStudent/auth-student.service';
import { LoadingController } from '@ionic/angular';
import { GetNotifications } from 'src/app/models/students/get-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications = null
  loadNotification: boolean = false

  constructor(
    private authStudentService: AuthStudentService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('load') == 'load') {
      location.reload()
      localStorage.removeItem('load')
    }
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const notification: GetNotifications = {
      studentId: this.authStudentService.getProfile().studentId
    }
    this.authStudentService.getNotifications(notification).subscribe(data => {
      if (data.success) {
        if (data.notifications.length <= 0) {
          this.loadNotification = true
        }
        this.notifications = data.notifications
        loading.dismiss()
      }
    })
  }

  goToNotification(id: string): void {
    this.router.navigate(['students', 'show-notification', id])
  }

  doRefresh() {
    location.reload()
  }
}
