import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressbarService } from '../../service/ProgressbarService';
@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.scss'
})
export class ProgressbarComponent {

  isVisible: boolean = false;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';
  value: number = 0;
  color: string = 'primary';

  constructor(private progressService: ProgressbarService) {}

  ngOnInit() {
    this.progressService.progressBarState$.subscribe(state => {
      this.isVisible = state.isVisible;
      this.mode = state.mode;
      this.value = state.value;
      this.color = state.color;
    });
  }
}
