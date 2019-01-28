import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.page.html',
  styleUrls: ['./manager-home.page.scss'],
})
export class ManagerHomePage implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('load') == 'load') {
      location.reload()
      localStorage.removeItem('load')
    }
  }

  // Go to create admin page
  goToCreateAdmin(): void {
    this.router.navigate(['managers', 'create-admin'])
  }

  // Go to manager account page
  goToAccount(): void {
    this.router.navigate(['managers', 'manager-account'])
  }

  // Go to logfile page
  goToLogfile(): void {
    this.router.navigate(['managers', 'logfile'])
  }
  
}
