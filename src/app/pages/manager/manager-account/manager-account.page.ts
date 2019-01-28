import { Component, OnInit } from '@angular/core';
import { AuthManagerService } from '../../../services/authManager/auth-manager.service';
import { Manager } from '../../../models/account/manager';

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.page.html',
  styleUrls: ['./manager-account.page.scss'],
})
export class ManagerAccountPage implements OnInit {
  manager: Manager = null

  constructor(
    private authManagerService: AuthManagerService
  ) { }

  // Get manager info
  ngOnInit(): void {
    this.manager = this.authManagerService.getProfile()
  }
  
}
