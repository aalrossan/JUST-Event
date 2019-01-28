import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateService } from '../../services/validate/validate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private validateService: ValidateService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.validateService.loggedInUser('student')) {
      this.router.navigate(['students', 'show-event'])
      return true
    } else if (this.validateService.loggedInUser('manager')) {
      this.router.navigate(['managers', 'manager-home'])
      return true
    } else if (this.validateService.loggedInUser('admin')) {
      this.router.navigate(['admins', 'event-manager'])
      return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }
}
