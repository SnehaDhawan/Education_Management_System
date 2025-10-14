import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(ApiService);
  const router = inject(Router);

  // 1. Check if logged in
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Get expected role from route data
  const expectedRole = route.data['role'] as string;

  // 3. Extract role from token or service
  const tokenRole = auth.getRole() || auth.parseJwt(auth.getToken())?.role;

  if (!tokenRole) {
    router.navigate(['/login']);
    return false;
  }

  // 4. Role validation
  if (tokenRole.toUpperCase() !== expectedRole.toUpperCase()) {
    // Redirect to the user’s own dashboard
    const redirect =
      tokenRole.toUpperCase() === 'ADMIN'
        ? '/admin/dashboard'
        : tokenRole.toUpperCase() === 'TRAINER'
        ? '/trainer/dashboard'
        : '/student/dashboard';

    router.navigate([redirect]);
    return false;
  }



  return true;
};
