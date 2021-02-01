import { LoadingSpinnerService } from './../../../core/services/loading-spinner.service';
import { VaultService } from './../../services/vault.service';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromVault from '../../reducers';
import { AddVaultItemActions } from '../../actions';


@Component({
    selector: 'app-add-vault-item',
    templateUrl: './add-vault-item.component.html'
})
export class AddVaultItemComponent {
    constructor(
        private store: Store<fromVault.State>,
        private vaultService: VaultService,
        private spinner: LoadingSpinnerService) {
        this.store.pipe(select(fromVault.getAddVaultItemLoading)).subscribe(loading => {
            if (loading) {this.spinner.show('Encrypting Vault');}
            else {this.spinner.hide();}
        });
    }


    addItem(vaultItem: VaultItem) {
        vaultItem.id = String(this.vaultService.getVaultSize() + 1);
        this.store.dispatch(AddVaultItemActions.addVaultItem({ vaultItem }));
    }
}
