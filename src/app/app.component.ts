import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ValidateService } from './services/validate/validate.service';
import { AuthAdminService } from './services/authAdmin/auth-admin.service';
import { AuthStudentService } from './services/authStudent/auth-student.service';
import { AuthManagerService } from './services/authManager/auth-manager.service';
import { Router } from '@angular/router';
import { GetNotifications } from './models/students/get-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  name: string = ''
  notificationsNumber: number = 0

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public validateService: ValidateService,
    private authAdminService: AuthAdminService,
    private authStudentService: AuthStudentService,
    private authManagerService: AuthManagerService,
    private router: Router
  ) {
    this.initializeApp();
    if (!this.validateService.loggedIn()) {
      this.router.navigate(['login'])
    }
    if (this.validateService.loggedInUser('student')) {
      this.name = this.authStudentService.getProfile().name
      const notifications: GetNotifications = {
        studentId: this.authStudentService.getProfile().studentId
      }
      this.authStudentService.getNotifications(notifications).subscribe(data => {
        if (data.success) {
          this.notificationsNumber = data.notifications.length
        }
      })
    } else if (this.validateService.loggedInUser('admin')) {
      this.name = this.authAdminService.getProfile().name
    } else if (this.validateService.loggedInUser('manager')) {
      this.name = this.authManagerService.getProfile().name
    }
    this.platform.backButton.subscribe(() => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          // navigator['app'].exitApp();
        } else {
          navigator['app'].exitApp();
        }
      });
    });
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Admin
  // Go to event manager page
  eventManagerBtn(): void {
    this.router.navigate(['admins', 'event-manager'])
  }

  // Go to create event page
  createEventBtn(): void {
    this.router.navigate(['admins', 'create-event'])
  }

  // Go to admin account page
  adminAccountBtn(): void {
    this.router.navigate(['admins', 'admin-account'])
  }

  // Manager
  // Go to manager home page
  managerHome() {
    this.router.navigate(['managers', 'manager-home'])
  }

  // Go to create admin page
  createAdmin(): void {
    this.router.navigate(['managers', 'create-admin'])
  }

  // Go to logfile page
  logfileBtn(): void {
    this.router.navigate(['managers', 'logfile'])
  }

  // Go to manager account page
  managerAccountBtn(): void {
    this.router.navigate(['managers', 'manager-account'])
  }

  //Student
  // Go to view event page
  viewEventBtn(): void {
    this.router.navigate(['students', 'show-event'])
  }

  // Go to student account page
  studentAccountBtn(): void {
    this.router.navigate(['students', 'student-account'])
  }

  // Go to notifications page
  notificationsBtn(): void {
    this.router.navigate(['students', 'notification'])
  }

  // Public
  // Logout user => Go to login page
  logoutBtn(): void {
    this.validateService.logout()
    this.router.navigate(['login'])
  }
}
