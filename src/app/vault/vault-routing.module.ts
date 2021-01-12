import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { VaultItemComponent } from './vault-item/vault-item.component';
import { VaultListComponent } from './vault-list/vault-list.component';

const vaultRoutes: Routes = [
    { path: 'vault-list', redirectTo: 'main' },
    { path: 'vault-list', component: VaultListComponent },
    { path: 'vault-item/:id', component: VaultItemComponent },

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
