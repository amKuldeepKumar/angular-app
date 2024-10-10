import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-questionarcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionarcard.component.html',
  styleUrl: './questionarcard.component.scss'
})
export class QuestionarcardComponent {
  @Input() title: string = '';
  @Input() name: string = '';

  @Input() step: string = '0';
  @Input() status: string = '';
  @Input() currentCard:boolean = false

  @Input() index: string = '0';
  @Input() isCompleted: boolean = false;
  @Input() buttonLabel: string = 'Continue';
  @Input() infoText: string = '';
  @Input() skipLabel: string = 'Skip';

  @Output() buttonClick = new EventEmitter<void>();
  @Output() skipClick = new EventEmitter<void>();
  @Output() cardClick = new EventEmitter<any>();


  onButtonClick() {
    this.buttonClick.emit();

  }
  

  onSkipClick() {
    this.skipClick.emit();
  }

  handleCardClick(card: any) {
    console.log(card);
    
    this.cardClick.emit(card)
  }
}
