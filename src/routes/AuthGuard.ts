import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storageService';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const router = inject(Router); 
 const user = storageService.getUser();

  if (user) {
    return true;
  } else {
    router.navigate(['/authentication']);
    return false; 
  }
};
