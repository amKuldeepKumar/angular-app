import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textinput',
  standalone: true,
  imports: [MatInputModule, CommonModule , FormsModule],
  templateUrl: './textinput.component.html',
  styleUrls: ['./../input.component.scss']
})
export class TextinputComponent {

  @Input() label: string = '';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() type: 'text' | 'password' | 'email' | 'date' = 'text'; 
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string | number = ''; // Input for ngModel

  @Output() valueChange: EventEmitter<any> = new EventEmitter(); // Emit only the value

  handleInputChange(event: Event): void {
    console.log(event);
    this.valueChange.emit(event); 
  }
}
