import { Injectable } from '@angular/core';
import { ToasterComponent } from '../components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toasterComponent!: ToasterComponent;

  // Register the toaster component
  register(toasterComponent: ToasterComponent) {
    this.toasterComponent = toasterComponent;
  }

  // Show a toast
  show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toasterComponent.showToast(message, type);
  }
}
