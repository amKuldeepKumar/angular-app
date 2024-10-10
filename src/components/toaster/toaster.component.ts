import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";


interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}


@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  toasts: Toast[] = [];

  // Add a toast
  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    const toast: Toast = { message, type };
    this.toasts.push(toast);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => this.removeToast(toast), 5000);
  }

  // Remove a toast
  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
