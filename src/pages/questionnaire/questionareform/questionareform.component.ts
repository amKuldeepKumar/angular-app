import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

import { NumberinputComponent } from "../../../components/input/numberinput/numberinput.component";
import { SelectinputComponent } from "../../../components/input/selectinput/selectinput.component";
import { TextinputComponent } from "../../../components/input/textinput/textinput.component";
import { QuestionarcardComponent } from '../questionarcard/questionarcard.component';

import { QuestionnaireStateService } from '../../../service/states/questionnaireStateService';
import { ToasterService } from '../../../service/toaster.service';

import { FormsModule } from '@angular/forms';
import { RadioinputComponent } from "../../../components/input/radioinput/radioinput.component";
import { QUESTIONNAIRE_FORM_TABS, YOUR_DETAILS_QUESTIONS1, YOUR_DETAILS_QUESTIONS2 } from '../../../constants/Constant';

@Component({
  selector: 'app-questionareform',
  standalone: true,
  imports: [
    QuestionarcardComponent,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    TextinputComponent,
    NumberinputComponent,
    SelectinputComponent,
    FormsModule,
    RadioinputComponent
],
  templateUrl: './questionareform.component.html',
  styleUrls: ['./questionareform.component.scss']
})
export class QuestionareformComponent implements OnInit, OnChanges {
  allCards = QUESTIONNAIRE_FORM_TABS;
  questions1 = YOUR_DETAILS_QUESTIONS1;
  questions2 = YOUR_DETAILS_QUESTIONS2;
  cards: any[] = [];

  willInformation: any = {
    personalDetails: {}
  };
  currentCard = '';
  questionareState!: Observable<any>;
  currentTab = 'PERSONALDETAILS';
  nextCard ='CHILDREN'

  constructor(
    private toasterService: ToasterService,
    private questionnaireStateService: QuestionnaireStateService
  ) {}

  ngOnInit(): void {
    this.initializeState();
  }

  handleCardClick(card:any){
    console.log(card);
    
  }

  ngOnChanges(changes: any): void {
    console.log('Changes detected:', changes);
    console.log('Will Information:', this.willInformation);
  }

  initializeState(): void {
    this.questionareState = this.questionnaireStateService.questionnaireState;
    this.questionareState.subscribe((state) => {
      this.willInformation = state.willInformation;
    });
    this.formatCardData();
  }

  formatCardData(): void {
  }

  onInputChange(e: any): void {
    const { name, value } = e.target;
    this.updateWillInformation(name, value);
  }

  handleSelectChange(e: any): void {
    const { name, value } = e.target;
    this.updateWillInformation(name, value);
  }

  handleRadioChange(e:any){
    console.log(e);
    
  }

  updateWillInformation(name: string, value: any): void {
    this.willInformation.personalDetails = {
      ...this.willInformation.personalDetails,
      [name]: value
    };
    console.log( this.willInformation);
  }

  // previousCard(): void {
  //   if (this.currentCard > 1) {
  //     this.currentCard--;
  //   }
  // }

 

  handleContinue(response: any): void {
  }

  handleSkip(response: any): void {
  }

  handleNextClick(): void {
    const {fullName , emailAddress , mobileNo, }=  this.willInformation.personalDetails
    if (this.currentTab === 'PERSONALDETAILS' && fullName && emailAddress && mobileNo ) {
      this.currentTab = 'PERSONALDETAILS2';
    } else if(this.currentTab === 'PERSONALDETAILS2'){
      console.log("i am here");
      
      this.currentTab = 'MENU';
      this.nextCard==='CHILDREN'
      this.currentCard='CHILDREN'
    }else {
      this.currentTab = 'MENU';
    }
  }

  handleBackClick(): void {
    if (this.currentTab === 'PERSONALDETAILS2') {
      this.currentTab = 'PERSONALDETAILS';
    } else {
      this.currentTab = 'MENU';
    }
  }

  private updateCardStatus(cardName: string, status: 'COMPLETED' | 'SKIPPED'): void {
    this.cards.forEach((card) => {
      if (card.name === cardName) {
        card.status = status;
      }
    });
  }
}
