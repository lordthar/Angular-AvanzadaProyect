import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from
  '@angular/router';
import { TokenService } from '../servicios/token.service';
@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()) {
      this.router.navigate(['/inicio-cliente']);
      return false;
    }
    return true;
  }

  canActivateModerador(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()) {
      this.router.navigate(['/moderador']);
      return false;
    }
    return true;
  }
}
export const LoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot): boolean => {
  return inject(PermisoService).canActivate(next, state);
}


export const LoginGuardModerador: CanActivateFn = (next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot): boolean => {
  return inject(PermisoService).canActivateModerador(next, state);
}