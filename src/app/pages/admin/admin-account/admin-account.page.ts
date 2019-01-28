import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/account/admin';
import { AuthAdminService } from '../../../services/authAdmin/auth-admin.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.page.html',
  styleUrls: ['./admin-account.page.scss'],
})
export class AdminAccountPage implements OnInit {
  admin: Admin

  constructor(
    private authAdminService: AuthAdminService
  ) { }

  // Get admin information
  ngOnInit(): void {
    this.admin = this.authAdminService.getProfile()
  }

}
