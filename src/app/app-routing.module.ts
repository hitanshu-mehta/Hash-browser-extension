import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { MainTabComponent } from './core/components/main-tab/main-tab.component';
import { NewAccountComponent } from './auth/components/new-account/new-account.component';
import { RandomPasswordSettingComponent } from './core/components/settings/random-password-setting/random-password-setting.component';

import { AuthGuard } from './auth/services/auth-guard.service';

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
        { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
