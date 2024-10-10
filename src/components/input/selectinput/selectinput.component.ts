import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
interface Item {
  value: string;
  label: string;
}

@Component({
  selector: 'app-selectinput',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './selectinput.component.html',
  styleUrl: './../input.component.scss'
})
export class SelectinputComponent {
  @Input() label: string = '';
  @Input() items: Item[] = []; // Typed for safety
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string | number = ''; // Initial value for binding
  
  @Output() valueChange = new EventEmitter<{name: string, value: string | number}>();

  selectedValue: string | number = '';

  handleSelectChange(event: any, name: string): void {
    const selectedValue = event.value;
    this.value = selectedValue;
    this.valueChange.emit({ name, value: selectedValue });
  }
}
