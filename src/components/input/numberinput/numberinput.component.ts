import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-numberinput',
  standalone: true,
  imports: [MatInputModule, CommonModule ,FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberinputComponent),
      multi: true,
    }
  ],
  templateUrl: './numberinput.component.html',
  styleUrl: './../input.component.scss'
})

export class NumberinputComponent {
  @Input() label: string = '';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() type: 'number' = 'number'; 
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() maxLength: string = '';
  @Input() value: string | number = ''; // Input for ngModel
  @Input() disabled: boolean = false;

  @Output() valueChange: EventEmitter<any> = new EventEmitter(); // Emit the entire event


  handleInputChange(event: Event): void {
    this.valueChange.emit(event); 
  }

}
