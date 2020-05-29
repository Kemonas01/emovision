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

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'emotion', component: EmotionComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component:  LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register', component:  RegisterComponent },
  { path: 'forgot-password', component:  ForgotPasswordComponent },
  { path: 'verify-email', component:  VerifyEmailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
