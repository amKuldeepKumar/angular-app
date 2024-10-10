import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'] // Corrected to styleUrls
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() variant: 'basic' | 'raised' | 'flat' | 'icon' | 'stroked' | 'fab' | 'mini-fab' = 'flat';
  @Input() color: string = '#005CBB'; // Default to primary color
  @Input() disabled: boolean = false; // Disable button property
  @Input() icon: string = ''; // Optional icon
  @Input() iconPosition: 'start' | 'end' = 'start'; // Position of icon
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type

  // EventEmitter for button click events
  @Input() onClick: () => void = () => {};
}
