import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { StorageService } from '../../service/storageService';
import { Observable } from 'rxjs';
import { AuthStateService } from '../../service/states/AuthStateService';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatToolbarModule, MatMenu, MatMenuTrigger, MatIconModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  storageService = new StorageService()
  authState$!: Observable<any>;
  router = inject(Router);

  userDetails: User = new User();


  constructor(private authStateService: AuthStateService) {

  }


  ngOnInit(): void {
    this.authState$ = this.authStateService.state$;
    this.authStateService.state$.subscribe((authState) => {
      this.userDetails=authState.userDetails;
    })
  }

  isLoggedIn() {
    return this.storageService.getUser()
  }

  doLogout() {
    this.router.navigate(['/authentication'])
    this.storageService.removeUser()
  }


  yourSecondAction() {

  }
  yourThirdAction() {

  }

}
