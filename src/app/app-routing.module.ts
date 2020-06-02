import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { EmotionComponent } from './emotion/emotion.component';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SecureInnerPagesGuard } from './services/secure-inner-pages.guard';
import { HomeComponent } from './home/home.component';
import { PerceptionsComponent } from './perceptions/perceptions.component';
import { TellComponent } from './tell/tell.component';
import { AudioComponent } from './audio/audio.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'emotion', component: EmotionComponent, canActivate: [AuthGuard]},
  { path: 'perceptions', component: PerceptionsComponent, canActivate: [AuthGuard]},
  { path: 'tell', component: TellComponent, canActivate: [AuthGuard]},
  { path: 'audio', component: AudioComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component:  LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register', component:  RegisterComponent },
  { path: 'forgot-password', component:  ForgotPasswordComponent },
  { path: 'home', component: HomeComponent},
  { path: 'verify-email', component:  VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
