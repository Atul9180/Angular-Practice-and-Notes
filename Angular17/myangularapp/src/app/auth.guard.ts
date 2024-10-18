import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  
  // Checking if the user is logged in
  const isLoggedIn = sessionStorage.getItem('isloggedIn') === 'true';

  if (!isLoggedIn) {
    // Instead of alert, consider a notification service
    // This is a simple alert for demonstration
    alert("Please login first, redirecting to Login Page!!");

    // Store the attempted URL
    const redirectUrl = state.url; 
    _router.navigate(['login'], { queryParams: { returnUrl: redirectUrl } });
    
    return false;
  }
  
  return true;
};

