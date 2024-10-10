import { Component, inject, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { ProgressbarComponent } from '../components/progressbar/progressbar.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { WrapperComponent } from "../components/wrapper/wrapper.component";
import { AuthenticationComponent } from "../pages/authentication/authentication.component";
import { StorageService } from '../service/storageService';
import { ToasterService } from '../service/toaster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthenticationComponent, WrapperComponent, ToasterComponent , ProgressbarComponent],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild(ToasterComponent) toasterComponent!: ToasterComponent;
  router = inject(Router)

  constructor(private toasterService: ToasterService, private meta: Meta , private storageService :StorageService) { }
  
  
  ngAfterViewInit() {
    this.toasterService.register(this.toasterComponent);
  }

}
