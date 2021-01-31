import { VaultService } from './../../services/vault.service';
import { VaultItem } from 'src/app/vault/models/vault-item';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromVault from '../../reducers';
import { AddVaultItemActions } from '../../actions';

@Component({
    selector:'app-add-vault-item',
    templateUrl:'./add-vault-item.component.html'
})
export class AddVaultItemComponent{
    constructor(private store: Store<fromVault.State>, private vaultService: VaultService){}

    addItem(vaultItem: VaultItem){
        console.log(vaultItem);
        vaultItem.password = this.vaultService.encryptPassword(vaultItem.password);
        vaultItem.id = String(this.vaultService.getVaultSize()+1);
        this.store.dispatch(AddVaultItemActions.addVaultItem({vaultItem}));
    }
};
