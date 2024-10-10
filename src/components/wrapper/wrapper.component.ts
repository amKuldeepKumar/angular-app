import { Component } from '@angular/core';
import { StorageService } from '../../service/storageService';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent , CommonModule],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {

  storageService = new StorageService();

  isLoggedIn() {
    return this.storageService.getUser()
  }

}
