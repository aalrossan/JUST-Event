import { Component, OnInit } from '@angular/core';
import { AuthStudentService } from '../../../services/authStudent/auth-student.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/events/event';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.page.html',
  styleUrls: ['./show-event.page.scss'],
})
export class ShowEventPage implements OnInit {
  isSearchbarOpend: boolean = false
  emptyEvents: boolean = false
  events: Array<Event> = new Array<Event>()
  viewEvents: Array<Event> = new Array<Event>()

  constructor(
    private authStudentService: AuthStudentService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  // Get events
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    if (localStorage.getItem('load') == 'load') {
      location.reload()
      localStorage.removeItem('load')
    }

    this.authStudentService.getEventsByDepartment().subscribe(data => {
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

  initializeItems() {
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
    let val = ev.target.value
    if (val && val.trim() != '') {
      this.events = this.events.filter((item) => {
        return (item.eventName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // Go to show event info page
  goToEvent(event: Event): void {
    this.router.navigate(['students', 'show-event-info', event.eventName, event._id])
  }

  doRefresh() {
    location.reload()
  }

}
