import { Router } from '@angular/router';
import { VaultStatus } from './../../reducers/vault.reducer';
import { Observable } from 'rxjs';
import { VaultItem } from './../../models/vault-item';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromVault from '../../reducers';
import { VaultActions } from '../../actions';
import { getVaultItems } from '../../reducers';

@Component({
    selector: 'app-vault',
    templateUrl: './vault.component.html',
    styleUrls: ['./vault.component.scss']
})
export class VaultComponent implements OnInit {

    vaultItems$: Observable<VaultItem[]>;
    vaultStatus: VaultStatus;

    constructor(private router: Router, private store: Store<fromVault.State>) {
    }

    ngOnInit() {
        this.store.dispatch(VaultActions.loadVault());
        this.vaultItems$ = this.store.pipe(select(fromVault.getVaultItems));
        this.store.select(fromVault.getVaultStatus).subscribe((status: VaultStatus) => this.vaultStatus = status);
    }

    addVaultItem() {
        this.store.dispatch(VaultActions.addVaultItem({ vaultItem: null }))
    }

    public get VaultStatus(): typeof VaultStatus {
        return VaultStatus;
    }
}
