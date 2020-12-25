import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

// Angular cdk
import { ClipboardModule } from '@angular/cdk/clipboard';

// Components
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { MainTabComponent } from './components/main-tab/main-tab.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RandomPasswordSettingComponent } from './components/settings/random-password-setting/random-password-setting.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

// Directives
import { StopPropDirective } from './directives/stop-prop.directive';
import { StopClickDirective } from './directives/stop-click.directive';
import { BlurClickDirective } from './directives/blur-click.directive';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainTabComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-user',
    component: NewAccountComponent,
  },
  {
    path: 'password-generator-settings',
    component: RandomPasswordSettingComponent,
  }
];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StopPropDirective,
    StopClickDirective,
    BlurClickDirective,
    NavBarComponent,
    HomeComponent,
    MainTabComponent,
    NewAccountComponent,
    SettingsComponent,
    RandomPasswordSettingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxBootstrapSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatChipsModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    ClipboardModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
