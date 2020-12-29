import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MainTabComponent } from './components/main-tab/main-tab.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { RandomPasswordSettingComponent } from './components/settings/random-password-setting/random-password-setting.component';

import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
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
    imports: [RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } )],
    exports: [RouterModule]
})
export class AppRoutingModule { }