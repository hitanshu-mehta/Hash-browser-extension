import { AddVaultItemComponent } from './containers/add-vault-item/add-vault-item.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SelectedVaultItemComponent } from './containers/selected-vault-item/selected-vault-item.component';
import { VaultListComponent } from './components/vault-list/vault-list.component';

const vaultRoutes: Routes = [
    { path: 'vault-list', redirectTo: 'main' },
    { path: 'vault-list', component: VaultListComponent },
    { path: 'vault-item/:id', component: SelectedVaultItemComponent },
    { path: 'new-vault-item', component: AddVaultItemComponent }
];


@NgModule({
    imports: [
        RouterModule.forChild(vaultRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VaultRoutingModule { }
