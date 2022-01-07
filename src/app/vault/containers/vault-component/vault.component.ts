import { Router } from '@angular/router';
import { VaultStatus, getSelectedItemId } from './../../reducers/vault.reducer';
import { Observable } from 'rxjs';
import { VaultItem } from './../../models/vault-item';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromVault from '../../reducers';
import { VaultActions } from '../../actions';


@Component({
    selector: 'app-vault',
    templateUrl: './vault.component.html',
    styleUrls: ['./vault.component.scss']
})
export class VaultComponent implements OnInit {

    vaultItems$: Observable<VaultItem[]>;
    vaultStatus: VaultStatus;

    constructor(private store: Store<fromVault.State>,
        private router: Router) {
    }

    ngOnInit() {
        this.store.dispatch(VaultActions.loadVault());

        this.vaultItems$ = this.store.pipe(select(fromVault.getVault));
        this.store.select(fromVault.getVaultStatus).subscribe((status: VaultStatus) => this.vaultStatus = status);
    }

    addVaultItem() {
        this.router.navigate(['./new-vault-item'])
        this.store.dispatch(VaultActions.loadVault());
    }

    public get VaultStatus(): typeof VaultStatus {
        return VaultStatus;
    }
}
