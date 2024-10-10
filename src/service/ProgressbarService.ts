// progress.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ProgressBarState {
  isVisible: boolean;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number; // Only for 'determinate' mode
  color: string; // Primary, accent, or warn
}

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  private defaultState: ProgressBarState = {
    isVisible: false,
    mode: 'indeterminate',
    value: 0,
    color: 'primary',
  };

  private progressBarState = new BehaviorSubject<ProgressBarState>(this.defaultState);
  progressBarState$ = this.progressBarState.asObservable();

  showProgressBar(mode: 'determinate' | 'indeterminate' | 'buffer' | 'query', value: number = 0, color: string = 'primary') {
    this.progressBarState.next({ isVisible: true, mode, value, color });
  }

  hideProgressBar() {
    setTimeout(()=>{
        this.progressBarState.next({ ...this.defaultState });
    },100);
  }
}
