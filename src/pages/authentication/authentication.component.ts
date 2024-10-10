import { CommonModule } from '@angular/common';
import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../../models/Login';
import { Signup } from '../../models/SignUp';
import { AuthService } from '../../service/authService';
import { ProgressbarService } from '../../service/ProgressbarService';
import { AuthStateService } from '../../service/states/AuthStateService';
import { ToasterService } from '../../service/toaster.service';
import { UtilityService } from '../../service/utilityService';
import { TextinputComponent } from "../../components/input/textinput/textinput.component";
const loginAction = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook'
};

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatDividerModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatIconModule, TextinputComponent],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  utilityService: UtilityService = new UtilityService();
  loginForm: FormGroup;
  signupForm: FormGroup;
  router = inject(Router);
  authState$!: Observable<any>;

  popupWidth = 500;
  popupHeight = 600;
  activeForm: 'login' | 'signup' = 'login';

  constructor( private fb: FormBuilder, private authStateService: AuthStateService, private authService: AuthService, private toasterService: ToasterService, private progressService: ProgressbarService,private ngZone: NgZone) {
    this.loginForm = this.createLoginForm();
    this.signupForm = this.createSignupForm();
  }

  ngOnInit(): void {
    this.authState$ = this.authStateService.state$;
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private createSignupForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  changeForm(form: 'signup' | 'login'): void {
    this.activeForm = form;
  }

  getPopupFeatures(): string {
    const left = (window.screen.width - this.popupWidth) / 2;
    const top = (window.screen.height - this.popupHeight) / 2;
    return `width=${this.popupWidth},height=${this.popupHeight},top=${top},left=${left}`;
  }

  onSubmit(): void {
    if (this.activeForm === 'login' && this.loginForm.valid) {
      this.handleLogin();
    } else if (this.activeForm === 'signup' && this.signupForm.valid) {
      this.handleSignup();
    }
  }

  private handleLogin(): void {
    const loginModel: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginModel).subscribe({
      next: (data) => console.log(data),
      error: (error) => this.toasterService.show('Login Failed', 'error')
    });
  }

  private handleSignup(): void {
    const signupModel: Signup = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.mobile,
      password: this.signupForm.value.password,
    };

    this.authService.registerUser(signupModel).subscribe({
      next: (data) => console.log(data),
      error: (error) => this.toasterService.show('Signup Failed', 'error')
    });
  }

  private getUserInfo(accessToken: string, action: string): void {
    const urls = {
      [loginAction.GOOGLE]: 'https://www.googleapis.com/oauth2/v2/userinfo',
      [loginAction.FACEBOOK]: `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`,
    };

    this.progressService.showProgressBar('indeterminate');
    fetch(urls[action], {
      headers: action === loginAction.GOOGLE ? { Authorization: `Bearer ${accessToken}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((userInfo) => this.handleUserInfo(userInfo, action))
      .catch((error) => {
        console.error('Error fetching user info:', error);
        this.toasterService.show('Error fetching user info', 'error');
        this.progressService.hideProgressBar();
      });
  }

  private handleUserInfo(userInfo: any, action: string): void {
    this.ngZone.run(() => {
      this.authStateService.googleLogin({
        name: userInfo.name,
        googleId: userInfo.id,
        email: userInfo.email,
        photoUrl: userInfo.picture
      });

      this.authStateService.state$.subscribe((authState) => {
        if (authState?.userDetails) {
          this.toasterService.show('Login Successful', 'success');
          this.progressService.hideProgressBar();
          this.router.navigate(['/']);
        } else if (authState?.error) {
          console.error('Login Error:', authState.error);
          this.progressService.hideProgressBar();
        }
      });
    });
  }

  private handleAuthPopup(popup: Window | null, action: string): void {
    const pollTimer = window.setInterval(() => {
      try {
        if (popup && popup.closed) {
          window.clearInterval(pollTimer);
        }

        if (popup && popup.location.href.includes(environment.REDIRECT_URL)) {
          const urlParams = new URLSearchParams(popup.location.hash.substring(1));

          const accessToken = urlParams.get('access_token');
          console.log(accessToken);

          if (accessToken) {
            window.clearInterval(pollTimer);
            popup.close();
            this.getUserInfo(accessToken, action);
          }
        }
      } catch (error) {
      }
    }, 1000);
  }

 

  signInWithFacebook(): void {
    const facebookAuthUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${environment.FACEBOOK_APP_ID}&redirect_uri=${environment.REDIRECT_URL}&response_type=token&scope=email,public_profile`;
    const popup = window.open(facebookAuthUrl, '_blank', this.getPopupFeatures());
    this.handleAuthPopup(popup, loginAction.FACEBOOK);
  }

  signInWithGoogle(): void {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.GOOGLE_CLIENT_ID}&redirect_uri=${environment.REDIRECT_URL}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&prompt=select_account`;
    const popup = window.open(googleAuthUrl, '_blank', this.getPopupFeatures());
    this.handleAuthPopup(popup, loginAction.GOOGLE);
  }
}
