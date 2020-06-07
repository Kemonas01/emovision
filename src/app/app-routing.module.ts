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
import { BodyComponent } from './body/body.component';
import { FamillesComponent } from './familles/familles.component';
import { EmotionsSelectedComponent } from './emotion/emotions-selected/emotions-selected.component';
import { EmotionEchelleComponent } from './emotion/emotion-echelle/emotion-echelle.component';
import { RessentirComponent } from './ressentir/ressentir.component';
import { MeditationComponent } from './meditation/meditation.component';
import { RessentirAvantComponent } from './ressentir/ressentir-avant/ressentir-avant.component';
import { AvantMaintenantComponent } from './avant-maintenant/avant-maintenant.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'perceptions', component: PerceptionsComponent, canActivate: [AuthGuard]},
  { path: 'tell', component: TellComponent, canActivate: [AuthGuard]},
  { path: 'audio', component: AudioComponent, canActivate: [AuthGuard]},
  { path: 'body', component: BodyComponent, canActivate: [AuthGuard]},
  { path: 'emotions/:i', component: EmotionComponent, canActivate: [AuthGuard]},
  { path: 'familles', component: FamillesComponent, canActivate: [AuthGuard]},
  { path: 'emotions-selected', component: EmotionsSelectedComponent, canActivate: [AuthGuard]},
  { path: 'emotions-echelle', component: EmotionEchelleComponent, canActivate: [AuthGuard]},
  { path: 'ressentir', component: RessentirComponent, canActivate: [AuthGuard]},
  { path: 'ressentir-avant', component: RessentirAvantComponent, canActivate: [AuthGuard]},
  { path: 'meditation', component: MeditationComponent, canActivate: [AuthGuard]},
  { path: 'avant-maintenant', component: AvantMaintenantComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component:  LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register', component:  RegisterComponent },
  { path: 'forgot-password', component:  ForgotPasswordComponent },
  { path: 'home/:state', component: HomeComponent},
  { path: 'verify-email', component:  VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
