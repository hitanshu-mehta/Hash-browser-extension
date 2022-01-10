import { AuthRoutingModule } from './auth-routing.module';
import { StrongPasswordModule } from './../strong-password/strong-password.module';
import { AuthEffects } from './effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog.component';
import { MaterialModule } from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';

const COMPONENTS = [LoginComponent, NewAccountComponent, LogoutConfirmationDialogComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StrongPasswordModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {}
