import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { EmotionComponent } from './emotion/emotion.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PerceptionsComponent } from './perceptions/perceptions.component';
import { TellComponent } from './tell/tell.component';
import { AudioComponent } from './audio/audio.component';
import { BodyComponent } from './body/body.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FamillesComponent } from './familles/familles.component';
import { EmotionsSelectedComponent } from './emotion/emotions-selected/emotions-selected.component';
import { EmotionEchelleComponent } from './emotion/emotion-echelle/emotion-echelle.component';
import { RessentirComponent } from './ressentir/ressentir.component';
import { MeditationComponent } from './meditation/meditation.component';
import { RessentirAvantComponent } from './ressentir/ressentir-avant/ressentir-avant.component';
import { AvantMaintenantComponent } from './avant-maintenant/avant-maintenant.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModifyEmailComponent } from './admin/dashboard/modify-email/modify-email.component';
import { ModifyPasswordComponent } from './admin/dashboard/modify-password/modify-password.component';
import { ModifyProfileComponent } from './admin/dashboard/modify-profile/modify-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';





const firebaseConfig = {
  apiKey: 'AIzaSyCIcI535870dRbWe7G_NN9vAxamuY9Wals',
  authDomain: 'emovision-49b33.firebaseapp.com',
  databaseURL: 'https://emovision-49b33.firebaseio.com',
  projectId: 'emovision-49b33',
  storageBucket: 'emovision-49b33.appspot.com',
  messagingSenderId: '922397930915',
  appId: '1:922397930915:web:84c4a977a2c969e3621616',
  measurementId: 'G-X59WSCJ3N7'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    EmotionComponent,
    DashboardComponent,
    PerceptionsComponent,
    TellComponent,
    AudioComponent,
    BodyComponent,
    FamillesComponent,
    EmotionsSelectedComponent,
    EmotionEchelleComponent,
    RessentirComponent,
    MeditationComponent,
    RessentirAvantComponent,
    AvantMaintenantComponent,
    NavbarComponent,
    ModifyEmailComponent,
    ModifyPasswordComponent,
    ModifyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TooltipModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthService,
              { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
