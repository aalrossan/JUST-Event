import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GetServices } from 'src/app/models/servicesAllocation/get-services';
import { GetServicesAllocation } from 'src/app/models/admins/get-services-allocation';
import { AuthAdminService } from 'src/app/services/authAdmin/auth-admin.service';
import { CreateServicesAllocation } from 'src/app/models/admins/create-services-allocation';
import { ModifyServicesAllocation } from 'src/app/models/admins/modify-services-allocation';
import { RemoveServicesAllocation } from 'src/app/models/admins/remove-services-allocation';
import { AlertInput } from '@ionic/core';
import { GetHalls } from 'src/app/models/admins/get-halls';
import { Event } from 'src/app/models/events/event';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-services-allocation',
  templateUrl: './services-allocation.page.html',
  styleUrls: ['./services-allocation.page.scss'],
})
export class ServicesAllocationPage implements OnInit {
  services: Array<GetServices> = new Array<GetServices>()
  event: Event = null;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authAdminService: AuthAdminService,
    private validateService: ValidateService,
    private route: ActivatedRoute
  ) { }

  // Get services allocation
  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const eventId: GetServicesAllocation = {
      eventId: this.route.snapshot.paramMap.get('id')
    }

    this.authAdminService.getEvent(eventId).subscribe(data => {
      if (data.success) {
        this.event = data.event
        this.authAdminService.getServicesAllocation(eventId).subscribe(data => {
          loading.dismiss()
          this.services = data.serviceAllocations
        })
      }
    })
  }

  // Create services allocation
  async selectServicesAllocation() {
    const alert = await this.alertController.create({
      header: 'Select Services Allocation',
      inputs: [
        {
          name: 'Accommodation',
          type: 'radio',
          label: 'Accommodation',
          value: 'Accommodation'
        },
        {
          name: 'Transporters',
          type: 'radio',
          label: 'Transporters',
          value: 'Transporters'
        },
        {
          name: 'Equipment',
          type: 'radio',
          label: 'Equipment',
          value: 'Equipment'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value: string) => {
            if (value === 'Accommodation') {
              this.createAccomodations()
            } else if (value === 'Transporters') {
              this.createTransporters()
            } else if (value === 'Equipment') {
              this.createEquipments()
            }
          }
        }
      ]
    })
    await alert.present()
  }

  // Create Accomodation
  async createAccomodations() {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const halls: GetHalls = {
      time: this.event.startTime,
      days: this.validateService.getArrayDays(this.event.startDate),
      collage: this.authAdminService.getProfile().collage,
      department: this.authAdminService.getProfile().department
    }
    this.authAdminService.getHalls(halls).subscribe(async data => {
      if (data.success) {
        loading.dismiss()
        let resHalls = this.validateService.getHalls(data.halls)
        const alert = await this.alertController.create({
          header: 'Create Accomodation',
          inputs: resHalls,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'OK',
              handler: (value) => {
                const createServicesAllocation: CreateServicesAllocation = {
                  adminName: this.authAdminService.getProfile().name,
                  eventName: this.route.snapshot.paramMap.get('eventName'),
                  eventId: this.route.snapshot.paramMap.get('id'),
                  servicesType: 'Accommodation',
                  servicesValue: value
                }
                this.authAdminService.createServicesAllocation(createServicesAllocation).subscribe(data => {
                  if (data.success) {
                    location.reload()
                  }
                })
              }
            }
          ]
        })
        await alert.present()
      }
    })
  }

  // Create Transporters
  async createTransporters() {
    const alert = await this.alertController.create({
      header: 'Create Transporters',
      inputs: [
        {
          name: 'Transporters',
          type: 'text',
          placeholder: 'Transporters ...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value) => {
            const createServicesAllocation: CreateServicesAllocation = {
              adminName: this.authAdminService.getProfile().name,
              eventName: this.route.snapshot.paramMap.get('eventName'),
              eventId: this.route.snapshot.paramMap.get('id'),
              servicesType: 'Transporters',
              servicesValue: value
            }
            this.authAdminService.createServicesAllocation(createServicesAllocation).subscribe(data => {
              if (data.success) {
                location.reload()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Create Equipments
  async createEquipments() {
    const alert = await this.alertController.create({
      header: 'Create Equipments',
      inputs: [
        {
          name: 'Equipments',
          type: 'text',
          placeholder: 'Equipments ...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value) => {
            const createServicesAllocation: CreateServicesAllocation = {
              adminName: this.authAdminService.getProfile().name,
              eventName: this.route.snapshot.paramMap.get('eventName'),
              eventId: this.route.snapshot.paramMap.get('id'),
              servicesType: 'Equipments',
              servicesValue: value
            }
            this.authAdminService.createServicesAllocation(createServicesAllocation).subscribe(data => {
              if (data.success) {
                location.reload()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  modifyService(services: GetServices) {
    if (services.servicesType === 'Accommodation') {
      this.modifyServiceAccommodation(services)
    } else if (services.servicesType === 'Transporters') {
      this.modifyServiceTransporters(services)
    } else if (services.servicesType === 'Equipment') {
      this.modifyServiceEquipment(services)
    }
  }

  // Modify Accommodation
  async modifyServiceAccommodation(services: GetServices) {
    const loading = await this.loadingController.create({ message: 'Please wait...' })
    await loading.present()

    const halls: GetHalls = {
      time: this.event.startTime,
      days: this.validateService.getArrayDays(this.event.startDate),
      collage: this.authAdminService.getProfile().collage,
      department: this.authAdminService.getProfile().department
    }
    this.authAdminService.getHalls(halls).subscribe(async data => {
      if (data.success) {
        loading.dismiss()
        let resHalls = this.validateService.getModifyHalls(data.halls, services.servicesValue)
        const alert = await this.alertController.create({
          header: 'Create Accomodation',
          inputs: resHalls,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'OK',
              handler: (value) => {
                const createServicesAllocation: CreateServicesAllocation = {
                  adminName: this.authAdminService.getProfile().name,
                  eventName: this.route.snapshot.paramMap.get('eventName'),
                  eventId: this.route.snapshot.paramMap.get('id'),
                  servicesType: 'Accommodation',
                  servicesValue: value
                }
                this.authAdminService.createServicesAllocation(createServicesAllocation).subscribe(data => {
                  if (data.success) {
                    location.reload()
                  }
                })
              }
            }
          ]
        })
        await alert.present()
      }
    })
  }

  // Modify Transporters
  async modifyServiceTransporters(services: GetServices) {
    const alert = await this.alertController.create({
      header: 'Modify Transporters',
      inputs: [
        {
          name: 'Transporters',
          type: 'text',
          value: services.servicesValue,
          placeholder: 'Transporters ...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value) => {
            const modifyServicesAllocation: ModifyServicesAllocation = {
              adminName: this.authAdminService.getProfile().name,
              eventName: this.route.snapshot.paramMap.get('eventName'),
              servicesId: services._id,
              eventId: this.route.snapshot.paramMap.get('id'),
              servicesType: 'Transporters',
              servicesValue: value
            }
            this.authAdminService.modifyServicesAllocation(modifyServicesAllocation).subscribe(data => {
              if (data.success) {
                location.reload()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Modify Equipments
  async modifyServiceEquipment(services: GetServices) {
    const alert = await this.alertController.create({
      header: 'Modify Equipments',
      inputs: [
        {
          name: 'Equipments',
          type: 'text',
          value: services.servicesValue,
          placeholder: 'Equipments ...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (value) => {
            const modifyServicesAllocation: ModifyServicesAllocation = {
              adminName: this.authAdminService.getProfile().name,
              eventName: this.route.snapshot.paramMap.get('eventName'),
              servicesId: services._id,
              eventId: this.route.snapshot.paramMap.get('id'),
              servicesType: 'Equipments',
              servicesValue: value
            }
            this.authAdminService.modifyServicesAllocation(modifyServicesAllocation).subscribe(data => {
              if (data.success) {
                location.reload()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

  // Remove services
  async deleteService(s_id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Services',
      message: 'Do you want to delete the services?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: () => {
            const removeServicesAllocation: RemoveServicesAllocation = {
              servicesId: s_id
            }
            this.authAdminService.removeServicesAllocation(removeServicesAllocation).subscribe(data => {
              if (data.success) {
                location.reload()
              }
            })
          }
        }
      ]
    })
    await alert.present()
  }

}
