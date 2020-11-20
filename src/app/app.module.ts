import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


// Components
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { MainTabComponent } from './components/main-tab/main-tab.component';

// Directives
import { StopPropDirective } from './directives/stop-prop.directive';
import { StopClickDirective } from './directives/stop-click.directive';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { SettingsComponent } from './components/settings/settings.component';


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
  },
  {
    path: 'new-user',
    component: NewAccountComponent,
  }
];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StopPropDirective,
    StopClickDirective,
    NavBarComponent,
    HomeComponent,
    MainTabComponent,
    NewAccountComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
