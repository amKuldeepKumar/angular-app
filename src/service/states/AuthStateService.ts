import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../authService';
import { StorageService } from '../storageService';
import { SESSION_KEYS } from '../../constants/Constant';

interface AuthState {
  userDetails: any;
  loading: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {

  storageService: StorageService = new StorageService()

  private initialState: AuthState = {
    userDetails: this.storageService.getUser(),
    loading: false,
    error: null
  };

  private stateSubject = new BehaviorSubject<AuthState>(this.initialState);
  public state$: Observable<AuthState> = this.stateSubject.asObservable();

  constructor(private authService: AuthService) { }

  private updateState(newState: Partial<AuthState>): void {
    const currentState = this.stateSubject.getValue();
    this.stateSubject.next({ ...currentState, ...newState });
  }

  googleLogin(payload: any): void {
    this.updateState({ loading: true });
    this.authService.googleAction(payload).subscribe({
      next: (data) => {
        if (data?.user && data?.user?.accessToken) {
          this.storageService.setUser(data.user)
          this.updateState({ userDetails: data.user, loading: false });
        }
      },
      error: (error) => {
        this.updateState({ error, loading: false });
      }
    });
  }


}
