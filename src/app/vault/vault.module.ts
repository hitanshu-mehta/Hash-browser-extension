import { VaultItemViewComponent } from './components/vault-item-view/vault-item-view.component';
import { VaultItemViewInputComponent } from './components/vault-item-view/vault-item-view-input/vault-item-view-input.component';
import { VaultListItemComponent } from './components/vault-list/vault-list-item/vault-list-item.component';
import { UtilsModule } from './../utils/utils.module';
import { EffectsModule } from '@ngrx/effects';
import { VaultListComponent } from './components/vault-list/vault-list.component';
import { VaultComponent } from './containers/vault-component/vault.component';
import { MaterialModule } from './../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { VaultRoutingModule } from './vault-routing.module';
import { VaultEffects } from './effects/vault.effects';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';

export const COMPONENTS = [
  VaultComponent,
  VaultListComponent,
  VaultListItemComponent,
  VaultItemViewComponent,
  VaultItemViewInputComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    VaultRoutingModule,
    UtilsModule,
    StoreModule.forFeature('vault', reducers),
    EffectsModule.forFeature([VaultEffects]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class VaultModule {}
