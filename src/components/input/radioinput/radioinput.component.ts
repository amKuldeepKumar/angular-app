import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

interface Item {
  value: string | number;
  label: string;
}
@Component({
  selector: 'app-radioinput',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule , FormsModule],
  templateUrl: './radioinput.component.html',
  styleUrl: './../input.component.scss'
})
export class RadioinputComponent {
  @Input() label: string = '';
  @Input() items: Item[] = []; // Radio button options
  @Input() name: string = '';
  @Input() value: string | number = ''; // To bind with the selected value
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<{ name: string, value: string | number }>();

  handleRadioChange(event: any): void {
    const selectedValue = event.value;
    this.valueChange.emit({ name: this.name, value: selectedValue });
  }
}
