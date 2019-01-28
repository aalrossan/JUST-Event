import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateService } from '../../services/validate/validate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStudentGuard implements CanActivate {

  constructor(
    private validateService: ValidateService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.validateService.loggedInUser('student')) {
      return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }
}
