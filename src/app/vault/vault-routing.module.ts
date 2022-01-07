import { VaultItemViewComponent } from './components/vault-item-view/vault-item-view.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { VaultListComponent } from './components/vault-list/vault-list.component';

const vaultRoutes: Routes = [
    { path: 'vault-list', redirectTo: 'main' },
    { path: 'vault-list', component: VaultListComponent },
    { path: 'vault-item/:id', component: VaultItemViewComponent },
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
