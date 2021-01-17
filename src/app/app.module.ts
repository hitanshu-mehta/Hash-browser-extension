import { VaultModule } from './vault/vault.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './core/containers/app/app.component';

// Angular cdk
import { ClipboardModule } from '@angular/cdk/clipboard';
import { OverlayModule } from '@angular/cdk/overlay';

// Modules
import { StrongPasswordModule } from './strong-password/strong-password.module';


// Directives
import { StopPropDirective } from './directives/stop-prop.directive';
import { StopClickDirective } from './directives/stop-click.directive';
import { BlurClickDirective } from './directives/blur-click.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [
    StopPropDirective,
    StopClickDirective,
    BlurClickDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    OverlayModule,
    StrongPasswordModule,
    VaultModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
