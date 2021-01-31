import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store, select} from '@ngrx/store';
import { VaultItem } from '../../models/vault-item';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

import * as fromVault from '../../reducers';
import { SelectedVaultItemActions, VaultActions } from '../../actions';

@Component({
    selector:'app-selected-vault-item',
    templateUrl:'./selected-vault-item.component.html'
})
export class SelectedVaultItemComponent implements OnDestroy{
    vaultItem$: Observable<VaultItem>;
    actionSubscription: Subscription;

    constructor(private store: Store<fromVault.State>,private route: ActivatedRoute){
        this.vaultItem$ = store.pipe(select(fromVault.getSelectedVaultItem));
        this.actionSubscription = this.route.paramMap
        .pipe(
            map(params => VaultActions.viewVaultItem({id:String(params.get('id'))}))
        ).subscribe(store);
    }

    updateItem(vaultItem: VaultItem){
        this.store.dispatch(SelectedVaultItemActions.updateVaultItem({vaultItem}));
    }

    ngOnDestroy(){
        if (this.actionSubscription) {this.actionSubscription.unsubscribe();}
    }

}
