import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


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
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';


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
    canActivate: [AuthGuard]
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
    RandomPasswordSettingComponent,
    CopyClipboardDirective
  ],
  imports: [
    BrowserModule,
    NgxBootstrapSliderModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
