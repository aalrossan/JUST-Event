import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthStudentService } from '../../../services/authStudent/auth-student.service';
import { Event } from 'src/app/models/events/event';
import { CreateRegisterStudentEvent } from 'src/app/models/students/create-register-student-event';
import { RemoveRegisterStudentEvent } from 'src/app/models/students/remove-register-student-event';
import { GetEvent } from 'src/app/models/students/get-event';
import { GetRegisterEvent } from 'src/app/models/students/get-register-event';
import { GetServices } from 'src/app/models/servicesAllocation/get-services';

@Component({
  selector: 'app-show-event-info',
  templateUrl: './show-event-info.page.html',
  styleUrls: ['./show-event-info.page.scss'],
})
export class ShowEventInfoPage implements OnInit {
  event: Event = null
  services: GetServices = null
  loadEvent: boolean = false
  loadServices: boolean = false
  loadRegisteredEvent: boolean = false
  loadEvaluationEvent: boolean = false

  constructor(
    private authStudentService: AuthStudentService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Get event information and show on page
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const eventId: GetEvent = {
      eventId: this.route.snapshot.paramMap.get('id')
    }
    this.authStudentService.getEvent(eventId).subscribe(data => {
      if (data.success) {
        this.event = data.event
        this.loadEvent = true
        this.authStudentService.getServicesAllocation(eventId).subscribe(data => {
          if (data.success) {
            if (data.serviceAllocations.length > 0) {
              this.loadServices = true
              this.services = data.serviceAllocations
            }
            const registerEvent: GetRegisterEvent = {
              eventId: this.route.snapshot.paramMap.get('id'),
              studentId: this.authStudentService.getProfile().studentId
            }
            this.authStudentService.getRegisterEvent(registerEvent).subscribe(data => {
              if (data.success) {
                loading.dismiss()
                this.loadRegisteredEvent = data.registerEvent
                if (new Date().toDateString() >= this.event.startDate) {
                  this.authStudentService.checkEvaluationEvent(eventId).subscribe(data => {
                    if (data.success) {
                      if (data.evaluations) {
                        this.loadEvaluationEvent = true
                      } else {
                        this.loadEvaluationEvent = false
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  }

  // Add register event
  async registerEvent() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const registeredEvent: CreateRegisterStudentEvent = {
      eventId: this.event._id,
      studentId: this.authStudentService.getProfile().studentId,
      register: true,
      eventName: this.route.snapshot.paramMap.get('eventName'),
      studentName: this.authStudentService.getProfile().name
    }
    this.authStudentService.createRegisterStudentEvent(registeredEvent).subscribe(data => {
      loading.dismiss()
      if (data.success) {
        this.loadRegisteredEvent = true
      }
    })
  }

  // Remove register event
  async removeRegisterEvent() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const registeredEvent: GetRegisterEvent = {
      eventId: this.event._id,
      studentId: this.authStudentService.getProfile().studentId
    }
    this.authStudentService.getRegisterEvent(registeredEvent).subscribe(data => {
      const registerEvent: RemoveRegisterStudentEvent = {
        registerEventId: data.registerEvent._id,
        eventName: this.route.snapshot.paramMap.get('eventName'),
        studentName: this.authStudentService.getProfile().name,
      }
      this.authStudentService.RemoveRegisterStudentEvent(registerEvent).subscribe(data => {
        loading.dismiss()
        if (data.success) {
          this.loadRegisteredEvent = false
        }
      })
    })
  }

  // Go to show evaluation event page
  evaluationEvent(): void {
    this.router.navigate(['students', 'show-evaluation-event', this.event.eventName, this.route.snapshot.paramMap.get('id')])
  }

}
