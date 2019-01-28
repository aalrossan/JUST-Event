import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthManagerService } from '../../../services/authManager/auth-manager.service';
import { ValidateService } from '../../../services/validate/validate.service';
import { LoginManager } from 'src/app/models/login/login-manager';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.page.html',
  styleUrls: ['./login-manager.page.scss'],
})
export class LoginManagerPage implements OnInit {
  login: LoginManager = {
    managerId: '',
    password: ''
  }

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private authManagerService: AuthManagerService,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void { }

  // Login manager
  async loginManagerBtn() {
    localStorage.clear()
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    if (this.validateService.validateManager(this.login)) {
      this.authManagerService.LoginManager(this.login).subscribe(data => {
        if (data.success) {
          loading.dismiss()
          localStorage.setItem('user', 'manager')
          this.authManagerService.storeManagerData(data.token, data.manager)
          localStorage.setItem('load', 'load')
          this.router.navigate(['managers', 'manager-home'])
        } else {
          loading.dismiss()
          this.validateService.presentToast('Wrong Manager ID or Password')
        }
      })
    } else {
      loading.dismiss()
      this.validateService.presentToast('Please Fill All Field')
    }
  }

  // Go to student login page
  goToLoginStudent(): void {
    this.router.navigate(['login'])
  }

}
