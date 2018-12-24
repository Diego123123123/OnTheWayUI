import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestrictRoutesService {

  constructor(public auth: AuthenticationService, public router: Router) {}

  /**
   * Verify if the user can navigate in some pages
   * Return false if the user is not loggin or his role have not permits
   * Return an true otherwise
  */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.expectedRole;
    if ( !this.auth.isLogged()) {
      this.router.navigate(['/login-form']);
      return false;
    }
    if(!role.includes(sessionStorage.getItem("role"))){
      this.router.navigate(['/denied']);
      return false;
    }
    return true;
  }
}
