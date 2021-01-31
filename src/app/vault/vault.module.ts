import { NewVaultItemComponent } from './components/new-vault-item/new-vault-item.component';
import { VaultEffects } from './effects/vault.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SelectedVaultItemComponent } from './containers/selected-vault-item/selected-vault-item.component';
import { ConformationDialogComponent } from './components/vault-item/vault-item.component';
import { VaultItemComponent } from './components/vault-item/vault-item.component';
import { VaultListComponent } from './components/vault-list/vault-list.component';
import { VaultComponent } from './containers/vault-component/vault.component';
import { MaterialModule } from './../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { VaultRoutingModule } from './vault-routing.module';
import { reducers } from './reducers';
import { AddVaultItemComponent } from './containers/add-vault-item/add-vault-item.component';

export const COMPONENTS = [
    VaultComponent,
    VaultListComponent,
    VaultItemComponent,
    ConformationDialogComponent,
    SelectedVaultItemComponent,
    NewVaultItemComponent,
    AddVaultItemComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        VaultRoutingModule,
        StoreModule.forFeature('vault',reducers),
        EffectsModule.forFeature([VaultEffects])
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class VaultModule { }
