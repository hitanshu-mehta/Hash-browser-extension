import { VaultModule } from './../vault/vault.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RandomPasswordSettingComponent } from './components/settings/random-password-setting/random-password-setting.component';
import { MaterialModule } from './../material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './components/settings/settings.component';
import { MainTabComponent } from './components/main-tab/main-tab.component';
import { AppComponent } from './containers/app/app.component';
import { HomeComponent } from './components/home/home.component';

export const COMPONENTS = [
    AppComponent,
    HomeComponent,
    MainTabComponent,
    SettingsComponent,
    RandomPasswordSettingComponent,
    LoadingSpinnerComponent,
];

@NgModule({
    imports:[
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        VaultModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CoreModule {}
