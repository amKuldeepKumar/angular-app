import { Routes } from '@angular/router';
import { AuthenticationComponent } from '../pages/authentication/authentication.component';
import { QuestionareformComponent } from '../pages/questionnaire/questionareform/questionareform.component';
import { AuthGuard } from './AuthGuard';


export const routes: Routes = [
    { 
      path: '', 
      redirectTo: 'questionnaire', 
      pathMatch: 'full' 
    },
    { 
      path: 'questionnaire', 
      component:QuestionareformComponent , 
      canActivate: [AuthGuard] 
    },
    { 
      path: 'authentication', 
      component: AuthenticationComponent ,
    },
    { 
      path: '**', 
      redirectTo: 'authentication' 
    }
  ];