import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = Inject(AuthService);
  const router = Inject(Router);
  return auth.isAdmin() ? true : router.createUrlTree(['/login']);

};
