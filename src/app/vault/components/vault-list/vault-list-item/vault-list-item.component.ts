import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { VaultActions } from 'src/app/vault/actions';
import * as fromVault from '../../../reducers';

@Component({
    selector: 'app-vault-list-item',
    templateUrl: './vault-list-item.component.html',
})
export class VaultListItemComponent {

    constructor(private store: Store<fromVault.State>) { }

    @Input() name: string;
    @Input() username: string;
    @Input() id: string;

    delete(): void {
        this.store.dispatch(VaultActions.removeVaultItem({ id: this.id }));
    }
}
